import { faChevronLeft, faChevronRight, faFilter, faSearch, faTrash, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../axios-client";
import { useOption } from "../contexts/AddUserOptionProvider";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet"
import EditCourseAdminPermissionModal from "./EditCourseAdminPermissionModal";

const CourseCourseAdminAssignmentProps = ({courseID}) => {
    const [assigned, setAssigned] = useState([])
    const [loading, setLoading] = useState()
    const {cities, departments, titles, location, division, section} = useOption();
    const [filter, setFilter] = useState(false)
    const [main, setMain] = useState([])
    const [editCoursePermission, setEditCoursePermission] = useState(false)
    const [courseAdmin, setCourseAdmin] = useState()

    // Function to get the assigned
    const fetchAssignedCourseAdmins = () => {
        setLoading(true)
        axiosClient.get(`assigned-course-admins/${courseID.id}`,
            {
                params: {
                    page: pageState.currentPage,
                    perPage: pageState.perPage
                }
            }
        )
        .then(({data}) => {
            setAssigned(data.data)
            setMain(data.main)
            pageChangeState('total', data.total)
                pageChangeState('lastPage', data.lastPage)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const [pageState, setPagination] = useState({
        currentPage: 1,
        perPage: 5,
        total: 0,
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
            pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.total))
        },[pageState.currentPage, pageState.perPage, pageState.total])

        //Next and Previous
        const back = () => {
            if (learnerLoading) return;
            if (pageState.currentPage > 1){
                pageChangeState("currentPage", pageState.currentPage - 1)
                pageChangeState("startNumber", pageState.perPage - 4)
            }
        }
        const next = () => {
            if (learnerLoading) return;
            if (pageState.currentPage < pageState.lastPage){
                pageChangeState("currentPage", pageState.currentPage + 1)
            }
        }

        const Pages = [];
        for(let p = 1; p <= pageState.lastPage; p++){
            Pages.push(p)
        }

        const pageChange = (page) => {
            if(learnerLoading) return;
            if(page > 0 && page <= pageState.lastPage){
                pageChangeState("currentPage", page)
            }
        }

    useEffect(()=>{
        fetchAssignedCourseAdmins()
    },[])

    const content = () => {
        return (
            <div className="w-full h-full grid grid-cols-4 grid-rows-[min-content_1fr_min-content]">
            {/* Main Course Admin */}
            <div className="py-2">
                <p className="font-text text-xs text-unactive">Main Course Admin:</p>
                <div className="flex flex-row gap-2 py-2 items-center">
                    {
                        !loading ? (
                            <>
                                <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                    {
                                        main?.[0]?.profile_image ? (
                                            <img src={main?.[0]?.profile_image} alt="" className="rounded-full"/>
                                        ) : (
                                            <div className='bg-blue-500 h-10 w-10 rounded-full'>

                                            </div>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className='font-header text-primary text-base'>{main?.[0]?.first_name} {main?.[0]?.middle_name} {main?.[0]?.last_name} {main?.[0]?.name_suffix}</p>
                                    <p className='text-unactive text-xs font-text'>ID: {main?.[0]?.employeeID}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='bg-blue-500 h-10 w-10 rounded-full animate-pulse'>
                                </div>
                                <div>
                                    <div className="w-40 rounded-full h-6 bg-gray-300  my-1 animate-pulse"></div>
                                    <div className="w-10 rounded-full h-4 bg-gray-300  my-1 animate-pulse"></div>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
            {/* Search bar */}
            <div className="col-start-4 flex flex-col justify-center">
                <div>
                    <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                        <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                        <div className='bg-primary py-2 px-4 text-white'>
                            <FontAwesomeIcon icon={faSearch}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="flex p-2 col-start-3 row-start-1 justify-end">
                <Sheet>
                    <SheetTrigger>
                    <div className='text-lg text-primary border-primary border-2 bg-white aspect-square rounded-md shadow-md flex flex-row justify-center items-center hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out'>
                        <FontAwesomeIcon icon={faFilter} className='p-2'/>
                    </div>
                    </SheetTrigger>
                    <SheetOverlay className="bg-gray-500/75 backdrop-blur-sm transition-all" />
                    <SheetContent className="h-full flex-col flex">
                    <div>
                            <h1 className='font-header text-2xl text-primary'>Course Admin Filter</h1>
                            <p className='text-md font-text text-unactive text-sm'>Categorize course admins to easily manage</p>
                        </div>
                    <div className="flex flex-col gap-y-2">
                    <div className="inline-flex flex-col gap-1">
                        <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Division </p>
                        </label>
                        <div className="grid grid-cols-1">
                            <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                // value={filterformik.values.department}
                                // onChange={filterformik.handleChange}
                                // onBlur={filterformik.handleBlur}
                                >
                                <option value=''>Select Division</option>
                                {
                                    division?.map((division) => (
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
                                // value={filterformik.values.department}
                                // onChange={filterformik.handleChange}
                                // onBlur={filterformik.handleBlur}
                                >
                                <option value=''>Select Department</option>
                                {
                                    departments?.map((department) => (
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
                        <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Section </p>
                        </label>
                        <div className="grid grid-cols-1">
                            <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                // value={filterformik.values.department}
                                // onChange={filterformik.handleChange}
                                // onBlur={filterformik.handleBlur}
                                >
                                <option value=''>Select Section</option>
                                {
                                    section?.map((section) => (
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
                        <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">City </p>
                        </label>
                        <div className="grid grid-cols-1">
                            <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                // value={filterformik.values.department}
                                // onChange={filterformik.handleChange}
                                // onBlur={filterformik.handleBlur}
                                >
                                <option value=''>Select City</option>
                                {
                                    cities?.map((city) => (
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
                        <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Branch </p>
                        </label>
                        <div className="grid grid-cols-1">
                            <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                // value={filterformik.values.department}
                                // onChange={filterformik.handleChange}
                                // onBlur={filterformik.handleBlur}
                                >
                                <option value=''>Select Branch</option>
                                {
                                    location?.map((location) => (
                                        <option key={location.id} value={location.id}>{location.branch_name}</option>
                                    ))
                                }
                            </select>
                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    {/* Filter Button */}
                    <div className="flex flex-row justify-center py-1 gap-2">
                        <div className="w-full py-2 border-2 border-primary rounded-md shadow-md text-white bg-primary flex flex-row justify-center items-center hover:cursor-pointer transition-all ease-in-out gap-2"
                            onClick={() => {setFilter(true)}}>
                            <FontAwesomeIcon icon={faFilter}/>
                            <p className="font-header">Filter</p>
                        </div>
                        {
                            filter &&
                            <div className="w-full py-2 border-2 border-primary rounded-md shadow-md text-primary flex flex-row justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out gap-2"
                            onClick={() => {setFilter(false)}}>
                                <FontAwesomeIcon icon={faXmark} className="text-xl"/>
                                <p className="font-header">Clear</p>
                            </div>
                        }
                    </div>
                </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Table */}
            <div className="col-span-4 py-2">
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                    <table className='text-left w-full'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                        <tr>
                            <th className='py-4 px-4 flex items-center flex-row gap-4'>
                                 {/* Checkbox */}
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            type="checkbox"
                                            // ref={selectAllRef}
                                            className="col-start-1 row-start-1 appearance-none border border-primary rounded checked:border-primary checked:bg-primary indeterminate:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                            // onChange={handleSelectAll}
                                            // checked={checkedUsers.length === users.length && users.length > 0}
                                            // disabled={isLoading}
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
                                    <th className='py-4 px-4'>DIVISION</th>
                                    <th className='py-4 px-4'>DEPARTMENT</th>
                                    <th className='py-4 px-4'>SECTION</th>
                                    <th className='py-4 px-4'>LOCATION</th>
                                    <th className='py-4 px-4'></th>
                                </tr>
                            </thead>
                    <tbody className="bg-white divide-y divide-divider">
                        {
                            loading ? ( Array.from({length: 5}).map((_, index) => (
                                <tr key={index} className={`animate-pulse font-text text-sm hover:bg-gray-200`}>
                                    <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                        <div className='flex items-center gap-4 flex-row'>
                                            {/* Checkbox */}
                                            <div className="group grid size-4 grid-cols-1">
                                                <input type="checkbox"
                                                    className="col-start-1 row-start-1 appearance-none border border-divider rounded checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                                    // onClick={(e) => e.stopPropagation()}
                                                    // onChange={(e) => {
                                                    //     handleCheckbox(e, userID);
                                                    // }}
                                                    // checked={isChecked} // Updated this line
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
                                            {/* User Image */}
                                            <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                {/* <img src={profile_url} alt="" className='rounded-full'/> */}
                                            </div>
                                            {/* Name and employee-id*/}
                                            <div className="flex flex-col gap-2">
                                            <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                                            <div className="h-3 w-28 bg-gray-300 rounded-full"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <div className='flex flex-col'>
                                            {/* Division */}
                                            <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                                        </div>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <div className='flex flex-col'>
                                            {/* Department */}
                                            <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                                        </div>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <div className='flex flex-col'>
                                            {/* Section */}
                                            <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                                        </div>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <div className="flex flex-col gap-2">
                                                <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                                                <div className="h-3 w-28 bg-gray-300 rounded-full"></div>
                                                </div>
                                        </td>
                                    <td className='py-3 px-4 '>
                                        <div className="flex flex-row item-center justify-end h-full gap-1">
                                            <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
                                            <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))):
                            assigned.length === 0 ? (
                                <tr className='font-text text-sm hover:bg-gray-200'>
                                        <td colSpan={6} className='text-center text-unactive py-3 px-4'>
                                            No Assigned Course Admin
                                        </td>
                                    </tr>
                            ) :
                            (
                                assigned?.map((admin) => (
                                    <tr key={admin} className={`font-text text-sm hover:bg-gray-200`}>
                                        <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                            <div className='flex items-center gap-4 flex-row'>
                                                {/* Checkbox */}
                                                <div className="group grid size-4 grid-cols-1">
                                                    <input type="checkbox"
                                                        className="col-start-1 row-start-1 appearance-none border border-divider rounded checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                                        // onClick={(e) => e.stopPropagation()}
                                                        // onChange={(e) => {
                                                        //     handleCheckbox(e, userID);
                                                        // }}
                                                        // checked={isChecked} // Updated this line
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
                                                {/* User Image */}
                                                <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                    <img src={admin.profile_image} alt="" className='rounded-full'/>
                                                </div>
                                                {/* Name and employee-id*/}
                                                <div>
                                                    <p className='font-text'>{admin.first_name} {admin.middle_name} {admin.last_name} {admin.name_suffix}</p>
                                                    <p className='text-unactive text-xs'>ID: {admin.employeeID}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex flex-col'>
                                                {/* Division */}
                                                <p className='text-unactive'>{admin.division.division_name}</p>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex flex-col'>
                                                {/* Department */}
                                                <p className='text-unactive'>{admin.department?.department_name}</p>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex flex-col'>
                                                {/* Section */}
                                                <p className='text-unactive'>{admin.section?.section_name}</p>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex flex-col'>
                                            {/* Branch Location */}
                                            <p className='text-unactive'>{admin.branch?.branch_name}</p>
                                            {/* City Location */}
                                            <p className='text-unactive text-xs'>{admin.branch?.city?.city_name}</p>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4 '>
                                            <div className="flex flex-row item-center justify-end h-full gap-1">
                                                <div className="flex justify-center items-center aspect-square p-2 bg-white shadow-md border border-primary rounded-md text-primary hover:bg-primary cursor-pointer transition-all ease-in-out hover:text-white"
                                                    onClick={()=>{setEditCoursePermission(true), setCourseAdmin(admin)}}>

                                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                                </div>
                                                <div className="flex justify-center items-center aspect-square p-2 bg-white shadow-md border border-primary rounded-md text-primary hover:bg-primary cursor-pointer transition-all ease-in-out hover:text-white">
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )

                        }

                    </tbody>
                    </table>
                </div>
            </div>

            {/* Paganitaion */}
            <div className="col-span-4 h-full mr-5 flex flex-row items-center justify-between py-3 border-t border-divider">
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.total}</span> <span className='text-primary'>results</span>
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
        </div>
        )
    }
    return (
        <>
        <div className='grid grid-rows-[min-content_1fr_min-content] grid-cols-4 pr-2 h-full'>
            {/* Header */}
            <div className='flex flex-col gap-1 pt-2 pb-3'>
                <p className='text-xs font-text text-unactive'>Main Course Admin:</p>
                <div className="flex flex-row gap-2 items-center">
                    {!loading ?
                    <>
                        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full overflow-hidden">
                            <img src={main[0]?.profile_image} alt=""  className="w-full"/>
                        </div>
                        <div>
                            <p className="font-header text-sm text-primary">{main[0]?.first_name} {main[0]?.middle_name || " "} {main[0]?.last_name}</p>
                            <p className="font-text text-unactive text-xs">ID: {main[0]?.employeeID}</p>
                        </div>
                    </>:<>
                        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full overflow-hidden animate-pulse"/>
                        <div>
                            <p className="font-header text-sm text-primary bg-gray-300 rounded-full w-40 h-4 animate-pulse"></p>
                            <p className="font-text text-unactive text-xs bg-gray-300 rounded-full w-20 h-3 mt-1 animate-pulse"></p>
                        </div>
                    </> }
                </div>
            </div>
            <div className='col-start-3 flex justify-end items-center pr-2'>
                <div className='w-10 h-10 bg-white border-2 border-primary rounded-md shadow-md flex items-center justify-center hover:cursor-pointer text-primary hover:bg-primary hover:text-white transition-all ease-in-out'>
                    <FontAwesomeIcon icon={faFilter} className='text-lg'/>
                </div>
            </div>
            <div className='col-span-1 col-start-4 flex flex-row justify-end items-center'>
                <div className='w-full'>
                    <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="col-span-4">
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                    <table className='w-full text-left'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 flex items-center flex-row gap-4'>
                                    {/* Checkbox */}
                                        <div className="group grid size-4 grid-cols-1">
                                            <input
                                                type="checkbox"
                                                // ref={selectAllRef}
                                                className="col-start-1 row-start-1 appearance-none border border-primary rounded checked:border-primary checked:bg-primary indeterminate:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                                // onChange={handleSelectAll}
                                                // checked={checkedUsers.length === users.length && users.length > 0}
                                                // disabled={isLoading}
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
                                        <th className='py-4 px-4'>DIVISION</th>
                                        <th className='py-4 px-4'>DEPARTMENT</th>
                                        <th className='py-4 px-4'>SECTION</th>
                                        <th className='py-4 px-4'></th>
                                    </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-divider">
                            {
                                true ? (
                                    Array.from({length: 5}).map((_, index) => (
                                        <tr key={index} className={`animate-pulse font-text text-sm hover:bg-gray-200`}>
                                        <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                            <div className='flex items-center gap-2 flex-row'>
                                                {/* Checkbox */}
                                                <div className="group grid size-4 grid-cols-1">
                                                    <input type="checkbox"
                                                        className="col-start-1 row-start-1 appearance-none border border-divider rounded checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                                        disabled
                                                    />
                                                    {/* Custom Checkbox styling */}
                                                </div>
                                                {/* User Image */}
                                                <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                    {/* <img src={profile_url} alt="" className='rounded-full'/> */}
                                                </div>
                                                {/* Name and employee-id*/}
                                                <div className="flex flex-col">
                                                    <p className="font-header text-sm text-primary bg-gray-300 rounded-full w-40 h-4 animate-pulse"></p>
                                                    <p className="font-text text-unactive text-xs bg-gray-300 rounded-full w-20 h-3 mt-1 animate-pulse"></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="font-header text-sm text-primary bg-gray-300 rounded-full w-32 h-4 animate-pulse"></p>
                                            <p className="font-text text-unactive text-xs bg-gray-300 rounded-full w-16 h-3 mt-1 animate-pulse"></p>
                                        </td>
                                        <td>
                                            <p className="font-header text-sm text-primary bg-gray-300 rounded-full w-32 h-4 animate-pulse"></p>
                                            <p className="font-text text-unactive text-xs bg-gray-300 rounded-full w-16 h-3 mt-1 animate-pulse"></p>
                                        </td>
                                        <td>
                                            <p className="font-header text-sm text-primary bg-gray-300 rounded-full w-32 h-4 animate-pulse"></p>
                                            <p className="font-text text-unactive text-xs bg-gray-300 rounded-full w-16 h-3 mt-1 animate-pulse"></p>
                                        </td>
                                        <td>
                                            <div className="flex flex-row item-center justify-end items-center gap-2 pr-3">
                                                <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
                                                <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
                                            </div>
                                        </td>
                                        </tr>
                                    ))
                                ): assigned.length === 0 ? (
                                    <tr className='font-text text-sm hover:bg-gray-200'>
                                        <td colSpan={5} className='text-center text-unactive py-3 px-4'>
                                            No Assigned Course Admin
                                        </td>
                                    </tr>
                                ): null
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className='flex flex-row items-center justify-between col-span-4 pb-2 pt-2'>
                <p className='text-sm font-text text-unactive'>
                    Showing <span className='font-header text-primary'>1</span> to <span className='font-header text-primary'>2</span> of <span className='font-header text-primary'>5</span> <span className='text-primary'>results</span>
                </p>
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
        </div>

        <EditCourseAdminPermissionModal  open={editCoursePermission} onClose={()=>{setEditCoursePermission(false)}} courseAdmin={courseAdmin}/>
        </>
    )
}
export default CourseCourseAdminAssignmentProps;
