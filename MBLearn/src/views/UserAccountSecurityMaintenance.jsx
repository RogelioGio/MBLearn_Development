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
import { resolvePath } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import echo from "MBLearn/echo"
import { toast } from "sonner"


export default function UserAccountSecurityMaintenance(){
    const {user} = useStateContext();
    const {departments,cities,location,roles,titles} = useOption();
    const [isLoading, setIsLoading] = useState(true)
    const [isReady, setIsReady] = useState(false);
    const [users, setUsers] = useState([])
    const [selectedBranches, setSelectedBranches] = useState([])
    const [SelectedUser, setSelectedUser] = useState()

    const [modalState, setModalState] = useState({
        isEdit:false,
        isEditSuccess: false,
    });

    //OpenSuccess
    const OpenSuccessFullyEdit = () => {
        toggleModal("isEditSuccess", true)
    }

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
            department: '',
            branch: '',
            city:'',
            role:'',
        },
        validationSchema: Yup.object({
            department: Yup.string(),
            city: Yup.string(),
            branch: Yup.string(),
            role: Yup.string(),
        }),
        onSubmit: values => {
            setIsLoading(true)
            setIsFiltered(true)
            axiosClient.get(`/index-user-creds?department_id[eq]=${values.department}&branch_id[eq]=${values.branch}&role_id[eq]=${values.role}`)
            .then((res) => {
                setUsers(res.data.data);
                console.log(res)
                setIsLoading(false)
                pageChangeState("totalUsers", res.data.total)
                pageChangeState("lastPage", res.data.lastPage)
            }).catch((err) => {console.log(err)})
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
    const OpenEdit = (e,ID, User) => {
        const hasPermission = user.user_infos.permissions?.some(
            (permission) =>
                permission.permission_name === "EditUserRoles" ||
                permission.permission_name === "EditUserCredentials"
        );

        if (!hasPermission) return;

        setSelectedUser(User)

        e.stopPropagation();
        toggleUserID("isEdit", ID);
        toggleModal("isEdit", true);
    }
    const CloseEdit = () => {
        toggleModal("isEdit", false);
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
            console.log(response)
            setIsLoading(false)
            pageChangeState("totalUsers", response.data.total)
            pageChangeState("lastPage", response.data.lastPage)
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
    }, [isReady,pageState.currentPage, pageState.perPage,])


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
        <div className='grid grid-cols-4 h-full w-full
                        xl:grid-rows-[6.25rem_min-content_auto_auto_min-content]
                        sm:grid-rows-[6.25rem_min-content_auto]'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | System Access Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center row-span-1 pr-5 border-b border-divider
                            xl:col-span-3
                            sm:col-span-2'>
                <h1 className='text-primary font-header
                                xl:text-4xl'>System Access Maintenance</h1>
                <p className='font-text text-unactive
                                xl:text-sm
                                sm:text-xs' >Handles user credentials, account status, and last login tracking for secure access management..</p>
            </div>

            {/* Search bar */}
            <div className='row-start-1 mr-5 py-3 border-b border-divider
                            xl:col-start-4
                            sm:col-start-3 sm:col-span-2'>
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
            <form onSubmit={filterformik.handleSubmit} className='col-start-1 col-span-4 row-start-2 row-span-1 py-3 grid grid-cols-[auto_auto_auto_auto_auto_min-content] w-full gap-2'>
                {/* <div className="inline-flex flex-col gap-1">
                    <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                        <p className="text-xs font-text text-unactive">Department </p>
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
                        <p className="text-xs font-text text-unactive">City</p>
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
                        <p className="text-xs font-text text-unactive"> Location</p>
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
                </div> */}

                <div className="inline-flex flex-col gap-1">
                    <label htmlFor="role" className="font-header text-xs flex flex-row justify-between">
                        <p className="text-xs font-text text-unactive">Account Role</p>
                    </label>
                    <div className="grid grid-cols-1">
                        <select id="role" name="role" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                            value={filterformik.values.role}
                            onChange={filterformik.handleChange}
                            onBlur={filterformik.handleBlur}
                            >
                            <option value=''>Select Account Role</option>
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
                <div className='flex-row flex justify-start py-1 gap-2 items-end'>
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
            <div className='row-start-3 row-span-2 col-start-1 col-span-4 pr-5 py-4'>
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left min-w-full table-layout-fixed'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary uppercase'>
                        <tr>
                            <th className='p-4 w-2/8'>EMPLOYEE NAME</th>
                            {/* <th className='p-4 w-1/8'>DIVISION</th>
                            <th className='p-4 w-1/8'>DEPARTMENT</th>
                            <th className='p-4 w-1/8'>SECTION</th> */}
                            <th className='p-4 w-1/8'>Metrobank Email</th>
                            <th className='p-4 w-1/8'>ROLE</th>
                            <th className='p-4 w-1/8'>Last Login Timestamp</th>
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
                                        employeeID={user.user_infos?.employeeID}
                                        MBEmail={user.MBemail}
                                        city={user.user_infos?.city?.city_name}
                                        branch={user.user_infos?.branch?.branch_name}
                                        division = {user.user_infos?.division?.division_name}
                                        department={user.user_infos?.department?.department_name}
                                        section={user.user_infos?.section?.section_name}
                                        role={user.user_infos?.roles?.[0]?.role_name}
                                        image={user.user_infos?.profile_image }
                                        status={user.user_infos?.status}
                                        lastLogin={user?.last_logged_in}
                                        edit={OpenEdit}
                                        select={user}
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
                    {
                        isLoading ? (<p className='text-sm font-text text-unactive'>Retrieving users.....</p>):
                        (
                            <p className='text-sm font-text text-unactive'>
                                Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                            </p>
                        )
                    }

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
                        {
                            isLoading ? (
                                <a href="#" className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset`}>...</a>
                            ) : (
                                Pages.map((page)=>(
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
                                ))
                            )
                        }
                        <a href="#"
                            onClick={next}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>

            {/* View User Credentials Modal */}
            <EditUserCredsModal open={modalState.isEdit} close={CloseEdit} ID={userID.isEdit} editSuccess={OpenSuccessFullyEdit} User={SelectedUser}/>
            <EditUserSuccessfully open={modalState.isEditSuccess} close={CloseSuccessFullyEdit}/>
        </div>
    )
}
