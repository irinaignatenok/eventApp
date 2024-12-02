import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1B3C',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    textInput: {
        width: '80%',
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 5,
        margin: 10
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginRight: 10,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    }, errorText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "red",
        marginVertical: 5,
    }, buttonStyle: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '80%',
        backgroundColor: '#22CA54',
        borderRadius: 10
    }
});
