import { faArrowDownShortWide, faArrowDownZA, faArrowUpAZ, faArrowUpWideShort, faBook, faBookBookmark, faChalkboard, faChevronLeft, faChevronRight, faFilter, faFloppyDisk, faFolderPlus, faPen, faPersonChalkboard, faSearch, faSort } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import AssignedCourseCatalogCard from "../modalsandprops/AssignedCourseCatalogCard"
import { useEffect, useState } from "react"
import CourseFilterProps from "../modalsandprops/CourseFilterProps"
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../axios-client"
import { use } from "react"
import CourseLoading from "../assets/Course_Loading.svg"
import { set } from "date-fns"

//Assigned Courses
// const assigned_courses = [
//     {name: "Effective Communication Skills in the Workplace", courseType:"Soft Skill Training", courseCategory:"Personal Development", duration: "2 Weeks", method: "Asynchronous"},
//     {name: "Time Management and Productivity Hacks", courseType:"Soft Skill Training", courseCategory:"Personal Development", duration: "1 Weeks", method: "Online Training"},
//     {name: "Advanced Excel for Financial Analysis", courseType:"Technical Training", courseCategory:"Finance & Accounting", duration: "3 Weeks", method: "Blended Learning"},
//     {name: "Cybersecurity Awareness for Employees", courseType:"Compliance Training", courseCategory:"IT Security", duration: "2 Weeks", method: "Asynchronous"},
//     {name: "Customer Service Excellence", courseType:"Soft Skill Training", courseCategory:"Customer Relations", duration: "2 Weeks", method: "Instructor-Led Training"},
//     {name: "Agile Project Management Fundamentals", courseType:"Technical Training", courseCategory:"Project Management", duration: "4 Weeks", method: "Online Training"},
//     {name: "Customer Service Excellence", courseType:"Soft Skill Training", courseCategory:"Customer Relations", duration: "2 Weeks", method: "Instructor-Led Training"},
//     {name: "Agile Project Management Fundamentals", courseType:"Technical Training", courseCategory:"Project Management", duration: "4 Weeks", method: "Online Training"},
// ]



export default function AssignedCourseCatalog() {
    const {user} = useStateContext();
    const [loading, setLoading] = useState(false);
    const [assigned_course, setAssignedCourse] = useState([]);
    const [tab, setTab] = useState(1);

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
        tab: "active",
        editFilter: false,
    })
    const toggleState = (key,value) => {
        setState((prev => ({
            ...prev,
            [key]:value,
        })));
    }

    const fetchCourses = () => {
        setLoading(true)
        axiosClient.get(`/select-user-assigned-courses/${user.id}`,{
            params: {
                page: pageState.currentPage,
                per_page: pageState.perPage,
            }
        })
        .then(({ data }) => {
            setAssignedCourse(data.data)
            pageChangeState("totalCourses", data.total)
            pageChangeState("lastPage", data.lastPage)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
        });

    }

    const [pageState, setPagination] = useState({
        currentPage: 1,
        perPage: 6,
        totalCourses: 0,
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
            pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.totalCourses))
        },[pageState.currentPage, pageState.perPage, pageState.totalCourses])

        useEffect(()=>{
            fetchCourses()
        },[pageState.currentPage, pageState.perPage])

        //Next and Previous
        const back = () => {
            if (modalState.loading) return;
            if (pageState.currentPage > 1){
                pageChangeState("currentPage", pageState.currentPage - 1)
                pageChangeState("startNumber", pageState.perPage - 4)
            }
        }
        const next = () => {
            if (modalState.loading) return;
            if (pageState.currentPage < pageState.lastPage){
                pageChangeState("currentPage", pageState.currentPage + 1)
            }
        }

        const Pages = [];
        for(let p = 1; p <= pageState.lastPage; p++){
            Pages.push(p)
        }

        const pageChange = (page) => {
            if(modalState.loading) return;
            if(page > 0 && page <= pageState.lastPage){
                pageChangeState("currentPage", page)
            }
        }

        // useEffect(()=> {
        //     assigned_course.map((course, index) => {
        //         console.log(course.categories[0].category_name)
        //     })
        // },[assigned_course])


    return(
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_min-content_1fr_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Course Manager</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>Course Manager</h1>
                <p className='font-text text-sm text-unactive' >View and manage the courses for easy course access and tracking.</p>
            </div>

            <div className='col-start-4 row-start-1 flex flex-col justify-center pl-5 mr-5 border-divider border-b'>
                <button className='inline-flex flex-row shadow-md items-center justify-center bg-primary font-header text-white text-base p-4 rounded-full hover:bg-primaryhover hover:scale-105 transition-all ease-in-out' onClick={()=>toggleModal('openAddCourse',true)}>
                    <FontAwesomeIcon icon={faFolderPlus} className='mr-2'/>
                    <p>Add Course</p>
                </button>
            </div>

            {/* Tabs */}
            <div className="px-5 col-span-4 w-full py-2 flex flex-row justify-between items-center gap-2">
                <div className= {`w-full border-2 border-primary px-4 py-2 rounded-md shadow-md text-primary font-header ${tab === 1 ? "bg-primary text-white":null} hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out`} onClick={() => {setTab(1)}}>
                        <p className="flex gap-2"><span><FontAwesomeIcon icon={faBookBookmark}/></span> My Courses</p>
                        <p className="text-xs font-text">Manage and view all your inputted courses</p>
                    </div>
                    <div className={`w-full border-2 border-primary px-4 py-2 rounded-md shadow-md text-primary font-header ${tab === 2 ? "bg-primary text-white":null} hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out`} onClick={() => {setTab(2)}}>
                        <p className="flex gap-2"><span><FontAwesomeIcon icon={faBook}/></span>Assigned Courses</p>
                        <p className="text-xs font-text">Manage and view all your assigned courses</p>
                    </div>
            </div>

            {/* Sorter */}
            <div className="flex flex-row gap-2 pl-5 items-center">
                {/* Sort by Name */}
                <div className={`h-fit flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.nameOrder === "asc" ? '!bg-primary !text-white' : sort.nameOrder === "desc" ? '!bg-primary !text-white': 'bg-secondarybackground' }`} onClick={() => setOrder("nameOrder")}>
                    <p>Name</p>
                    <FontAwesomeIcon icon={sort.nameOrder === "asc" ? faArrowUpAZ : sort.nameOrder === "desc" ? faArrowDownZA : faSort}/>
                </div>
                {/* Sort By Date-Added */}
                <div className={`h-fit flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.dateOrder === "asc" ? '!bg-primary !text-white' : sort.dateOrder === "desc" ? '!bg-primary !text-white': 'bg-secondarybackground' }`} onClick={() => setOrder("dateOrder")}>
                    <p>Date</p>
                    <FontAwesomeIcon icon={sort.dateOrder === "asc" ? faArrowUpWideShort : sort.dateOrder === "desc" ? faArrowDownShortWide : faSort}/>
                </div>
            </div>

            {/* Filter */}
            <div className="col-start-3 flex justify-end items-center pr-2">
                <div className="h-fit p-2 flex justify-center items-center bg-primary aspect-square border-2 border-primary rounded-md shadow-md text-white hover:cursor-pointer hover:scale-105 transition-all ease-in-out">
                    <FontAwesomeIcon icon={faFilter}/>
                </div>
            </div>
            {/* Search */}
            <div className="col-start-4 flex flex-row justify-between items-center mr-5 border-divider py-1 gap-2">
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md font-text shadow-md w-full'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>

            {/* Course Catalog */}
            <div className="mx-5 col-span-4 row-start-4 row-span-1 grid grid-cols-4 grid-rows-2 gap-2 py-2">
                {
                    assigned_course && !loading ? assigned_course.map((course, index) => {
                        return(
                            <AssignedCourseCatalogCard key={index}
                                id={course.id}
                                name={course.name}
                                courseType={course.types[0]?.type_name}
                                courseCategory={course.categories[0]?.category_name}
                                trainingMode={course.training_modes[0]?.modes_name}
                                trainingType={course.training_type}/>
                        )}) : (
                            <div className="col-span-4 row-span-2 flex flex-col gap-4 items-center justify-center text-center h-full">
                                <img src={CourseLoading} alt="" className="w-80"/>
                                <p className="text-sm font-text text-primary">Hang tight! 🚀 Loading courses for — great things take a second!</p>
                            </div>
                        )
                }

            </div>

            {/* Assigned Course Filter */}
            {/* <div className="col-start-4 row-start-2 mx-5 py-2 inline-flex justify-between items-center flex-row">
                    Filter Header
                    <div>
                        <h1 className='font-header text-2xl text-primary'>Course Filter</h1>
                        <p className='text-md font-text text-unactive text-sm'>Categorize courses</p>
                    </div>
                    <div>
                    Course Button
                    {
                        user.role === "System Admin" ? (

                                !state.editFilter ?
                                <div className='relative group aspect-square w-10 rounded-full flex items-center justify-center bg-primarybg text-primary cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out' onClick={()=>toggleState('editFilter',true)}>
                                    <FontAwesomeIcon icon={faPen}/>
                                    <p className='absolute w-auto top-12 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Edit</p>
                                </div> :
                                <div className='relative group aspect-square w-10 rounded-full flex items-center justify-center bg-primarybg text-primary cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out' onClick={()=>toggleState('editFilter',false)}>
                                    <FontAwesomeIcon icon={faFloppyDisk}/>
                                    <p className='absolute w-auto top-12 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Save</p>
                                </div>
                        ):null
                    }
                    </div>
            </div> */}
            {/* <div className="col-start-4 row-start-3 row-span-3 flex flex-col h-full">
                <CourseFilterProps isEdit={state.editFilter}/>
            </div> */}

            {/* Pagination */}
            <div className="mx-5 col-span-4 row-start-5 row-span-1 flex flex-row justify-between items-center py-3 border-t border-divider">
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
