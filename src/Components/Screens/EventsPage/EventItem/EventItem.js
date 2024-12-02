import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    Switch,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import styles from './styles';
import * as database from '../../../../database'; // Import your Firebase database functions

export default function EventItem({ event, onEdit, onDelete, userId, onToggle }) {
    const [showModal, setShowModal] = useState(false);
    const [editableEvent, setEditableEvent] = useState({ ...event });
    const [isFavorite, setIsFavorite] = useState(event.isFavorite);
    const [isLoading, setIsLoading] = useState(false);

    const toggleFavoriteStatus = async (newValue) => {
        setIsLoading(true); // Show loader
        setIsFavorite(newValue); // Optimistically update UI
        try {
            await onToggle(event.id, newValue); // Call the onToggle prop to update favorite status
            Alert.alert(
                "Success",
                newValue ? "Event marked as Favorite." : "Event removed from Favorites."
            );
        } catch (error) {
            Alert.alert("Error", "Failed to update favorite status.");
            setIsFavorite(!newValue); // Revert UI if update fails
            console.error("Error updating favorite status:", error);
        } finally {
            setIsLoading(false); // Hide loader
        }
    };

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

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{event.eventName}</Text>
                <Text style={styles.date}>{event.date}</Text>
                <Text style={styles.location}>{event.location}</Text>
                <Text style={styles.description}>{event.description}</Text>

                {/* Dynamically Show Favorite Status */}
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
                            disabled={isLoading} // Disable switch while updating
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
                                onChangeText={(text) =>
                                    setEditableEvent({ ...editableEvent, eventName: text })
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Date"
                                value={editableEvent.date}
                                onChangeText={(text) =>
                                    setEditableEvent({ ...editableEvent, date: text })
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Location"
                                value={editableEvent.location}
                                onChangeText={(text) =>
                                    setEditableEvent({ ...editableEvent, location: text })
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={editableEvent.description}
                                onChangeText={(text) =>
                                    setEditableEvent({ ...editableEvent, description: text })
                                }
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
