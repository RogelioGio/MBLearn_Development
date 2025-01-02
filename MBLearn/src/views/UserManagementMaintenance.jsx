import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation';

export default function UserManagementMaintenance() {
    return (
        <div>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | User Management Maintenance</title>
            </Helmet>
            <Navigation/>
            <div><p>User Management Maintenance</p></div>
        </div>

    )
}
