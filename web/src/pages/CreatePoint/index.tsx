import React, { useEffect, useState, ChangeEvent, FormEvent }from 'react'
import './styles.css'
import { Link , useHistory } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { Map, TileLayer, Marker} from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import Modal from 'react-modal'
import api from '../../services/api'
import Dropzone from '../../components/Dropzone'
import axios from 'axios'
import logo from '../../assets/logo.svg'

interface Item {
    id: number,
    title: string,
    image_url: string
}

interface IBGEUfResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([])
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
    const [formData, setFormData] = useState({name:'', email:'', whatsapp:''})
    const [selectedUf, setSelectedUf] = useState('')
    const [selectedCity, setSelectedCity] = useState('0')
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [selectedFile, setSelectedFile] = useState<File>()
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
    const [modalIsOpen, setIsOpen] = useState(false)
    const history = useHistory()

    Modal.setAppElement('#root')
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords

            setInitialPosition([latitude, longitude])
        })
    }, [])

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data.serializedItems)
        })
    }, [])

    useEffect(() => {
        axios.get<IBGEUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            const siglas = response.data.map(uf => uf.sigla)
            setUfs(siglas)
        })
    }, [])

    useEffect(() => {
        if(selectedUf === '0'){
            return
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cityNames = response.data.map(city => city.nome)
            setCities(cityNames)
        })
    }, [selectedUf])


function handleSelectedUf (event: ChangeEvent<HTMLSelectElement>){
    const uf = event.target.value
    setSelectedUf(uf)
}

function handleSelectedCity (event: ChangeEvent<HTMLSelectElement>){
    const city = event.target.value
    setSelectedCity(city)
}

function handleMapClick (event: LeafletMouseEvent){
    setSelectedPosition([event.latlng.lat, event.latlng.lng])
}

function handleInputChange (event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target

    setFormData({ ...formData, [name]: value})
}

function handleSelectedItem (id: number){
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => item !== id)
        setSelectedItems(filteredItems)
    } else {
        setSelectedItems([...selectedItems, id])
    }
}

async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { name, email, whatsapp } = formData
    const uf = selectedUf
    const city = selectedCity
    const [latitude, longitude] = selectedPosition
    const items = selectedItems
    const data = new FormData()

    data.append('name', name)
    data.append('email', email)
    data.append('whatsapp', whatsapp)
    data.append('uf', uf)
    data.append('city', city)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('items', items.join(','))

    if(selectedFile) {
        data.append('image', selectedFile)
    }
    
    await api.post('/points', data)

    openModal()

    setTimeout(() => {
        closeModal()
        history.push('/')
    }, 2000)
    
}

function openModal() {
    setIsOpen(true)
}

function closeModal() {
    setIsOpen(false)
    // history.push('/')
}

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/">
                    <span><FiArrowLeft/></span>
                    <strong>Voltar para Home</strong>
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do ponto de coleta</h1>

                <Dropzone onFileUpload={setSelectedFile} />

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange}/>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}/>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                    <Marker position={selectedPosition}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectedUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítems de coleta</h2>
                        <span>Selecione um ou mais ítems abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                        <li key={item.id} 
                        onClick={() => handleSelectedItem(item.id)} 
                        className={selectedItems.includes(item.id) ? 'selected': ''}>
                            <img src={item.image_url} alt={item.title}></img>
                            <span>{item.title}</span>
                        </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>

            <Modal isOpen={modalIsOpen}
            onRequestClose={closeModal}

            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                },
                content:{
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    border: 'none',
                }
            }}
            contentLabel="Confirmação">
                <div className="modal">
                    <span><FiCheckCircle size={60} color='#2FB86E'/></span>
                    <h1>Cadastro realizado com sucesso</h1>
                </div>
            </Modal>
        </div>
    )
}

export default CreatePoint