import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorite from '../Favorite/Favorite'
import AddEvent from '../AddEvent/AddEvent'
import EventsPage from '../EventsPage/EventsPage';
import { AntDesign } from '@expo/vector-icons';
import { save } from '../../../database/write';
import { useState } from 'react';
import AppLoader from '../../AppLoader';




const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const [events, setEvents] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    /**
     * @param eventDescription
     * @param eventName
     * @param date
     * @param location
     * @param organizer
     */

    const handleAddEvent = async (eventName, date, location, organizer, description, isFavorite) => {
        console.log("Does it work")
        try {
            // Create a new task object
            const newEvent = {
                eventName: eventName,
                date: date,
                location: location,
                organizer: organizer,
                description: description,
                isFavorite: isFavorite || false
            }
            console.log("Saving new event:", newEvent)

            // Save the new event to the database
            const docId = await save(newEvent);
            console.log("Doc Id", docId)
            if (docId) {
                newEvent.id = docId;
                setEvents(prevEvent => [...prevEvent, newEvent])
            }
        } catch (error) {
            console.log('Error  adding event:', error)
        }
    };
    const handleEventsLoaded = (loadedEvents) => {
        console.log("Loaded events:", loadedEvents);
        setEvents(loadedEvents)

        setIsLoading(false);
    }
    console.log("How about here", events)
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
                        />
                    )}
                </Tab.Screen>

                <Tab.Screen name="Favorite" component={Favorite}
                    options={{
                        headerShown: false
                    }} />
                <Tab.Screen name="AddEvent"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ size, color }) => (
                            <AntDesign name="addfile" size={size} color={color} />
                        ),
                    }} >
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


    )

}
