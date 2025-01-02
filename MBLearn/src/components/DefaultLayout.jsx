import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from '../views/Navigation';
import { useEffect } from 'react';
import axiosClient from '../axios-client';

export default function DefaultLayout() {
    const { user, token, role, setUser, setRole } = useStateContext();

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            setUser(data.name);
            setRole(data.role);
        }).catch((error) => {
            console.error('Failed to fetch user:', error.response?.data || error.message);
            setUser(null); // Handle unauthorized state
        });
    }, [setUser]);

    // Function to check if the user is logged in
    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div className='flex flex-row items-center h-screen bg-background'>
            <Navigation />
            <Outlet />
        </div>
    )
}
