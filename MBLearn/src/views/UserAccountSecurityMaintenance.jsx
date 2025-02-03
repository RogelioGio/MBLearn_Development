import { faChevronLeft, faChevronRight, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import UserListLoadingProps from "../modalsandprops/UserListLoadingProps"
import UserSecEntyProps from "../modalsandprops/UserSecEntyProps"
import { use } from "react"
import axiosClient from "../axios-client"
import User from "../modalsandprops/UserEntryProp"
import { useEffect, useState } from "react"
import React from "react"
import UserCredentialsLoadingProps from "../modalsandprops/UserCredentialsLoadingProps"
import { provide } from "vue"

export default function UserAccountSecurityMaintenance(){
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState([]) //Fetching the user list

    const [pageState, setPagination] = useState({
            currentPage: 1,
            perPage: 6,
            totalUsers: 0,
            lastPage: 1,
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

    const fetchUsers = () => {
        setIsLoading(true)

        //API Calls
        Promise.all([
            //Get User-credentials
            axiosClient.get('/index-user-creds',{
                params: {
                    page: pageState.currentPage,
                    perPage: pageState.perPage,
                }
            }),
            //Get userProfiles
            axiosClient.get('/get-profile-image',{
                params: {
                    page: pageState.currentPage,
                    perPage: pageState.perPage,
                }
            })
        ])
        .then(([usercreds, userprofiles]) => {
            const users = usercreds.data.data
            const profile_img = userprofiles.data.data

            const userWithProfile = users.map(user =>{
                const profile = profile_img.find(p => p.employeeID === user.employeeID);

                return {
                    ...user,
                    profile_img: profile ? profile.profile_image : null
                }
            })
            setUsers(userWithProfile)
            pageChangeState("totalUsers", usercreds.data.total)
            pageChangeState("lastPage", usercreds.data.last)
            setIsLoading(false)
            console.log(userWithProfile)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(()=>{
        pageChangeState('startNumber', (pageState.currentPage - 1) * pageState.perPage + 1)
        pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.totalUsers))
    },[pageState.currentPage, pageState.perPage, pageState.totalUsers])


    //fetchUsers
    useEffect(() => {
        fetchUsers()
    }, [pageState.currentPage, pageState.perPage])


    //Pagination Navigations
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

            {/* User Filter */}
            <div className='col-start-1 row-start-2 row-span-1 px-5 pt-3'>
            <button className='flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md'>
                <p>Filter</p>
                <FontAwesomeIcon icon={faFilter}/>
            </button>
            </div>

            {/* UserList Table */}
            <div className='row-start-3 row-span-2 col-start-1 col-span-4 px-5 py-4'>
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left min-w-full table-layout-fixed'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary uppercase'>
                        <tr>
                            <th className='p-4 w-1/5'>EMPLOYEE NAME</th>
                            <th className='p-4 w-1/5'>Employee ID</th>
                            <th className='p-4 w-1/5'>Metrobank Working Email</th>
                            <th className='p-4 w-1/5'>ROLE</th>
                            <th className='p-4 w-1/5'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            isLoading ? (
                                <UserCredentialsLoadingProps/>
                            ) : (
                                users.map(user => (
                                    <UserSecEntyProps key={user.id} name={user.name} employeeID={user.employeeID} MBEmail={user.MBemail} role={user.role} image={user.profile_img}/>
                                ))
                            )


                        }
                    </tbody>
                </table>
                </div>
            </div>

            {/* Pagination */}
            <div className='row-start-5 row-span-1 col-start-1 col-span-4 border-t border-divider mx-5 py-3 flex flex-row items-center justify-between'>
                {/* Total number of entries and only be shown */}
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                    </p>
                </div>
                {/* Paganation */}
                <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a href="#"
                            onClick={back}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {Pages.map((page)=>(
                            <a href="#"
                                key={page}
                                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                    ${
                                        page === pageState.currentPage
                                        ? 'bg-primary text-white'
                                        : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                    } transition-all ease-in-out`}
                                    onClick={() => pageChange(page)}>
                                {page}</a>
                        ))}
                        <a href="#"
                            onClick={next}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>

            {/* View User Credentials Modal */}
            {/* Edit User Credentials Modal */}
            {/* Delete User Credentials Modal */}
        </div>
    )
}
