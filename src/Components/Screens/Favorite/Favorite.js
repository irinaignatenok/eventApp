// import { View, Text, FlatList } from 'react-native';
// import { loadFavorites } from '../../../database/read'; // Ensure this is returning { favoriteEvents: [...] }
// import { useEffect, useState } from 'react';
// import EventItem from '../EventsPage/EventItem/EventItem';

// export default function Favorite({ navigation }) {
//     const [favoriteEvents, setFavoriteEvents] = useState([]);
//     const [isLoading, setIsLoading] = useState(true); // Add loading state for better user experience

//     // Fetch favorite events when the component mounts
//     useEffect(() => {
//         const fetchFavoriteEvents = async () => {
//             try {
//                 const { favoriteEvents } = await loadFavorites(); // Destructure to get only favoriteEvents
//                 setFavoriteEvents(favoriteEvents);
//                 setIsLoading(false); // Stop loading once data is fetched
//             } catch (error) {
//                 console.error('Error fetching favorite events:', error);
//                 setIsLoading(false); // Stop loading even if there's an error
//             }
//         };

//         fetchFavoriteEvents(); // Call the fetch function
//     }, []); // Empty array ensures this only runs once when the component mounts

//     if (isLoading) {
//         return <Text>Loading favorite events...</Text>; // Show loading text while fetching
//     }

//     return (
//         <View style={{ flex: 1 }}>
//             {favoriteEvents.length === 0 ? (
//                 <Text>No favorite events found.</Text>
//             ) : (
//                 <FlatList
//                     data={favoriteEvents}
//                     renderItem={({ item }) => <EventItem event={item} />}
//                     keyExtractor={(item) => item.id.toString()} // Ensure id is string or number
//                 />
//             )}
//         </View>
//     );
// }

// // Firestore update function (for updating events)
// export const updateEvent = async (eventId, updatedEventData) => {
//     try {
//         const eventRef = doc(db, "events", eventId); // Reference the specific event in Firestore
//         await updateDoc(eventRef, updatedEventData); // Update event data in Firestore
//         console.log("Event successfully updated.");
//     } catch (error) {
//         console.error("Error updating event in Firestore:", error);
//         throw error;
//     }
// };

import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore'; // Real-time listener
import { loadFavorites } from '../../../database/read';
import { toggleFavoriteStatus } from '../../../database/write'
import EventItem from '../EventsPage/EventItem/EventItem';
import { db } from '../../../database/config'



export default function Favorite({ navigation }) {
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state for better user experience

    useEffect(() => {
        const eventsQuery = query(collection(db, 'events'), where('isFavorite', '==', true));

        const unsubscribe = onSnapshot(eventsQuery, (querySnapshot) => {
            const favoriteEventsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFavoriteEvents(favoriteEventsList);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);



    if (isLoading) {
        return <Text>Loading favorite events...</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            {favoriteEvents.length === 0 ? (
                <Text>No favorite events found.</Text>
            ) : (
                <FlatList
                    data={favoriteEvents}
                    renderItem={({ item }) => <EventItem event={item} onToggle={toggleFavoriteStatus} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
}