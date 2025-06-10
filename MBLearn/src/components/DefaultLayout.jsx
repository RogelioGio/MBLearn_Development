import React, { useRef, useState } from 'react'
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
import { set } from 'date-fns';




export default function DefaultLayout() {

    const {token, role, setRole, setUser, setProfile, user, setToken} = useStateContext();
    const [ loading, setLoading ] = useState(true)
    const [ warning, setWarning ] = useState()
    const [unreadNotifications, setUnreadNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();


    //Laravel ECHO
    useEffect(() => {
        if(!token) return;
        if(role ==='SME') {
            navigate('/dashboard');
            return;
        }
        if(user){
            handleNotifiction();

            echo.private(`App.Models.UserCredentials.${user.id}`)
            .notification((notification) => {
                handleNotifiction();
                toast(notification.title,{
                    description: notification.body,
                })
                setUnreadNotifications(true);
            });
            // axiosClient.get('/index-notifications')
            // .then(({data})=>{
            //     //console.log('Notifications fetched:', data);
            //     setNotifications(data.notifications);
            // }).catch((error) => {
            //     console.error('Error fetching notifications:', error);
            // })
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

    }, [user]);

    const handleNotifiction = () => {
        if(!token) return;
        axiosClient.get('/index-notifications')
        .then(({data})=>{
            //console.log('Notifications fetched:', data);
            setNotifications(data.notifications);
        }).catch((error) => {
            console.error('Error fetching notifications:', error);
        })
    }

    //User Activity handling
    const logout = () => {
        setToken(null);
        navigate('/login');
    };

    const InactivityTimer = useRef(null);
    const IsInactive = useRef(false);
    useEffect(()=>{
        const handleActivity = () => {
            if(IsInactive.current){
                console.log('User is active again');
                IsInactive.current = false;
                setWarning(false)
                localStorage.setItem('LOGOUT_WARNING', 'false')
            }

            clearTimeout(InactivityTimer.current);

            InactivityTimer.current = setTimeout(() => {
                console.log('User is inactive');
                IsInactive.current = true;
                localStorage.setItem('LOGOUT_WARNING', 'true');
                setWarning(true)
            },1000*60*15)

        };

        const handleBeforeUnload = () => {
            localStorage.setItem('SESSION_CLOSED_AT', Date.now().toString());
        }

        const storedWarning = localStorage.getItem('LOGOUT_WARNING') === 'true'
        IsInactive.current = storedWarning;
        setWarning(storedWarning);


        const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });
        window.addEventListener('beforeunload',handleBeforeUnload);


        if(!storedWarning){
            handleActivity();
        }

        handleActivity();

        return () => {
            clearTimeout(InactivityTimer.current);
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    },[])
    useEffect(()=>{
        if(!token) return

        const SESSION_TIMEOUT = 5 * 60 * 60 * 1000;
        const closedAt = localStorage.getItem('SESSION_CLOSED_AT');

        if(closedAt){
            //console.log(parseInt(closedAt, 10))
            const closedTime = parseInt(closedAt, 10);
            const now = Date.now();

            if(now - closedTime > SESSION_TIMEOUT) {
                //console.log('Session expired due to tab being closed too long');
                setToken(null);
                navigate('/login');
                localStorage.removeItem('SESSION_CLOSED_AT');
            } else {
                //console.log('Tab reopened in time, session still valid');
                localStorage.removeItem('SESSION_CLOSED_AT');
            }
        }
    },[token])

    //fetching the logged in user
    useEffect(() => {
        if(!token){
            navigate('/login')
        }
        axiosClient
        .get('/user')
        .then(({data})=>{
            setUser(data)

            axiosClient.get('has-unread-notifications')
            .then(({data})=>{
                console.log('Has unread notifications:', data);
                setUnreadNotifications(data.has_unread);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error checking notifications:', error);
            })



        }).catch((e)=>{
            setLoading(false)
        })
    },[])

    //WarningModal
    const close = () => {
        setWarning(false);
        setTimeout(logout(), 1000)
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
            <Navigation unread_notfications={unreadNotifications} notifications={notifications}/>
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
