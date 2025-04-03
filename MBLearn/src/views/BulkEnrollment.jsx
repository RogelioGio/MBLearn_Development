import { faBook, faChalkboardUser, faChevronLeft, faChevronRight, faFilter, faGraduationCap, faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { act, useEffect, useRef, useState } from "react"
import Learner from "../modalsandprops/LearnerEnroleeEntryProps"
import EnrollmentTableProps from "../modalsandprops/EnrollmentTableProps"
import AssignedCourseEnrollmentCard from "../modalsandprops/AssignedCourseEnrollmentCard"
import LearnerLoadingProps from "../modalsandprops/LearnerLoadingProps"
import { useStateContext } from "../contexts/ContextProvider"
import CourseLoading from "../assets/Course_Loading.svg";
import { useFormik } from "formik"
import React from "react"
import EnrolledSuccessfullyModal from "../modalsandprops/EnrollmentSuccessfulyModal"
import EnrollmentFailedModal from "../modalsandprops/EnrollmentFailedModal"
import NoEmployeeSelectedModal from "../modalsandprops/NoEmployeeSelectedModal"
import { set } from "date-fns"

export default function BulkEnrollment() {

    const {user} = useStateContext();
    const [assigned_courses, setAssigned_courses] = useState([]);
    const [learners, setLearners] = useState([]); //List all learners
    const [selected, setSelected] = useState([]); //Select learner to ernoll
    const [course, selectCourse] = useState([]); //Select course to enroll
    const [isLoading, setLoading] = useState(true); //Loading state
    const selectAll = useRef(false) //select all learners
    const [tab, setTab] = useState(1)//Tabs
    const [enrolled, setEnrolled] = useState(false) //Modal for successfully Enrolled
    const [error, setError] = useState([]) //Error state
    const [enrollmentFailed, setEnrollmentFailed] = useState(false) //Enrollment failed state
    const [empty, setEmpty] = useState(false) //No selected user state
    const [enrolling, setEnrolling] = useState(false) //Enrolling state

    //Pagenation States
    const [pageState, setPagination] = useState({
        currentPage: 1,
        perPage:5,
        totalUser: 0,
        lastPage: 1,
        startNumber: 0,
        endNumber: 0,
        currentPerPage:0
    })


    //Pagination Change State
    const pageChangeState = (key, value) => {
        setPagination((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    //Next and Previous Page
    const back = () => {
        if(isLoading) return;
        if (pageState.currentPage > 1){
            pageChangeState("currentPage", pageState.currentPage - 1)
            pageChangeState("startNumber", pageState.perPage - 4)
        }
    }
    const next = () => {
        if(isLoading) return;
        if (pageState.currentPage < pageState.lastPage){
            pageChangeState("currentPage", pageState.currentPage + 1)

        }
    }

    //Page Navigation
    const pageChange = (page) => {
        if(isLoading) return;
        if(page > 0 && page <= pageState.lastPage){
            pageChangeState("currentPage", page)
        }
    }

    //Handle course change
    const handleCourseChange = (Course) => {
        selectCourse(Course);
    }

    //Learner to enroll
    const handleCheckbox = (id, course) => {
        setSelected((prevUsers) => {
            if(!id&&!course) return

            const exists = prevUsers.some(
                (entry) => entry.userId === id && entry.courseId === course
            );

            if(exists){
                return prevUsers.filter(
                    (entry) => !(entry.userId === id && entry.courseId === course )
                )
            }else{
                return [...prevUsers, {userId: id, courseId: course, enrollerId: user.user_info_id}]
            }
        })

    }

    //Select All Learners
    const handleSelectAll = (Course) => {
        if(selected[Course] && selected[Course].length === learners.length){
            setSelected((prevUsers) => {
                const newUsers = {... prevUsers};
                newUsers[Course] = [];
                return newUsers;
            })
        } else {
            setSelected((prevUsers) => {
                const newUsers = {... prevUsers};
                newUsers[Course] = learners.map((user) => user.employeeID);
                return newUsers;
            });
        }
    }

    //handle indertiminate checkbox
    useEffect(() => {
        if(!selectAll.current) return;

        const courseLearners = learners.map((user) => user.employeeID);
        const selectedLearners = selected[course] || [];

        if(courseLearners.length === selectedLearners.length && courseLearners.length > 0){
            selectAll.current.indeterminate = false;
            selectAll.current.checked = true;
        } else if(selectedLearners.length > 0){
            selectAll.current.indeterminate = true;
        } else {
            selectAll.current.indeterminate = false;
            selectAll.current.checked = false;

        }
    },[selected, learners, course]);

    //Number of enrollees
    const numberOfEnrollees = (courseName) => {
        return selected.filter((entry) => entry.courseId === courseName).length
    }

    //handle ernollment
    const enrollLearners = () => {
        setEnrolling(true)
        console.log(selected)
        if(selected.length === 0){
            setEmpty(true)
            return
        }

        axiosClient.post('enrollments/bulk', selected)
        .then(({data}) => {
            setEnrolling(false)
            console.log(data);
            setEnrolled(true);
            setSelected([]);

        })
        .catch((err)=>console.log(err));
    }

    useEffect(()=>{
        console.log(selected)
    },[selected])

    //Fetch Learners
    useEffect(() =>{
        setLoading(true)

        //fetch courses
        axiosClient.get('/courses').then(({data})=>{
            console.log(data.data[0].types?.[0]?.type_name);
            setAssigned_courses(data.data);
            selectCourse(data.data[0].name);

        }).catch((err)=>
        console.log(err)
        );

        axiosClient.get('/index-user/enrolees',{
            params: {
                page: pageState.currentPage,
                perPage: pageState.perPage
            }
        })
        .then(({data}) => {
            setLearners(data.data)
            pageChangeState('totalUser', data.total)
            pageChangeState('lastPage', data.lastPage)
            pageChangeState('currentPerPage', data.data.length)
            setLoading(false)
        })
        .catch((err) => console.log(err))

        console.log(learners)
    },[pageState.currentPage, pageState.perPage]);
    useEffect(() => {
        pageChangeState('startNumber', (pageState.currentPage - 1) * pageState.perPage + 1)
        pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.totalUser))
    },[pageState.currentPerPage])


    // Dynamic Page Number
    const Pages = [];
    for(let p = 1; p <= pageState.lastPage; p++){
        Pages.push(p)
    }

    //Formik for filter
    const formik = useFormik({});

    return (
        <>
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_1fr_3.75rem] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Enroll Trainee</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>Enroll Trainee</h1>
                <p className='font-text text-sm text-unactive' >Quickly enroll large groups of trainees into assigned courses for efficient training delivery.</p>
            </div>

            {/* Enroll button */}
            <div className="flex flex-col justify-center pl-5 mr-5 border-divider border-b col-start-4 row-start-1 row-span-1">
                <button className="w-full p-4 bg-primary font-header text-white rounded-full hover:scale-105 transition-all ease-in-out" onClick={enrollLearners}>
                    <FontAwesomeIcon icon={faUserPlus} className='mr-2'/>
                    {enrolling ? 'Enrolling...' : 'Enroll Trainee'}
                </button>
            </div>

            {/* Tab */}
            {/* <div className="px-4 pb-3 mt-5 col-start-1 row-start-2">
                <div className="w-full flex flex-row rounded-md shadow-md hover:cursor-pointer">
                    <span className={`w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-l-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === 1 ? 'bg-primary text-white':null}`} onClick={()=> setTab(1)}>
                        <FontAwesomeIcon icon={faGraduationCap}/>
                        Enrollees
                    </span>
                    <span className={` w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-r-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === 2 ? 'bg-primary text-white':null}`} onClick={()=> setTab(2)}>
                        <FontAwesomeIcon icon={faChalkboardUser}/>
                        Enrolled
                    </span>
                </div>
            </div> */}

            <div className="px-4 pb-3 mt-5 col-start-1 row-start-2 flex flex-row items-center border-r border-divider">
                <div>
                    <h1 className='text-primary text-2xl font-header'>Assigned Courses</h1>
                    <p className='font-text text-xs text-unactive' >Assigned courses to enroll users into effortlessly.</p>
                </div>
                {/* <div>
                    <div className="aspect-square px-3 flex flex-row justify-center items-center bg-primary rounded-md shadow-md hover:cursor-pointer hover:scale-105 ease-in-out transition-all ">
                        <FontAwesomeIcon icon={faGraduationCap} className='text-white text-sm'/>
                    </div>
                </div> */}
            </div>

            {/* Assigned Courses */}
            <div className="col-start-1 row-start-3 row-span-1 mb-5 border-r border-divider h-full px-2 flex flex-col gap-2">
                {
                            isLoading ? (
                                <div className="flex flex-col gap-2 items-center justify-center text-center h-full">
                                    <img src={CourseLoading} alt="" className="w-44"/>
                                    <p className="text-xs font-text text-primary">Hang tight! 🚀 Loading assigned courses for bulk enrollment—great things take a second!</p>
                                </div>
                            )
                            : (assigned_courses.map((Course) => (
                                <AssignedCourseEnrollmentCard
                                    key={Course.id}
                                    id={Course.id}
                                    name={Course.name}
                                    coursetype={Course.types?.[0]?.type_name}
                                    coursecategory={Course.categories?.[0]?.category_name}
                                    duration={Course.duration}
                                    trainingmode={Course.training_modes?.[0]?.mode_name}
                                    trainingtype={Course.training_type}
                                    course={course}
                                    selected={selected}
                                    onclick={() => handleCourseChange(Course.name)}
                                    numberOfEnrollees={numberOfEnrollees}
                                    />
                            )))

                    }
            </div>

            {/* Search and filter */}
            <div className="col-start-2 col-span-3 row-start-2 row-span-1 px-5 flex flex-row justify-between items-center gap-5 py-2">
                {/* Filter */}
                <div className="w-full">
                    <form className="flex flex-row gap-2 items-center w-full">
                        <div className="inline-flex flex-col gap-1 w-full">
                        <label htmlFor="employee_name" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Sample Filter </p>
                        </label>
                        <div className="grid grid-cols-1">
                            <select id="employee_name" name="employee_name" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                >
                                <option value=''>Select an Section</option>
                            </select>
                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        </div>
                        <div className="inline-flex flex-col gap-1 w-full">
                        <label htmlFor="employee_name" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Sample Filter </p>
                        </label>
                        <div className="grid grid-cols-1">
                            <select id="employee_name" name="employee_name" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                >
                                <option value=''>Select an Section</option>
                            </select>
                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        </div>
                        <div className="inline-flex flex-col gap-1 w-full">
                        <label htmlFor="employee_name" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Sample Filter </p>
                        </label>
                        <div className="grid grid-cols-1">
                            <select id="employee_name" name="employee_name" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                >
                                <option value=''>Select an Section</option>
                            </select>
                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        </div>
                        {/* Submit */}
                        <div className='flex-row flex justify-end py-1 gap-2'>
                            <button type='submit'>
                                <div className='aspect-square px-3 flex flex-row justify-center items-center bg-primary rounded-md shadow-md hover:cursor-pointer hover:scale-105 ease-in-out transition-all '>
                                    <FontAwesomeIcon icon={faFilter} className='text-white text-sm'/>
                                </div>
                            </button>
                        </div>
                    </form>

                </div>

                {/* Search Bar */}
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>

            {/* Learner table */}
            {
                isLoading ? (
                    <EnrollmentTableProps>
                        <LearnerLoadingProps/>
                    </EnrollmentTableProps>
                ):
                (assigned_courses.map((Course) => (
                    course === Course.name ? (
                    <EnrollmentTableProps selectAll={selectAll} onchange={handleSelectAll} course={Course.name} key={Course.name}>
                        {
                            isLoading ? (
                                <LearnerLoadingProps/>
                            ) :(
                            learners.map((learner)=>(
                                <Learner
                                    key={learner?.id}
                                    id={learner?.id}
                                    profile_image={learner?.profile_image}
                                    name={[learner?.first_name, learner?.middle_name, learner?.last_name].filter(Boolean).join(" ")}
                                    employeeID={learner?.employeeID}
                                    department={learner?.department.department_name}
                                    title={learner?.title.title_name}
                                    branch={learner?.branch.branch_name}
                                    city={learner?.city.city_name}
                                    enrolled={selected}
                                    selectedCourse={Course.id}
                                    handleCheckbox={handleCheckbox}
                                    selected={selected}/>
                            ))
                        )
                        }
                    </EnrollmentTableProps>) : (null)
                )))


            }

            {/* User Pagination */}
            <div className='row-start-4 row-span-1 col-start-2 col-span-3 mx-5 flex flex-row items-center justify-between'>
                {/* Total number of entries and only be shown */}
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUser}</span> <span className='text-primary'>results</span>
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

                        {/* Next */}
                        <a href="#"
                            onClick={next}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>
        </div>

        {/* Successfully Enrolled */}
        <EnrolledSuccessfullyModal isOpen={enrolled} onClose={() => setEnrolled(false)}/>
        {/* Error */}
        <EnrollmentFailedModal isOpen={enrollmentFailed} onClose={()=>setEnrollmentFailed(false)}/>
        {/* When no Selected Users */}
        <NoEmployeeSelectedModal isOpen={empty} onClose={()=>setEmpty(false)} />
        </>
    )
}
