import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

//Background Images
import LoginBackground from '../assets/Login_Background.png';
import LoginBackground1 from '../assets/Login_Background1.png';
import LoginBackground2 from '../assets/Login_Background2.png';

//Login Page Layout
export default function GuestLayout() {
    const background = [LoginBackground, LoginBackground1, LoginBackground2];
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setBackgroundIndex((prevIndex) => (prevIndex + 1) % background.length);
                setIsFading(false);
            }, 500);
        }, 10000);
        return () => clearInterval(interval);
    },[])

    const currentBackground = background[backgroundIndex];


    return (
        <div className="w-full h-screen flex items-center justify-center bg-primary">

            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Login</title>
            </Helmet>

            {/* Background Aesthetics */}
            <div className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ${isFading ? "opacity-0":"opacity-100"}`} style={{
            backgroundImage: `url(${currentBackground})`,
            }}>
            </div>

            {/*Login Page Component*/}
            <div className={`relative z-10 w-full h-full flex items-center justify-center`}>
            {/*Login Layout Children*/}
            <Outlet/>
            </div>
        </div>
    )
}
