import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faFilter, faSearch, faTrash, faTrashCan, faUser, faUserPen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import User from '../modalsandprops/UserEntryProp';
import UserEntryModal from '../modalsandprops/UserEntryModal';
import axiosClient from '../axios-client';
import { use } from 'react';
import AddUserModal from '../modalsandprops/AddUserModal';

//User Filter
const Userfilter = [
    {
        id:'role',
        name: 'User Role',
        option: [
            {value: 'system_admin' , label: 'System-Administrator', checked: false },
            {value: 'course_admin' , label: 'Course-Administrator', checked: false },
            {value: 'learner' , label: 'Learner', checked: false },
        ]
    },
    {
        id:'department',
        name: 'Department/Business Unit',
        option: [
            {value: 'humanresources' , label: 'Human Resources (HR)', checked: false },
            {value: 'infotech' , label: 'Information Technology Support', checked: false },
            {value: 'customersupport' , label: 'Customer Support', checked: false },
            {value: 'facility' , label: 'Facility Management', checked: false },
        ]
    },

    {
        id:'branch_location',
        name: 'Branch & Location',
        option: [
            {value: 'makati' , label: 'Makati', checked: false },
            {value: 'taguig' , label: 'Taguig', checked: false },
            {value: 'manila' , label: 'Manila', checked: false },
            {value: 'quezon_city' , label: 'Quezon City', checked: false },
            {value: 'pasig' , label: 'Pasig', checked: false },
        ]
    },
]


export default function UserManagementMaintenance() {

    //Modal State mounting
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAdd, setOpenAdd] = useState(false)
    const [userID, setUserID] = useState(null); //Fethcing the selected user in the list
    const [users, setUsers] = useState([]) //Fetching the user list

    //Modal Open and Close Function
    const OpenDialog = (ID) => {
        setIsOpen(true)
        setUserID(ID)
    }
    const CloseDialog = () => {
        setIsOpen(false)
    }

    //Close Modal
    const CloseAddUser = () => {
        setOpenAdd(false)
    }

    //Fetching Users in the database using axios
    useEffect(()=>{
        axiosClient.get('/userinfo').then(response => {
            setUsers(response.data);
        }).catch(err => {
            console.log(err)
        })
    },[])



    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | User Management Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>User Management Maintenance</h1>
                <p className='font-text text-sm text-unactive' >Effortlessly manage and add users to ensure seamless access and control.</p>
            </div>


            {/* Add Button */}
            <div className='col-start-4 row-start-1 flex flex-col justify-center pl-5 mr-5 border-divider border-b'>
                <button className='inline-flex flex-row shadow-md items-center justify-center bg-primary font-header text-white text-base p-4 rounded-full hover:bg-primaryhover hover:scale-105 transition-all ease-in-out' onClick={() => setOpenAdd(true)}>
                    <FontAwesomeIcon icon={faUserPlus} className='mr-2'/>
                    <p>Add User</p>
                </button>
            </div>


            {/* Search bar */}
            <div className='inline-flex items-center col-start-4 row-start-2 px-5 py-3 h-fit'>
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>


            {/* User Filter */}
            <div className='col-start-1 row-start-2 row-span-1 px-5 py-3'>
            <button className='flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md'>
                <p>Filter</p>
                <FontAwesomeIcon icon={faFilter}/>
            </button>
            </div>

            {/* Userlist/Table */}
            <div className='row-start-3 row-span-2 col-start-1 col-span-4 px-5 py-2'>
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left w-full overflow-y-scroll'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                        <tr>
                            <th className='py-4 px-4'>EMPLOYEE NAME</th>
                            <th className='py-4 px-4'>DEPARTMENT</th>
                            <th className='py-4 px-4'>BRANCH</th>
                            <th className='py-4 px-4'>ROLE</th>
                            <th className='py-4 px-4'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            users.map(userEntry => (
                                <User key={userEntry.id} userID={userEntry.id} click={OpenDialog} name={userEntry.name} department={userEntry.department} title={userEntry.title} branch={userEntry.branch} city={userEntry.city} profile_url={userEntry.profile_image}/>
                            ))
                        }
                    </tbody>
                </table>
                </div>
            </div>

            {/* Sample Footer Pagenataion */}
            <div className='row-start-5 row-span-1 col-start-1 col-span-4 border-t border-divider mx-5 py-3 flex flex-row items-center justify-between'>
                {/* Total number of entries and only be shown */}
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>1</span> to <span className='font-header text-primary'>3</span> of {/*here is the backend code for total entries*/}
                        <span className='font-header text-primary'>97</span> <span className='text-primary'>results</span>
                    </p>
                </div>
                {/* Paganation */}
                <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a href="#" className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <a href="#" className='relative z-10 inline-flex item center bg-primary px-4 py-2 text-sm font-header text-white ring-1 ring-divider ring-inset'>1</a>
                        <a href="#" className='relative z-10 inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>2</a>
                        <a href="#" className= 'relative z-10 inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>3</a>
                        <span className='relative inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all eas'>...</span>
                        <a href="#" className='relative z-10 inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>8</a>
                        <a href="#" className='relative z-10 inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>9</a>
                        <a href="#" className='relative z-10 inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>10</a>
                        {/* Next */}
                        <a href="#" className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>

            {/* User Profile Card */}
            <UserEntryModal open={isOpen} close={CloseDialog} classname='relative z-10' ID={userID}/>

            {/* Add User Modal */}
            <AddUserModal open={isOpenAdd} close={CloseAddUser} />
        </div>

    )
}
