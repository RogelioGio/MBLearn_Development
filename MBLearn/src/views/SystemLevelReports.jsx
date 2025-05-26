import { faBook, faBookOpen, faBuilding, faFilePen, faGears, faPeopleGroup, faUserGroup, faUsers, faWrench } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { Helmet } from "react-helmet"


export default function SystemLevelReports() {
    const [tab, setTab] = useState("userList")

    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | System Level Reports </title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 mx-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>System Level Reports</h1>
                <p className='font-text text-sm text-unactive' >Generates comprehensive reports on system performance, usage, and security for analysis and decision-making.</p>
            </div>

            {/* Tabs for report segments */}
            <div className="grid grid-cols-3 col-span-4 row-span-1 mx-5 border-divider">
                <div className={`gap-2 flex items-center justify-center font-header text-unactive border-b py-2 hover:text-primary hover:border-b hover:border-primary transition-all ease-in-out border-divider ${tab === "userList" ? "!text-primary border-b border-primary" : ""} hover:cursor-pointer`} onClick={() => setTab("userList")}>
                    <FontAwesomeIcon icon={faUsers}/>
                    <p>User List Reports</p>
                </div>
                <div className={`gap-2 flex items-center justify-center font-header text-unactive border-b py-2 hover:text-primary hover:border-b hover:border-primary transition-all ease-in-out border-divider ${tab === "userActivity" ? "!text-primary border-b border-primary" : ""} hover:cursor-pointer`} onClick={() => setTab("userActivity")}>
                    <FontAwesomeIcon icon={faGears} className="mr-2" />
                    <p>System Access Reports</p>
                </div>
                <div className={`gap-2 flex items-center justify-center font-header text-unactive border-b py-2 hover:text-primary hover:border-b hover:border-primary transition-all ease-in-out border-divider ${tab === "AuditLog" ? "!text-primary border-b border-primary" : ""} hover:cursor-pointer`} onClick={() => setTab("AuditLog")}>
                    <FontAwesomeIcon icon={faWrench} className="mr-2" />
                    <p>Audit Log</p>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 col-span-4">
                {
                    tab === "userList" ? (
                        <>
                            <div className="py-5">
                                {/* Header */}
                                <div className="flex flex-row justify-between gap-4">
                                    <div>
                                        <p className="text-xl font-header text-primary">User Master List Report</p>
                                        <p className="text-xs text-unactive">Generates a comprehensive report of all registered users in the system, including their departments, statuses, and other key profile details <br />for administrative oversight and record-keeping.</p>
                                    </div>
                                    <div className="border-2 border-primary py-2 px-10 rounded-md shadow-md font-header text-primary flex flex-row gap-2 items-center hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer">
                                        <FontAwesomeIcon icon={faFilePen}/>
                                        <p>Generate Report</p>
                                    </div>
                                </div>

                            </div>
                            <div className="py-5">
                                {/* Header */}
                                <div className="flex flex-row justify-between gap-4">
                                    <div>
                                        <p className="text-xl font-header text-primary">User Role Distributions</p>
                                        <p className="text-xs text-unactive">Displays the breakdown of users by assigned roles (e.g., Learner, Course Admin, System Admin), providing insights <br/> into role allocation and helping monitor access control across the platform.</p>
                                    </div>
                                    <div className="border-2 border-primary py-2 px-10 rounded-md shadow-md font-header text-primary flex flex-row gap-2 items-center hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer">
                                        <FontAwesomeIcon icon={faFilePen}/>
                                        <p>Generate Report</p>
                                    </div>
                                </div>

                            </div>
                        </>
                    )
                    : tab === "userActivity" ? (
                        <>
                            User Access Logs Report
                            User Activity Report
                            User Account Statur Report
                        </>
                    )
                    : tab === "AuditLog" ? (
                        <>
                            Change History Report
                        </>
                    )
                    : null
                }
            </div>


        </div>
    )
}
