import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct AsyncStorage import
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJscgVUFNmpnpdZ8U_ihvuPhN_MFB8Q3Y",
    authDomain: "event-organizer-app-4aa29.firebaseapp.com",
    projectId: "event-organizer-app-4aa29",
    storageBucket: "event-organizer-app-4aa29.firebasestorage.app",
    messagingSenderId: "1097852415350",
    appId: "1:1097852415350:web:300dee070fb192f53cde57"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
