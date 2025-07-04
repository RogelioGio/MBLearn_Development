import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

//Background Images
import LoginBackground2 from '../assets/Login_Background2.png';

//Login Page Layout
export default function GuestLayout() {
    const {token, role, user, setToken} = useStateContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <div className="w-full h-screen flex items-center justify-center">

            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Login</title>
            </Helmet>

            {/* Background Aesthetics */}
            <div className="absolute w-full h-full bg-white bg-[url('assets/Login_Background2.png')] bg-cover bg-center">
            </div>

            {/*Login Page Component*/}
            <div className={`relative z-10 w-full h-full flex items-center justify-center`}>
            {/*Login Layout Children*/}
            <Outlet/>
            </div>
        </div>
    )
}
