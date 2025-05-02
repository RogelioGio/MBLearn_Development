import { useOption } from "MBLearn/src/contexts/AddUserOptionProvider";
import React, { useEffect, useState } from "react";
import UserSecEntyProps from "../UserSecEntyProps";
import axiosClient from "MBLearn/src/axios-client";
import UserCredentialsLoadingProps from "../UserCredentialsLoadingProps";
import UserReactivationProps from "./UserReactivationProps";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactivationAccountModal from "./ReactivationAccountModal";

const ReactivationAccountSetting = () => {
    const {departments, titles, cities, location} = useOption();
    const [loading, setLoading] = useState()
    const [users, setUnactiveUsers] = useState([])
    const [reactivate, setReactivate] = useState(false)
    const [user, setUsers] = useState()

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

    const openReActivation = (id) => {
        if (id) {
            console.log("clicked") // Ensure id is valid before setting state
            setUsers(id)
            setReactivate(true)
        }
    };

    return(
        <>
        <div className="mx-5 py-5 row-span-3 col-span-3 grid grid-cols-3 grid-rows-[min-content_min-content_1fr_min-content] gap-2 h-full">
            {/* Header */}
            <div className="row-span-1 col-span-3 flex flex-row justify-between items-center">
                <div>
                    <h1 className="font-header text-primary text-xl">Re-Activation Account Management</h1>
                    <p className="font-text text-unactive text-xs">Manage and list all available inactive employee accounts in the system for reactivation or permanent deletion</p>
                </div>
            </div>
            <div className="col-start-1 col-span-1 flex flex-col justify-center">
                <div className="w-1/2 py-2 font-header text-primary flex flex-row gap-2 justify-center items-center border-2 border-primary p-2 rounded-md shadow-md hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">
                    <FontAwesomeIcon icon={faFilter}/>
                    <p>Filter</p>
                </div>
            </div>
            <div className="row-start-2 col-start-3 py-3">
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className='row-start-3 row-span-2 col-start-1 col-span-3'>
            <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left min-w-full table-layout-fixed'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary uppercase'>
                        <tr>
                            <th className='p-4 w-2/7'>EMPLOYEE NAME</th>
                            <th className='p-4 w-1/7'>Branch & Location</th>
                            <th className='p-4 w-1/7'>Division & Section</th>
                            <th className='p-4 w-1/7'>Last Login Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            loading ? (
                                <tr className="font-text text-sm hover:bg-gray-200">
                                    <td colSpan={4} className="text-center py-3 px-4 font-text text-primary">
                                        Loading...
                                    </td>
                                </tr>
                            ) : (
                                users.map(user => (
                                    <UserReactivationProps
                                    key={user.id}
                                    id={user.user_infos.id}
                                    image={user.user_infos?.profile_image}
                                    name={[user.user_infos?.first_name, user.user_infos?.middle_name, user.user_infos?.last_name].join(" ")}
                                    MBEmail={user.MBemail}
                                    branch={user.user_infos?.branch_id}
                                    city={user.user_infos?.city_id}
                                    selected={openReActivation}/>
                                ))
                            )


                        }
                    </tbody>
                </table>
                </div>
            </div>
            <div className="row-start-4 col-start-1">
                Paganiation here
            </div>
        </div>
        <ReactivationAccountModal open={reactivate} close={() => setReactivate(false)} id={user}/>
        </>
    )
}
export default ReactivationAccountSetting
