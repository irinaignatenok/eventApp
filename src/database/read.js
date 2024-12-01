import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from './config';

export async function load() {
    const querySnapshot = await getDocs(collection(db, 'events'));
    return processQuerySnapshot(querySnapshot);
}

function processQuerySnapshot(querySnapshot) {
    const data = [];
    querySnapshot.forEach(doc => {
        data.push({
            ...doc.data(),
            id: doc.id
        })
    });
    return data
}

export async function loadById(userId) {
    try {
        const docRef = doc(db, "users", userId); // Replace 'users' with your collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.warn("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
    }
}


export async function loadFavorites() {
    try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Return both all events and filtered favorite events
        const favoriteEvents = eventsList.filter(event => event.isFavorite === true);

        return { allEvents: eventsList, favoriteEvents };
    } catch (error) {
        console.error('Error loading events:', error);
        throw error;
    }
}