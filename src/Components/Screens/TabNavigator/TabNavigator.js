import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorite from '../Favorite/Favorite';
import AddEvent from '../AddEvent/AddEvent';
import EventsPage from '../EventsPage/EventsPage';
import { AntDesign } from '@expo/vector-icons';
import { save } from '../../../database/write';
import { useState } from 'react';
import AppLoader from '../../AppLoader';

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
        console.log("Loaded events:", loadedEvents);
        setEvents(loadedEvents);
        setIsLoading(false);
    };

    return (
        <>
            <AppLoader onEventsLoaded={handleEventsLoaded} />
            <Tab.Navigator>
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
                        />
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="Favorite"
                    component={Favorite}
                    options={{ headerShown: false }}
                />

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
        </>
    );
}
