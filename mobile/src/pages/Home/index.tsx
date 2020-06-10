import React, { useState } from 'react'
import {View, Text, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { Feather as Icon} from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'

const Home = () => {
    const navigation = useNavigation()
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')

    function handleNavigateToPoints() {
        navigation.navigate('Points', {
            uf, city
        })
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
                    <TextInput style={styles.input}
                    placeholder="Digite a UF"
                    maxLength={2}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    value={uf}
                    onChangeText={setUf}/>

                    <TextInput style={styles.input}
                    placeholder="Digite a Cidade"
                    autoCorrect={false}
                    value={city}
                    onChangeText={setCity}/>
                    
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

