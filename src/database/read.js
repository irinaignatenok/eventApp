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

export async function loadById(id) {
    const docRef = doc(db, 'events', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null
    }
}