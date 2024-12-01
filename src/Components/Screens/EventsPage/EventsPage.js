import { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import * as database from '../../../database/index';
import EventItem from './EventItem/EventItem';
// import { deleteEvent, ediEvent } from '../../../database/index';

export default function EventsPage({ navigation, events, onEventsLoaded, isLoading, fullName, userId }) {

    useEffect(() => {
        console.log("Events in EventsPage:", events);
    }, [events]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await database.load();
                console.log("Loaded data:", data)
                if (data.length === 0) {
                    console.log('There is no data');
                } else {
                    onEventsLoaded(data);

                }
            } catch (error) {
                console.log("Error loading data ", error);
            }
            // finally {
            //     setIsLoading(false);
            // }
        };
        loadData();
    }, []);

    const handleEventPress = (event) => {
        navigation.navigate('Details', { event, events });
    };
    const handleEditEvent = (event) => {
        // Navigate to an Edit screen (assuming `EventEditPage` exists)
        navigation.navigate('EditEvent', { event });
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
        <Pressable onPress={() => handleEventPress(item)}>
            <EventItem event={item}
                // onFavoriteToggle={handleFavoriteToggle}
                userId={userId}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
            />
        </Pressable>
    );

    // const handleFavoriteToggle = (eventId, newFavoriteStatus) => {
    //     console.log(`Event ID: ${eventId}, New Favorite Status: ${newFavoriteStatus}`);
    // };

    const renderSeparator = () => <View style={{ height: 1, backgroundColor: '#ccc' }} />;

    return (
        <View style={{ flex: 1 }}>
            <Text> Welcome, {fullName}</Text>
            {isLoading ? (
                <Text>Loading Events...</Text>
            ) : (
                <FlatList
                    data={events}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={renderSeparator}
                />
            )}
        </View>

    );
}
