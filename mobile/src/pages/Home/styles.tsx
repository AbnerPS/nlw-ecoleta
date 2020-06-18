import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },

    pickerArea: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },

    pickerSelectUF: {
      fontSize: 18,
      fontFamily: 'Roboto_500Medium',
      width: 50,
      paddingHorizontal: 10,
      paddingVertical: 12,
      borderWidth: 2,
      borderColor: '#fff',
      borderRadius: 10,
      backgroundColor: '#fff',
    },

    pickerSelectCity: {
      fontSize: 18,
      fontFamily: 'Roboto_500Medium',
      width: 240,
      paddingHorizontal: 5,
      paddingVertical: 12,
      borderWidth: 2,
      borderRadius: 10,
      paddingRight: 5,
      borderColor: '#fff',
      backgroundColor: '#fff',
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 20,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 25,
    }
  });