import { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import * as database from '../../../database/index';
import EventItem from './EventItem/EventItem';

export default function EventsPage({ navigation, events, onEventsLoaded, isLoading }) {

    useEffect(() => {
        console.log("Events in EventsPage:", events);  // Log the events prop
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

    const renderItem = ({ item }) => (
        <Pressable onPress={() => handleEventPress(item)}>
            <EventItem event={item} />
        </Pressable>
    );


    const renderSeparator = () => <View style={{ height: 1, backgroundColor: '#ccc' }} />;

    return (
        <View style={{ flex: 1 }}>
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
