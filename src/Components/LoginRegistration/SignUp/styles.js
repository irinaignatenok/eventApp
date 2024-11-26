import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1B3C',
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    buttonStyle: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: "80%",
        backgroundColor: '#22CA54',
        borderRadius: 10,

    },
    textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    inputText: {
        width: "80%",
        padding: 10,
        // borderColor: "dodgerblue",
        borderWidth: 2,
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: '#fff'
    },
    textError: {
        fontSize: 14,
        fontWeight: "bold",
        color: "red",
        marginVertical: 5,
    },
})