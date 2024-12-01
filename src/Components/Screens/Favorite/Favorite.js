import { View, Text, Pressable, FlatList } from 'react-native';
import { loadFavorites } from '../../../database/read';
import { useEffect, useState } from 'react';
import EventItem from '../EventsPage/EventItem/EventItem';

export default function Favorite({ navigation }) {
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    useEffect(() => {
        const fetchFavoriteEvents = async () => {
            try {
                const favorites = await loadFavorites();
                setFavoriteEvents(favorites.favoriteEvents)
            } catch (error) {
                console.error('Error fetching favorite events:', error);
            }
        };

        fetchFavoriteEvents();
    }, []);
    return (
        <>
            <View style={{ flex: 1 }}>

                {favoriteEvents.length === 0 ? (
                    <Text>No favorite events found.</Text>
                ) : (
                    <FlatList
                        data={favoriteEvents}
                        renderItem={({ item }) => <EventItem event={item} />}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </View>

        </>

    );
};