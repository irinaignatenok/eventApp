import { useState } from 'react';
import { View, Text, Pressable, TextInput, ActivityIndicator, Button } from 'react-native';
import styles from './styles'

export default function AddEvent({ navigation, onAddEvent }) {
    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [description, setDescription] = useState('');
    const [eventList, setEventList] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const [savingData, setSavingData] = useState(false);


    const handleNameChange = (value) => {
        setEventName(value)
    }
    const handleDescriptionChange = (value) => {
        setDescription(value)
    }
    const handleDateChange = (value) => {
        setDate(value)
    }
    const handleLocationChange = (value) => {
        setLocation(value)
    }
    const handleOrganizerChange = (value) => {
        setOrganizer(value)
    }

    const handleAddPress = async () => {
        const validate = [];
        if (eventName === '') {
            validate.push("The description is required")
        }
        if (validate.length > 0) {
            setErrorMessage(validate)
        } else {
            setSavingData(true);
            await onAddEvent(eventName, date, location, organizer, description)
            setSavingData(true);

            // Clear up the form
            setEventName('');
            setDate('');
            setDescription('');
            setLocation('');
            setOrganizer('');
            navigation.navigate('EventsPage')
        }
    }

    if (savingData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#22CA54' />
                <Text style={styles.loadingText}>Saving Data!</Text>
                <Text style={styles.loadingText}>Please, wait ...</Text>
            </View>
        )
    }
    return (
        <View >
            <TextInput
                style={styles.textInput}
                placeholder='Enter an event'
                maxLength={150}
                onChangeText={handleNameChange}
                defaultValue={eventName}
            />
            <TextInput
                style={styles.textInput}
                placeholder='Enter an event description'
                maxLength={150}
                onChangeText={handleDescriptionChange}
                defaultValue={description}
            />
            <TextInput
                style={styles.textInput}
                placeholder='Enter a date'
                maxLength={150}
                onChangeText={handleDateChange}
                defaultValue={date}
            />
            <TextInput
                style={styles.textInput}
                placeholder='Enter a location'
                maxLength={150}
                onChangeText={handleLocationChange}
                defaultValue={location}
            />
            <TextInput
                style={styles.textInput}
                placeholder='Enter a Organizer'
                maxLength={150}
                onChangeText={handleOrganizerChange}
                defaultValue={organizer}
            />
            <Button title='Add' onPress={handleAddPress} style={styles.btn} />
        </View>
    );
};