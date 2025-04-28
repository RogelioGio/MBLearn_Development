import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faGraduationCap, faHeartPulse, faPenToSquare, faPeopleGroup, faUserLock, faUserShield } from '@fortawesome/free-solid-svg-icons';
import AnnouncmentCarousel from '../modalsandprops/dashboardComponents/AnnouncementCarousel';
import LearnerDashboard from './Dashboards/LearnerDashboard';
import { CarouselPrevious, CarouselNext } from '../components/ui/carousel';
import CourseAdminDashboard from './Dashboards/CourseAdminDashboard';



//One Dashboard Component for 3 different roles
const DashboardLayout = ({role,name,user}) => {
    switch(role){
        //System admin Dasboard
        case 'System Admin':
            return (
            <div className="grid  grid-cols-4 grid-rows-[6.25rem_1fr_1fr] h-full w-full">
                <Helmet>{/* Title of the mark-up */}
                    <title>MBLearn | System Admin Dashboard</title>
                </Helmet>

                <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                    <h1 className='text-primary text-4xl font-header'>Good Day! {name} </h1>
                    <p className='font-text text-sm text-unactive'>System Admin Dashboard, A centralized hub for system administrators to manage users, monitor system activity.</p>
                </div>
                <div className='border-b border-divider mr-5 flex flex-row justify-end items-center'>
                    <div className='p-6 aspect-square bg-secondaryprimary rounded-full flex justify-center items-center'>
                        <FontAwesomeIcon icon={faUserShield} className='text-primary text-2xl'/>
                    </div>
                </div>

                {/* Announcement */}
                <div className='col-span-3 row-span-1 px-5 py-2 w-full h-full'>
                    <AnnouncmentCarousel/>
                </div>
                <div className='col-span-1 row-span-1 pr-5 py-2 grid grid-cols-1 grid-rows-[min-content_1fr]'>
                    <div className="pb-3">
                        <p className="font-header text-primary text-base">Calendar</p>
                        <p className="font-text text-unactive text-xs">Stay organized by tracking schedule and activities</p>
                    </div>
                    <div className="bg-white w-full h-full rounded-md shadow-md border-2 border-primary">

                    </div>
                </div>


                {/* Changing Content */}
                {/* <div className='col-span-3 row-start-3 ml-5 pr-2 pt-2 pb-5'>
                    <div className='bg-white w-full h-full rounded-md shadow-md'>

                    </div>
                </div>
                <div className='col-span-1 row-start-3 mr-5 pt-2 pb-5 gap-4 grid grid-rows-3'>
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
                </div> */}

            </div>
            )
        //Course Admin Dashboard
        case 'Course Admin':
            return (
                <>
                    <Helmet>{/* Title of the mark-up */}
                    <title>MBLearn | Course Admin Dashboard</title>
                    </Helmet>
                    <CourseAdminDashboard name={name} user={user}/>
                </>

            )
        //Learner Dashboard
        case 'Learner':
            return (
                <>
                    <Helmet>{/* Title of the mark-up */}
                    <title>MBLearn | Learner Dashboard</title>
                    </Helmet>
                    <LearnerDashboard name={name} user={user}/>
                </>
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
            <DashboardLayout role={role} name={user.user_infos.first_name} user={user}/>
    )

}
