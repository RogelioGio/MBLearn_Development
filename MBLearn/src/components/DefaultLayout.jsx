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
import { ScrollArea } from './ui/scroll-area';




export default function DefaultLayout() {

    const {token, role, setRole, setUser, setProfile, user, setToken} = useStateContext();
    const [ loading, setLoading ] = useState(true)
    const [ warning, setWarning ] = useState()
    const [unreadNotifications, setUnreadNotifications] = useState(false);
    const [breakpoint, setBreakpoint] = useState();
    const navigate = useNavigate();

    //viewport detection for responsive design
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
     useEffect(() => {
        const handleResize = () => {
        setViewport({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
     }, []);

    useEffect(() => {
    const { width } = viewport;

    if (width < 640) {
        setBreakpoint('base');
    } else if (width >= 640 && width < 768) {
        setBreakpoint('sm');
    } else if (width >= 768 && width < 1024) {
        setBreakpoint('md');
    } else if (width >= 1024 && width < 1280) {
        setBreakpoint('lg');
    } else if (width >= 1280 && width < 1536) {
        setBreakpoint('xl');
    } else {
        setBreakpoint('2xl');
    }

    //console.log(`Viewport: ${width}px — Tailwind Breakpoint: ${breakpoint}`);
}, [viewport]);

    //Laravel ECHO
    useEffect(() => {
        if(!token) return;
        if(role ==='SME') {
            navigate('/dashboard');
            return;
        }
        if(user){
            // handleNotifiction();

            echo.private(`App.Models.UserCredentials.${user.id}`)
            .notification((notification) => {
                // handleNotifiction();
                toast(notification.title,{
                    description: notification.body,
                })
                setUnreadNotifications(true);
            });

            // echo.private(`notifications.${user.id}`)
            // .listen('.notifications-read-all', (e) => {
            //     console.log('Event received:', e);
            //     //setUnreadNotifications(false);
            // })

            // return () => {
            //     echo.private(`notifications.${user.id}`).stopListening('notifications-read-all');
            // };
            echo.private(`notifications.${user.id}`)
            .listen('.notifications-read-all', (e) => {
                console.log("📥 Received event:", e);
            })
            .subscribed(() => {
                console.log('✅ Subscribed to private-notifications.' + user.id);
            });
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
                //console.log('Has unread notifications:', data);
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
                <h1 className='font-header text-3xl xl:text-5xl text-primary'>"Loading your learning journey..."</h1>
                <p className='font-text text-xs xl:text-base'>Empowering you with the knowledge to achieve your goals</p>
            </div>
        )
    }

    return (
            <>
                {
                    breakpoint === 'xl' ? (
                        <div className='flex flex-row items-center h-screen bg-background overflow-hidden'>
                            <Navigation unread_notfications={unreadNotifications}/>
                            <SelectedUserProvider>
                                <OptionProvider>
                                    <Outlet />
                                </OptionProvider>
                            </SelectedUserProvider>
                            {/* Logout warning */}
                            <LogoutWarningmModal open={warning} close={close}/>
                        </div>
                    ) : (
                        <div className='flex flex-row items-center h-screen bg-background overflow-hidden'>
                            <Navigation unread_notfications={unreadNotifications}/>
                            <ScrollArea>
                                <div className='h-screen'>
                                    <SelectedUserProvider>
                                        <OptionProvider>
                                            <Outlet />
                                        </OptionProvider>
                                    </SelectedUserProvider>
                                </div>
                            </ScrollArea>
                        </div>
                    )

                }
            </>
    )

}
