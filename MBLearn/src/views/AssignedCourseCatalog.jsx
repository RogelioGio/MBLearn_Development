import { faArrowDownShortWide, faArrowDownZA, faArrowUpAZ, faArrowUpWideShort, faBook, faBookBookmark, faBookmark, faChalkboard, faChevronLeft, faChevronRight, faFilter, faFloppyDisk, faFolderPlus, faPen, faPersonChalkboard, faSearch, faSort, faSwatchbook } from "@fortawesome/free-solid-svg-icons"
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
import { useCourse } from "../contexts/CourseContext"
import { useNavigate } from "react-router"



export default function AssignedCourseCatalog() {
    const {coursetypes, coursecategories} = useCourseContext();
    const {user} = useStateContext();
    const [loading, setLoading] = useState(false);
    const [assigned_course, setAssignedCourse] = useState([]);
    const [tab, setTab] = useState("myCourses");
    const [openAddCourse, setOpenAddCourse] = useState(false);
    const [isFiltered, setFiltered] = useState(false);
    //const {SetCourse} = useCourse();
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
        } else if(typeOfCourse ==="assignedCourses"){
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
        } else if(typeOfCourse === "allCourses"){
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
            fetchCourses(tab)
        },[pageState.currentPage, pageState.perPage, tab])

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
                        xl:grid-rows-[6.25rem_min-content_min-content_auto_min-content]
                        '>
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
            <div className="col-span-4 w-full py-2 flex flex-row justify-between items-center gap-2
                            md:pr-5 md:pl-4
                            p-3">
                    <div className="flex flex-row justify-between gap-2
                                    sm:w-full">
                        <div className="relative group sm:w-full">
                            <div className={`flex flex-row px-3 py-2 border-primary border-2 rounded-md font-header items-center gap-2 hover:cursor-pointer transition-all ease-in-out hover:bg-primaryhover hover:text-white ${tab === "myCourses" ? "bg-primary text-white hover:border-primaryhover":"bg-white text-primary hover:border-primaryhover"}
                                        sm:w-full
                                        w-10 h-10`}
                                        onClick={() => {if(!loading) return setTab("myCourses")}}>
                                <FontAwesomeIcon icon={faBookBookmark}/>
                                <p className="sm:flex hidden">My Courses</p>
                            </div>
                            <div className="absolute whitespace-nowrap bg-tertiary p-2 rounded-md text-white font-text text-xs bottom-[-2.1rem] left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all ease-in-out sm:hidden block">
                                <p>My Courses</p>
                            </div>
                        </div>
                        <div className="relative group sm:w-full">
                            <div className={`flex flex-row px-3 py-2 border-primary border-2 rounded-md font-header items-center gap-2 hover:cursor-pointer transition-all ease-in-out hover:bg-primaryhover hover:text-white ${tab === "assignedCourses" ? "bg-primary text-white hover:border-primaryhover":"bg-white text-primary hover:border-primaryhover"}
                                        sm:w-full
                                        w-10 h-10`}
                                        onClick={() => {if(!loading) return setTab("assignedCourses")}}>
                                <FontAwesomeIcon icon={faBook} className=""/>
                                <p className="sm:flex hidden">Assigned Courses</p>
                            </div>
                            <div className="absolute whitespace-nowrap bg-tertiary p-2 rounded-md text-white font-text text-xs bottom-[-2.1rem] left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all ease-in-out sm:hidden block">
                                <p>Assigned Courses</p>
                            </div>
                        </div>
                        <div className="relative group sm:w-full">
                            <div className={`flex flex-row px-3 py-2 border-primary border-2 rounded-md font-header items-center gap-2 hover:cursor-pointer transition-all ease-in-out hover:bg-primaryhover hover:text-white ${tab === "archivedCourses" ? "bg-primary text-white hover:border-primaryhover":"bg-white text-primary hover:border-primaryhover"}
                                            sm:w-full
                                            w-10 h-10`}
                                            onClick={() => {if(!loading) return setTab("archivedCourses")}}>
                                <FontAwesomeIcon icon={faBookmark} className=""/>
                                <p className="sm:flex hidden">Archived Courses</p>
                            </div>
                            <div className="absolute whitespace-nowrap bg-tertiary p-2 rounded-md text-white font-text text-xs bottom-[-2.1rem] left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all ease-in-out sm:hidden block">
                                <p>Archived Courses</p>
                            </div>
                        </div>
                    </div>
                    <div className="sm:hidden font-header text-primary flex flex-col items-end">
                        {
                            tab === "myCourses" ?
                            <>
                                <p>My Courses</p>
                                <p className="text-xs font-text text-unactive">List of your added courses</p>
                            </>
                            : tab === "assignedCourses" ?
                            <>
                                <p>Assigned Courses</p>
                                <p className="text-xs font-text text-unactive">List of assigned courses</p>
                            </>
                            : tab === "archivedCourses" ?
                            <>
                                <p>Archived Courses</p>
                                <p className="text-xs font-text text-unactive">List of archived courses</p>
                            </>
                            : null
                        }
                    </div>
            </div>

            {/* Sorter */}
            <div className="flex flex-row gap-2 pl-3 items-center
                            sm:pl-4">
                {/* Sort by Name */}
                <div className={`h-fit flex flex-row items-center border-2 border-primary py-2 px-4 font-header rounded-md text-primary gap-2 w-fit hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.name === "asc" ? 'bg-primary text-white' : sort.name === "desc" ? 'bg-primary text-white': 'bg-secondarybackground' }`} onClick={() => setOrder("name", tab)}>
                    <p>Name</p>
                    <FontAwesomeIcon icon={sort.name === "asc" ? faArrowUpAZ : sort.name === "desc" ? faArrowDownZA : faSort}/>
                </div>
                {/* Sort By Date-Added */}
                <div className={`h-fit flex flex-row items-center border-2 border-primary py-2 px-4 font-header rounded-md text-primary gap-2 w-fit hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.created_at === "asc" ? 'bg-primary text-white' : sort.created_at === "desc" ? 'bg-primary text-white': 'bg-secondarybackground' }`} onClick={() => setOrder("created_at", tab)}>
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
            <div className="col-span-2 col-start-3 flex flex-row gap-2 pr-3
                            md:pr-5 md:grid md:grid-cols-2">
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
                    !loading ? (
                        assigned_course && assigned_course.length > 0 ? (
                            assigned_course?.map((course, index) => (
                                <CourseCard key={course.id} course={course} type={tab === "myCourses" || tab === "assignedCourses" ? "courseAdminCourseManager" : "general"} click={()=>{navigate(`/courseadmin/course/${course.id}`); setCourse(course)}}/>
                            ))
                        ) :
                        (
                            <div className="flex flex-col gap-4 items-center justify-center text-center h-full col-span-2 row-span-3
                                            lg:col-span-4 lg:row-span-2">
                                <p className="text-sm font-text text-unactive">No available courses yet</p>
                            </div>
                        )
                    ) : (
                            Array.from({length: pageState.perPage}).map((_, index) => (
                                <div key={index} className="animate-pulse bg-white w-full h-full rounded-md shadow-md"/>
                            ))

                    )
                }
            </div>

            {/* Pagination */}
            <div className="mx-5 col-span-4 row-start-5 row-span-1 flex flex-row justify-between items-center py-3 border-t border-divider">
                {/* Total number of entries and only be shown */}
                <div>
                    {
                        loading ? <p className='text-sm font-text text-unactive'>Loading courses...</p>
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
