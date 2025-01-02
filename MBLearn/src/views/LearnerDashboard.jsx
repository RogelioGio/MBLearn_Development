import React from 'react';
import Navigation from './Navigation';

export default function LearnerDashboard() {
    return (
        <div className="flex flex-row items-center h-screen ">
            <Navigation/>
            <div className="flex flex-col flex-start h-full">
                <h1 className="p-3 m-3 text-primary text-4xl font-header">Good Day! {user}</h1>
            </div>
        </div>
    );
}
