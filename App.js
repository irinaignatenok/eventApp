import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Components/LoginRegistration/HomeScreen/HomeScreen';
import LoginScreen from './src/Components/LoginRegistration/LoginScreen/LoginScreen';
import SignUp from './src/Components/LoginRegistration/SignUp/SignUp';
import { signOut } from 'firebase/auth';
import { auth } from './src/database/config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigator from './src/Components/Screens/TabNavigator/TabNavigator';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Main Home Screen */}
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Login Screen */}
        <Stack.Screen name="Login"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
        {/* Sign-Up Screen */}
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  signOut(auth)
                    .then(() => {
                      console.log('User logged out');
                      navigation.navigate('Login'); // Navigate to Login after logout
                    })
                    .catch((error) => {
                      console.error("Error logging out:", error.message); // Log the error message
                    });
                }}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
