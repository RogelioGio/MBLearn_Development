import { faChevronLeft, faChevronRight, faFilter, faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { act, useEffect, useRef, useState } from "react"
import Learner from "../modalsandprops/LearnerEnroleeEntryProps"
import EnrollmentTableProps from "../modalsandprops/EnrollmentTableProps"
import AssignedCourseEnrollmentCard from "../modalsandprops/AssignedCourseEnrollmentCard"
import LearnerLoadingProps from "../modalsandprops/LearnerLoadingProps"

const assigned_courses = [
    {name: "Effective Communication Skills in the Workplace", courseType:"Soft Skill Training", courseCategory:"Personal Development", duration: "2 Weeks", method: "Asynchronous"},
    {name: "Time Management and Productivity Hacks", courseType:"Soft Skill Training", courseCategory:"Personal Development", duration: "1 Weeks", method: "Online Training"},
]

export default function BulkEnrollment() {

    const [learners, setLearners] = useState([]); //List all learners
    const [selected, setSelected] = useState({}); //Select learner to ernoll
    const [course, selectCourse] = useState(assigned_courses[0].name); //Select course to enroll
    const [isLoading, setLoading] = useState(true); //Loading state
    const selectAll = useRef(false) //select all learners

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
    const handleCheckbox = (employeeID) => {
        setSelected((prevUsers) => {

            const currentCourse = prevUsers[course] || [];

            if(currentCourse.includes(employeeID)){
                return {...prevUsers,
                        [course]: currentCourse.filter((user) => user !== employeeID)}
            } else {
                return {
                    ...prevUsers,
                    [course]: [...currentCourse, employeeID]
                }
            }
        });
    };

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
    const numberOfEnrollees = (Course) => {
        return selected[Course].length ? selected[Course].length : 0;
    }

    //handle ernollment
    const enrollLearners = () => {
        console.log("Enrolled Learners", selected)
    }

    //Fetch Learners
    useEffect(() =>{
        setLoading(true)
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

    return (
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_3.75rem] h-full w-full'>
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
                    Enroll Employees
                </button>
            </div>

            {/* Course list header */}
            <div className="px-4 pb-3 mt-5 border-l border-divider ">
                <h1 className='text-primary text-2xl font-header'>Assigned Courses</h1>
                <p className='font-text text-xs text-unactive' >Assigned courses to enroll users into effortlessly.</p>
            </div>

            {/* Assigned Courses */}
            <div className="col-start-4 row-start-3 row-span-3 mb-5 border-l border-divider">
                {/* Course Props */}
                <div className="h-full px-4 flex flex-col gap-2">
                    {
                        assigned_courses.map((Course) => (
                            <AssignedCourseEnrollmentCard
                                key={Course.name}
                                name={Course.name}
                                coursetype={Course.courseType}
                                coursecategory={Course.courseCategory}
                                duration={Course.duration}
                                trainingmode={Course.method}
                                course={course}
                                selected={selected}
                                onclick={() => handleCourseChange(Course.name)}
                                numberOfEnrollees={numberOfEnrollees}/>
                        ))
                    }
                </div>
            </div>

            {/* Search and filter */}
            <div className="col-start-1 col-span-3 row-start-2 row-span-1 px-5 flex flex-row justify-between items-center gap-5">

                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>


                <button className='flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md'>
                    <p>Filter</p>
                    <FontAwesomeIcon icon={faFilter}/>
                </button>
            </div>

            {/* Learner table */}
            {
                assigned_courses.map((Course) => (
                    course === Course.name ? (
                    <EnrollmentTableProps selectAll={selectAll} onchange={handleSelectAll} course={Course.name} key={Course.name}>
                        {
                            isLoading ? (
                                <LearnerLoadingProps/>
                            ) :(
                            learners.map((learner)=>(
                                <Learner
                                    key={learner.id}
                                    profile_image={learner.profile_image}
                                    name={learner.name}
                                    employeeID={learner.employeeID}
                                    department={learner.department}
                                    title={learner.title}
                                    branch={learner.branch}
                                    city={learner.city}
                                    selectedUser={selected[course] || []}
                                    handleCheckbox={handleCheckbox}/>
                            ))
                        )
                        }
                    </EnrollmentTableProps>) : (null)
                ))
            }

            {/* User Pagination */}
            <div className='row-start-5 row-span-1 col-start-1 col-span-3 border-t border-divider mx-5 flex flex-row items-center justify-between'>
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
    )
}
