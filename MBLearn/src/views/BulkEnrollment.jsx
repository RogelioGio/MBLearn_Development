import { faChevronLeft, faChevronRight, faFilter, faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { useEffect, useRef, useState } from "react"
import Learner from "../modalsandprops/LearnerEnroleeEntryProps"

export default function BulkEnrollment() {

    const [learners, setLearners] = useState([]); //List all learners
    const [selected, setSelected] = useState([]); //Select learner to ernoll
    const selectAll = useRef(false) //select all learners

    //Learner to enroll
    const handleCheckbox = (employeeID) => {
        setSelected((prevUsers) => {
            if(prevUsers.includes(employeeID)){
                return prevUsers.filter((user) => user !== employeeID);
            } else {
                return [...prevUsers, employeeID];
            }
        });
    };

    //Select All Learners
    const handleSelectAll = () => {
        if(selected.length === learners.length){
            setSelected([]);
        } else {
            setSelected(learners.map((enrollees) => enrollees.employeeID));
        }
    }

    //handle indertiminate checkbox
    useEffect(() => {
        if(!selectAll.current) return;

        if(selected.length === learners.length && learners.length > 0){
            selectAll.current.indeterminate = false;
            selectAll.current.checked = true;
        } else if(selected.length > 0){
            selectAll.current.indeterminate = true;
        } else {
            selectAll.current.indeterminate = false;
            selectAll.current.checked = false;

        }
    },[selected, learners]);

    //Number of enrollees
    const numberOfEnrollees = () => {
        return selected.length;
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
                    <div className="w-full py-5 px-4 border border-divider bg-primary rounded-md font-text text-white text-center shadow-md hover:cursor-pointer hover:scale-105 transition-all ease-in-out">
                    Effective Communication Skills in the Workplace
Soft Skills Training-Personal Development
Duration:
2 weeks
Asynchronous
                        <p>{selected.length > 0 && <p>{numberOfEnrollees()}</p>}</p>
                    </div>
                    <div className="w-full py-5 px-4 border border-divider bg-white rounded-md font-text text-primary text-center shadow-md hover:cursor-pointer hover:scale-105 transition-all ease-in-out">
                        sample course card
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
                                        onChange={handleSelectAll}
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
                                    selectedUser={selected}
                                    handleCheckbox={handleCheckbox}/>
                            ))
                        }
                    </tbody>
                </table>
                </div>
            </div>

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
