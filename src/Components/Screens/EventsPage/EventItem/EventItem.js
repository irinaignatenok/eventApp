import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    Switch,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useState } from 'react';
import styles from './styles';
import * as database from '../../../../database';

export default function EventItem({ event, onEdit, onDelete, userId }) {
    const [showModal, setShowModal] = useState(false);
    const [editableEvent, setEditableEvent] = useState({ ...event });
    const [isFavorite, setIsFavorite] = useState(event.isFavorite);
    const [isLoading, setIsLoading] = useState(false); // Track loading state

    const handleSave = async () => {
        if (!editableEvent.eventName || !editableEvent.date || !editableEvent.location) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        try {
            await database.updateEvent(editableEvent.id, editableEvent);
            setShowModal(false);
            onEdit(editableEvent);
            Alert.alert("Success", "Event updated successfully.");
        } catch (error) {
            Alert.alert("Error", "Failed to update event. Please try again.");
            console.error(error);
        }
    };

    const toggleFavoriteStatus = async (value) => {
        setIsLoading(true); // Start loader
        try {
            await database.updateEvent(event.id, { isFavorite: value });
            setIsFavorite(value); // Update only after Firestore succeeds
            Alert.alert(
                "Success",
                value ? "Event added to favorites." : "Event removed from favorites."
            );
        } catch (error) {
            Alert.alert("Error", "Failed to update favorite status.");
            console.error(error);
        } finally {
            setIsLoading(false); // Stop loader
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{event.eventName}</Text>
                <Text style={styles.date}>{event.date}</Text>
                <Text style={styles.location}>{event.location}</Text>
                <Text style={styles.description}>{event.description}</Text>

                {/* Dynamically Change Text */}
                <Text style={styles.favoriteText}>
                    {isFavorite ? 'Favorite' : 'Not Favorite'}
                </Text>

                <View style={styles.switchContainer}>
                    <Text>Toggle Favorite</Text>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        <Switch
                            value={isFavorite}
                            onValueChange={toggleFavoriteStatus}
                            disabled={isLoading} // Disable switch during update
                        />
                    )}
                </View>

                {userId === event.userId && (
                    <View style={styles.actionButtons}>
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                            <Text style={styles.editButton}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onDelete(event.id)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Edit Event</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Event Name"
                                value={editableEvent.eventName}
                                onChangeText={(text) => setEditableEvent({ ...editableEvent, eventName: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Date"
                                value={editableEvent.date}
                                onChangeText={(text) => setEditableEvent({ ...editableEvent, date: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Location"
                                value={editableEvent.location}
                                onChangeText={(text) => setEditableEvent({ ...editableEvent, location: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={editableEvent.description}
                                onChangeText={(text) => setEditableEvent({ ...editableEvent, description: text })}
                                multiline
                            />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={handleSave}>
                                    <Text style={styles.saveButton}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setShowModal(false)}>
                                    <Text style={styles.cancelButton}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
