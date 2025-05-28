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
import { faClock, faEye, faEyeSlash, faKey, faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import echo from 'MBLearn/echo';
import { toast } from 'sonner';




export default function DefaultLayout() {
    const {token, role, setRole, setUser, setProfile, user} = useStateContext();
    const [ loading, setLoading ] = useState(true)
    const [ warning, setWarning ] = useState(false)
    const navigate = useNavigate();


    //Laravel ECHO
    useEffect(() => {
        if(!token) return;
        if(role ==='SME') {
            console.log('SME role detected, not subscribing to events');
            navigate('/dashboard');
            return;
        }
        //User Management Events (System Admin)
        // echo.channel('Users')
        // .listen('.User-added', (e) => {
        //     console.log(e);
        //     toast("Add User Succesfully",{
        //         description: `${e.AddedBy} has added ${e.UsersAdded} of users in the system`,
        //         dismissible: true,
        //         duration: 3000
        //     })
        // })
        // .listen("User-Archived", (e) => {
        //     console.log(e);
        //     toast("Archived User Successfully",{
        //         description: `${e.systemadmin} has archived ${e.affected}`
        //     })
        // })
        // .listen('.UserRole', (e) => {
        //     console.log(e);
        //     toast("User Role Changed",{
        //         description: `${e.affected} has been changed into ${e.role} role and permission`,
        //         dismissible: true,
        //         duration: 5000
        //     })
        // })
        // listen('.UserPermission', (e) => {
        //     console.log(e);
        //     toast("User Permission Changed",{
        //         description: `user ${e.affected} 's permissions was updated`,
        //         dismissible: true,
        //         duration: 5000
        //     })
        // })
        // return () => {
        //     echo.leave('')
        // }




    }, []);

    //User Activity handling
    const logout = () => {
        console.log('Session ended, user is inactive');


        setTimeout(() => {
            navigate('/login');
        },300)
    };

    // const update = () => {
    //     if(token){
    //         localStorage.setItem('LAST_ACTIVITY', Date.now());
    //     }
    // };



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
        //console.log('Fetching user data...:', token);
        axiosClient
        .get('/user')
        .then(({data})=>{
            setUser(data)
            setLoading(false)
        }).catch((e)=>{
            setLoading(false)
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
