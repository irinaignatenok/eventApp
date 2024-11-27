
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { auth } from '../../../database/config';
import styles from './styles';

export default function LoginScreen({ navigation }) {
    const [userCredential, setUserCredential] = useState({
        email: "",
        password: "",
        error: ""
    });

    async function signIn() {
        if (userCredential.email === "" || userCredential.password === "") {
            setUserCredential({
                ...userCredential,
                error: 'Email and password are mandory!'
            });
            return;
        }
        try {
            const userCredentialResponse = await signInWithEmailAndPassword(auth, userCredential.email, userCredential.password)
            const user = userCredentialResponse.user;
            navigation.navigate('MainTabs')
            console.log(user.email);
        } catch (error) {
            setUserCredential({
                ...userCredential,
                error: "Username or password incorrect!"
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Login</Text>
            <TextInput
                style={styles.inputText}
                placeholder="Enter Email"
                value={userCredential.email}
                onChangeText={(text) => setUserCredential({ ...userCredential, email: text })}
            />
            <TextInput
                style={styles.inputText}
                placeholder="Enter Password"
                value={userCredential.password}
                secureTextEntry
                onChangeText={(text) => setUserCredential({ ...userCredential, password: text })}
            />


            {userCredential.error ? (
                <View>
                    <Text style={styles.textError}>{userCredential.error}</Text>
                </View>
            ) : null}
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={signIn}
            >
                <Text style={styles.textStyle}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}