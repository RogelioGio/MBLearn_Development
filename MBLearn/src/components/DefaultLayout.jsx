import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from '../views/Navigation';
import { useEffect } from 'react';
import axiosClient from '../axios-client';

export default function DefaultLayout() {
    const { user, token, setUser,} = useStateContext();

    useEffect(() => {
        axiosClient
        .get('/user')
        .then(({data})=>{
            setUser(data)
        }).catch((e)=>{
            console.error(e)
        })
    },[setUser])

    // Function to check if the user is logged in
    if (!token) {
        return <Navigate to="/login" />
    }

    if (!user) {
        return <div>Loading...</div>; // or show a skeleton loader here
    }

    if (!user.role) {
        return <div>Loading...</div>; // Optionally show a loader or skeleton screen
    }

    // if(location.pathname === '/'){
    //     if(role === 'System Admin'){
    //             return <Navigate to='/systemadmin/dashboard' />
    //     }else if(role === 'Course Admin'){
    //             return <Navigate to='/courseadmin/dashboard' />
    //     } else if(role === 'Learner'){
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
