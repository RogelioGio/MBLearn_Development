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
    const backgrounds = [LoginBackground, LoginBackground1, LoginBackground2];
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        //Change the title of the page
        const preloadNextImage = (index) => {
            const img = new Image();
            img.src = backgrounds[index];
        };


        //The slideshow background image
        const changeBackground = () => {
            setFade(false);
            setTimeout(() => {
                const nextIndex = (backgroundIndex + 1) % backgrounds.length;
                setBackgroundIndex(nextIndex);
                setFade(true);

                // Preload the next image
                preloadNextImage(nextIndex);
            }, 500);

        };

        //duration of the slideshow
        const interval = setInterval(changeBackground, 5000);

        // Preload the first image
        preloadNextImage(0);

        return () => clearInterval(interval);
    }, [backgroundIndex]);




    return (
        <div className="w-full h-screen flex items-center justify-center">

            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Login</title>
            </Helmet>

            {/* Background Aesthetics */}
            <div className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${backgrounds[backgroundIndex]})` }}>
            </div>

            {/*Login Page Component*/}
            <div className={`relative z-10 w-full h-full flex items-center justify-center`}>
            {/*Login Layout Children*/}
            <Outlet/>
            </div>
        </div>
    )
}
