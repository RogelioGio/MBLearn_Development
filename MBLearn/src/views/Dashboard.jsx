import React, { useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet';



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
                </div>
            )
        //Learner Dashboard
        case 'Learner':
            return (
                <div className="flex flex-row items-center h-screen ">
                    <div className="flex flex-col flex-start h-full">
                        <h1 className="p-3 m-3 text-primary text-4xl font-header">Good Day! {name}</h1>
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


    return (
            <DashboardLayout role={role} name={user.user_infos.first_name}/>
    )

}
