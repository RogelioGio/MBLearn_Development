import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faCross, faFilter, faMagnifyingGlass, faSearch, faTrash, faTrashCan, faUser, faUserPen, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
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
import EditUserSuccessfully from '../modalsandprops/EditUserSuccesfuly';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet"
import echo from 'MBLearn/echo';
import { toast } from 'sonner';



export default function UserManagementMaintenance() {
    const {departments,cities,location, division, section} = useOption();
    const [checkedUsers, setCheckedUser] = useState([]);
    const selectAllRef = useRef(null);
    const [selectAll, setSelectAll] = useState(false);
    const [search, setSearch] = useState(false)
    const navigate = useNavigate();
    const {user} = useStateContext();

    //User State
    const [users, setUsers] = useState([]) //Fetching the user list


    useEffect(()=>{
        setCheckedUser([])
    },[])


    const [selectedBranches, setSelectedBranches] = useState([])
    const handleBranchesOptions = (e) =>{
        const city = e.target.value;
        filterformik.setFieldValue('city', city)
        filterformik.setFieldValue('branch', '')

        //Filtering
        const filteredBranches = location.filter((branch) => branch.city_id.toString() === city)
        setSelectedBranches(filteredBranches)
    }

    // State to track if the user list is filtered
    const [isFiltered, setIsFiltered] = useState(false);
    const resetFilter = () => {
        filterformik.resetForm();
        setIsFiltered(false);
        fetchUsers();
    }

    //filterFormik
    const filterformik = useFormik({
        initialValues: {
            division: '',
            department: '',
            section: '',
            branch: '',
            city:'',
        },
        validationSchema: Yup.object({
            department: Yup.string(),
            city: Yup.string(),
            branch: Yup.string(),
        }),
        onSubmit: values => {
            console.log(values)
            setLoading(true)
            setIsFiltered(true); // Set to true when filtered
            axiosClient.get(`/index-user?division_id[eq]=${values.division}&department_id[eq]=${values.department}&section_id[eq]=${values.section}&branch_id[eq]=${values.branch}`)
            .then((res) => {
                setUsers(res.data.data);
                setLoading(false)
            }).catch((err) => {console.log(err)})
        }
    })

    //SearchFormik
    const searchFormik = useFormik(({
        initialValues:{
            search: '',
            page: 1,
            per_page: 5,
            status: 'Active',
        },
        validationSchema: Yup.object({}),
        onSubmit: values => {
            console.log(values);
            const payload = {
                search: values.search,
                page: values.page,
                per_page: values.per_page,
                status: values.status,
            };
            setLoading(true);
            setSearch(true);
            // axiosClient.get('/user-search', {params: payload})
            // .then((response) => {
            //     console.log(response.data);
            //     setUsers(response.data.data);
            //     setLoading(false)
            //     pageChangeState("totalUsers", response.data.total)
            //     pageChangeState("lastPage", response.data.lastPage)

            // }).catch((e) => {console.log(e)})
        }
    }))

    //Modal State
    const [modalState, setModalState] = useState({
        isOpen: false,
        isOpenAdd:false,
        isEdit:false,
        isEditSuccess: false,
        isDelete: false,
        isDeleteSuccess: false,
    });

    //Handle Checkbox
    const handleCheckbox = (e, id) => {
        e.stopPropagation();
        setCheckedUser((prev) => {
            if (!id) return;

            const exists = prev.some(
                (user) => user.Selected_ID === id
            );

            if (exists) {
                return prev.filter(
                    (user) => user.Selected_ID !== id
                );
            } else {
                return [...prev, { Selected_ID: id }];
            }
        });
    };

    // Handle Select All Checkbox
    const handleSelectAll = (e) => {
        setSelectAll(e.target.checked);
        if (e.target.checked) {
            const allUserIds = users.map(user => ({ Selected_ID: user.id }));
            setCheckedUser(allUserIds);
        } else {
            setCheckedUser([]);
        }
    };

    // Function to count checked users
    const countCheckedUsers = () => {
        return checkedUsers.length;
    };

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
        isDetail:'',
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


    //Loading State
    const [isLoading, setLoading] = useState(true);

    //Selected User Object
    const [selectedUser, setSelectedUser] = useState()

    //Open and Closing User Description
    const OpenDialog = (user) => {
        setSelectedUser(user);
        //setUserID(ID);
        toggleModal("isOpen",true);
    }
    const CloseDialog = () => {
        //setUserID('');
        toggleModal("isOpen",false);
    }

    //Close Add User Modal
    const CloseAddUser = () => {
        toggleModal("isOpenAdd", false)
        fetchUsers()
    }


    // Open and Close Edit User Modal
    const OpenEdit = (e, user) => {
        e.stopPropagation();
        //toggleUserID("isEdit", ID);
        setSelectedUser(user)
        toggleModal("isEdit", true);
    }
    const CloseEdit = () => {
        // setSelectedUser()
        toggleModal("isEdit", false);
    }

    // Open and Close Delete User Modal
    const OpenDelete = (e, user) => {
        e.stopPropagation();
        setSelectedUser(user)
        //toggleUserID("isDelete", EmployeeID);
        toggleModal("isDelete", true);
    }

    const CloseDelete = () => {
        toggleModal("isDelete", false);
    }

    //Close DeleteSuccess Modal
    const OpenSuccessFullyDelete = () => {
        toggleModal("isDeleteSuccess", true)
        pageChangeState("currentPage", 1);
    }

    const CloseSuccessFullyDelete = () => {
        toggleModal("isDeleteSuccess", false);
        fetchUsers()
    }

    //Close Edit Success
    const OpenSuccessFullyEdit = () => {
        toggleModal("isEditSuccess", true)
        pageChangeState("currentPage", 1);
    }
    const CloseSuccessFullyEdit = () => {
        toggleModal("isEditSuccess", false)
        fetchUsers()
    }

    //Open the user detail page
    const OpenDetailView = (e, id) => {
        e.stopPropagation()
        navigate(`/systemadmin/userdetail/${id}`)
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
            setIsFiltered(false); // Set to false when not filtered
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

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = checkedUsers.length > 0 && checkedUsers.length < users.length;
        }
    }, [checkedUsers, users]);

    return (
        <div className='grid grid-cols-4 h-full w-full
                        grid-rows-[6.25rem_min-content]
                        xl:grid-rows-[6.25rem_min-content_auto_auto_min-content]
                        sm:grid-rows-[6.25rem_min-content]'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | User Management Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center row-span-1 border-b border-divider
                            col-start-1 row-start-1 col-span-3 ml-3
                            xl:col-span-3
                            sm:col-span-3 sm:ml-4'>
                <h1 className='text-primary font-header
                                text-xl
                                sm:text-2xl
                                xl:text-4xl'>User Management Maintenance</h1>
                <p className='font-text text-unactive
                                text-xs
                                xl:text-sm
                                sm:text-xs'>Effortlessly manage and add users to ensure seamless access and control.</p>
            </div>


            {/* Add Button */}
            <div className='row-start-1 flex flex-col justify-center border-divider border-b
                            items-end mr-3
                            xl:col-start-4 xl:pl-5 xl:mr-5
                            sm:col-span-1 sm:col-start-4 sm:py-2 sm:mr-4'>
                {
                    user.user_infos.permissions?.some((permission)=> permission.permission_name === "AddUserInfo") ? (
                        <>
                        <div className='relative group sm:w-full'>
                            <button className='inline-flex flex-row shadow-md items-center justify-center bg-primary font-header text-white text-base p-4 rounded-full hover:bg-primaryhover hover:scale-105 transition-all ease-in-out
                                            w-16 h-16
                                            sm:w-full'
                                onClick={() => {
                                toggleModal("isOpenAdd",true)}}>
                                <FontAwesomeIcon icon={faUserPlus} className='sm:mr-2'/>
                                <p className='hidden
                                            sm:block'>Add User</p>
                            </button>
                            <div className='absolute bottom-[-2.5rem] w-full bg-tertiary rounded-md text-white font-text text-xs p-2 items-center justify-center whitespace-nowrap scale-0 group-hover:scale-100 block transition-all ease-in-out
                                            sm:hidden'>
                                <p>Add User</p>
                            </div>
                        </div>
                        </>
                    ) : (null)
                }


            </div>

            {/* Search bar */}
            <div className='inline-flex items-center justify-end row-start-2 py-3 gap-3
                            col-span-3 col-start-2 h-full w-full pr-3
                            sm:col-start-3 sm:col-span-2 sm:pr-4
                            xl:col-start-3 xl:col-span-2 xl:px-5'>
                {/* {
                    //search
                    true ? (
                        <div className='border-primary border-2 rounded-md shadow-md bg-white flex items-center justify-center text-primary hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out w-11 h-11'
                        onClick={()=>{setSearch(false), searchFormik.resetForm(), fetchUsers()}}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                    ) : null
                } */}
                <form onSubmit={searchFormik.handleSubmit}>
                    <div className='inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                        <input type="text" className='focus:outline-none text-sm px-4 w-60 rounded-md bg-white' placeholder='Search...'
                            name='search'
                            value={searchFormik.values.search}
                            onChange={searchFormik.handleChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    searchFormik.handleSubmit();
                                }
                            }}/>
                        <div className={`w-10 h-10 bg-primary text-white flex items-center justify-center ${search ? "hover:cursor-pointer":null}`}
                            onClick={() => {
                                if (search) {
                                    setSearch(false);
                                    searchFormik.resetForm();
                                    fetchUsers();
                                }
                            }}>
                            <FontAwesomeIcon icon={search ? faXmark : faMagnifyingGlass}/>
                        </div>
                    </div>
                </form>
            </div>


            {/* User Filter */}
            <div className='flex flex-row justify-start items-center gap-5
                            pl-3
                            sm:pl-4 sm:col-span-2
                            xl:py-3'>
                <Sheet>
                    <SheetTrigger>
                        <div className= {`flex flex-row items-center justify-center bg-white text-primary gap-2 border-2 border-primary w-fit rounded-md hover:text-white hover:bg-primary transition-all ease-in-out hover:cursor-pointer ${isFiltered ? "!bg-primary text-white":null}
                                            h-11 aspect-square
                                            sm:py-2 sm:px-4`}>
                            <FontAwesomeIcon icon={faFilter}/>
                            <p className='font-header text-sm hidden
                                        sm:block'>Filter</p>
                        </div>
                    </SheetTrigger>
                    <SheetOverlay className="bg-gray-500/75 backdrop-blur-sm transition-all" />
                    <SheetContent className="h-full flex-col flex">
                    <div>
                        <h1 className='font-header text-2xl text-primary'>User Filter</h1>
                        <p className='text-md font-text text-unactive text-sm'>Categorize user with the given parameters</p>
                    </div>

                    <form onSubmit={filterformik.handleSubmit} className='flex-col flex gap-3'>
                        <div className="inline-flex flex-col gap-1">
                        <label htmlFor="division" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Division </p>
                        </label>
                        <div className="grid grid-cols-1">
                            <select id="division" name="division" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                value={filterformik.values.division}
                                onChange={filterformik.handleChange}
                                onBlur={filterformik.handleBlur}
                                >
                                <option value=''>Select Division</option>
                                {
                                    division.map((division) => (
                                        <option key={division.id} value={division.id}>{division.division_name}</option>
                                    ))
                                }
                            </select>
                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        </div>
                        <div className="inline-flex flex-col gap-1">
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
                        <label htmlFor="section" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Section</p>
                        </label>
                        <div className="grid grid-cols-1">
                            <select id="section" name="section" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                value={filterformik.values.section}
                                onChange={filterformik.handleChange}
                                onBlur={filterformik.handleBlur}
                                >
                                <option value=''>Select Section</option>
                                {
                                    section.map((section) => (
                                        <option key={section.id} value={section.id}>{section.section_name}</option>
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
                            <p className="text-xs font-text text-unactive">Location</p>
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
                        <div className='flex-row flex justify-between w-full py-1 gap-2 items-end'>
                        <button type='submit' className={`w-full`}>
                            <div className='px-3 py-2 flex flex-row justify-center gap-2 items-center bg-primary rounded-md shadow-md hover:cursor-pointer hover:scale-105 ease-in-out transition-all '>
                                <p className='text-white font-header'>Filter</p>
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

                    </SheetContent>
                </Sheet>

                {
                checkedUsers.length > 0 ? (
                <div className='flex flex-row justify-between font-text text-sm text-unactive items-center gap-4'>
                    <p><span className='font-header text-primary'>{countCheckedUsers()}</span> Users Selected</p>
                    <div className='text-white bg-primary flex flex-row items-center gap-4 py-2 px-5 rounded-md hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out'>
                        <FontAwesomeIcon icon={faTrashCan}/>
                        <p>Delete Users</p>
                    </div>
                </div>
                ) : (null)
                }
            </div>

            {/* Userlist Table */}
            <div className='flex flex-col gap-2 row-start-3 row-span-2 col-start-1 col-span-4
                            px-3
                            xl:pr-5 xl:py-2
                            sm:px-4'>
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left w-full overflow-y-scroll'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                        <tr>
                            <th className='py-4 px-4 flex items-center flex-row gap-4 w-2/7'>
                                 {/* Checkbox */}
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            type="checkbox"
                                            ref={selectAllRef}
                                            className="col-start-1 row-start-1 appearance-none border border-primary rounded checked:border-primary checked:bg-primary indeterminate:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                            onChange={handleSelectAll}
                                            checked={checkedUsers.length === users.length && users.length > 0}
                                            disabled={isLoading}
                                        />
                                        {/* Custom Checkbox styling */}
                                        <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                            {/* Checked */}
                                            <path
                                                d="M3 8L6 11L11 3.5"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-[:checked]:opacity-100"
                                            />
                                            {/* Indeterminate */}
                                            <path
                                                d="M3 7H11"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                />
                                        </svg>
                                    </div>
                                    <p> EMPLOYEE NAME</p>
                            </th>
                            <th className='py-4 px-4  w-1/7 hidden lg:table-cell'>DIVISION</th>
                            <th className='py-4 px-4  w-1/7 hidden lg:table-cell'>DEPARTMENT</th>
                            <th className='py-4 px-4  w-1/7 hidden lg:table-cell'>SECTION</th>
                            {/* <th className='py-4 px-4  w-1/7'>LOCATION</th> */}
                            <th className='py-4 px-4  w-2/7 hidden lg:table-cell'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            isLoading ? (
                                <UserListLoadingProps className="z-10"/>
                            ) : users.length === 0 ? (
                                // <tr>
                                //     <td colSpan={6} className='flex items-center justify-center p-5 text-unactive font-text w-full'>
                                //         <p>There is no users that met the selected criteria</p>
                                //     </td>
                                // </tr>
                                <tr className="font-text text-sm">
                                    <td colSpan={5} className="text-center py-3 px-4 font-text text-unactive">
                                    There is no users that met the selected criteria
                                    </td>
                                </tr>
                            ):(
                                users?.map(userEntry => {
                                    const { first_name, middle_name, last_name } = userEntry || {};
                                    const fullName = [first_name, middle_name, last_name].filter(Boolean).join(" ");
                                    return(<User
                                            key={userEntry.id}
                                            userID={userEntry.id}
                                            click={()=>OpenDialog(userEntry)}
                                            name={fullName}
                                            division={userEntry.division?.division_name || "No Division Yet"}
                                            department={userEntry.department?.department_name || "No Department Yet"}
                                            section={userEntry.section?.section_name || "No Section Yet"}
                                            title={userEntry.title?.title_name || "No Title Yet"}
                                            branch={userEntry.branch?.branch_name || "No Branch Yet"}
                                            city={userEntry.city?.city_name || "No City Yet"}
                                            profile_url={userEntry.profile_image}
                                            employeeID={userEntry.employeeID}
                                            role={userEntry.roles?.[0]?.role_name || "No Role Yet"}
                                            edit={(e)=>OpenEdit(e,userEntry)}
                                            _delete={(e)=>OpenDelete(e,userEntry)}
                                            handleCheckbox = {handleCheckbox}
                                            selected = {checkedUsers}
                                            isChecked={checkedUsers.some(user => user.Selected_ID === userEntry.id)}
                                            userDetail = {OpenDetailView}
                                            selectedUser={userEntry}
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
                    {
                        !isLoading ? (
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
                            isLoading ? (
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


                    {/* User Profile Card */}
                    <UserEntryModal open={modalState.isOpen} close={CloseDialog} classname='relative z-10' ID={userID} selectedUser={selectedUser}/>

                    {/* Add User Modal */}
                    <AddUserModal open={modalState.isOpenAdd} close={CloseAddUser} updateTable={fetchUsers}/>

                    {/* Edit User Modal */}
                    <EditUserModal open={modalState.isEdit} close={CloseEdit} ID={userID.isEdit} close_confirmation={OpenSuccessFullyEdit} selectedUser={selectedUser}/>
                    <EditUserSuccessfully open={modalState.isEditSuccess} close={CloseSuccessFullyEdit}/>


                    {/* Delete User Modal */}
                    <DeleteUserModal open={modalState.isDelete} close={CloseDelete} EmployeeID={userID.isDelete} close_confirmation={OpenSuccessFullyDelete} selectedUser={selectedUser}/>
                    <DeleteUserSuccessfully open={modalState.isDeleteSuccess} close={CloseSuccessFullyDelete}/>

        </div>

    )
}
