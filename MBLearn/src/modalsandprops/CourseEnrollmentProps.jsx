import { faChevronLeft, faChevronRight, faFilter, faSearch, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import Learner from '../components/Learner'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet"
import { useStateContext } from '../contexts/ContextProvider'
import CourseEnrollmentSuccesfully from './CourseEnrollmentSuccessfullyModal'
import NoEmployeeSelectedModal from './NoEmployeeSelectedModal'
import { useOption } from '../contexts/AddUserOptionProvider'
import { Train } from 'lucide-react'
import TrainingDurationModal from './TrainingDurationModal'
import { format } from 'date-fns'


const CourseEnrollmentProps = ({course}) => {
    const {user} = useStateContext();
    const {cities, departments, titles, location, division, section} = useOption();
    const [learners, setLearners] = useState([])
    const [learnerLoading, setLearnerLoading] = useState(false)
    const [selected, setSelected] = useState([]); //Select learner to ernoll
    const [durationModal, setDurationModal] = useState(false)
    const [results, setResults] = useState([]); //Enrolled results
    const [enrolled, setEnrolled] = useState(false)
    const [enrolling, setEnrolling] = useState(false)
    const [empty, setEmpty] = useState(false) // opens the warning
    const [processing, setProcessing] = useState(false)
    const [filter, setFilter] = useState(false)

    const [date, setDate] = React.useState({
            from: new Date(),
            to: undefined,
        });


    const handleLearnerChange = (courseId) => {
        setLearnerLoading(true)
        axiosClient.get(`/index-user-enrollments/${courseId}`,
            {
            params: {
                        page: pageState.currentPage,
                        perPage: pageState.perPage
                    }
            }
            ).then(({data})=>{
                console.log(data)
                setLearners(data.data)
                pageChangeState('total', data.total)
                pageChangeState('lastPage', data.lastPage)
                // pageChangeState('currentPerPage', data.data.length)
                setLearnerLoading(false)
            }).catch((err)=>{
                console.log(err)
            })
        }

    const [pageState, setPagination] = useState({
        currentPage: 1,
        perPage: 6,
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

        useEffect(() => {
            handleLearnerChange(course.id)
        },[pageState.currentPage, course.id])

        // Handle Enrollment
        const handleCheckbox = (User, course) => {
            setSelected((prevUsers) => {
                if(!User&&!course) return

                const exists = prevUsers.some(
                    (entry) => entry.userId === User.id && entry.courseId === course.id
                );

                if(exists){
                    return prevUsers.filter(
                        (entry) => !(entry.userId === User.id && entry.courseId === course.id )
                    )
                }else{
                    return [...prevUsers, {userId: User.id, courseId: course.id, enrollerId: user.user_infos.id }]
                }
            })
            setResults((prevCourses) => {
                if(!User&&!course) return prevCourses;

                const updated = [...prevCourses];
                const existingCourse = updated.findIndex(
                    (c) => c.course.id === course.id
                );

                if(existingCourse !== -1){
                    const courseToUpdate = { ...updated[existingCourse] }
                    courseToUpdate.enrollees = courseToUpdate.enrollees || [];
                    const enrolled = existingCourse.enrollees?.some(
                        (u) => u.id === User.id
                    );

                    if(!enrolled){
                        courseToUpdate.enrollees.push(User);
                    }

                    updated[existingCourse] = courseToUpdate;
                } else {
                    updated.push({
                        course: course,
                        enrollees: [User]
                    });
                }
                return updated;
            });
        }
        const handleEnrollment  = () => {
            setEnrolling(true)
            if(selected.length <= 0){
                setEmpty(true)
                return
            }
            setDurationModal(true)
        }
        const close = () => {
            setEnrolled(false)
            setTimeout(()=>{
                setSelected([])
                setResults([])
                handleLearnerChange(course.id)
            },100)
        }

        const closeEnrolling = () => {
            setSelected([])
            setResults([])
            setEnrolling(false)
            setDurationModal(false)
            setDate({
                from: new Date(),
                to: undefined,
            });
        }

        const handleEnrolling = () => {
            setProcessing(true)
            const enrolees = selected.map(e => ({
                ...e,
                start_date: format(new Date(date.from), 'yyyy-MM-dd' + ' 00:00:00'),
                end_date: format(new Date(date.to), 'yyyy-MM-dd' + ' 23:59:59')
            }))
            console.log(enrolees)

            axiosClient.post('enrollments/bulk', enrolees)
            .then(({data}) => {
                setEnrolling(false)
                setDurationModal(false)
                setEnrolled(true);
                setProcessing(false)
            })
            .catch((err)=>console.log(err));
            // setEnrolling(false)
            // setDurationModal(false)
            // setEnrolled(true)

            // console.log("to",format(new Date(date.to), 'yyyy-MM-dd HH:mm:ss'))
            // console.log("from",format(new Date(date.from), 'yyyy-MM-dd HH:mm:ss'))


        }

    return(
        <>
        <div className="grid grid-cols-4 grid-rows-[min-content_1fr_min-content] h-full w-full">
            {/* Search */}
            <div className='flex flex-row justify-center py-3'>
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>
            {/* Filter */}
            <div className='flex items-center p-2'>
                <Sheet>
                    <SheetTrigger>
                    <div className='text-lg text-primary border-primary border-2 bg-white aspect-square rounded-md shadow-md flex flex-row justify-center items-center hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out'>
                        <FontAwesomeIcon icon={faFilter} className='p-2'/>
                    </div>
                    </SheetTrigger>
                    <SheetOverlay className="bg-gray-500/75 backdrop-blur-sm transition-all" />
                    <SheetContent className="h-full flex-col flex">
                    <div>
                            <h1 className='font-header text-2xl text-primary'>Learner Filter</h1>
                            <p className='text-md font-text text-unactive text-sm'>Categorize learner to enroll</p>
                        </div>

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
                                    division?.map((division)=> (
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
                                    departments?.map((department)=> (
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
                                    section?.map((section)=> (
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
                                    cities?.map((city)=> (
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
                                    location?.map((branch)=> (
                                        <option key={branch.id} value={branch.id}>{branch.branch_name}</option>
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
                    </SheetContent>
                </Sheet>
            </div>
            {/* Enroll */}
            <div className='col-start-4 flex flex-row justify-between items-center py-3'>
                <div className='w-full'>
                    {
                        selected.length > 0 ? (
                            <p className='text-sm font-text text-unactive'><span className='text-primary'>{selected.length}</span> users selected to enroll</p>
                        ) : (null)
                    }
                </div>

                <div className='text-white border-2 border-primary py-2 px-5 bg-primary flex flex-row gap-2 justify-center items-center rounded-md shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out'
                    onClick={handleEnrollment}>
                    <FontAwesomeIcon icon={faUserPlus}/>
                    <p className='font-header'>
                        { enrolling? "Enrolling": "Enroll"}
                    </p>
                </div>
            </div>
            {/* Filter */}


            {/* Enrolment Table */}
            <div className="col-span-4 h-full">
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
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                {
                                    learnerLoading ? (
                                        Array.from({length: 6}).map((_, index) => (
                                            <tr key={index} className={`font-text text-sm hover:bg-gray-200 animate-pulse`}>
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
                                                        <div className='bg-blue-500 h-10 w-10 rounded-full animate-pulse'>
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
                                                    <div className='flex flex-col gap-2'>
                                                    {/* Branch Location */}
                                                    <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                                                    {/* City Location */}
                                                    <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        learners.map((learner, index) => (
                                            <tr key={index} className={`font-text text-sm hover:bg-gray-200 hover:cursor-pointer`} onClick={()=>handleCheckbox(learner, course)}>
                                            <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                <div className='flex items-center gap-4 flex-row'>
                                                    {/* Checkbox */}
                                                    <div className="group grid size-4 grid-cols-1">
                                                        <input type="checkbox"
                                                            className="col-start-1 row-start-1 appearance-none border border-divider rounded checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                                            onClick={()=>handleCheckbox(learner, course)}
                                                            onChange={()=>handleCheckbox(learner, course)}
                                                            checked={selected.some((entry) => entry.userId === learner.id)} // Updated this line
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
                                                        <img src={learner.profile_image} alt="" className='rounded-full'/>
                                                    </div>
                                                    {/* Name and employee-id*/}
                                                    <div>
                                                        <p className='font-text'>{learner.first_name} {learner.middle_name} {learner.last_name} {learner.name_suffix}</p>
                                                        <p className='text-unactive text-xs'>ID: {learner.employeeID}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4'>
                                                <div className='flex flex-col'>
                                                    {/* Division */}
                                                    <p className='text-unactive'>{learner.division?.division_name}</p>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4'>
                                                <div className='flex flex-col'>
                                                    {/* Department */}
                                                    <p className='text-unactive'>{learner.department?.department_name}</p>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4'>
                                                <div className='flex flex-col'>
                                                    {/* Section */}
                                                    <p className='text-unactive'>{learner.section?.section_name}</p>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4'>
                                                <div className='flex flex-col'>
                                                {/* Branch Location */}
                                                <p className='text-unactive'>{learner.branch?.branch_name}</p>
                                                {/* City Location */}
                                                <p className='text-unactive text-xs'>{learner.city?.city_name}</p>
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

            {/* Pagination */}
            <div className="col-span-4 h-full flex flex-row items-center justify-between py-3 border-t border-divider">
                <div>
                    {
                        learnerLoading ? <p className='text-sm font-text text-unactive'>
                        Retrieving Learner to be enrolled...
                        </p> :
                        <p className='text-sm font-text text-unactive'>
                            Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.total}</span> <span className='text-primary'>results</span>
                        </p>
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
                                learnerLoading ? (
                                    <a className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset`}>...</a>
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

        {/* Training Duration */}
        <TrainingDurationModal open={durationModal} close={closeEnrolling} enroll={handleEnrolling} date={date} _setDate={setDate} course={course} enrolling={processing}/>
        {/* Successfully */}
        <CourseEnrollmentSuccesfully open={enrolled} close={close} result={results}/>
        {/* Empty */}
        <NoEmployeeSelectedModal isOpen={empty} onClose={()=>{setEmpty(false),setEnrolling(false)}} />
        </>
    )
}
export default CourseEnrollmentProps
