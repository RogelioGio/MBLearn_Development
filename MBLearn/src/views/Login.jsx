import React from 'react'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faEye, faEyeSlash, faKey, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons'
import Full_Logo from '../assets/Full_Logo.svg'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import {InfinitySpin} from 'react-loader-spinner'
import { useFormik } from 'formik'
import * as Yup from 'yup'



export default function Login() {
    const {setUser, setToken, setAvailableRoles, setRole} = useStateContext();

    //loading state
    const [isLoading, setIsLoading] = useState(false);

    //Handle Password
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    //Error handling
    const [error, setError] = useState('');

    const togglePassword = () =>{
        setShowPassword(!showPassword);
    };
    const handlePassword = (e) =>{
        const {value} = e.target;
        formik.setFieldValue('password', value);
        setError('');
        setPassword(value);
    }

    //payload and validation
    const formik = useFormik({
        //reference
        initialValues:{
            MBemail: '',
            password: '',
        },
        validationSchema: Yup.object({
            MBemail: Yup.string()
                .email('Invalid Email')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters')
        }),
        //submission
        onSubmit: (values) =>{

            const payload ={
                MBemail: values.MBemail,
                password:  values.password
            }

            console.log(payload);
            setIsLoading(true);
            setError('');

            //API call
            axiosClient.post('/login', payload).then(({data})=>{
                setToken(data.token);
                setRole(data.user.user_infos.roles[0]?.role_name)
                console.log(data.user.user_infos.roles[0]?.role_name);

                if (data.redirect) {
                    window.location.href = data.redirect; // Redirect to the appropriate URL based on role
                } else {
                    // If no redirect is provided, proceed with whatever default logic you need
                    setIsLoading(false);
                }
            })
            .catch(({response})=>{
                if(response){
                    setError(response.data.message);
                    console.log(response.data.message);
                    setIsLoading(false);
                    formik.resetForm();
                    setIsLoading(false);
                }
            })
        }
    })


    return (
    // Login Card
    <div className='bg-white max-w-md h-fit shadow-md rounded-xl px-16 py-10 flex flex-col gap-5'>

        <img src={Full_Logo} alt="" className='h-7 w-auto p-0 m-0 self-start'/>
        <h1 className='font-header font-bold text-primary text-3xl'>
            Prepare for Success,<br/>
            Access Your Training!
        </h1>

        {/* Error Handling */}
            {
            error &&
            <div className='min-h-[50px]'>
                <div className='bg-red-200 px-4 border-2 border-red-400 rounded-md p-2 grid grid-cols-[3rem_auto]'>
                    <div className='bg-red-400 w-10 rounded-full aspect-square text-red-600 flex items-center justify-center'>
                        <FontAwesomeIcon icon={faTriangleExclamation}/>
                    </div>
                    {

                        <div className='w-full flex flex-col gap-1 justify-center px-2'>
                            <p className='text-red-500 text-sm font-text'>{error}</p>
                        </div>
                    }
                </div>
            </div>
            }

        {/* Login Front-end */}
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>

            {/* Email of Employee ID */}
            <div className='flex flex-col gap-0.5'>
                <div className={`flex items-center place-content-between border-2 rounded-md shadow-md ${formik.touched.MBemail && formik.errors.MBemail ? 'border-red-500' : 'border-primary'}`}>
                    <input
                        type="text"
                        name="MBemail"
                        value={formik.values.MBemail}
                        onChange={(e)=>{formik.handleChange(e); setError('')}}
                        onBlur={formik.handleBlur}
                        placeholder='Email Address or Employee ID'
                        className='focus:outline-none font-text text-sm px-4 w-full '
                        />
                    <div className= {`py-2 px-4 text-white ${formik.touched.MBemail && formik.errors.MBemail ? 'bg-red-500' : 'bg-primary'}`}>
                        <FontAwesomeIcon icon={
                            formik.touched.MBemail && formik.errors.MBemail
                            ? formik.errors.MBemail === 'Invalid Email' ? faTriangleExclamation
                            : faAsterisk : faUser
                        }/>
                    </div>
                </div>
                {/* Error */}
                {/* <div className='min-h-[20px] px-4'>
                    {formik.touched.MBemail && formik.errors.MBemail && (<div className='text-red-500 text-sm font-text'>{formik.errors.MBemail}</div>)}
                </div> */}
            </div>

            {/* Password */}
            <div className='flex flex-col gap-0.5'>
                <div className={`flex items-center place-content-between border-2 rounded-md shadow-md ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-primary'}`}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name='password'
                        className='focus:outline-none font-text text-sm px-4 w-full'
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={handlePassword}
                        placeholder='Password'
                    />
                    {/* Set Visibilitiy */}
                    {password &&
                        <div className='px-2 flex items-center justify-center'>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='text-primary cursor-pointer' onClick={togglePassword}/>
                        </div>
                    }
                    <div className={`py-2 px-4 text-white ${formik.touched.password && formik.errors.password ? 'bg-red-500' : 'bg-primary'}`}>
                        <FontAwesomeIcon icon={
                            formik.touched.password && formik.errors.password
                            ? formik.errors.password === 'Password must be at least 8 characters' ? faTriangleExclamation
                            : faAsterisk : faKey
                        }/>
                    </div>
                </div>
                {/* Error */}
                {/* <div className='min-h-[20px] px-4'>
                    {formik.touched.MBemail && formik.errors.MBemail && (<div className='text-red-500 text-sm font-text'>{formik.errors.password}</div>)}
                </div> */}
            </div>

            {/* Remember Me */}
            <div className='flex items-center gap-2 mb-8'>
                <div className="group grid size-4 grid-cols-1">
                    <input type="checkbox"
                        className="col-start-1 row-start-1 appearance-none border border-primary rounded checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                        name='remember'
                        />
                    {/* Custom Checkbox styling */}
                        <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                        {/* Checked */}
                        <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                            />
                        </svg>
                </div>
                <label htmlFor="remember" className='text-primary text-sm font-text'>Remember Me</label>
            </div>

            {/* Login button */}
            <button
                type="submit"
                disabled={isLoading}
                className={`border bg-primary rounded-md font-header text-sm text-white p-3 cursor-pointer flex items-center justify-center \
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1 `}
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
        <p className='font-text text-sm self-center text-unactive mt-auto'>Forgot your password? <a href="" className='text-primary'>Let's Reset it!</a></p>
    </div>
    )
}
