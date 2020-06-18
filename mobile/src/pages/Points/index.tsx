import React, { useState, useEffect } from 'react'
import styles from './styles'
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, SafeAreaView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import api from '../../services/api'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'

interface Item {
    id: number,
    title: string,
    image_url: string
}

interface Points {
    id: number,
    name: string,
    image: string,
    image_url: string,
    latitude: number,
    longitude: number
}

interface Params {
    selectedUf: string,
    selectedCity: string
}

const Points = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const routeParams = route.params as Params
    const [items, setItems] = useState<Item[]>([])
    const [points, setPoints] = useState<Points[]>([])
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])

    useEffect(() => {
        api.get('/items').then(response => {
            setItems(response.data.serializedItems)
        })
    },[])

    useEffect(() => {
        async function loadPosition(){
            const { status } = await Location.requestPermissionsAsync()
            
            if(status !== 'granted'){
                Alert.alert('Oooops...', 'Precisamos da sua permissão para obter sua localização')
                return
            }

            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude} = location.coords

            setInitialPosition([latitude, longitude])
        }

        loadPosition()
    }, [])

    useEffect(() => {
        console.log(routeParams.selectedUf);
        console.log(routeParams.selectedCity);
        
        api.get('/points', {
            params: {
                city: routeParams.selectedCity,
                uf: routeParams.selectedUf,
                items: selectedItems
            }
        }).then(response => {
            setPoints(response.data)
        })
    }, [selectedItems])

    function handleNavigateBack() {
        navigation.goBack()
    }

    function handleNavigateToDetail(id: number) {
        navigation.navigate('Detail', {point_id: id})
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon style={styles.iconLogout} name="log-out" size={25} />
                </TouchableOpacity>

                <Text style={styles.title}>Seja Bem Vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    { initialPosition[0] !== 0 && (
                        <MapView style={styles.map}
                        loadingEnabled={initialPosition[0] === 0}
                        initialRegion={{
                            latitude: initialPosition[0],
                            longitude: initialPosition[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014
                        }}>
                            {points.map(point => (
                                <Marker key={String(point.id)}
                                style={styles.mapMarker}
                                onPress={() => handleNavigateToDetail(point.id)}
                                coordinate={{
                                    latitude: -23.399037,
                                    longitude: -46.753129}}>
                                        
                                    <View style={styles.mapMarkerContainer}>
                                        <Image style={styles.mapMarkerImage}
                                        source={{ uri: point.image_url }}/>
                                        <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                    </View>
                                </Marker>
                            ))}
                        </MapView>
                    )}
                </View>
            </View>

            <View style={styles.itemsContainer}>
                <ScrollView horizontal
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 20}}>
                    {items.map(item => (
                        <TouchableOpacity
                        key={String(item.id)}
                        style={[
                            styles.item,
                            selectedItems.includes(item.id) ? styles.selectedItem : {}
                        ]}
                        onPress={() => handleSelectedItem(item.id)}
                        activeOpacity={0.6}>
                            <SvgUri width="42" height="42" uri={item.image_url}/>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Points