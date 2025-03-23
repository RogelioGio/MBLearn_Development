import { faBook, faBookOpen, faBuilding, faPeopleGroup, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Helmet } from "react-helmet"


export default function SystemLevelReports() {
    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | System Level Reports </title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 border-b mx-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>System Level Reports</h1>
                <p className='font-text text-sm text-unactive' >Generates comprehensive reports on system performance, usage, and security for analysis and decision-making.</p>
            </div>

            {/* Statistical numbers */}
            <div className='py-4 mx-5 col-span-4 gap-4 grid grid-cols-4'>
                {/* Total User Counter */}
                <div className="bg-white w-full h-full rounded-md shadow-md py-2 px-4 hover:cursor-pointer hover:bg-primary ease-in-out transition-all flex flex-row gap-4 group border-2 border-primary">
                    <div className='flex justify-center items-center aspect-square px-2'>
                        <FontAwesomeIcon icon={faUserGroup} className='text-primary text-2xl group-hover:text-white'/>
                    </div>
                    <div className='font-text text-sm text-unactive flex flex-col justify-center'>
                        <p className='group-hover:text-white'>Total MBLearn Users</p>
                        <p className='font-header text-2xl text-primary group-hover:text-white'>7,000 <span className='font-text text-sm text-unactive group-hover:text-white'>users</span></p>
                    </div>
                </div>
                <div className="bg-white w-full h-full rounded-md shadow-md py-2 px-4 hover:cursor-pointer hover:bg-primary ease-in-out transition-all flex flex-row gap-4 group border-2 border-primary">
                    <div className='flex justify-center items-center aspect-square px-2'>
                        <FontAwesomeIcon icon={faBuilding} className='text-primary text-2xl group-hover:text-white'/>
                    </div>
                    <div className='font-text text-sm text-unactive flex flex-col justify-center'>
                        <p className='group-hover:text-white'>Total Metrobank Branches</p>
                        <p className='font-header text-2xl text-primary group-hover:text-white'>500 <span className='font-text text-sm text-unactive group-hover:text-white'>branches</span></p>
                    </div>
                </div>
            </div>

            {/* Metrobank City Table */}
            <div className="flex flex-col py-4 mx-5 col-span-2 gap-4">
                {/* Header */}
                <div>
                    <h2 className="font-header text-xl text-primary">Metrobank City Locations</h2>
                    <p className="font-text text-sm text-unactive">List of metrobank cities and respective number of branch per city</p>
                </div>
                {/* Table */}
                <div className='row-start-3 row-span-2 col-start-1 col-span-4'>
                                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                <table className='text-left w-full overflow-y-scroll'>
                                    <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                        <tr>
                                            <th className='py-4 px-4'>City Name</th>
                                            <th className='py-4 px-4'>Number of Branches</th>
                                            <th className='py-4 px-4'>Active Users</th>
                                            <th className='py-4 px-4'>Inactive Users</th>
                                            <th className='py-4 px-4'>Total Users</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white divide-y divide-divider'>

                                    </tbody>
                                </table>
                                </div>
                            </div>
            </div>
            {/* Metrobank Branches  */}

        </div>
    )
}
