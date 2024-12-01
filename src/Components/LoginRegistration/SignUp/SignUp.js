import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth, db } from '../../../database/config'; // Import Firestore DB config
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore methods
import React, { useState } from 'react';
import styles from './styles';

export default function SignUp({ navigation }) {
    const [userCredential, setUserCredential] = useState({
        email: "",
        password: "",
        fullName: "",
        error: "",
    });

    const [loading, setLoading] = useState(false); // State to track loading
    const [buttonDisabled, setButtonDisabled] = useState(false); // To disable the button during sign-up

    const handleInputChange = (field, value) => {
        setUserCredential({ ...userCredential, [field]: value });
    };

    const checkUserExists = async (email) => {
        try {
            const methods = await fetchSignInMethodsForEmail(auth, email);
            return methods.length > 0; // Return true if the user exists
        } catch (error) {
            console.error("Error checking user existence:", error);
            return false;
        }
    };

    const saveUserData = async (user) => {
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                fullName: userCredential.fullName,
                email: userCredential.email,
                userId: user.uid,
                createdAt: new Date(),
            });
            console.log("User data saved to Firestore!");
        } catch (error) {
            console.error("Error saving user data to Firestore:", error);
        }
    };

    const signUp = async () => {
        const { email, password, fullName } = userCredential;

        // Basic validation
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

        // Password validation (length check)
        if (password.length < 6) {
            setUserCredential({
                ...userCredential,
                error: "Password must be at least 6 characters."
            });
            return;
        }

        // Set loading state to true
        setLoading(true);
        setButtonDisabled(true);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User ID:", res.user.uid);
            console.log("User created:", res.user.email);
            console.log("User object:", res.user);
            await saveUserData(res.user);

            // Clear the form fields after successful sign-up
            setUserCredential({
                email: "",
                password: "",
                fullName: "",
                error: "",
            });

            // Navigate to the MainTabs screen and pass the fullName
            navigation.navigate('MainTabs', { fullName, userId: res.user.uid });

        } catch (error) {
            console.error("Error during sign-up:", error.message);
            if (error.code === 'auth/email-already-in-use') {
                setUserCredential({
                    ...userCredential,
                    error: "A user with this email already exists."
                });
            } else {
                setUserCredential({
                    ...userCredential,
                    error: "Failed to create account. Please try again.",
                });
            }
        } finally {
            // Reset loading state after the sign-up process
            setLoading(false);
            setButtonDisabled(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Sign Up</Text>

            <TextInput
                style={styles.inputText}
                placeholder="Enter email"
                value={userCredential.email}
                onChangeText={(text) => handleInputChange("email", text)}
            />

            <TextInput
                style={styles.inputText}
                placeholder="Enter password"
                value={userCredential.password}
                secureTextEntry
                onChangeText={(text) => handleInputChange("password", text)}
            />

            <TextInput
                style={styles.inputText}
                placeholder="Enter Full Name"
                value={userCredential.fullName}
                onChangeText={(text) => handleInputChange("fullName", text)}
            />

            {userCredential.error && (
                <Text style={styles.textError}>{userCredential.error}</Text>
            )}

            <TouchableOpacity
                style={[styles.buttonStyle, buttonDisabled ? styles.buttonDisabled : {}]}
                onPress={signUp}
                disabled={buttonDisabled}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" /> // Show loading spinner
                ) : (
                    <Text style={styles.textStyle}>Sign Up</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
