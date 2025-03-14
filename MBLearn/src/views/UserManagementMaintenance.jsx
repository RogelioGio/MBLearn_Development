import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faFilter, faSearch, faTrash, faTrashCan, faUser, faUserPen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import User from '../modalsandprops/UserEntryProp';
import UserEntryModal from '../modalsandprops/UserEntryModal';
import axiosClient from '../axios-client';
import AddUserModal from '../modalsandprops/AddUserModal';
import { TailSpin } from 'react-loader-spinner'
import UserListLoadingProps from '../modalsandprops/UserListLoadingProps';
import EditUserModal from '../modalsandprops/EditUserModal';
import DeleteUserModal from '../modalsandprops/DeleteUserModal';
import DeleteUserSuccessfully from '../modalsandprops/DeleteUserSuccessfully';
import UserManagemenFilterPopover from '../modalsandprops/UserManagementFilterPopover';
import { useOption } from '../contexts/AddUserOptionProvider';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

export default function UserManagementMaintenance() {
    const {departments,cities,location} = useOption();

    const [selectedBranches, setSelectedBranches] = useState([])
    const handleBranchesOptions = (e) =>{
        const city = e.target.value;
        filterformik.setFieldValue('city', city)
        filterformik.setFieldValue('branch', '')

        //Filtering
        const filteredBranches = location.filter((branch) => branch.city_id.toString() === city)
        setSelectedBranches(filteredBranches)
    }

    //filterFormik
    const filterformik = useFormik({
        initialValues: {
            employee_name: '',
            department: '',
            branch: '',
            city:'',
            role: '',
        },
        validationSchema: Yup.object({
            employee_name: Yup.string(),
            department: Yup.string(),
            city: Yup.string(),
            branch: Yup.string(),
            role: Yup.string(),
        }),
        onSubmit: values => {
            console.log(values)
        }
    })

    //Modal State
    const [modalState, setModalState] = useState({
        isOpen: false,
        isOpenAdd:false,
        isEdit:false,
        isDelete: false,
        isDeleteSuccess: false,
    });

    //Modal state changes
    const toggleModal = (key,value) => {
        setModalState((prev => ({
            ...prev,
            [key]:value,
        })));
    }

    //Action User Button State
    const [userID, setUserID] = useState({
        isEdit:'',
        isDelete:'',
        isSelect:'',
    })
    const toggleUserID = (key,value) => {
        setUserID((prev => ({
            ...prev,
            [key]:value,
        })));
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

    //User State
    const [users, setUsers] = useState([]) //Fetching the user list

    //Loading State
    const [isLoading, setLoading] = useState(true);

    //Open and Closing User Description
    const OpenDialog = (ID) => {
        setUserID(ID);
        toggleModal("isOpen",true);
    }
    const CloseDialog = () => {
        setUserID('');
        toggleModal("isOpen",false);
    }

    //Close Add User Modal
    const CloseAddUser = () => {
        toggleModal("isOpenAdd", false)
        fetchUsers()
    }


    // Open and Close Edit User Modal
    const OpenEdit = (e, ID) => {
        e.stopPropagation();
        toggleUserID("isEdit", ID);
        toggleModal("isEdit", true);
    }
    const CloseEdit = () => {
        toggleModal("isEdit", false);
        fetchUsers()
    }

    // Open and Close Delete User Modal
    const OpenDelete = (e, EmployeeID) => {
        e.stopPropagation();
        setUserID(EmployeeID)
        toggleModal("isDelete", true);
    }

    const CloseDelete = () => {
        toggleModal("isDelete", false);

    }

    //Close DeleteSuccess Modal
    const OpenSuccessFullyDelete = () => {
        toggleModal("isDeleteSuccess", true);
    }

    const CloseSuccessFullyDelete = () => {
        toggleModal("isDeleteSuccess", false);
        fetchUsers()
    }

    //Fetching Users in the database using axios
    const fetchUsers = () => {
        setLoading(true)
        axiosClient.get('/index-user',{
            params: {
                page: pageState.currentPage,
                perPage: pageState.perPage,
            }
        }).then(response => {;
            setUsers(response.data.data)
            pageChangeState("totalUsers", response.data.total)
            pageChangeState("lastPage", response.data.lastPage)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    }
    useEffect(() => {
        pageChangeState('startNumber', (pageState.currentPage - 1) * pageState.perPage + 1)
        pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.totalUsers))
    },[pageState.currentPage, pageState.perPage, pageState.totalUsers])

    useEffect(()=>{
        fetchUsers()
    },[pageState.currentPage, pageState.perPage])

    //Next and Previous
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

    useEffect(() => {
        console.log(userID.isEdit)
    },[userID.isEdit])
    return (
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
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
                <button className='inline-flex flex-row shadow-md items-center justify-center bg-primary font-header text-white text-base p-4 rounded-full hover:bg-primaryhover hover:scale-105 transition-all ease-in-out' onClick={() => toggleModal("isOpenAdd",true)}>
                    <FontAwesomeIcon icon={faUserPlus} className='mr-2'/>
                    <p>Add User</p>
                </button>
            </div>


            {/* Search bar */}
            <div className='inline-flex items-center justify-center col-start-4 row-start-2 px-5 py-3 h-full'>
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>


            {/* User Filter */}
            <form onSubmit={filterformik.handleSubmit} className='col-start-1 col-span-3 row-start-2 row-span-1 px-5 py-3 grid grid-cols-[auto_auto_auto_auto_min-content] w-full gap-2'>
                    <div className="inline-flex flex-col gap-1">
                    <label htmlFor="employee_name" className="font-header text-xs flex flex-row justify-between">
                        <p className="text-xs font-text text-unactive">Employees Name Section </p>
                    </label>
                    <div className="grid grid-cols-1">
                        <select id="employee_name" name="employee_name" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                            value={filterformik.values.employee_name}
                            onChange={filterformik.handleChange}
                            onBlur={filterformik.handleBlur}
                            >
                            <option value=''>Select an Section</option>
                            <option value='1'>A-G</option>
                            <option value='2'>H-N</option>
                            <option value='3'>O-T</option>
                            <option value='4'>U-Z</option>
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    </div>
                <div className="inline-flex flex-col gap-1">
                <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                    <p className="text-xs font-text text-unactive">Employees Department </p>
                </label>
                <div className="grid grid-cols-1">
                    <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                        value={filterformik.values.department}
                        onChange={filterformik.handleChange}
                        onBlur={filterformik.handleBlur}
                        >
                        <option value=''>Select Department</option>
                        {
                            departments.map((department) => (
                                <option key={department.id} value={department.id}>{department.department_name}</option>
                            ))
                        }
                    </select>
                    <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </div>
                </div>
                <div className="inline-flex flex-col gap-1">
                <label htmlFor="city" className="font-header text-xs flex flex-row justify-between">
                    <p className="text-xs font-text text-unactive">Branch City</p>
                </label>
                <div className="grid grid-cols-1">
                    <select id="city" name="city" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                        value={filterformik.values.city}
                        onChange={handleBranchesOptions}
                        onBlur={filterformik.handleBlur}
                        >
                        <option value=''>Select Branch City</option>
                        {
                            cities.map((city) => (
                                <option key={city.id} value={city.id}>{city.city_name}</option>
                            ))
                        }
                    </select>
                    <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </div>
                </div>
                <div className="inline-flex flex-col gap-1">
                <label htmlFor="branch" className="font-header text-xs flex flex-row justify-between">
                    <p className="text-xs font-text text-unactive">Branch Location</p>
                </label>
                <div className="grid grid-cols-1">
                    <select id="branch" name="branch" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                        value={filterformik.values.branch}
                        onChange={filterformik.handleChange}
                        onBlur={filterformik.handleBlur}
                        >
                        <option value=''>Select Branch Location</option>
                        {selectedBranches.map((branch) => (
                            <option key={branch.id} value={branch.id}>{branch.branch_name}</option>
                        ))}
                    </select>
                    <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </div>
                </div>
                {/* Filter Button */}
                <div className='w-4/5 flex-col flex justify-end py-1'>
                    <div className='aspect-square px-4 flex flex-row justify-center items-center bg-primary rounded-md shadow-md hover:cursor-pointer hover:scale-105 ease-in-out transition-all '>
                        <FontAwesomeIcon icon={faFilter} className='text-white text-sm'/>
                    </div>
                </div>
            </form>


            {/* Userlist Table */}
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
                            isLoading ? (
                                <UserListLoadingProps className="z-10"/>
                            ) : (
                                users.map(userEntry => {
                                    const { first_name, middle_name, last_name } = userEntry || {};
                                    const fullName = [first_name, middle_name, last_name].filter(Boolean).join(" ");
                                    return(<User
                                            key={userEntry.id}
                                            userID={userEntry.id}
                                            click={OpenDialog}
                                            name={fullName}
                                            department={userEntry.department?.department_name || "No Department Yet"}
                                            title={userEntry.title?.title_name || "No Title Yet"}
                                            branch={userEntry.branch?.branch_name || "No Branch Yet"}
                                            city={userEntry.city?.city_name || "No City Yet"}
                                            profile_url={userEntry.profile_image}
                                            employeeID={userEntry.employeeID}
                                            role={userEntry.roles?.[0]?.role_name || "No Role Yet"}
                                            edit={OpenEdit}
                                            _delete={OpenDelete}
                                            />)
                                    }

                            )
                        )

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
                        Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                    </p>
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
                        {Pages.map((page)=>(
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
                        ))}
                        <a
                            onClick={next}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>


                    {/* User Profile Card */}
                    <UserEntryModal open={modalState.isOpen} close={CloseDialog} classname='relative z-10' ID={userID}/>

                    {/* Add User Modal */}
                    <AddUserModal open={modalState.isOpenAdd} close={CloseAddUser} updateTable={fetchUsers}/>

                    {/* Edit User Modal */}
                    <EditUserModal open={modalState.isEdit} close={CloseEdit} ID={userID.isEdit}/>

                    {/* Delete User Modal */}
                    <DeleteUserModal open={modalState.isDelete} close={CloseDelete} EmployeeID={userID.isDelete} close_confirmation={OpenSuccessFullyDelete}/>
                    <DeleteUserSuccessfully open={modalState.isDeleteSuccess} close={CloseSuccessFullyDelete}/>

        </div>

    )
}
