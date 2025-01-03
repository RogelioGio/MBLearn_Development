import React from 'react'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import Full_Logo from '../assets/Full_Logo.svg'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import {InfinitySpin} from 'react-loader-spinner'



export default function Login() {

    //Credentials references
    const Email = useRef();
    const Password = useRef();

    const {setUser, setToken} = useStateContext();

    //loading state
    const [isLoading, setIsLoading] = useState(false);

    //Login Authentication
    const Login = (ev) =>{
        ev.preventDefault();
        setIsLoading(true);

        //credentials payload
        const payload ={
            email: Email.current.value,
            password: Password.current.value
        }

        console.log(payload);

        //API call
        axiosClient.post('/login', payload).then(({data})=>{
            setToken(data.token);
            setUser(data.user);
            setIsLoading(false);
        })
        .catch((err)=>{
            const response = err.response;
            if(response&&response.status===402){
                alert('Invalid Credentials');
            }
            console.log(err);
            setIsLoading(false);
        })

    }




    return (
    // Login Card
    <div className='bg-white max-w-md h-100% shadow-md rounded-xl px-16 pt-10 pb-10 flex flex-col gap-10'>

        <img src={Full_Logo} alt="" className='h-7 w-auto p-0 m-0 self-start'/>
        <h1 className='font-header font-bold text-primary text-3xl'>
            Prepare for Success,<br/>
            Access Your Training!
        </h1>

        {/* Login Front-end */}
        <form onSubmit={Login} className='flex flex-col'>
            <div className='mb-5'>
                <label htmlFor="Email" className='font-text text-sm text-primary'>Email Address or Employee ID</label>
                <div className='border-b-[1px] h-[1.8rem] border-b-primary flex items-center place-content-between'>
                    {/* TODO: No Error Display yet */}
                    <input ref={Email} type="email" name="Email" required className='w-[90%] border-none'/>
                    <FontAwesomeIcon icon={faUser} className='text-primary h-5' />
                </div>
            </div>
            <div className='mb-5'>
                <label htmlFor="Password" className='font-text text-sm text-primary'>Password</label>
                <div className='border-b-[1px] h-[1.8rem] border-b-primary flex items-center place-content-between'>
                    {/* TODO: No Error Display yet */}
                    <input ref={Password} type="password" name="Password" required className='w-[90%] border-none'/>
                    <FontAwesomeIcon icon={faKey} className='text-primary h-5' />
                </div>
            </div>
            <div className='flex items-center gap-2 mb-10'>
                <input type="checkbox" name="remember" id="remember"/>
                <label htmlFor="remember" className='text-primary text-sm font-text'>Remember Me</label>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className={`border bg-primary rounded-md font-header text-sm text-white p-3 cursor-pointer flex items-center justify-center ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{ height: "3rem" }}
            >
                {isLoading ? (
                    <InfinitySpin
                    visible={true}
                    width="100"
                    color="#fff"
                    ariaLabel="infinity-spin-loading"
                    />
                ) : (
                    "LOGIN"
                )}
            </button>

        </form>

        {/* must be create an modal for forgot password */}
        <p className='font-text text-sm self-center text-unactive'>Forgot your password? <a href="" className='text-primary'>Let's Reset it!</a></p>
    </div>
    )
}
