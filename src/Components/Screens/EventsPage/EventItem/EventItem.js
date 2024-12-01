import { View, Text, Pressable, FlatList, Alert, TouchableOpacity, Modal, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as database from '../../../../database';
import styles from './styles';
import { useState, useEffect } from 'react';


export default function EventItem({ event, onFavoriteToggle, onEdit, onDelete, userId }) {

    console.log("Item ", event)
    const [showModal, setShowModal] = useState(false);
    const [favorite, setFavorite] = useState(event.isFavorite);
    const [editableEvent, setEditableEvent] = useState({ ...event });
    // const [favorite, setFavorite] = useState(false);
    useEffect(() => {
        setFavorite(event.isFavorite); // Ensure state sync with passed data
    }, [event.isFavorite])

    const handleSave = async () => {
        if (!editableEvent.eventName || !editableEvent.date || !editableEvent.location) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        try {
            await database.updateEvent(editableEvent.id, editableEvent); // Save to database
            Alert.alert("Success", "Event updated successfully.");
            setShowModal(false);
            onEdit(editableEvent); // Update the UI
        } catch (error) {
            Alert.alert("Error", "Failed to update event. Please try again.");
            console.error(error);
        }
    };

    // const toggleFavorite = () => {
    //     setFavorite(!favorite);
    //     onFavoriteToggle(event.id, !favorite); // Notify parent about favorite toggle
    // };
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{event.eventName}</Text>
                <Text style={styles.date}>{event.date}</Text>
                <Text style={styles.location}>{event.location}</Text>
                <Text style={styles.organizer}>{event.organizer}</Text>
                <Text style={styles.description}>{event.description}</Text>
                {/* Favorite button */}
                {/* <View style={styles.favoriteContainer}>
                    <TouchableOpacity onPress={toggleFavorite}>
                        <AntDesign
                            name={favorite ? 'heart' : 'hearto'}
                            size={24}
                            color={favorite ? 'red' : '#888'}
                        />
                    </TouchableOpacity>
                    <Text style={styles.favorite}>{favorite ? 'Favorite' : 'Not Favorite'}</Text>
                </View> */}
                <Text style={styles.favorite}>{event.isFavorite ? 'Favorite' : 'Not Favorite'}</Text>
                {/* Edit and Delete buttons */}
                {userId === event.userId && ( // Check if the logged-in user is the creator of the event
                    <View style={styles.actionButtons}>
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                            <Text style={styles.editButton}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onDelete(event.id)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {/* Edit Modal */}
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