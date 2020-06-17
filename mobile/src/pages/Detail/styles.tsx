import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },

    iconLogout: {
      marginTop: 20,
      color: "#34CB79",
      transform: [{rotate: "180deg"}]
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },

    itemsTitle: {
      marginTop: 20,
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 20,
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 18,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 22,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 18,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
  });