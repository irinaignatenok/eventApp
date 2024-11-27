import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    textTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonStyle: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '80%',
        backgroundColor: '#22CA54',
        borderRadius: 10
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    inputText: {
        width: '80%',
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 5,
        margin: 10
    },
    textError: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red'
    },
});
