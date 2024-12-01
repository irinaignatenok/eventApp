
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { auth } from '../../../database/config';
import styles from './styles';
import { loadById } from "../../../database/index";

export default function LoginScreen({ navigation }) {
    const [userId, setUserId] = useState(null)
    const [fullname, setUserFullname] = useState(null)
    const [userCredential, setUserCredential] = useState({
        email: "",
        password: "",
        error: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const userData = await loadById(userId);
                    if (userData) {
                        setUserFullname(userData.fullName);
                    } else {
                        console.warn("User document not found in Firestore");
                        setUserCredential(prev => ({
                            ...prev,
                            error: "User data not found in Firestore!"
                        }));
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error.message);
                    setUserCredential(prev => ({
                        ...prev,
                        error: "Failed to fetch user data. Try again later."
                    }));
                }
            }
        };
        fetchUserData();
    }, [userId]);


    async function signIn() {
        if (!userCredential.email || !userCredential.password) {
            setUserCredential({
                ...userCredential,
                error: 'Email and password are mandatory!'
            });
            return;
        }
        try {
            const userCredentialResponse = await signInWithEmailAndPassword(auth, userCredential.email, userCredential.password);
            const user = userCredentialResponse.user;
            setUserId(user.uid);
            console.log("User signed in:", user.email, user.uid);
        } catch (error) {
            console.error("Sign-in error:", error.message);
            setUserCredential({
                ...userCredential,
                error: "Incorrect email or password. Please try again."
            });
        }
    }

    const onRegister = () => {
        navigation.navigate('SignUp')
    }

    useEffect(() => {
        if (fullname) {
            console.log("Full Name:", fullname);
            navigation.navigate('MainTabs', { fullname, userId })
        }
    }, [fullname])
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
            <Text style={styles.text}>Not registered yet? </Text>
            <TouchableOpacity onPress={onRegister}>
                <Text style={styles.link}>Register</Text>
            </TouchableOpacity>

        </View>
    )
}