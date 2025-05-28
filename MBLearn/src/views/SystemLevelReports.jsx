import { faBook, faBookOpen, faBuilding, faCalendar, faChevronLeft, faChevronRight, faDownload, faFilePen, faGears, faPeopleGroup, faUserGroup, faUsers, faWrench } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { ScrollArea } from "../components/ui/scroll-area"
import { addDays, addMonths, addWeeks, differenceInDays, differenceInMonths, differenceInWeeks, format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";

export default function SystemLevelReports() {
    const [tab, setTab] = useState("userList")
    const [date, setDate] = React.useState({
                from: new Date(),
                to: undefined,
            });

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
                <div className={`text-base gap-2 flex items-center justify-center font-header text-unactive border-b py-2 hover:text-primary hover:border-b hover:border-primary transition-all ease-in-out border-divider ${tab === "userList" ? "!text-primary border-b border-primary" : ""} hover:cursor-pointer`} onClick={() => setTab("userList")}>
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
            <ScrollArea className="col-span-4 row-span-2 h-full">
            <div className="px-5  h-[calc(100vh-8.75rem)]">
                {
                    tab === "userList" ? (
                        <>
                            <div className="pt-5 grid grid-cols-4 grid-rows-[min-content_1fr] h-[calc(100vh-8.75rem)]">
                                {/* Header */}
                                <div className="flex flex-row justify-between gap-4 col-span-4">
                                    <div>
                                        <p className="text-xl font-header text-primary">User Master List Report</p>
                                        <p className="text-xs text-unactive font-text">Generates a comprehensive report of all registered users in the system, including their departments, statuses, and other key profile details <br />for administrative oversight and record-keeping.</p>
                                    </div>
                                    <div className="border-2 border-primary py-2 px-10 rounded-md shadow-md font-header text-primary flex flex-row gap-2 items-center hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer">
                                        <FontAwesomeIcon icon={faFilePen}/>
                                        <p>Generate Report</p>
                                    </div>
                                </div>
                                <div className="col-span-4 pt-4 flex-col flex justify-between">
                                    <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                        <table className='text-left w-full overflow-y-scroll'>
                                            <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                                                <tr>
                                                    <th className='py-4 px-4  w-2/6'>REPORT NAME</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE GENERATED</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE EXPIRATION</th>
                                                    <th className='py-4 px-4  w-1/6'></th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-divider'>
                                                <tr className={`font-text text-sm hover:bg-gray-200`}>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>Report Name</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className="py-3 px-4">
                                                        <div className="w-8 aspect-square border-primary border-2 flex items-center justify-center rounded-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white transition-all ease-in-out">
                                                            <FontAwesomeIcon icon={faDownload}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='row-span-1 col-start-1 col-span-4 border-t border-divider py-3 flex flex-row items-center justify-between'>
                                    {/* Total number of entries and only be shown */}
                                    <div>
                                        {/* {
                                            !isLoading ? (
                                                <p className='text-sm font-text text-unactive'>
                                                    Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                                                </p>
                                            ) : (
                                                <p className='text-sm font-text text-unactive'>
                                                    Retrieving users.....
                                                </p>
                                            )
                                        } */}
                                        <p className='text-sm font-text text-unactive'>
                                            Retrieving users.....
                                        </p>
                                    </div>
                                    {/* Paganation */}
                                    <div>
                                        <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                                            {/* Previous */}
                                            <a
                                                //onClick={back}
                                                className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronLeft}/>
                                            </a>

                                            {/* Current Page & Dynamic Paging */}
                                            {/* {
                                                isLoading ? (
                                                    <a className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset`}>
                                                    ...</a>
                                                ) : (
                                                    Pages.map((page)=>(
                                                        <a
                                                            key={page}
                                                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                                                ${
                                                                    page === pageState.currentPage
                                                                    ? 'bg-primary text-white'
                                                                    : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                                                } transition-all ease-in-out`}
                                                                onClick={() => pageChange(page)}>
                                                            {page}</a>
                                                    ))
                                                )
                                            } */}
                                            <a
                                                //onClick={next}
                                                className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronRight}/>
                                            </a>
                                        </nav>

                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-5 grid grid-cols-4 grid-rows-[min-content_1fr] h-[calc(100vh-8.75rem)]">
                                {/* Header */}
                                <div className="flex flex-row justify-between gap-4 col-span-4">
                                    <div>
                                        <p className="text-xl font-header text-primary">User Role Distributions</p>
                                        <p className="text-xs text-unactive">Displays the breakdown of users by assigned roles (e.g., Learner, Course Admin, System Admin), providing insights <br/> into role allocation and helping monitor access control across the platform.</p>
                                    </div>
                                    <div className="border-2 border-primary py-2 px-10 rounded-md shadow-md font-header text-primary flex flex-row gap-2 items-center hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer">
                                        <FontAwesomeIcon icon={faFilePen}/>
                                        <p>Generate Report</p>
                                    </div>
                                </div>
                                <div className="col-span-4 pt-4 flex-col flex justify-between">
                                    <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                        <table className='text-left w-full overflow-y-scroll'>
                                            <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                                                <tr>
                                                    <th className='py-4 px-4  w-2/6'>REPORT NAME</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE GENERATED</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE EXPIRATION</th>
                                                    <th className='py-4 px-4  w-1/6'></th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-divider'>
                                                <tr className={`font-text text-sm hover:bg-gray-200`}>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>Report Name</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className="py-3 px-4">
                                                        <div className="w-8 aspect-square border-primary border-2 flex items-center justify-center rounded-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white transition-all ease-in-out">
                                                            <FontAwesomeIcon icon={faDownload}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='row-span-1 col-start-1 col-span-4 border-t border-divider py-3 flex flex-row items-center justify-between'>
                                    {/* Total number of entries and only be shown */}
                                    <div>
                                        {/* {
                                            !isLoading ? (
                                                <p className='text-sm font-text text-unactive'>
                                                    Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                                                </p>
                                            ) : (
                                                <p className='text-sm font-text text-unactive'>
                                                    Retrieving users.....
                                                </p>
                                            )
                                        } */}
                                        <p className='text-sm font-text text-unactive'>
                                            Retrieving users.....
                                        </p>
                                    </div>
                                    {/* Paganation */}
                                    <div>
                                        <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                                            {/* Previous */}
                                            <a
                                                //onClick={back}
                                                className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronLeft}/>
                                            </a>

                                            {/* Current Page & Dynamic Paging */}
                                            {/* {
                                                isLoading ? (
                                                    <a className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset`}>
                                                    ...</a>
                                                ) : (
                                                    Pages.map((page)=>(
                                                        <a
                                                            key={page}
                                                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                                                ${
                                                                    page === pageState.currentPage
                                                                    ? 'bg-primary text-white'
                                                                    : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                                                } transition-all ease-in-out`}
                                                                onClick={() => pageChange(page)}>
                                                            {page}</a>
                                                    ))
                                                )
                                            } */}
                                            <a
                                                //onClick={next}
                                                className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronRight}/>
                                            </a>
                                        </nav>

                                    </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    : tab === "userActivity" ? (
                        <>
                            <div className="pt-5 grid grid-cols-4 grid-rows-[min-content_1fr] h-[calc(100vh-8.75rem)]">
                                {/* Header */}
                                <div className="flex flex-row justify-between gap-4 col-span-4">
                                    <div>
                                        <p className="text-xl font-header text-primary">User Access Logs Report</p>
                                        <p className="text-xs text-unactive font-text">Provides a detailed record of user login activities, including timestamps, user IDs and to monitor system usage, detect anomalies, and support security auditing.</p>
                                    </div>
                                    <div className="border-2 border-primary py-2 px-10 rounded-md shadow-md font-header text-primary flex flex-row gap-2 items-center hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer">
                                        <FontAwesomeIcon icon={faFilePen}/>
                                        <p>Generate Report</p>
                                    </div>
                                </div>
                                {/* Reports */}
                                <div className="col-span-4 pt-4 flex-col flex justify-between">
                                    <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                        <table className='text-left w-full overflow-y-scroll'>
                                            <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                                                <tr>
                                                    <th className='py-4 px-4  w-2/6'>REPORT NAME</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE GENERATED</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE EXPIRATION</th>
                                                    <th className='py-4 px-4  w-1/6'></th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-divider'>
                                                <tr className={`font-text text-sm hover:bg-gray-200`}>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>Report Name</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className="py-3 px-4">
                                                        <div className="w-8 aspect-square border-primary border-2 flex items-center justify-center rounded-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white transition-all ease-in-out">
                                                            <FontAwesomeIcon icon={faDownload}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='row-span-1 col-start-1 col-span-4 border-t border-divider py-3 flex flex-row items-center justify-between'>
                                    {/* Total number of entries and only be shown */}
                                    <div>
                                        {/* {
                                            !isLoading ? (
                                                <p className='text-sm font-text text-unactive'>
                                                    Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                                                </p>
                                            ) : (
                                                <p className='text-sm font-text text-unactive'>
                                                    Retrieving users.....
                                                </p>
                                            )
                                        } */}
                                        <p className='text-sm font-text text-unactive'>
                                            Retrieving users.....
                                        </p>
                                    </div>
                                    {/* Paganation */}
                                    <div>
                                        <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                                            {/* Previous */}
                                            <a
                                                //onClick={back}
                                                className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronLeft}/>
                                            </a>

                                            {/* Current Page & Dynamic Paging */}
                                            {/* {
                                                isLoading ? (
                                                    <a className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset`}>
                                                    ...</a>
                                                ) : (
                                                    Pages.map((page)=>(
                                                        <a
                                                            key={page}
                                                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                                                ${
                                                                    page === pageState.currentPage
                                                                    ? 'bg-primary text-white'
                                                                    : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                                                } transition-all ease-in-out`}
                                                                onClick={() => pageChange(page)}>
                                                            {page}</a>
                                                    ))
                                                )
                                            } */}
                                            <a
                                                //onClick={next}
                                                className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronRight}/>
                                            </a>
                                        </nav>

                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-5 grid grid-cols-4 grid-rows-[min-content_1fr] h-[calc(100vh-8.75rem)]">
                                {/* Header */}
                                <div className="flex flex-row justify-between gap-4 col-span-4">
                                    <div>
                                        <p className="text-xl font-header text-primary">User Activity Report</p>
                                        <p className="text-xs text-unactive font-text">Summarizes user interactions within the platform</p>
                                    </div>
                                    <div className="border-2 border-primary py-2 px-10 rounded-md shadow-md font-header text-primary flex flex-row gap-2 items-center hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer">
                                        <FontAwesomeIcon icon={faFilePen}/>
                                        <p>Generate Report</p>
                                    </div>
                                </div>
                                {/* Reports */}
                                <div className="col-span-4 pt-4 flex-col flex justify-between">
                                    <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                        <table className='text-left w-full overflow-y-scroll'>
                                            <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                                                <tr>
                                                    <th className='py-4 px-4  w-2/6'>REPORT NAME</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE GENERATED</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE EXPIRATION</th>
                                                    <th className='py-4 px-4  w-1/6'></th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-divider'>
                                                <tr className={`font-text text-sm hover:bg-gray-200`}>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>Report Name</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className="py-3 px-4">
                                                        <div className="w-8 aspect-square border-primary border-2 flex items-center justify-center rounded-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white transition-all ease-in-out">
                                                            <FontAwesomeIcon icon={faDownload}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='row-span-1 col-start-1 col-span-4 border-t border-divider py-3 flex flex-row items-center justify-between'>
                                    {/* Total number of entries and only be shown */}
                                    <div>
                                        {/* {
                                            !isLoading ? (
                                                <p className='text-sm font-text text-unactive'>
                                                    Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                                                </p>
                                            ) : (
                                                <p className='text-sm font-text text-unactive'>
                                                    Retrieving users.....
                                                </p>
                                            )
                                        } */}
                                        <p className='text-sm font-text text-unactive'>
                                            Retrieving users.....
                                        </p>
                                    </div>
                                    {/* Paganation */}
                                    <div>
                                        <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                                            {/* Previous */}
                                            <a
                                                //onClick={back}
                                                className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronLeft}/>
                                            </a>

                                            {/* Current Page & Dynamic Paging */}
                                            {/* {
                                                isLoading ? (
                                                    <a className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset`}>
                                                    ...</a>
                                                ) : (
                                                    Pages.map((page)=>(
                                                        <a
                                                            key={page}
                                                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                                                ${
                                                                    page === pageState.currentPage
                                                                    ? 'bg-primary text-white'
                                                                    : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                                                } transition-all ease-in-out`}
                                                                onClick={() => pageChange(page)}>
                                                            {page}</a>
                                                    ))
                                                )
                                            } */}
                                            <a
                                                //onClick={next}
                                                className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronRight}/>
                                            </a>
                                        </nav>

                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-5 grid grid-cols-4 grid-rows-[min-content_1fr] h-[calc(100vh-8.75rem)]">
                                {/* Header */}
                                <div className="flex flex-row justify-between gap-4 col-span-4">
                                    <div>
                                        <p className="text-xl font-header text-primary">User Account Status Report</p>
                                        <p className="text-xs text-unactive font-text">Displays the current status of user accounts, helping administrators monitor account activity and manage user access across the system.</p>
                                    </div>
                                    <div className="border-2 border-primary py-2 px-10 rounded-md shadow-md font-header text-primary flex flex-row gap-2 items-center hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer">
                                        <FontAwesomeIcon icon={faFilePen}/>
                                        <p>Generate Report</p>
                                    </div>
                                </div>
                                {/* Reports */}
                                <div className="col-span-4 pt-4 flex-col flex justify-between">
                                    <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                        <table className='text-left w-full overflow-y-scroll'>
                                            <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                                                <tr>
                                                    <th className='py-4 px-4  w-2/6'>REPORT NAME</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE GENERATED</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE EXPIRATION</th>
                                                    <th className='py-4 px-4  w-1/6'></th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-divider'>
                                                <tr className={`font-text text-sm hover:bg-gray-200`}>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>Report Name</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className="py-3 px-4">
                                                        <div className="w-8 aspect-square border-primary border-2 flex items-center justify-center rounded-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white transition-all ease-in-out">
                                                            <FontAwesomeIcon icon={faDownload}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='row-span-1 col-start-1 col-span-4 border-t border-divider py-3 flex flex-row items-center justify-between'>
                                    {/* Total number of entries and only be shown */}
                                    <div>
                                        {/* {
                                            !isLoading ? (
                                                <p className='text-sm font-text text-unactive'>
                                                    Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                                                </p>
                                            ) : (
                                                <p className='text-sm font-text text-unactive'>
                                                    Retrieving users.....
                                                </p>
                                            )
                                        } */}
                                        <p className='text-sm font-text text-unactive'>
                                            Retrieving users.....
                                        </p>
                                    </div>
                                    {/* Paganation */}
                                    <div>
                                        <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                                            {/* Previous */}
                                            <a
                                                //onClick={back}
                                                className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronLeft}/>
                                            </a>

                                            {/* Current Page & Dynamic Paging */}
                                            {/* {
                                                isLoading ? (
                                                    <a className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset`}>
                                                    ...</a>
                                                ) : (
                                                    Pages.map((page)=>(
                                                        <a
                                                            key={page}
                                                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                                                ${
                                                                    page === pageState.currentPage
                                                                    ? 'bg-primary text-white'
                                                                    : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                                                } transition-all ease-in-out`}
                                                                onClick={() => pageChange(page)}>
                                                            {page}</a>
                                                    ))
                                                )
                                            } */}
                                            <a
                                                //onClick={next}
                                                className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronRight}/>
                                            </a>
                                        </nav>

                                    </div>
                                    </div>
                                </div>
                            </div>


                        </>
                    )
                    : tab === "AuditLog" ? (
                        <>
                            <div className="pt-5 grid grid-cols-4 grid-rows-[min-content_1fr] h-[calc(100vh-8.75rem)]">
                                {/* Header */}
                                <div className="flex flex-row justify-between gap-4 col-span-4">
                                    <div>
                                        <p className="text-xl font-header text-primary">System Change History Report</p>
                                        <p className="text-xs text-unactive font-text">Logs and tracks all significant changes made within the system, changes—to ensure transparency, accountability, and support for audit trails.</p>
                                    </div>
                                    <div className="border-2 border-primary py-2 px-10 rounded-md shadow-md font-header text-primary flex flex-row gap-2 items-center hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer">
                                        <FontAwesomeIcon icon={faFilePen}/>
                                        <p>Generate Report</p>
                                    </div>
                                </div>
                                {/* Reports */}
                                <div className="col-span-4 pt-4 flex-col flex justify-between">
                                    <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                        <table className='text-left w-full overflow-y-scroll'>
                                            <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                                                <tr>
                                                    <th className='py-4 px-4  w-2/6'>REPORT NAME</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE GENERATED</th>
                                                    <th className='py-4 px-4  w-2/6'>DATE EXPIRATION</th>
                                                    <th className='py-4 px-4  w-1/6'></th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-divider'>
                                                <tr className={`font-text text-sm hover:bg-gray-200`}>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>Report Name</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out text-unactive`}>00-00-00</td>
                                                    <td className="py-3 px-4">
                                                        <div className="w-8 aspect-square border-primary border-2 flex items-center justify-center rounded-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white transition-all ease-in-out">
                                                            <FontAwesomeIcon icon={faDownload}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='row-span-1 col-start-1 col-span-4 border-t border-divider py-3 flex flex-row items-center justify-between'>
                                    {/* Total number of entries and only be shown */}
                                    <div>
                                        {/* {
                                            !isLoading ? (
                                                <p className='text-sm font-text text-unactive'>
                                                    Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                                                </p>
                                            ) : (
                                                <p className='text-sm font-text text-unactive'>
                                                    Retrieving users.....
                                                </p>
                                            )
                                        } */}
                                        <p className='text-sm font-text text-unactive'>
                                            Retrieving users.....
                                        </p>
                                    </div>
                                    {/* Paganation */}
                                    <div>
                                        <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                                            {/* Previous */}
                                            <a
                                                //onClick={back}
                                                className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronLeft}/>
                                            </a>

                                            {/* Current Page & Dynamic Paging */}
                                            {/* {
                                                isLoading ? (
                                                    <a className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset`}>
                                                    ...</a>
                                                ) : (
                                                    Pages.map((page)=>(
                                                        <a
                                                            key={page}
                                                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                                                ${
                                                                    page === pageState.currentPage
                                                                    ? 'bg-primary text-white'
                                                                    : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                                                } transition-all ease-in-out`}
                                                                onClick={() => pageChange(page)}>
                                                            {page}</a>
                                                    ))
                                                )
                                            } */}
                                            <a
                                                //onClick={next}
                                                className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                <FontAwesomeIcon icon={faChevronRight}/>
                                            </a>
                                        </nav>

                                    </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    : null
                }
            </div>
            </ScrollArea>

        </div>
    )
}
