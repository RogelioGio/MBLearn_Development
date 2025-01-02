import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation';

export default function CourseListMaintenance() {
    return (
        <div>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Course List Maintenance</title>
            </Helmet>
            <Navigation/>

        </div>

    )
}
