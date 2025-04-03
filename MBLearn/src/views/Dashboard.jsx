import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faGraduationCap, faHeartPulse, faPeopleGroup, faUserLock } from '@fortawesome/free-solid-svg-icons';



//One Dashboard Component for 3 different roles
const DashboardLayout = ({role,name}) => {
    switch(role){
        //System admin Dasboard
        case 'System Admin':
            return (
            <div className="grid  grid-cols-4 grid-rows-[6.25rem_auto] h-full w-full">
                <Helmet>{/* Title of the mark-up */}
                    <title>MBLearn | System Admin Dashboard</title>
                </Helmet>

                <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                    <h1 className='text-primary text-4xl font-header'>Good Day! {name} </h1>
                    <p className='font-text text-sm text-unactive'>System Admin Dashboard, A centralized hub for system administrators to manage users, monitor system activity.</p>
                </div>
                <div className='border-b border-divider mr-5 flex flex-row justify-end items-center'>
                    <div className='p-6 aspect-square bg-secondaryprimary rounded-full flex justify-center items-center'>
                        <FontAwesomeIcon icon={faUserLock} className='text-primary text-2xl'/>
                    </div>
                </div>

                {/* Announcement */}
                <div className='col-span-4 row-span-1 mx-5 pb-2 pt-5'>
                    <div className='bg-white w-full h-full rounded-md shadow-md p-5'>

                    </div>
                </div>

                {/* Changing Content */}
                <div className='col-span-3 row-start-3 ml-5 pr-2 pt-2 pb-5'>
                    <div className='bg-white w-full h-full rounded-md shadow-md'>

                    </div>
                </div>
                <div className='col-span-1 row-start-3 mr-5 pt-2 pb-5 flex flex-col justify-between gap-4'>
                    <div className='bg-white w-full h-full rounded-md shadow-md p-5 hover:cursor-pointer hover:bg-primary ease-in-out transition-all flex flex-row gap-4 group border-2 border-primary'>
                        <div className='flex justify-center items-center'>
                            <FontAwesomeIcon icon={faPeopleGroup} className='text-primary text-5xl group-hover:text-white'/>
                        </div>
                        <div className='font-text text-sm text-unactive'>
                            <p className='group-hover:text-white'>Current Online Users</p>
                            <p className='font-header text-3xl text-primary group-hover:text-white'>7,000 <span className='font-text text-sm text-unactive group-hover:text-white'>users</span></p>
                        </div>
                    </div>
                    <div className='bg-white w-full h-full rounded-md shadow-md p-5 hover:cursor-pointer hover:bg-primary ease-in-out transition-all flex flex-row gap-4 group border-2 border-primary'>
                        <div className='flex justify-center items-center'>
                                <FontAwesomeIcon icon={faHeartPulse} className='text-primary text-5xl group-hover:text-white'/>
                            </div>
                            <div className='font-text text-sm text-unactive'>
                                <p className='group-hover:text-white'>System Uptime</p>
                                <p className='font-header text-3xl text-primary group-hover:text-white'>00:00:00</p>
                            </div>
                    </div>
                    <div className='bg-white w-full h-full rounded-md shadow-md p-5 hover:cursor-pointer hover:bg-primary ease-in-out transition-all border-2 border-primary'>

                    </div>
                </div>

            </div>
            )
        //Course Admin Dashboard
        case 'Course Admin':
            return (
                <div className="grid  grid-cols-4 grid-rows-[6.25rem_auto] h-full w-full">
                    <Helmet>{/* Title of the mark-up */}
                    <title>MBLearn | Course Admin Dashboard</title>
                    </Helmet>
                    <div className="flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider">
                            <h1 className="text-primary text-4xl font-header">Good Day! {name}</h1>
                            <p className='font-text text-sm text-unactive'>Course Admin Dashboard, A centralized hub for Course administrators to manage Learners, monitor learners progress.</p>
                    </div>
                    <div className='border-b border-divider mr-5 flex flex-row justify-end items-center'>
                        <div className='p-6 aspect-square bg-secondaryprimary rounded-full flex justify-center items-center'>
                            <FontAwesomeIcon icon={faBookOpenReader} className='text-primary text-2xl'/>
                        </div>
                    </div>
                    <div className='col-span-3 row-span-1 ml-5 pr-2 pb-2 pt-5'>
                        <div className='bg-white w-full h-full rounded-md shadow-md p-5'>

                        </div>
                    </div>
                    <div className='col-span-1 row-span-1 pb-2 pt-5 mr-5 '>
                        <div className='bg-white w-full h-full rounded-md shadow-md p-5'>

                        </div>
                    </div>
                    {/* Changing Content */}
                    <div className='col-span-3 row-start-3 ml-5 pr-2 pt-2 pb-5'>
                        <div className='bg-white w-full h-full rounded-md shadow-md'>

                        </div>
                    </div>
                    <div className='col-span-1 row-start-3 mr-5 pt-2 pb-5 flex flex-col justify-between gap-4'>
                        <div className='bg-white w-full h-full rounded-md shadow-md p-5'></div>
                    </div>

                </div>
            )
        //Learner Dashboard
        case 'Learner':
            const {user, role, token} = useStateContext();
            const [enrolled, setEnrolled] = useState([])
            useEffect(()=>{
                axiosClient.get(`/select-user-courses/${user.id}`)
            .then(({data}) => {
                console.log(data.data)
                setEnrolled(data.data)
            })
            .catch((err) => {console.log(err)});
            }, [])

            return (
                <div className="grid  grid-cols-4 grid-rows-[6.25rem_auto] h-full w-full">
                    <Helmet>{/* Title of the mark-up */}
                    <title>MBLearn | Learner Dashboard</title>
                    </Helmet>
                    <div className="flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider">
                        <h1 className="text-primary text-4xl font-header">Good Day! {name}</h1>
                        <p className='font-text text-sm text-unactive'>Your learning hub! Track progress, access courses, and level up your skills!</p>
                    </div>
                    <div className='border-b border-divider mr-5 flex flex-row justify-end items-center'>
                        <div className='p-6 aspect-square bg-secondaryprimary rounded-full flex justify-center items-center'>
                            <FontAwesomeIcon icon={faGraduationCap} className='text-primary text-2xl'/>
                        </div>
                    </div>
                    <div className='col-span-3 row-span-1 ml-5 pr-2 pb-2 pt-5'>
                        <div className='bg-white w-full h-full rounded-md shadow-md p-5'>

                        </div>
                    </div>
                    <div className='col-span-1 row-span-1 pb-2 pt-5 mr-5 '>
                        <div className='bg-white w-full h-full rounded-md shadow-md p-5'>

                        </div>
                    </div>
                    <div className='col-span-3 row-start-3 ml-5 pr-2 pt-2 pb-5'>
                        <div className='bg-white w-full h-full rounded-md shadow-md'>
                            <h1>Enrolled Courses</h1>
                            {
                                enrolled.map((course) => {
                                    <li key={course.id} className='flex flex-col gap-4'>
                                        {course.course_name}
                                    </li>
                                })
                            }
                        </div>
                    </div>
                    <div className='col-span-1 row-start-3 mr-5 pt-2 pb-5 flex flex-col justify-between gap-4'>
                        <div className='bg-white w-full h-full rounded-md shadow-md p-5'></div>
                        <div className='bg-white w-full h-full rounded-md shadow-md p-5'></div>
                        <div className='bg-white w-full h-full rounded-md shadow-md p-5'></div>
                    </div>


                </div>
            )
    }

}

export default function Dashboard()
{
    const {user, role, token} = useStateContext();
    if(!token){
        return window.location.href = "/login";
    }
    if (!user) {
        return <div>Loading...</div>;
    }

    const EnrolledCourses = ([])
    // useEffect(() => {
    //     if(!role === 'Learner')return

    //     axiosClient.get(`/select-user-courses/${user.id}`).then(({data}) => {console.log(data)}).catch((err) => {console.log(err)});
    // }, [role])

    return (
            <DashboardLayout role={role} name={user.user_infos.first_name}/>
    )

}
