import { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import * as database from '../../../database/index';
import EventItem from './EventItem/EventItem';

export default function EventsPage({ navigation, events, onEventsLoaded, isLoading, fullName, userId, onToggle }) {
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await database.load();
                if (data.length === 0) {
                    console.log('There is no data');
                } else {
                    onEventsLoaded(data);
                }
            } catch (error) {
                console.log("Error loading data ", error);
            }
        };
        loadData();
    }, []);



    const handleEditEvent = (updatedEvent) => {
        const updatedEvents = events.map(event => event.id === updatedEvent.id ? updatedEvent : event);
        onEventsLoaded(updatedEvents);
    };

    const handleDeleteEvent = (eventId) => {
        Alert.alert(
            "Delete Event",
            "Are you sure you want to delete this event?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await database.deleteEvent(eventId);
                            onEventsLoaded(events.filter(event => event.id !== eventId));
                        } catch (error) {
                            console.error("Error deleting from UI:", error);
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <EventItem
            event={item}
            userId={userId}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            onToggle={onToggle}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <Text>Welcome, {fullName}</Text>
            {isLoading ? (
                <Text>Loading Events...</Text>
            ) : (
                <FlatList
                    data={events}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
}
