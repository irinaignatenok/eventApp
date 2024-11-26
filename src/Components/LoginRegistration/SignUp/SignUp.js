import { View, Text, Pressable, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { auth } from '../../../database/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import React, { useState } from "react";

export default function SignUp({ navigation }) {
    const [userCredential, setUserCredential] = useState({
        email: "",
        password: "",
        fullName: "",
        error: "",
    });

    const handleInputChange = (field, value) => {
        setUserCredential({ ...userCredential, [field]: value });
    };

    const checkUserExists = async (email) => {
        try {
            // Check if the email is already associated with an account
            const methods = await fetchSignInMethodsForEmail(auth, email);
            // If the array is empty, the user doesn't exist
            return methods.length > 0;
        } catch (error) {
            console.error("Error checking user existence:", error);
            return false;
        }
    };

    const signUp = async () => {
        const { email, password, fullName } = userCredential;

        if (!email || !password || !fullName) {
            setUserCredential({
                ...userCredential,
                error: "All fields are mandatory!"
            });
            return;
        }

        // Check if the user already exists
        const userExists = await checkUserExists(email);
        if (userExists) {
            setUserCredential({
                ...userCredential,
                error: "A user with this email already exists."
            });
            return;
        }

        // Proceed with sign up if the email is not already taken
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created:", res.user.email);
            // Clear the form fields after successful sign-up
            setUserCredential({
                email: "",
                password: "",
                fullName: "",
                error: "",
            });
            // Navigate to another screen
            navigation.navigate('EventsPage');
        } catch (error) {
            console.error("Error during sign-up:", error.message);

            // Check for specific error codes
            if (error.code === 'auth/email-already-in-use') {
                setUserCredential({
                    ...userCredential,
                    error: "A user with this email already exists."
                });
            } else {
                // Generic error message for other errors
                setUserCredential({
                    ...userCredential,
                    error: "Failed to create account. Try again.",
                });
            }
        }
    }


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputText}
                placeholder="Enter email"
                value={userCredential.email}
                onChangeText={(text) => handleInputChange("email", text)} />

            <TextInput
                style={styles.inputText}
                placeholder="Enter password"
                value={userCredential.password}
                secureTextEntry
                onChangeText={(text) => handleInputChange("password", text)} />
            <TextInput
                style={styles.inputText}
                placeholder="Enter FullName"
                value={userCredential.fullName}
                onChangeText={(text) => handleInputChange("fullName", text)} />
            {userCredential.error ? (
                <Text style={styles.textError}>{userCredential.error}</Text>
            ) : null}

            <TouchableOpacity style={styles.buttonStyle} onPress={signUp}>
                <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>

        </View>
    )

}