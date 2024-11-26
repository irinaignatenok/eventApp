import { View, Text, Pressable } from 'react-native';
import styles from './styles';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Go Event</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    );
};
