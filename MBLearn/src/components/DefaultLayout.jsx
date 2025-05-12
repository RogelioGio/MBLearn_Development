import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Navigation from '../views/Navigation';
import { useEffect } from 'react';
import axiosClient from '../axios-client';
import { use } from 'react';
import LogoutWarningmModal from '../modalsandprops/LogoutWarningModal';
import { SelectedUserProvider } from '../contexts/selecteduserContext';
import { OptionProvider } from '../contexts/AddUserOptionProvider';

export default function DefaultLayout() {
    const {token, role, setRole, setUser, setProfile} = useStateContext();
    const [ loading, setLoading ] = useState(true)
    const [ warning, setWarning ] = useState(false)
    const navigate = useNavigate();

    //User Activity handling
    const logout = () => {
        console.log('Session ended, user is inactive');


        setTimeout(() => {
            navigate('/login');
        },300)
    };

    const update = () => {
        if(token){
            localStorage.setItem('LAST_ACTIVITY', Date.now());
        }
    };

    // useEffect(() => {
    //     if(!token) return;
    //     if(loading) return;

    //     const inactivityTime = 5*60*60*1000;
    //     let timeout;

    //     //Check userEvents
    //     const checkInactivity = () => {
    //         const lastActivity = localStorage.getItem('LAST_ACTIVITY');
    //         if(lastActivity && Date.now() - lastActivity > inactivityTime){
    //             setWarning(true)
    //         } else {
    //             timeout = setTimeout(()=> {checkInactivity()}, 30*60*1000);
    //         }
    //     }

    //     //Event Listeners
    //     const events = ['mousemove', 'click', 'scroll', 'keypress'];
    //     events.forEach(event => window.addEventListener(event, update));

    //     const handleBeforeUnload = () => {
    //         localStorage.setItem('SESSION_CLOSED_AT', Date.now());
    //     };
    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     //Actvity checks
    //     timeout = setTimeout(checkInactivity, 30*60*1000);

    //     return () => {
    //         clearTimeout(timeout);
    //         events.forEach(event => window.removeEventListener(event, update));
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     }
    // },[token,loading])

    //checking the tab inactivity while closed
    // useEffect(() => {
    //     if(!token) return;

    //     const closedSession = localStorage.getItem('SESSION_CLOSED_AT');
    //     const maxClosedTime = 30*60*1000; //30 minutes

    //     if(closedSession && Date.now() - closedSession > maxClosedTime){
    //         logout();
    //     }
    // },[token])

    //countdown to logout after closing the modal

    //fetching the logged in user
    useEffect(() => {
        axiosClient
        .get('/user')
        .then(({data})=>{
            setUser(data)
            setLoading(false)

        }).catch((e)=>{
            setLoading(false)
            navigate('/login')
            localStorage.removeItem('ACCESS_TOKEN');
        })
    },[])

    //WarningModal
    const close = () => {
        setWarning(false);
        setTimeout(logout(), 1000)
    }

    // Function to check if the user is logged in
    if(!token){
        return <Navigate to="/login" replace/>
    }

    if(loading){
        if(!token){
            return <Navigate to="/login" replace/>
        }
        return (
            <div className='h-screen w-screen flex flex-col justify-center items-center bg-background gap-3'>
                <h1 className='font-header text-5xl text-primary'>"Loading your learning journey..."</h1>
                <p className='font-text'>Empowering you with the knowledge to achieve your goals</p>
            </div>

        )
    }


    return (
        <div className='flex flex-row items-center h-screen bg-background overflow-hidden'>
            <Navigation />
            <SelectedUserProvider>
                <OptionProvider>
                    <Outlet />
                </OptionProvider>
            </SelectedUserProvider>
            {/* Logout warning */}
            <LogoutWarningmModal open={warning} close={close}/>
        </div>
    )

}
