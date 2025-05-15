import { useOption } from "MBLearn/src/contexts/AddUserOptionProvider";
import React, { useEffect, useState } from "react";
import UserSecEntyProps from "../UserSecEntyProps";
import axiosClient from "MBLearn/src/axios-client";
import UserCredentialsLoadingProps from "../UserCredentialsLoadingProps";
import UserReactivationProps from "./UserReactivationProps";
import { faChevronLeft, faChevronRight, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactivationAccountModal from "./ReactivationAccountModal";
import { ScrollArea } from "MBLearn/src/components/ui/scroll-area";

const ReactivationAccountSetting = () => {
    const {departments, titles, cities, location} = useOption();
    const [loading, setLoading] = useState()
    const [users, setUnactiveUsers] = useState([])
    const [reactivate, setReactivate] = useState(false)
    const [user, setUsers] = useState()

    const fetchUsers = () => {
        setLoading(true)
        axiosClient.get('/index-user-creds/inactive',{
            params: {
                page: pageState.currentPage,
                perPage: pageState.perPage
            }
        })
        .then((response) => {
            setUnactiveUsers(response.data.data)
            setLoading(false)
            pageChangeState("totalUsers", response.data.total)
            pageChangeState("lastPage", response.data.lastPage)
        }).catch((e)=>{
            console.log(e)
        })
    }

     //Pagenation States
    const [pageState, setPagination] = useState({
        currentPage: 1,
        perPage: 5,
        totalUsers: 0,
        lastPage:1,
        startNumber: 0,
        endNumber: 0,
        currentPerPage:0
    });

    const pageChangeState = (key, value) => {
        setPagination ((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    useEffect(() => {
            pageChangeState('startNumber', (pageState.currentPage - 1) * pageState.perPage + 1)
            pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.totalUsers))
        },[pageState.currentPage, pageState.perPage, pageState.totalUsers])


    useEffect(() => {
        fetchUsers()
    },[pageState.currentPage, pageState.perPage])

    const openReActivation = (id) => {
        if (id) {
            setUsers(id)
            setReactivate(true)
        }
    };

    const back = () => {
        if (isLoading) return;
        if (pageState.currentPage > 1){
            pageChangeState("currentPage", pageState.currentPage - 1)
            pageChangeState("startNumber", pageState.perPage - 4)
        }
    }
    const next = () => {
        if (isLoading) return;
        if (pageState.currentPage < pageState.lastPage){
            pageChangeState("currentPage", pageState.currentPage + 1)
        }
    }

    //Current page change
    const pageChange = (page) => {
        if(isLoading) return;
        if(page > 0 && page <= pageState.lastPage){
            pageChangeState("currentPage", page)
        }
    }
    //Dynamic Pagging numbering
    const Pages = [];
    for(let p = 1; p <= pageState.lastPage; p++){
        Pages.push(p)
    }

    return(
        <>
        <ScrollArea className="col-span-3 row-span-3 max-h-[calc(100vh-6.25rem)] overflow-auto">
        <div className="mx-5 py-5 row-span-3 col-span-3 grid grid-cols-3 grid-rows-[min-content_min-content_1fr_min-content] gap-2">
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
            <div className="row-start-2 col-start-3 py-2">
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className='row-start-3 col-start-1 col-span-3'>
            <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left min-w-full table-layout-fixed'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary uppercase'>
                        <tr>
                            <th className='p-4 w-2/7'>EMPLOYEE NAME</th>
                            <th className='p-4 w-2/7'>Branch & Location</th>
                            <th className='p-4 w-2/7'>Division & Section</th>
                            <th className='p-4 w-1/7'>Last Login Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            loading ? (
                                Array.from({length: pageState.perPage}).map((_,index) => (
                                    <tr className='font-text text-sm hover:bg-gray-200 hover:cursor-pointer animate-pulse'>
                                        <td className='text-sm py-3 px-4'>
                                            <div className='flex items-center gap-2'>
                                                {/* User Image */}
                                                <div className='bg-blue-500 h-10 w-10 rounded-full'>

                                                </div>
                                                {/* Name */}
                                                <div className="flex flex-col gap-1">
                                                    <div className="h-4 w-40 bg-gray-200 rounded-full"></div>
                                                    <div className="h-4 w-8 bg-gray-200 rounded-full"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex flex-col gap-1'>
                                                <div className="h-4 w-1/2 bg-gray-200 rounded-full"></div>
                                                <div className="h-4 w-8 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex flex-col gap-1'>
                                                <div className="h-4 w-1/2 bg-gray-200 rounded-full"></div>
                                                <div className="h-4 w-8 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4'>
                                                {/* Last Login TimeStamp */}
                                            <div className="h-4 w-1/2 bg-gray-200 rounded-full"></div>
                                        </td>
                                    </tr>
                                ))
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
                                    _division={user.user_infos?.division_id}
                                    _section={user.user_infos?.section_id}
                                    login_time_stamp={user?.last_logged_in}
                                    selected={openReActivation}/>
                                ))
                            )


                        }
                    </tbody>
                </table>
                </div>
            </div>
            <div className="row-start-4 col-start-1 col-span-3 flex flex-row items-center justify-between">
                  <div>
                    {
                        !loading ? (
                            <p className='text-sm font-text text-unactive'>
                                Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                            </p>
                        ) : (
                            <p className='text-sm font-text text-unactive'>
                                Retrieving users.....
                            </p>
                        )
                    }

                </div>
                {/* Paganation */}
                <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a
                            onClick={back}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {
                            loading ? (
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
                        }
                        <a
                            onClick={next}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>

                </div>
            </div>
        </div>
        </ScrollArea>
        <ReactivationAccountModal open={reactivate} close={() => setReactivate(false)} id={user} refresh={()=>fetchUsers()}/>
        </>
    )
}
export default ReactivationAccountSetting
