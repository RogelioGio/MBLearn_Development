import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from '../views/Navigation';
import { useEffect } from 'react';
import axiosClient from '../axios-client';
import { use } from 'react';

export default function DefaultLayout() {
    const {token, role, setRole, setUser, setProfile} = useStateContext();
    const [ loading, setLoading ] = useState(true)
    useEffect(() => {
        axiosClient
        .get('/user')
        .then(({data})=>{
            setUser(data)
            setRole(data.role)

            axiosClient.get(`/select-employeeid/${data.employeeID}`).then(({data}) => {
                setProfile(data.data.profile_image);
                setLoading(false)
            }).catch((e) => {
                console.error(e);
            });
        }).catch((e)=>{
            console.error(e)
        })
    },[setUser, setRole])

    // Function to check if the user is logged in
    if (!token) {
        return <Navigate to="/login" />
    }

    if(loading){
        return (
            <div className='h-screen w-screen flex flex-col justify-center items-center bg-background gap-3'>
                <h1 className='font-header text-5xl text-primary'>"Loading your learning journey..."</h1>
                <p className='font-text'>Empowering you with the knowledge to achieve your goals</p>
            </div>
        )
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
