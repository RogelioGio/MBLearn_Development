import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import echo from "MBLearn/echo";



export default function Test_Notfications() {
    const [done, setdone] = useState('');

    useEffect(() => {
        console.log('Echo instance:', echo);
        echo.channel('notification')
        .listen('.notification-event', (e) => {
            alert('New notification: ' + "Working");
        });
    }, []);

    const testNotifications = () => {
        axiosClient.post('/test')
        .then((response) => {
            console.log("Response:", response);
        })

    }

    return (
         <div>
            <button
                onClick={testNotifications}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
                Test
            </button>
            <p>Status: {done || 'Waiting for event...'}</p>
        </div>
    );
}
