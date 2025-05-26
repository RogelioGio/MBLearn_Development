import { faUsers, faGears, faWrench, faBook, faClock, faCertificate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { Helmet } from "react-helmet"




export default function AssignedCourseReport() {
    const [tab, setTab] = useState("userList")

    return(
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_3.75rem] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Course-level Report</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 mx-5'>
                <h1 className='text-primary text-4xl font-header'>Course-level Report</h1>
                <p className='font-text text-sm text-unactive' >Access the assigned course report panel to track progress and performance insights.</p>
            </div>

             {/* Tabs for report segments */}
            <div className="grid grid-cols-3 col-span-4 row-span-1 mx-5 border-divider">
                <div className={`gap-2 flex items-center justify-center font-header text-unactive border-b py-2 hover:text-primary hover:border-b hover:border-primary transition-all ease-in-out border-divider ${tab === "performance" ? "!text-primary border-b border-primary" : ""} hover:cursor-pointer`} onClick={() => setTab("performance")}>
                    <FontAwesomeIcon icon={faBook}/>
                    <p>Course Performance Reports</p>
                </div>
                <div className={`gap-2 flex items-center justify-center font-header text-unactive border-b py-2 hover:text-primary hover:border-b hover:border-primary transition-all ease-in-out border-divider ${tab === "timeline" ? "!text-primary border-b border-primary" : ""} hover:cursor-pointer`} onClick={() => setTab("timeline")}>
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    <p>Course Timeline Reports</p>
                </div>
                <div className={`gap-2 flex items-center justify-center font-header text-unactive border-b py-2 hover:text-primary hover:border-b hover:border-primary transition-all ease-in-out border-divider ${tab === "certificate" ? "!text-primary border-b border-primary" : ""} hover:cursor-pointer`} onClick={() => setTab("certificate")}>
                    <FontAwesomeIcon icon={faCertificate} className="mr-2" />
                    <p>Certification Reports</p>
                </div>
            </div>

            {/* Content */}
            <div className="px-5">
                {
                    tab === "performance" ? (
                        <>
                            Purpose: Evaluate overall course performance
                            Includes:

                            Course Title

                            Total Enrolled

                            Total Completed

                            Completion Rate (%)

                            Average Progress (%)

                            Average Time to Complete

                            Number of Learners who failed/passed

                            Retake Count (if enabled)
                        </>
                    )
                    : tab === "timeline" ? (
                        <>
                            Purpose: Track course timelines and overdue users
                            Includes:

                            Course Title

                            Start Date

                            End Date / Deadline

                            Users Past Deadline

                            Extension Granted (Yes/No)

                            Extended Date

                        </>
                    )
                    : tab === "certificate" ? (
                        <>
                            Purpose: Track issued certificates
                            Includes:

                            Learner Name

                            Course Title

                            Certificate Issue Date

                            Certificate Expiry (if applicable)

                            Download Status (e.g., Downloaded/Not Yet Downloaded)
                        </>
                    )
                    : null
                }
            </div>
        </div>
    )
}

