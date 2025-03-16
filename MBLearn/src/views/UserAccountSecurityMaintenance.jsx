import { faChevronLeft, faChevronRight, faFilter, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import UserListLoadingProps from "../modalsandprops/UserListLoadingProps"
import UserSecEntyProps from "../modalsandprops/UserSecEntyProps"
import axiosClient from "../axios-client"
import User from "../modalsandprops/UserEntryProp"
import { useEffect, useState } from "react"
import UserCredentialsLoadingProps from "../modalsandprops/UserCredentialsLoadingProps"
import { useOption } from "../contexts/AddUserOptionProvider"
import EditUserCredsModal from "../modalsandprops/EditUserCredsModal"
import { useFormik } from "formik"
import * as Yup from "yup"
import EditUserSuccessfully from '../modalsandprops/EditUserSuccesfuly';



export default function UserAccountSecurityMaintenance(){
    const {departments,cities,location,roles,titles} = useOption();
    const [isLoading, setIsLoading] = useState(true)
    const [isReady, setIsReady] = useState(false);
    const [users, setUsers] = useState([])
    const [selectedBranches, setSelectedBranches] = useState([])


    const [modalState, setModalState] = useState({
        isEdit:false,
        isEditSuccess: false,
    });

    //CloserSuccess
    const CloseSuccessFullyEdit = () => {
        toggleModal("isEditSuccess", false)
        fetchUsers()
    }

    //Filter
    const [isFiltered, setIsFiltered] = useState(false);
        const resetFilter = () => {
            filterformik.resetForm();
            setIsFiltered(false);
            fetchUsers();
        }

    const filterformik = useFormik({
        initialValues: {
            employee_name: '',
            department: '',
            branch: '',
            city:'',
            role:'',
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
            setIsFiltered(true)
        }
    })


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

    useEffect(()=>{console.log(userID.isEdit)},[userID.isEdit])
    //Open and CLose Modals
    const OpenEdit = (e,ID) => {
        e.stopPropagation();
        toggleUserID("isEdit", ID);
        toggleModal("isEdit", true);
    }
    const CloseEdit = (e) => {
        toggleModal("isEdit", false);
        e.preventDefault()
    }

    useEffect(() => {
        if (departments && cities && location && roles && titles) {
            setIsReady(true); // Mark as ready when all options are loaded
        }
    }, [departments, cities, location, roles, titles]);

    const [pageState, setPagination] = useState({
            currentPage: 1,
            perPage: 5,
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
        axiosClient.get('/index-user-creds',{
            params: {
                page: pageState.currentPage,
                perPage: pageState.perPage
            }
        })
        .then((response) => {
            setUsers(response.data.data)
            setIsLoading(false)
            pageChangeState("totalUsers", response.data.total)
            pageChangeState("lastPage", response.data.lastPage)
            console.log(response.data.data)
        }).catch((e)=>{
            console.log(e)
        })
    }
    useEffect(()=>{
        pageChangeState('startNumber', (pageState.currentPage - 1) * pageState.perPage + 1)
        pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.totalUsers))
    },[pageState.currentPage, pageState.perPage, pageState.totalUsers])


    //fetchUsers
    useEffect(() => {
        if (isReady) {
            fetchUsers(); // Fetch users only when options are ready
        }
    }, [isReady,pageState.currentPage, pageState.perPage])


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

    const handleBranchesOptions = (e) =>{
        const city = e.target.value;
        filterformik.setFieldValue('city', city)
        filterformik.setFieldValue('branch', '')

        //Filtering
        const filteredBranches = location.filter((branch) => branch.city_id.toString() === city)
        setSelectedBranches(filteredBranches)
    }


    return(
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | System Access Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>System Access Maintenance</h1>
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
            <form onSubmit={filterformik.handleSubmit} className='col-start-1 col-span-4 row-start-2 row-span-1 px-5 py-3 grid grid-cols-[auto_auto_auto_auto_auto_min-content] w-full gap-2'>
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
                            {
                                selectedBranches.map((location) => (
                                    <option key={location.id} value={location.id}>{location.branch_name}</option>
                                ))
                            }
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className="inline-flex flex-col gap-1">
                    <label htmlFor="role" className="font-header text-xs flex flex-row justify-between">
                        <p className="text-xs font-text text-unactive">Employee Account Role</p>
                    </label>
                    <div className="grid grid-cols-1">
                        <select id="role" name="role" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                            value={filterformik.values.role}
                            onChange={filterformik.handleChange}
                            onBlur={filterformik.handleBlur}
                            >
                            <option value=''>Employee Account Role</option>
                            {
                                roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.role_name}</option>
                                ))
                            }
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

                {/* Filter Button */}
                <div className='flex-row flex justify-end py-1 gap-2 items-end'>
                <button type='submit'>
                    <div className='aspect-square px-3 flex flex-row justify-center items-center bg-primary rounded-md shadow-md hover:cursor-pointer hover:scale-105 ease-in-out transition-all '>
                        <FontAwesomeIcon icon={faFilter} className='text-white text-sm'/>
                    </div>
                </button>
                {
                    isFiltered ? (
                    <button type='button' onClick={resetFilter}>
                        <div className='aspect-square px-3 flex flex-row justify-center items-center border-2 border-primary rounded-md shadow-md hover:cursor-pointer hover:scale-105 ease-in-out transition-all '>
                            <FontAwesomeIcon icon={faXmark} className='text-primary text-sm'/>
                        </div>
                    </button>):(
                        null
                    )
                }
                </div>
            </form>

            {/* UserList Table */}
            <div className='row-start-3 row-span-2 col-start-1 col-span-4 px-5 py-4'>
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left min-w-full table-layout-fixed'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary uppercase'>
                        <tr>
                            <th className='p-4 w-2/7'>EMPLOYEE NAME</th>
                            <th className='p-4 w-1/7'>Metrobank Working Email</th>
                            <th className='p-4 w-1/7'>ROLE</th>
                            <th className='p-4 w-1/7'>Last Login Timestamp</th>
                            <th className='p-4 w-1/7'>Account Status</th>
                            <th className='p-4 w-1/7'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            isLoading ? (
                                <UserCredentialsLoadingProps/>
                            ) : (
                                users.map(user => (
                                    <UserSecEntyProps
                                        key={user.id}
                                        user={user.id}
                                        name={[user.user_infos?.first_name, user.user_infos?.middle_name, user.user_infos?.last_name].join(" ")}
                                        employeeID={user.user_infos.employeeID}
                                        MBEmail={user.MBemail}
                                        city={1}
                                        branch={1}
                                        department={1}
                                        title={1}
                                        role={user.user_infos?.roles?.[0]?.role_name}
                                        image={user.user_infos?.profile_image }
                                        status={user.user_infos?.status}
                                        edit={OpenEdit}
                                        />
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
            <EditUserCredsModal open={modalState.isEdit} close={CloseEdit} ID={userID.isEdit}/>
            <EditUserSuccessfully open={modalState.isEditSuccess} close={CloseSuccessFullyEdit}/>
        </div>
    )
}
