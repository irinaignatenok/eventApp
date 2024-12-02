import { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Switch, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function AddEvent({ navigation, onAddEvent }) {
    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [description, setDescription] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const [savingData, setSavingData] = useState(false);

    const handleNameChange = (value) => setEventName(value);
    const handleDescriptionChange = (value) => setDescription(value);
    const handleDateChange = (value) => setDate(value);
    const handleLocationChange = (value) => setLocation(value);
    const handleOrganizerChange = (value) => setOrganizer(value);
    const toggleFavorite = () => setIsFavorite(prevState => !prevState);

    const handleAddPress = async () => {
        const validate = [];
        if (!eventName) validate.push("Event name is required");
        if (!date) validate.push("Event date is required");
        if (!location) validate.push("Location is required");
        if (!organizer) validate.push("Organizer is required");
        if (!description) validate.push("Description is required");

        if (validate.length > 0) {
            setErrorMessage(validate);
        } else {
            setErrorMessage([]);
            setSavingData(true);

            const result = await onAddEvent(eventName, date, location, organizer, description, isFavorite);

            if (result.success) {
                // Clear form on success
                setEventName('');
                setDate('');
                setLocation('');
                setOrganizer('');
                setDescription('');
                setIsFavorite(false);
                navigation.navigate('EventsPage');
            } else {

                setErrorMessage([result.message || "Failed to add event. Please try again."]);
            }

            setSavingData(false);
        }
    };

    if (savingData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#22CA54" />
                <Text style={styles.loadingText}>Saving Data! Please wait ...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Enter event name"
                maxLength={150}
                onChangeText={handleNameChange}
                value={eventName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter event description"
                maxLength={150}
                onChangeText={handleDescriptionChange}
                value={description}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter event date"
                maxLength={150}
                onChangeText={handleDateChange}
                value={date}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter event location"
                maxLength={150}
                onChangeText={handleLocationChange}
                value={location}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter event organizer"
                maxLength={150}
                onChangeText={handleOrganizerChange}
                value={organizer}
            />

            <View style={styles.switchContainer}>
                <Text style={styles.textStyle}>Favorite</Text>
                <Switch
                    value={isFavorite}
                    onValueChange={setIsFavorite}
                />
            </View>

            {errorMessage.length > 0 && (
                <View>
                    {errorMessage.map((msg, index) => (
                        <Text key={index} style={styles.errorText}>{msg}</Text>
                    ))}
                </View>
            )}
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleAddPress}
            >
                <Text style={styles.textStyle}>Add Event</Text>
            </TouchableOpacity>

        </View>
    );
}
