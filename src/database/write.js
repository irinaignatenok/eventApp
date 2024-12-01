import { addDoc, collection, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from './config';
import { auth } from "./config";


export async function save(data, userId) {
    try {
        // Add userId to the event data
        const eventData = { ...data, userId };

        const dbCollection = collection(db, 'events');
        const docRef = await addDoc(dbCollection, eventData, userId);

        console.log("Document added with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e.message);
        return { success: false, message: e.message };
    }
}

export async function ediEvent(eventId, updatedData) {
    const userId = auth.currentUser.uid;

    // Get the event document from Firestore
    const eventDoc = doc(db, 'events', eventId);
    const eventData = await getDoc(eventDoc);
    if (eventData.exists() && eventData.data().userId === userId) {
        await updateDoc(eventDoc, updatedData);
    } else {
        console.log("You can only edit events you created.");
    }
}

export async function deleteEvent(eventId) {
    try {
        const userId = auth.currentUser.uid;
        const eventDoc = doc(db, 'events', eventId);
        const eventData = await getDoc(eventDoc);

        if (eventData.exists() && eventData.data().userId === userId) {
            await deleteDoc(eventDoc);
            console.log("Event deleted successfully");
        } else {
            console.log("You can only delete events you created.");
        }
    } catch (error) {
        console.error("Error deleting event:", error);
    }
}