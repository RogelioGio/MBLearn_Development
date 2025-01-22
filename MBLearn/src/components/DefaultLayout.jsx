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
        if (!user && !localStorage.getItem('USER_DATA')) {
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
        } else {
            // If user data is found in state or localStorage, use it
            const storedUser = JSON.parse(localStorage.getItem('USER_DATA'));
            if (storedUser) {
                setUser(storedUser.name);
                setRole(storedUser.role);
            }
        }
    }, [setUser, setRole, user]);

    // Function to check if the user is logged in
    if (!token) {
        return <Navigate to="/login" />
    }

    if (!role) {
        return <div>Loading...</div>; // Optionally show a loader or skeleton screen
    }

    // if(location.pathname === '/'){
    //     if(role === 'system_admin'){
    //             return <Navigate to='/systemadmin/dashboard' />
    //     }else if(role === 'course_admin'){
    //             return <Navigate to='/courseadmin/dashboard' />
    //     } else if(role === 'learner'){
    //             return <Navigate to='/learner/dashboard' />
    //     }
    // }


    return (
        <div className='flex flex-row items-center h-screen bg-background'>
            <Navigation />
            <Outlet />
        </div>
    )
}
