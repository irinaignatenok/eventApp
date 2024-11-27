import { View, Text, Pressable, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import * as database from '../../../../database';
import styles from '../../AddEvent/styles';

export default function EventItem(event) {

    console.log("Item ", event)
    const [showModal, setShowModal] = useState(false);

    const [favorite, setFavorite] = useState(false);

    return (
        <View>
            {/* <Pressable>
                <View>
                    <Text style={styles.title}>{event.eventName}</Text>
                    <Text style={styles.title}>{event.date}</Text>
                </View>
            </Pressable> */}

            <View style={{ padding: 10 }}>
                <Text>{event.eventName}</Text>
                <Text>{event.date}</Text>
                <Text>{event.location}</Text>
                <Text>{event.organizer}</Text>
                <Text>{event.description}</Text>
            </View>

        </View>
    )
}