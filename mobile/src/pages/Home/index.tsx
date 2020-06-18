import React, { useState, useEffect } from 'react'
import {View, Text, Image, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { Feather as Icon} from '@expo/vector-icons'
import axios from 'axios'
import { RectButton } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

const Home = () => {
    const navigation = useNavigation()
    const [uf, setUf] = useState<string[]>([])
    const [city, setCity] = useState<string[]>([])
    const [selectedUf, setSelectedUf] = useState('')
    const [selectedCity, setSelectedCity] = useState('0')

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            const siglas = response.data.map(uf => uf.sigla)
            setUf(siglas)
        })
    }, [])

    useEffect(() => {
        if (selectedUf === '0'){
            return
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cityNames = response.data.map(city => city.nome)
            setCity(cityNames)
        })
    }, [selectedUf])

    function handleNavigateToPoints() {
        if (selectedUf && selectedCity) {
            navigation.navigate('Points', {
                selectedUf, selectedCity
            })
        } else {
            Alert.alert("Entrada invalida", "Selecione uma cidade")
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width: 274, height: 368}}>
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')}/>
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                    </View>
                </View>
                
                <View style={styles.footer}>

                    <View style={styles.pickerArea}>
                        <RNPickerSelect
                        placeholder={{ label: 'UF', value: null, color: 'red'}}
                        useNativeAndroidPickerStyle={false}
                        style={{inputAndroid: styles.pickerSelectUF}}
                        onValueChange={(uf) => setSelectedUf(uf)}
                        items={
                            uf.map(uf => (
                            { label: uf, value: uf }
                        ))}/>
                        
                        <RNPickerSelect
                        placeholder={{ label: 'Selecione uma Cidade', value: null, color: 'red'}}
                        useNativeAndroidPickerStyle={false}
                        style={{ inputAndroid: styles.pickerSelectCity }}
                        onValueChange={(city) => setSelectedCity(city)}
                        items={
                            city.map(city => (
                            { label: city, value: city }
                        ))}/>
                    </View>
                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Icon name="log-in" color="#FFF" size={25}/>
                        </View>
                        <Text style={styles.buttonText}>Entrar</Text>

                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export default Home

