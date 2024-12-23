import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';

//Login Page Layout
export default function GuestLayout() {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [fade, setFade] = useState(false);

    //background array
    const backgrounds = ["bg-[url('./assets/Login_Background.png')]", "bg-[url('./assets/Login_Background1.png')]", "bg-[url('./assets/Login_Background2.png')]"]

    useEffect(() => {
        //Change the title of the page
        document.title = "MBLearn | Login";

        //The slideshow background image
        const changebackground = () => {
            setFade(false);
            setTimeout(() => {
                setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
                setFade(true); //fade-in
            }, 500);

        };

        //duration of the slideshow
        const interval = setInterval(changebackground, 20000);
        return () => clearInterval(interval);

    }, [backgrounds.length]);



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
