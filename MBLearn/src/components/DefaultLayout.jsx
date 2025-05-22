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


//Props for password checker
const PasswordRule = ({passed, children}) => (
    <li className={`flex flex-row gap-4 items-center font-text text-sm ${passed ? 'text-primary' : 'text-unactive'}`}>
        <FontAwesomeIcon icon={passed ? faSquareCheck : faSquareXmark}/>
        {children}
    </li>
)


export default function DefaultLayout() {
    const {token, role, setRole, setUser, setProfile} = useStateContext();
    const [ loading, setLoading ] = useState(true)
    const [ warning, setWarning ] = useState(false)
    const navigate = useNavigate();

    //pasword criteria checker
    const [criteria, setCriteria] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false,
    })
    const checkPasswordCriteria = (password) => {
        return {
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        }
    }
    const handlePasswordChange = (e) => {
        formik.handleChange(e);
        const password = e.target.value;
        setCriteria(checkPasswordCriteria(password));
    }
    //password handler
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);





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
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('New Password is required')
                .min(8, 'the password must be at least 8 characters long')
                .matches(/[A-Z]/, "the password must contain at least one uppercase letter")
                .matches(/[a-z]/ , 'the password must contain at least one lowercase letter')
                .matches(/\d/, 'the password must contain at least one number')
                .matches(/[!@#$%^&*(),.?":{}|<>]/ , 'the password must contain at least one special character'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        onSubmit: (values) => {
            console.log('Form submitted:', values);
            // Handle form submission here
            // You can send the password to your backend for processing
        },
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

    if(false){
        return(
        <div className='h-screen w-screen flex flex-col justify-center items-center bg-background gap-3'>
            <div className='flex flex-col w-[40vw] bg-white rounded-lg shadow-lg p-5'>
                {/* Headder */}
                <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row gap-4 col-span-2">
                    <div>
                        <h1 className="text-primary font-header text-3xl">Set Password</h1>
                        <p className="text-unactive font-text text-xs">Replace your auto-generated initial password with a secure, personalized password during first-time login for enhanced account security.</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-fit bg-primarybg p-5 rounded-full flex items-center justify-center">
                            <div className="h-full w-fit aspect-square flex items-center justify-center">
                                <FontAwesomeIcon icon={faKey} className="text-primary text-lg"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Password */}
                <form className='py-2 px-5 w-full' onSubmit={formik.handleSubmit}>
                    <div className="inline-flex flex-col w-full">
                        <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                            <p className="font-text text-unactive">New Password:</p>
                        </label>
                        <div className="flex flex-row font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                        <input type={showPassword ? "password" : "text"} name="password"
                            value={formik.values.password}
                            onChange={handlePasswordChange}
                            onBlur={formik.handleBlur}
                            className='focus:outline-none w-full'
                            />
                        <span className="flex items-center justify-center">
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-unactive text-lg cursor-pointer " onClick={() => setShowPassword(!showPassword)}/>
                        </span>
                        </div>
                            {formik.touched.password && formik.errors.password ? (<div className="text-red-500 text-xs font-text">{formik.errors.password}</div>):null}
                    </div>
                    {/* Password Criteria */}
                    <div className='py-2 space-y-1'>
                        <p className='font-text text-xs text-unactive'>Password Criteria:</p>
                        <ul className='space-y-1'>
                            <PasswordRule passed={criteria.length}>At least 8 characters</PasswordRule>
                            <PasswordRule passed={criteria.upper}>At least one uppercase letter</PasswordRule>
                            <PasswordRule passed={criteria.lower}>At least one lowercase letter</PasswordRule>
                            <PasswordRule passed={criteria.number}>At least one number</PasswordRule>
                            <PasswordRule passed={criteria.special}>At least one special character</PasswordRule>
                        </ul>
                    </div>
                    <div className="inline-flex flex-col w-full">
                        <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                            <p className="font-text text-unactive">Confirm Password:</p>
                        </label>
                        <div className="flex flex-row font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                        <input type={showConfirmPassword ? "password" : "text"} name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='focus:outline-none w-full'/>
                        <span className="flex items-center justify-center">
                            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="text-unactive text-lg cursor-pointer " onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
                        </span>
                        </div>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div className="text-red-500 text-xs font-text">{formik.errors.confirmPassword}</div>):null}
                    </div>
                    <div className="py-2">
                        <input type="submit"
                                value="Update Password"
                                className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover transition-all ease-in-out w-full`}/>
                    </div>
                </form>
            </div>
        </div>
        )
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
