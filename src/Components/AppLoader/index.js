import React, { useEffect, useState } from 'react';
import * as database from '../../database/index'



export default function AppLoader({ onEventsLoaded }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await database.load();
                console.log("Loaded data:", data)
                if (data.length === 0) {
                    console.log('There is no data');
                } else {
                    onEventsLoaded(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log("Error loading data ", error);
                setIsLoading(false);
            }
            // finally {
            //     setIsLoading(false);
            // }
        };
        loadData();
    }, []);

    return null
}