import { faArrowDownShortWide, faArrowDownZA, faArrowUpAZ, faArrowUpWideShort, faChalkboard, faChevronLeft, faChevronRight, faFilter, faPersonChalkboard, faSearch, faSort } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import AssignedCourseCatalogCard from "../modalsandprops/AssignedCourseCatalogCard"
import React, { useState } from "react"


//Assigned Courses
const assigned_courses = [
    {name: "Effective Communication Skills in the Workplace", courseType:"Soft Skill Training", courseCategory:"Personal Development", duration: "2 Weeks", method: "Asynchronous"},
    {name: "Time Management and Productivity Hacks", courseType:"Soft Skill Training", courseCategory:"Personal Development", duration: "1 Weeks", method: "Online Training"},
    {name: "Advanced Excel for Financial Analysis", courseType:"Technical Training", courseCategory:"Finance & Accounting", duration: "3 Weeks", method: "Blended Learning"},
    {name: "Cybersecurity Awareness for Employees", courseType:"Compliance Training", courseCategory:"IT Security", duration: "2 Weeks", method: "Asynchronous"},
    {name: "Customer Service Excellence", courseType:"Soft Skill Training", courseCategory:"Customer Relations", duration: "2 Weeks", method: "Instructor-Led Training"},
    {name: "Agile Project Management Fundamentals", courseType:"Technical Training", courseCategory:"Project Management", duration: "4 Weeks", method: "Online Training"},
    {name: "Customer Service Excellence", courseType:"Soft Skill Training", courseCategory:"Customer Relations", duration: "2 Weeks", method: "Instructor-Led Training"},
    {name: "Agile Project Management Fundamentals", courseType:"Technical Training", courseCategory:"Project Management", duration: "4 Weeks", method: "Online Training"},
]



export default function AssignedCourseCatalog() {

    // Sort Order State
    const [sort, setSort] = useState({
        nameOrder : "none",
        dateOrder : "none",
    });
    const toggleSort = (key,value) => {
        setSort((prev => ({
            ...prev,
            [key]:value,
        })));
    }
    const setOrder = (key) => {
        const order = sort[key] === "none" ? "asc" : sort[key] === "asc" ? "desc" : "none";
        toggleSort(key, order);
    }

    //UseState
    const [state, setState] = useState({
        tab: "active"
    })
    const toggleState = (key,value) => {
        setState((prev => ({
            ...prev,
            [key]:value,
        })));
    }



    return(
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_auto_3rem] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Assigned Courses Catalog</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>Assigned Course Catalog</h1>
                <p className='font-text text-sm text-unactive' >View and manage the assigned course catalog for easy course access and tracking.</p>
            </div>

            {/* Search */}
            <div className="col-start-4 row-start-1 row-span-1 flex flex-row justify-between items-center border-b mr-5 border-divider">
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md font-text shadow-md w-full'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>

            {/* Sorter  and Assigned/Active toggle*/}
            <div className="col-start-1 col-span-3 row-start-2 row-span-1 flex flex-row justify-between items-center ml-5 py-3">
                <div className="flex flex-row gap-2">
                    {/* Sort by Name */}
                    <div className={`flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.nameOrder === "asc" ? '!bg-primary !text-white' : sort.nameOrder === "desc" ? '!bg-primary !text-white': 'bg-secondarybackground' }`} onClick={() => setOrder("nameOrder")}>
                        <p>Course Name</p>
                        <FontAwesomeIcon icon={sort.nameOrder === "asc" ? faArrowUpAZ : sort.nameOrder === "desc" ? faArrowDownZA : faSort}/>
                    </div>
                    {/* Sort By Date-Added */}
                    <div className={`flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.dateOrder === "asc" ? '!bg-primary !text-white' : sort.dateOrder === "desc" ? '!bg-primary !text-white': 'bg-secondarybackground' }`} onClick={() => setOrder("dateOrder")}>
                        <p>Assigned Date</p>
                        <FontAwesomeIcon icon={sort.dateOrder === "asc" ? faArrowUpWideShort : sort.dateOrder === "desc" ? faArrowDownShortWide : faSort}/>
                    </div>
                </div>
                <div>
                    <div className="inline-flex round-md shadow-md hover:cursor-pointer">
                        <span className={`flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-l-md px-5 py-2 hover:bg-primary hover:text-white transition-all ease-in-out ${state.tab === "assigned" ? "bg-primary text-white":"bg-white text-primary"}`} onClick={() => toggleState("tab", "assigned")}>
                            <FontAwesomeIcon icon={faChalkboard}/>
                            <p>Assigned Courses</p>
                        </span>
                        <span className={`flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-r-md px-5 py-2  hover:bg-primary hover:text-white transition-all ease-in-out ${state.tab === "active" ? "bg-primary text-white":"bg-white text-primary"}`} onClick={()=> toggleState("tab", "active")}>
                            <FontAwesomeIcon icon={faPersonChalkboard}/>
                            <p>Active Assigned Courses</p>
                        </span>
                    </div>
                </div>
            </div>

            {/* Course Catalog */}
            <div className="ml-5 col-span-3 row-start-3 row-span-1 grid grid-cols-4 gap-2 auto-rows-auto">
                {/* Course Card */}
                {assigned_courses.map((course, index) => {
                    return(
                        <AssignedCourseCatalogCard key={index}
                            name={course.name}
                            courseType={course.courseType}
                            courseCategory={course.courseCategory}/>
                    )
                })}
            </div>

            {/* Assigned Course Filter */}
            <div className="col-start-4 row-start-2 row-span-3 flex flex-row justify-center items-center">
                Course Filter
            </div>

            {/* Pagination */}
            <div className="ml-5 col-span-3 row-start-4 row-span-1 flex flex-row justify-between items-center">
                {/* Total number of entries and only be shown */}
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>1</span> to <span className='font-header text-primary'>2</span> of <span className='font-header text-primary'>3</span> <span className='text-primary'>results</span>
                    </p>
                </div>
                {/* Paganation */}
                <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a
                            // onClick={back}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {/* {Pages.map((page)=>(
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
                        ))} */}
                        {/* Sample */}
                        <a href="#" className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset">
                            1
                        </a>
                        <a
                            // onClick={next}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>

        </div>
    )
}
