import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from '../views/Navigation';
import { useEffect } from 'react';
import axiosClient from '../axios-client';

export default function DefaultLayout() {
    const { user, token, role, setUser, setRole } = useStateContext();

    useEffect(() => {
        // Check if user is already stored in state or localStorage
        const fetchUserData = () =>{
            axiosClient.get('/user')
                .then(({ data }) => {
                    setUser(data.name);
                    setRole(data.role);
                    // Store user data in localStorage for future reference
                    localStorage.setItem('USER_DATA', JSON.stringify({ name: data.name, role: data.role }));
                })
                .catch((error) => {
                    console.error('Failed to fetch user:', error.response?.data || error.message);
                    setUser(null); // Handle unauthorized state
                });
        }
          // If user data is found in state or localStorage, use it


        const storedUser = localStorage.getItem('USER_DATA');
        if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        // Check if the stored user matches the current state
        if (parsedUser.name !== user) {
            // Clear stale data and fetch fresh user data
            localStorage.removeItem('USER_DATA');
            fetchUserData();
        } else {
            // Use stored data if it matches
            setUser(parsedUser.name);
            setRole(parsedUser.role);
        }

        } else {
        // Fetch data if no user is stored
        fetchUserData();
        }

    }, [setUser, setRole, user]);

    // Function to check if the user is logged in
    if (!token) {
        return <Navigate to="/login" />
    }

    if (!role) {
        return <div>Loading...</div>; // Optionally show a loader or skeleton screen
    }

    if(location.pathname === '/'){
        if(role === 'System Admin'){
                return <Navigate to='/systemadmin/dashboard' />
        }else if(role === 'Course Admin'){
                return <Navigate to='/courseadmin/dashboard' />
        } else if(role === 'Learner'){
                return <Navigate to='/learner/dashboard' />
        }
    }


    return (
        <div className='flex flex-row items-center h-screen bg-background'>
            <Navigation />
            <Outlet />
        </div>
    )
}
