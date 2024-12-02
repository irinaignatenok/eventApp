

import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { toggleFavoriteStatus } from '../../../database/write'
import EventItem from '../EventsPage/EventItem/EventItem';
import { db } from '../../../database/config'
import styles from './styles';


export default function Favorite({ userId }) {
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let unsubscribe = () => { };
        if (userId) {
            const eventsQuery = query(
                collection(db, 'events'),
                where('isFavorite', '==', true),
                // where('userId', '==', userId)
            );

            unsubscribe = onSnapshot(eventsQuery, (querySnapshot) => {
                const favoriteEventsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFavoriteEvents(favoriteEventsList);
                setIsLoading(false);
            });
        }

        return () => unsubscribe();
    }, [userId]);


    const handleToggleFavorite = async (eventId, newValue) => {
        try {
            // Toggle favorite status
            await toggleFavoriteStatus(eventId, newValue);

            // Optimistically update state
            setFavoriteEvents(prevEvents =>
                prevEvents.map(event =>
                    event.id === eventId ? { ...event, isFavorite: newValue } : event
                )
            );
        } catch (error) {
            console.error('Error toggling favorite status:', error);
        }
    };

    if (isLoading) {
        return <Text>Loading favorite events...</Text>;
    }

    return (
        <View style={styles.container}>
            {favoriteEvents.length === 0 ? (
                <Text style={styles.textStyle}>No favorite events found.</Text>
            ) : (
                <FlatList
                    data={favoriteEvents}
                    renderItem={({ item }) => (
                        <EventItem event={item} onToggle={handleToggleFavorite} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
}