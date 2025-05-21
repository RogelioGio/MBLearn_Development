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
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';

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

    // Formik
    const formik = useFormik({

    })

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

    if(true){
        return(
        <div className='h-screen w-screen flex flex-col justify-center items-center bg-background gap-3'>
            <div className='flex flex-col w-[50vw] bg-white rounded-lg shadow-lg p-5'>
                {/* Headder */}
                <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row gap-4 col-span-2">
                    <div>
                        <h1 className="text-primary font-header text-3xl">Set Password</h1>
                        <p className="text-unactive font-text text-xs">Replace their auto-generated initial password with a secure, personalized password during first-time login for enhanced account security.</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-fit bg-primarybg p-5 rounded-full flex items-center justify-center">
                            <div className="h-full w-fit aspect-square flex items-center justify-center">
                                <FontAwesomeIcon icon={faClock} className="text-primary text-lg"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Password */}
                <form className='py-2 px-5 w-full'>
                    <div className="inline-flex flex-col w-full">
                        <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                            <p className="font-text text-unactive">New Password:</p>
                        </label>
                        <input type="text" name="course_name"
                            // value={formik2.values.course_name}
                            // onChange={formik2.handleChange}
                            // onBlur={formik2.handleBlur}
                            // disabled = {fetchedCourse?.CourseName}
                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                            {/* {formik2.touched.course_name && formik2.errors.course_name ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_name}</div>):null} */}
                    </div>
                    {/* Password Criteria */}
                    <div>
                        <p>Password Criteria:</p>
                        <ul>
                            <li>At least 8 characters</li>
                            <li>At least one uppercase letter</li>
                            <li>At least one lowercase letter</li>
                            <li>At least one number</li>
                            <li>At least one special character</li>
                        </ul>
                    </div>
                    <div className="inline-flex flex-col w-full">
                        <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                            <p className="font-text text-unactive">Confirm Password:</p>
                        </label>
                        <input type="text" name="course_name"
                            // value={formik2.values.course_name}
                            // onChange={formik2.handleChange}
                            // onBlur={formik2.handleBlur}
                            // disabled = {fetchedCourse?.CourseName}
                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                            {/* {formik2.touched.course_name && formik2.errors.course_name ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_name}</div>):null} */}
                    </div>
                    <div>
                        submit
                    </div>
                </form>
            </div>
        </div>
        )
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
