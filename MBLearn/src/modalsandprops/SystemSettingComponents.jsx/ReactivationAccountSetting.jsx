import { useOption } from "MBLearn/src/contexts/AddUserOptionProvider";
import React, { useEffect, useState } from "react";
import UserSecEntyProps from "../UserSecEntyProps";
import axiosClient from "MBLearn/src/axios-client";
import UserCredentialsLoadingProps from "../UserCredentialsLoadingProps";

const ReactivationAccountSetting = () => {
    const {departments, titles, cities, location} = useOption();
    const [loading, setLoading] = useState()
    const [users, setUnactiveUsers] = useState([])

    const fetchUsers = () => {
        setLoading(true)
        axiosClient.get('/index-user-creds/inactive',{
            // params: {
            //     page: pageState.currentPage,
            //     perPage: pageState.perPage
            // }
        })
        .then((response) => {
            setUnactiveUsers(response.data.data)
            setLoading(false)
            // pageChangeState("totalUsers", response.data.total)
            // pageChangeState("lastPage", response.data.lastPage)
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(() => {
        fetchUsers()
    },[])

    return(
        <div className="mx-5 py-5 row-span-2 col-span-3 grid grid-cols-2 grid-rows-[min-content_auto] gap-2">
            {/* Header */}
            <div className="row-span-1 col-span-2 flex flex-row justify-between items-center">
                <div>
                    <h1 className="font-header text-primary text-xl">Re-Activation Account Management</h1>
                    <p className="font-text text-unactive">Manage and list all available inactive employee accounts in the system for reactivation or permanent deletion</p>
                </div>
            </div>
            <div className='row-start-2 row-span-2 col-start-1 col-span-4'>
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left min-w-full table-layout-fixed'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary uppercase'>
                        <tr>
                            <th className='p-4 w-2/7'>EMPLOYEE NAME</th>
                            <th className='p-4 w-1/7'>Branch & Location</th>
                            <th className='p-4 w-1/7'>Division & Section</th>
                            <th className='p-4 w-1/7'>ROLE</th>
                            <th className='p-4 w-1/7'>Last Login Timestamp</th>
                            <th className='p-4 w-1/7'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            loading ? (
                                <UserCredentialsLoadingProps/>
                            ) : (
                                users.map(user => (
                                    <UserSecEntyProps
                                        key={user.id}
                                        user={user.id}
                                        name={[user.user_infos?.first_name, user.user_infos?.middle_name, user.user_infos?.last_name].join(" ")}
                                        employeeID={user.user_infos?.employeeID}
                                        MBEmail={user.MBemail}
                                        city={1}
                                        branch={1}
                                        department={1}
                                        title={1}
                                        role={user.user_infos?.roles?.[0]?.role_name}
                                        image={user.user_infos?.profile_image }
                                        status={user.user_infos?.status}
                                        />
                                ))
                            )


                        }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}
export default ReactivationAccountSetting
