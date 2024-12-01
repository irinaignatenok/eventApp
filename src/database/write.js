import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from './config';

// export async function save(data) {
//     try {
//         const dbCollection = collection(db, 'events')
//         const docRef = await addDoc(dbCollection, data)
//         return docRef.id
//     } catch (e) {
//         console.error("Error adding document: ", e.message);
//         return { success: false, message: e.message };
//     }
// }

export async function save(data, userId) {
    try {
        // Add userId to the event data
        const eventData = { ...data, userId };

        const dbCollection = collection(db, 'events');
        const docRef = await addDoc(dbCollection, eventData);

        console.log("Document added with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e.message);
        return { success: false, message: e.message };
    }
}