import { faFileSignature, faUserLock, faUsers, faUsersLine } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { act, useEffect, useRef, useState } from "react"

export default function SystemConfiguration() {
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)


    // Fetch Roles
    useEffect(() => {
        axiosClient.get('/roles')
        .then((Response) => {
            setRoles(Response.data)
            setLoading(false)
        })
    },[])


    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | System Configuration Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 border-b mx-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>System Configuration Maintenance</h1>
                <p className='font-text text-sm text-unactive' >Module for managing and customizing system settings to ensure optimal performance and functionality.</p>
            </div>
            {/* Settings Tabs */}
            <div className="col-start-4 col-span-1 row-span-3 border-l border-divider px-3 py-3 flex items-center flex-col">
                <div className='flex flex-row  items-center w-full px-3 py-3 gap-4 text-sm text-unactive hover:text-primary hover:bg-divider rounded-md cursor-pointer transition-all ease-in-out'>
                    <FontAwesomeIcon icon={faUsersLine}/>
                    <h1 className="uppercase font-text">Role Management</h1>
                </div>
                <div className='flex flex-row items-center w-full px-3 py-3 gap-4 text-sm text-unactive hover:text-primary hover:bg-divider rounded-md cursor-pointer transition-all ease-in-out'>
                    <FontAwesomeIcon icon={faFileSignature}/>
                    <h1 className="uppercase font-text">Form Input Setting</h1>
                </div>
            </div>
            {/* Setting Content */}
            <div className="mx-5 py-5 row-span-2 col-span-3 grid grid-cols-2 grid-rows-[min-content_auto] gap-2">
                {/* Header */}
                <div className="row-span-1 col-span-2 flex flex-row justify-between items-center py-5">
                    <div>
                        <h1 className="font-header text-primary text-xl">Role Management</h1>
                        <p className="font-text text-unactive">Create and manage roles function and permission in the system</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}>
                            <FontAwesomeIcon icon={faUserLock}/>
                            <p>Add Role</p>
                        </div>
                    </div>
                </div>
                {/* Available Role*/}
                <div className="row-span-1 col-span-2 flex flex-col gap-5">
                    <div>
                        <h1 className="font-header text-primary text-base">Available Roles</h1>
                        <p className="font-text text-unactive text-xs">Available roles and user that has different roles</p>
                    </div>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Role Name</th>
                                <th className='py-4 px-4 uppercase'>Users</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    roles.map((role) =>(
                                        <tr key={role.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{role.role_name}</td>
                                            <td className={`font-text p-4 gap-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <FontAwesomeIcon icon={faUsers}/>
                                                    <p>0</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </div>
    )
}
