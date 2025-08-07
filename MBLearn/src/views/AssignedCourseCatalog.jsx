import { faArrowDownShortWide, faArrowDownZA, faArrowUpAZ, faArrowUpWideShort, faBook, faBookBookmark, faBookmark, faChalkboard, faChevronLeft, faChevronRight, faExclamationTriangle, faFilter, faFloppyDisk, faFolderPlus, faPen, faPersonChalkboard, faSearch, faSort, faSpinner, faSwatchbook } from "@fortawesome/free-solid-svg-icons"
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
import AddCourseModal from "../modalsandprops/AddCourseModal"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet"
import { useCourseContext } from "../contexts/CourseListProvider"
import { useFormik } from "formik"
import CourseCard from "../modalsandprops/CourseCard"

import { useNavigate } from "react-router"
import { useCourse } from "../contexts/Course"
import { Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,} from "../components/ui/select"



export default function AssignedCourseCatalog() {
    const {coursetypes, coursecategories} = useCourseContext();
    const {user} = useStateContext();
    const [loading, setLoading] = useState(true);
    const [assigned_course, setAssignedCourse] = useState([]);
    const [tab, setTab] = useState("myCourses");
    const [openAddCourse, setOpenAddCourse] = useState(false);
    const [isFiltered, setFiltered] = useState(false);
    const {setCourse} = useCourse();
    const navigate = useNavigate();


    useEffect(() => {
        setCourse(null)
    },[])


    // Sort Order State
    const [sort, setSort] = useState({
        name : "none",
        created_at : "none",
    });
    const toggleSort = (key,value) => {
        setSort((prev => ({
            ...prev,
            [key]:value,
        })));
    }
    const setOrder = (key, tab) => {
        const order = sort[key] === "none" ? "asc" : sort[key] === "asc" ? "desc" : "none";
        toggleSort(key, order);

        if(tab === "myCourses"){
            axiosClient.get('')
        }else if(tab === "assignedCourses"){

        }else if(tab === "allCourses"){
            setLoading(true)
            axiosClient.get(`/courses?${key}[${order}]=true`)
            .then(({ data }) => {
                console.log(data)
                setAssignedCourse(data.data)
                pageChangeState("totalCourses", data.total)
                pageChangeState("lastPage", data.lastPage)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    const courseFormik = useFormik({
        initialValues: {
            courseType: "myCourses",
        },
    })
    const fetchCourses = (typeOfCourse) => {
        setLoading(true)
        if(typeOfCourse === "myCourses"){
            axiosClient.get(`/select-user-added-courses/${user.user_infos?.id}`,{
                params: {
                    page: pageState.currentPage,
                    perPage: pageState.perPage,
                }
            })
            .then(({data}) => {
                setAssignedCourse(data.data)
                pageChangeState("totalCourses", data.total)
                pageChangeState("lastPage", data.lastPage)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
        } else if(typeOfCourse ==="assigned"){
            axiosClient.get(`/select-user-assigned-courses/${user.user_infos?.id}`,{
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
                })
        } else if(typeOfCourse === "archived"){
            axiosClient.get('/courses', {
                params: {
                    page: pageState.currentPage,
                    perPage: 6,
                }
            })
            .then(({ data }) => {
                setAssignedCourse(data.data.data)
                pageChangeState("totalCourses", data.total)
                pageChangeState("lastPage", data.lastPage)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }


    const [pageState, setPagination] = useState({
        currentPage: 1,
        perPage: 8,
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
            fetchCourses(courseFormik.values.courseType);
        },[pageState.currentPage, pageState.perPage, courseFormik.values.courseType])

        //Next and Previous
        const back = () => {
            if (loading) return;
            if (pageState.currentPage > 1){
                pageChangeState("currentPage", pageState.currentPage - 1)
                pageChangeState("startNumber", pageState.perPage - 4)
            }
        }
        const next = () => {
            if (loading) return;
            if (pageState.currentPage < pageState.lastPage){
                pageChangeState("currentPage", pageState.currentPage + 1)
            }
        }

        const Pages = [];
        for(let p = 1; p <= pageState.lastPage; p++){
            Pages.push(p)
        }

        const pageChange = (page) => {
            if(loading) return;
            if(page > 0 && page <= pageState.lastPage){
                pageChangeState("currentPage", page)
            }
        }

        // useEffect(()=> {
        //     assigned_course.map((course, index) => {
        //         console.log(course.categories[0].category_name)
        //     })
        // },[assigned_course])

        const formik = useFormik({
            initialValues: {
                type: "",
                category: "",
                training_type: "",
            },
            onSubmit: (values) => {
                console.log(values);

                // if(tab === "myCourses"){
                //     axiosClient.get(`/select-user-added-courses/${user.user_infos?.id}`,{
                //         params: {
                //             page: pageState.currentPage,
                //             perPage: pageState.perPage,
                //         }
                //     })
                //     .then(({data}) => {
                //         setAssignedCourse(data.data)
                //         pageChangeState("totalCourses", data.total)
                //         pageChangeState("lastPage", data.lastPage)
                //         setLoading(false)
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     })
                // } else if(tab ==="assignedCourses"){
                //     axiosClient.get(`/select-user-assigned-courses/${user.user_infos?.id}`,{
                //             params: {
                //                 page: pageState.currentPage,
                //                 per_page: pageState.perPage,
                //             }
                //         })
                //         .then(({ data }) => {
                //             setAssignedCourse(data.data)
                //             pageChangeState("totalCourses", data.total)
                //             pageChangeState("lastPage", data.lastPage)
                //             setLoading(false)
                //         })
                //         .catch((err) => {
                //             console.log(err);
                //         })
                // } else if(tab === "allCourses"){
                //     axiosClient.get('/courses')
                //     .then(({ data }) => {
                //         setAssignedCourse(data.data)
                //         pageChangeState("totalCourses", data.total)
                //         pageChangeState("lastPage", data.lastPage)
                //         setLoading(false)
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     })
                // }
                setFiltered(true)
            }
        })

        const clearFilter = () => {
            setFiltered(false)
            formik.resetForm()
        }


    return(
    <>
        <div className='grid grid-cols-4 h-full w-full
                        grid-rows-[6.25rem_min-content_min-content_1fr_min-content]
                        xl:grid-rows-[6.25rem_min-content_1fr_min-content]'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Course Manager</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center row-span-1 border-b border-divider
                            col-start-1 row-start-1 col-span-3 ml-3
                            xl:col-span-3
                            sm:col-span-3 sm:ml-4'>
                <h1 className='text-primary font-header
                                text-xl
                                sm:text-2xl
                                xl:text-4xl'>Course Manager</h1>
                <p className='font-text text-unactive
                                text-xs
                                xl:text-sm
                                sm:text-xs' >View and manage the courses for easy course access and tracking.</p>
            </div>

            <div className='row-start-1 flex flex-col justify-center border-divider border-b
                            items-end mr-3
                            xl:col-start-4 xl:pl-5 xl:mr-5
                            sm:col-span-1 sm:col-start-4 sm:py-2 sm:mr-4'>
                {
                    <div className="relative group sm:w-full">
                        <button className='inline-flex flex-row shadow-md items-center justify-center bg-primary font-header text-white text-base p-4 rounded-full hover:bg-primaryhover transition-all ease-in-out
                                            w-16 h-16
                                            sm:w-full' onClick={()=>setOpenAddCourse(true)}>
                            <FontAwesomeIcon icon={faFolderPlus} className='sm:mr-2'/>
                            <p className="hidden sm:block">Add Course</p>
                        </button>
                        <div className="absolute bottom-[-3.5rem] w-full bg-tertiary rounded-md text-white font-text text-xs p-2 items-center justify-center text-center scale-0 group-hover:scale-100 block transition-all ease-in-out
                                        sm:hidden">
                            <p>Add Course</p>
                        </div>
                    </div>
                }
            </div>

            {/* Tabs */}
            <div className="col-span-2 row-start-2 pl-3 pr-1 pt-2
                            md:col-span-1 md:pl-4 md:py-2">
                <Select value={courseFormik.values.courseType} onValueChange={(value) => {courseFormik.setFieldValue("courseType", value);}} disabled={loading}>
                    <SelectTrigger className="focus:outline-2 focus:-outline-offset-2 focus:outline-primary border-primary border-2 font-header text-primary w-full h-full bg-white">
                        <SelectValue placeholder="Course Type" />
                    </SelectTrigger>
                    <SelectContent className="font-text text-xs text-primary hover:cursor-pointer">
                        <SelectItem value="myCourses">My Courses</SelectItem>
                        <SelectItem value="assigned">Assigned Courses</SelectItem>
                        <SelectItem value="archived">Archived Courses</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Sorter */}
            <div className="flex flex-row gap-2 items-center pl-1 pt-2 col-span-2 pr-3
                            md:row-start-2 md:col-start-2 md:py-2">
                {/* Sort by Name */}
                <div className={`h-fit flex flex-row items-center justify-between border-2 border-primary py-2 px-4 font-header rounded-md text-primary gap-2 md:w-fit w-full  transition-all ease-in-out shadow-md ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer"} ${sort.name === "asc" ? 'bg-primary text-white' : sort.name === "desc" ? 'bg-primary text-white': 'bg-secondarybackground' }`}
                    onClick={() => {
                        if(loading) return;
                        setOrder("name", tab)
                    }}>
                    <p>Name</p>
                    <FontAwesomeIcon icon={sort.name === "asc" ? faArrowUpAZ : sort.name === "desc" ? faArrowDownZA : faSort}/>
                </div>
                {/* Sort By Date-Added */}
                <div className={`h-fit flex flex-row items-center justify-between border-2 border-primary py-2 px-4 font-header rounded-md text-primary gap-2 md:w-fit w-full transition-all ease-in-out shadow-md ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer"} ${sort.created_at === "asc" ? 'bg-primary text-white' : sort.created_at === "desc" ? 'bg-primary text-white': 'bg-secondarybackground' }`}
                    onClick={() => {
                        if(loading) return;
                        setOrder("created_at", tab)
                    }}>
                    <p>Date</p>
                    <FontAwesomeIcon icon={sort.created_at === "asc" ? faArrowUpWideShort : sort.created_at === "desc" ? faArrowDownShortWide : faSort}/>
                </div>
            </div>

            {/* Filter */}

            {/* Search */}
            {/* <div className="col-start-4 flex flex-row justify-between items-center mr-5 border-divider py-1 gap-2">
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md font-text shadow-md w-full'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div> */}
            {/* Filter & Search */}
            <div className="flex flex-row gap-2 pr-3 row-start-3 col-span-4 pt-2 px-3
                            md:pr-5 md:grid md:grid-cols-2 md:col-span-2 md:py-2 md:col-start-3 md:row-start-2">
                <div className="flex flex-row justify-end items-center gap-2">
                    <Sheet>
                        <SheetTrigger>
                            <div className={`w-10 h-10 flex justify-center items-center border-2 border-primary rounded-md shadow-md hover:cursor-pointer hover:scale-105 hover:bg-primaryhover hover:text-white transition-all ease-in-out ${isFiltered ? "bg-primary text-white":"bg-white text-primary"}`}>
                                <FontAwesomeIcon icon={faFilter}/>
                            </div>
                        </SheetTrigger>
                        <SheetOverlay className="bg-gray-500/75 backdrop-blur-sm transition-all" />
                        <SheetContent className="h-full flex-col flex">
                        <div>
                            <h1 className='font-header text-2xl text-primary'>Course Filter</h1>
                            <p className='text-md font-text text-unactive text-sm'>Categorize courses</p>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                <label htmlFor="type" className="font-header text-xs flex flex-row justify-between">
                                    <p className="font-text text-xs text-unactive">Course Type</p>
                                </label>
                                <div class="grid grid-cols-1">
                                    <select id="type" name="type" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                    <option value="">Select a course type</option>
                                    {coursetypes.map((type) => (
                                        <option key={type.id} value={type.id}>{type.type_name}</option>
                                    ))}
                                    </select>
                                    <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                <label htmlFor="category" className="font-header text-xs flex flex-row justify-between">
                                    <p className="font-text text-xs text-unactive">Course Category</p>
                                </label>
                                <div class="grid grid-cols-1">
                                    <select id="category" name="category" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                    <option value="">Select a course category</option>
                                    {coursecategories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.category_name}</option>
                                    ))}
                                    </select>
                                    <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                    {/* {formik2.touched.course_type && formik2.errors.course_type ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_type}</div>):null} */}
                            </div>
                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                <label htmlFor="training_type" className="font-header text-xs flex flex-row justify-between">
                                    <p className="font-text text-xs text-unactive">Training Type</p>
                                </label>
                                <div class="grid grid-cols-1">
                                    <select id="training_type" name="training_type" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                        value={formik.values.training_type}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                    <option value="">Select a Training Type</option>
                                    <option value="Mandatory">Mandatory</option>
                                    <option value="Unmandatory">Non-Mandatory</option>
                                    </select>
                                    <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                    {/* {formik2.touched.course_type && formik2.errors.course_type ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_type}</div>):null} */}
                            </div>
                            <div className="flex flex-row gap-2 w-full py-2">
                            <button
                            type="submit"
                            className="border-2 border-primary rounded-md w-full py-2 px-4 font-header text-white bg-primary flex justify-center items-center hover:cursor-pointer hover:bg-primaryhover transition-all ease-in-out shadow-md"
                            >
                            <p>Filter</p>
                            </button>
                                {
                                    isFiltered ? (<div className="border-2 border-primary rounded-md w-full py-2 px-4 font-header text-primary bg-white flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out shadow-md" onClick={clearFilter}>
                                                        <p>Clear</p>
                                                    </div>) : null
                                }
                            </div>
                        </div>
                        </form>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md font-text shadow-md w-full'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>

            {/* Course Catalog */}
            {/* {`pr-5 pl-4 col-span-4 row-start-4 row-span-1 grid grid-cols-4 gap-3 py-2
                                md:grid-cols-4 md:grid-rows-2`}> */}
            <div className = {`grid px-3 py-2 col-span-4 grid-cols-2 grid-rows-3 gap-2
                                md:pr-5 md:pl-4
                                lg:grid-cols-4 lg:grid-rows-2`}>
                {
                    loading ?
                    Array.from({length: 8 }).map((_, index) => (
                                <div key={index} className="animate-pulse bg-white w-full h-full rounded-md shadow-md border"/>
                    ))
                    :assigned_course.length === 0 ?
                    <div className="col-span-4 row-span-2 flex flex-col justify-center items-center gap-4">
                        <div className="flex items-center justify-center w-28 h-28 bg-primarybg rounded-full text-primary">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-6xl"/>
                        </div>
                        <p className="text-unactive font-text text-sm">You dont have any {courseFormik.values.courseType === "myCourses" ? "inputted courses": courseFormik.values.courseType === "assigned" ? "assigned courses" : courseFormik.values.courseType === archived ? "archived courses" : "courses yet"} yet.. </p>
                    </div>
                    :
                    assigned_course.map((course, index) => (
                        <CourseCard key={course.id} course={course} type={courseFormik.values.courseType === "myCourses" || courseFormik.values.courseType === "assigned" ? "courseAdminCourseManager" : "general"} click={()=>{setCourse(course), navigate(`/courseadmin/course/${course.id}`)}}/>
                    ))
                }
            </div>

            {/* Pagination */}
            <div className="mx-5 col-span-4 row-start-5 row-span-1 flex flex-row justify-between items-center py-3">
                {/* Total number of entries and only be shown */}
                <div>
                    {
                        loading ?
                        <div className='flex flex-row items-center gap-2'>
                            <FontAwesomeIcon icon={faSpinner} className='animate-spin mr-2'/>
                            <p className='text-sm font-text text-unactive'>Loading courses...</p>
                        </div>
                        :
                        <p className='text-sm font-text text-unactive'>
                            Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalCourses}</span> <span className='text-primary'>results</span>
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
                                loading ? (<a className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset`}>...</a>)
                                :
                                (Pages.map((page)=>(
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

        {/* Add Course */}
        <AddCourseModal open={openAddCourse} onClose={()=>setOpenAddCourse(false)} tab={tab} refresh={()=>fetchCourses("myCourses")}/>
        </>
    )
}
