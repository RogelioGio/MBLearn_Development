import { faFileSignature, faUserClock, faUserLock, faUsers, faUsersLine } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axiosClient from "MBLearn/src/axios-client"
import { act, useEffect, useRef, useState } from "react"

const RoleManagementSetting = () => {
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)


    // Fetch Roles
    useEffect(() => {
        axiosClient.get('/roles')
        .then((Response) => {
            setRoles(Response.data.data)
            setLoading(false)
        })
        .catch(error => console.error(error));
    },[])


    return (
        <div className="mx-5 py-5 row-span-2 col-span-3 grid grid-cols-2 grid-rows-[min-content_auto] gap-2">
                {/* Header */}
                <div className="row-span-1 col-span-2 flex flex-row justify-between items-center pb-2">
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
                                                    <p>{role.users_count} Users</p>
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

                {/* Permision Settings */}
                <div className="row-span-1 col-span-2 flex flex-col gap-5">
                    <div className="row-span-1 col-span-2 flex flex-row justify-between items-center py-5">
                        <div>
                            <h1 className="font-header text-primary text-base">Role Permission</h1>
                            <p className="font-text text-unactive">Cutomize the selected role's permission to the system funtionalities</p>
                        </div>
                    </div>
                </div>

            </div>

    );
}
export default RoleManagementSetting;
