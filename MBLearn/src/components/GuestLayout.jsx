import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';

//Background Images
import LoginBackground from '../assets/Login_Background.png';
import LoginBackground1 from '../assets/Login_Background1.png';
import LoginBackground2 from '../assets/Login_Background2.png';

const backgrounds = [LoginBackground, LoginBackground1, LoginBackground2];

//Login Page Layout
export default function GuestLayout() {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        //Change the title of the page
        document.title = "MBLearn | Login";

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
        const interval = setInterval(changeBackground, 20000);

        // Preload the first image
        preloadNextImage(0);

        return () => clearInterval(interval);
    }, [backgroundIndex]);



    //Check if the user is logged in
    // const {token} = useStateContext();
    // if(token){
    //     return <Navigate to="/"/>
    // }

    return (
        <div className="w-full h-screen flex items-center justify-center">

            {/* Background Aesthetics */}
            <div className={`absolute w-full h-full bg-cover bg-center ${backgrounds[backgroundIndex]} transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            </div>

            {/*Login Page Component*/}
            <div className={`relative z-10 w-full h-full flex items-center justify-center`}>
            {/*Login Layout Children*/}
            <Outlet/>
            </div>
        </div>





    )
}
