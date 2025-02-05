import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import AssignedCourseCatalogCard from "../modalsandprops/AssignedCourseCatalogCard"

//
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
    return(
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_3.75rem] h-full w-full'>
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

            {/* Filter */}
            <div className="col-start-1 row-start-2 row-span-1 flex flex-row justify-between items-center ml-5 py-3">
                <button className='flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md'>
                    <p>Filter</p>
                    <FontAwesomeIcon icon={faFilter}/>
                </button>
            </div>

            {/* Course Catalog */}
            <div className="border border-red-500 ml-5 col-span-3 row-start-3 row-span-2 mb-5 grid grid-cols-4 gap-4 auto-rows-auto">
                {/* Course Card */}
                {assigned_courses.map((course, index) => {
                    return(
                        <AssignedCourseCatalogCard key={index} name={course.name}/>
                    )
                })}
            </div>

            {/* Buffer */}
            <div className="col-span-4 row-start-5 row-span-1">

            </div>

        </div>
    )
}
