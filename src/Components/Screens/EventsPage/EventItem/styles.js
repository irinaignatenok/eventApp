import { StyleSheet } from "react-native";

export default StyleSheet.create({
    separator: {
        height: 2,
        backgroundColor: '#ccc',
        marginHorizontal: 16,
    }, container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0E1B3C',
        padding: 20,
    },
    card: {
        backgroundColor: '#5677CB',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        maxWidth: 400,
        elevation: 5, // for Android shadow
        // shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    date: {
        fontSize: 18,
        color: 'white',
        marginBottom: 5,
    },
    location: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    organizer: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: 'white',
        marginBottom: 5,
    },
    favorite: {
        fontSize: 14,
        color: 'yellow',
        fontWeight: 'bold',
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        color: 'white',
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
    cancelButton: {
        color: 'white',
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
    favoriteText: {
        fontSize: 14,
        color: 'yellow',
        fontWeight: 'bold',
        marginTop: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    }, buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '45%',
        backgroundColor: '#22CA54',
        borderRadius: 10,
        marginVertical: 5,
    }, buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    }, deleteButton: {
        backgroundColor: '#f44336'
    }

})