import { faChevronLeft, faChevronRight, faFilter, faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { act, useEffect, useRef, useState } from "react"
import Learner from "../modalsandprops/LearnerEnroleeEntryProps"

export default function BulkEnrollment() {

    const [learners, setLearners] = useState([]); //List all learners
    const [selected, setSelected] = useState({}); //Select learner to ernoll
    const [course, selectCourse] = useState("course1"); //Select course to enroll
    const selectAll = useRef(false) //select all learners

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
        axiosClient.get('/index-user/enrolees')
        .then(({data}) => setLearners(data))
        .catch((err) => console.log(err))
    },[]);


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
                <div className="h-full p-4 flex flex-col gap-2">
                    <div className={`w-full h-40 p-5 grid  grid-cols-[auto_3.75rem] border border-divider rounded-md font-text shadow-md hover:cursor-pointer hover:scale-105 transition-all ease-in-out ${course === "course1" ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                        onClick={() => handleCourseChange("course1")}>
                        {/* Course Header */}
                        <div className="col-span-2">
                            <h1 className="text-sm font-header mb-2">Effective Communication Skills in the Workplace</h1>
                            <p className="text-xs">Soft Skills Training - Personal Development</p>
                        </div>

                        {/* Duration & Training Method */}
                        <div className="flex flex-col gap-0.5 text-xs row-start-2 items-start justify-end">
                            <p>2 Weeks</p>
                            <p>Asynchronous</p>
                        </div>

                        <div className="flex items-end justify-end">
                            {
                                selected["course1"] && selected["course1"].length > 0 &&
                                <div className=" bg-[#1664C0] rounded-full text-white flex items-center justify-center aspect-square w-8">
                                    <p className="text-s">{numberOfEnrollees("course1")}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className= {`w-full h-40 p-5 grid  grid-cols-[auto_3.75rem] border border-divider rounded-md font-text shadow-md hover:cursor-pointer hover:scale-105 transition-all ease-in-out ${course === "course2" ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                        onClick={() => handleCourseChange("course2")}>
                        {/* Course Header */}
                        <div className="col-span-2">
                            <h1 className="text-sm font-header mb-2">Time Management and Productivity Hacks</h1>
                            <p className="text-xs">Soft Skills Training - Personal Development</p>
                        </div>

                        {/* Duration & Training Method */}
                        <div className="flex flex-col gap-0.5 text-xs row-start-2 items-start justify-end">
                            <p>1 Week</p>
                            <p>Online Training (Asynchonous)</p>
                        </div>

                        <div className="flex items-end justify-end">
                            {
                                selected["course2"] && selected["course2"].length > 0 &&
                                <div className=" bg-[#1664C0] rounded-full text-white flex items-center justify-center aspect-square w-8">
                                    <p className="text-s">{numberOfEnrollees("course2")}</p>
                                </div>
                            }
                        </div>
                    </div>
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

            {/* User table */}
            {
                course === "course1" &&
                <div className='row-start-3 row-span-2 col-start-1 col-span-3 px-5 py-2'>
                    <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                    <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 flex flex-row gap-4'>
                                    {/* Checkbox */}
                                    <div className="group grid size-4 grid-cols-1">
                                        <input type="checkbox"
                                            className="col-start-1 row-start-1 appearance-none border border-primary rounded checked:border-primary checked:bg-primary indeterminate:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                            ref={selectAll}
                                            onChange={() => handleSelectAll(course)}
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
                                    <p>EMPLOYEE NAME</p>
                                </th>
                                <th className='py-4 px-4'>DEPARTMENT</th>
                                <th className='py-4 px-4'>BRANCH</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {/* <tr>
                                <td colSpan="5">
                                    <div className="p-5 text-center font-text text-unactive">
                                        <p>Please choose a course to select employee to enroll</p>
                                    </div>
                                </td>
                            </tr> */}
                            {
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
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            }
            {
                course === "course2" &&
                <div className='row-start-3 row-span-2 col-start-1 col-span-3 px-5 py-2'>
                    <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                    <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 flex flex-row gap-4'>
                                    {/* Checkbox */}
                                    <div className="group grid size-4 grid-cols-1">
                                        <input type="checkbox"
                                            className="col-start-1 row-start-1 appearance-none border border-primary rounded checked:border-primary checked:bg-primary indeterminate:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                            ref={selectAll}
                                            onChange={() => handleSelectAll(course)}
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
                                    <p>EMPLOYEE NAME</p>
                                </th>
                                <th className='py-4 px-4'>DEPARTMENT</th>
                                <th className='py-4 px-4'>BRANCH</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {/* <tr>
                                <td colSpan="5">
                                    <div className="p-5 text-center font-text text-unactive">
                                        <p>Please choose a course to select employee to enroll</p>
                                    </div>
                                </td>
                            </tr> */}
                            {
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
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            }

            {/* User Pagination */}
            <div className='row-start-5 row-span-1 col-start-1 col-span-3 border-t border-divider mx-5 flex flex-row items-center justify-between'>
                {/* Total number of entries and only be shown */}
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>1</span> to <span className='font-header text-primary'>31</span> of <span className='font-header text-primary'>43</span> <span className='text-primary'>results</span>
                    </p>
                </div>
                {/* Paganation */}
                <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a href="#"
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {/* {Pages.map((page)=>(
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
                        ))} */}

                        <a href="#"
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>

        </div>
    )
}
