import { faBook, faBookOpen, faBuilding, faGears, faPeopleGroup, faUserGroup, faUsers, faWrench } from "@fortawesome/free-solid-svg-icons"
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
                <div className={`gap-2 flex items-center justify-center font-text text-unactive border-b py-2 hover:text-primary hover:border-b hover:border-primary hover:bg-divider transition-all ease-in-out border-divider ${tab === "userList" ? "!text-primary border-b border-primary bg-divider" : ""} hover:cursor-pointer`} onClick={() => setTab("userList")}>
                    <FontAwesomeIcon icon={faUsers}/>
                    <p>User List Reports</p>
                </div>
                <div className={`gap-2 flex items-center justify-center font-text text-unactive border-b py-2 hover:text-primary hover:border-b hover:border-primary hover:bg-divider transition-all ease-in-out border-divider ${tab === "userActivity" ? "!text-primary border-b border-primary bg-divider" : ""} hover:cursor-pointer`} onClick={() => setTab("userActivity")}>
                    <FontAwesomeIcon icon={faGears} className="mr-2" />
                    <p>System Access Reports</p>
                </div>
                <div className={`gap-2 flex items-center justify-center font-text text-unactive border-b py-2 hover:text-primary hover:border-b hover:border-primary hover:bg-divider transition-all ease-in-out border-divider ${tab === "AuditLog" ? "!text-primary border-b border-primary bg-divider" : ""} hover:cursor-pointer`} onClick={() => setTab("AuditLog")}>
                    <FontAwesomeIcon icon={faWrench} className="mr-2" />
                    <p>Audit Log</p>
                </div>
            </div>

            {/* Content */}
            <div className="px-5">
                {
                    tab === "userList" ? (
                        <>
                            User Master List Report
                            User Role Distributions
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
