import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import AppLoader from '../../AppLoader';
import EventsPage from '../EventsPage/EventsPage';
import Favorite from '../Favorite/Favorite';
import AddEvent from '../AddEvent/AddEvent';
import { save, updateEvent } from '../../../database/write';



const Tab = createBottomTabNavigator();

export default function TabNavigator({ route }) {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Extracting userId and fullName from route.params
    const { userId, fullName } = route.params;

    const handleAddEvent = async (eventName, date, location, organizer, description, isFavorite) => {
        console.log("Adding new event...");
        try {
            const newEvent = {
                eventName: eventName,
                date: date,
                location: location,
                organizer: organizer,
                description: description,
                isFavorite: isFavorite || false,
                userId: userId
            };
            console.log("Saving new event:", newEvent);

            // Save the new event to the database
            const docId = await save(newEvent, userId);
            if (docId.success) {
                newEvent.id = docId.id;
                setEvents(prevEvents => [...prevEvents, newEvent]);
                return { success: true };
            } else {
                return { success: false, message: docId.message };
            }
        } catch (error) {
            console.error('Error adding event:', error);
            return { success: false, message: error.message };
        }
    };

    const handleEventsLoaded = (loadedEvents) => {
        setEvents(loadedEvents);
        setIsLoading(false);
    };

    // If loading data, show the AppLoader component
    if (isLoading) {
        return <AppLoader onEventsLoaded={handleEventsLoaded} />;
    }

    const handleToggleFavorite = async (eventId, newValue) => {
        try {
            // Update the event's favorite status in the database
            await updateEvent(eventId, { isFavorite: newValue });

            // Optimistically update the event's favorite status in the state
            setEvents(prevEvents => {
                return prevEvents.map(event =>
                    event.id === eventId ? { ...event, isFavorite: newValue } : event
                );
            });
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#22CA54', // Set tab bar color
                    borderTopWidth: 0, // Remove the border
                },
                tabBarActiveTintColor: 'white', // Active tab color
                tabBarInactiveTintColor: 'gray', // Inactive tab color
                tabBarLabelStyle: {
                    fontSize: 12, // Adjust font size of tab text
                    fontWeight: 'bold', // Optional: Make the text bold
                },
            }}
        >
            <Tab.Screen
                name="EventsPage"
                options={{ headerShown: false }}
            >
                {(props) => (
                    <EventsPage
                        {...props}
                        events={events}
                        onEventsLoaded={handleEventsLoaded}
                        isLoading={isLoading}
                        fullName={fullName}
                        userId={userId}
                        onToggle={handleToggleFavorite}
                    />
                )}
            </Tab.Screen>

            <Tab.Screen
                name="Favorite"
                options={{ headerShown: false }}
            >
                {(props) => (
                    <Favorite
                        {...props}
                        events={events}
                        onToggle={handleToggleFavorite}
                    />
                )}
            </Tab.Screen>

            <Tab.Screen
                name="AddEvent"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="addfile" size={size} color={color} />
                    ),
                }}
            >
                {(props) => (
                    <AddEvent
                        {...props}
                        events={events}
                        onAddEvent={handleAddEvent}
                    />
                )}
            </Tab.Screen>


        </Tab.Navigator>
    );
}
