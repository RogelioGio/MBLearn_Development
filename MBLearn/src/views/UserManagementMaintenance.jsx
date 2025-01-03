import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation';

export default function UserManagementMaintenance() {
    return (
        <div className='flex flex-col flex-start h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | User Management Maintenance</title>
            </Helmet>
            <div className='p-3 m-3'>
                <h1 className='text-primary text-4xl font-header'>User Management Maintenance</h1>
                <p className='font-text text-sm text-unactive' >Effortlessly manage and add users to ensure seamless access and control.</p>
            </div>

        </div>

    )
}
