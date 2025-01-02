import React, { useEffect } from 'react';
import Navigation from './Navigation';
import { useStateContext } from '../contexts/ContextProvider';


export default function LearnerDashboard() {

    const { user, setUser } = useStateContext();
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            setUser(data)
        });
    }, []);

    return (
        <div className="flex flex-row items-center h-screen ">
            <Navigation/>
            <div className="flex flex-col flex-start h-full">
                <h1 className="p-3 m-3 text-primary text-4xl font-header">Good Day! {user.name}</h1>
            </div>
        </div>
    );
}
