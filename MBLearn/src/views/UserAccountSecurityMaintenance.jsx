import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import UserListLoadingProps from "../modalsandprops/UserListLoadingProps"
import UserSecEntyProps from "../modalsandprops/UserSecEntyProps"
import { use } from "react"
import axiosClient from "../axios-client"
import User from "../modalsandprops/UserEntryProp"
import { useEffect, useState } from "react"

export default function UserAccountSecurityMaintenance(){
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState([]) //Fetching the user list

    useEffect(() => {
        setIsLoading(true)
        axiosClient.get('/index-user-creds')
        .then((response) => {
            setUsers(response.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false)
        })
    },[])

    return(
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | User Account Security Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>User Account Security Maintenance</h1>
                <p className='font-text text-sm text-unactive' >Handles user credentials, account status, and last login tracking for secure access management..</p>
            </div>

            {/* Search bar */}
            <div className='col-start-4 row-start-1 mr-5 py-3 border-b border-divider'>
                <div className="flex items-center w-full h-full">
                    <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full h-fit font-text shadow-md'>
                        <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                        <div className='bg-primary py-2 px-4 text-white'>
                            <FontAwesomeIcon icon={faSearch}/>
                        </div>
                    </div>
                </div>

            </div>

            {/* UserList Table */}
            <div className='row-start-3 row-span-2 col-start-1 col-span-4 px-5 py-4'>
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left w-full overflow-y-scroll'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary uppercase'>
                        <tr>
                            <th className='py-4 px-4'>EMPLOYEE NAME</th>
                            <th className='py-4 px-4'>Employee ID</th>
                            <th className='py-4 px-4'>Metrobank Working Email</th>
                            <th className='py-4 px-4'>ROLE</th>
                            <th className='py-4 px-4'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            isLoading ? (
                                <UserListLoadingProps/>
                            ) : (
                                users.map(user => (<UserSecEntyProps key={user.id} name={user.name} employeeID={user.employeeID} MBEmail={user.MBemail} role={user.role}/>))
                            )


                        }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}
