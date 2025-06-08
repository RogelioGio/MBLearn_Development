import { faArrowDownShortWide, faArrowDownZA, faArrowUpAZ, faArrowUpWideShort, faBook, faBookBookmark, faBookmark, faChevronLeft, faChevronRight, faFilter, faSearch, faSort} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
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
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import CourseLoading from "../assets/Course_Loading.svg"
import { Progress } from "../components/ui/progress"
import { useCourse } from "../contexts/selectedcourseContext"
import CourseCard from "../modalsandprops/CourseCard"

export default function LearnerCourseManager() {
    const {coursetypes, coursecategories} = useCourseContext();
    const [tab, setTab] = useState('enrolledCourse')
    const [loading, setLoading] = useState(true)
    const [enrolled, setEnrolled] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)
    const {user} = useStateContext();
    const {coursetype} = useParams()
    const [duration, setDuration] = useState();
    const navigate = useNavigate();
    const {SetCourse} = useCourse()

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

        //handle course duration state
        const handleDurationState = (e) => {
            const selectedValue = e.target.value;
            setDuration(selectedValue)
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

            // useEffect(()=>{
            //     fetchCourses(tab)
            // },[pageState.currentPage, pageState.perPage, tab])

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

    const fetchCourses = () => {
        setLoading(true)
        axiosClient.get(`/select-user-courses/${user.user_infos?.id}?enrollment_status[eq]=${duration}`,
            {
                params: {
                    page: pageState.currentPage,
                    perPage: pageState.perPage,
                }
            }
        )
        .then(({data}) => {
            console.log(data.data)
            setEnrolled(data.data)
            pageChangeState("totalCourses", data.total)
            pageChangeState("lastPage", data.lastPage)
            setLoading(false)
        }).catch((err)=> {
            console.log(err)
        })

    }

    useEffect(() => {
        if (!coursetype && !duration) {
            setDuration("enrolled")
        } else {
            fetchCourses()
        }

    },[duration])

    useEffect(() => {
        console.log(enrolled)
        console.log(loading, " Is Loading")
    },[enrolled])


    return(
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_min-content_1fr_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Course Manager</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 border-b mx-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>Course Manager</h1>
                <p className='font-text text-sm text-unactive' >Lets you manage learners' active enrolled courses and access archived courses for better tracking and organization.</p>
            </div>

            {/* Tab */}
            <div className="px-5 col-span-4 w-full py-2 flex flex-row justify-between items-center gap-2">
                <div className= {`w-full border-2 border-primary px-4 py-2 rounded-md shadow-md text-primary font-header ${tab === "enrolledCourse" ? "bg-primary text-white":"bg-white"} hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out`} onClick={() => {setTab("enrolledCourse")}}>
                        <p className="flex gap-2"><span><FontAwesomeIcon icon={faBook}/></span> Enrolled Courses</p>
                        <p className="text-xs font-text">Manage and view all your enrolled courses</p>
                    </div>
                    <div className= {`w-full border-2 border-primary px-4 py-2 rounded-md shadow-md text-primary font-header ${tab === "archived" ? "bg-primary text-white":"bg-white"} hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out`} onClick={() => {setTab("archived")}}>
                        <p className="flex gap-2"><span><FontAwesomeIcon icon={faBookmark}/></span> Archived Courses</p>
                        <p className="text-xs font-text">Manage and view all your archieved courses</p>
                    </div>
            </div>

            {/* Filter */}
            <div className=" row-start-3 col-start-3 flex justify-end items-center pr-2">
                <Sheet>
                    <SheetTrigger>
                        <div className={`h-fit p-2 flex justify-center items-center bg-primary aspect-square border-2 border-primary rounded-md shadow-md hover:cursor-pointer hover:scale-105 hover:bg-primaryhover hover:text-white transition-all ease-in-out ${isFiltered ? "bg-primary text-white":"bg-white text-primary"}`}>
                            <FontAwesomeIcon icon={faFilter}/>
                        </div>
                    </SheetTrigger>
                    <SheetOverlay className="bg-gray-500/75 backdrop-blur-sm transition-all" />
                    <SheetContent className="h-full flex-col flex">
                    <div>
                        <h1 className='font-header text-2xl text-primary'>Course Filter</h1>
                        <p className='text-md font-text text-unactive text-sm'>Categorize courses</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                            <label htmlFor="course_type" className="font-header text-xs flex flex-row justify-between">
                                <p className="font-text text-xs text-unactive">Course Type</p>
                            </label>
                            <div class="grid grid-cols-1">
                                <select id="course_type" name="course_type" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                    // value={formik2.values.course_type}
                                    // onChange={formik2.handleChange}
                                    // onBlur={formik2.handleBlur}
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
                                {/* {formik2.touched.course_type && formik2.errors.course_type ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_type}</div>):null} */}
                        </div>
                        <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                            <label htmlFor="course_type" className="font-header text-xs flex flex-row justify-between">
                                <p className="font-text text-xs text-unactive">Course Category</p>
                            </label>
                            <div class="grid grid-cols-1">
                                <select id="course_type" name="course_type" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                    // value={formik2.values.course_type}
                                    // onChange={formik2.handleChange}
                                    // onBlur={formik2.handleBlur}
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
                            <label htmlFor="course_type" className="font-header text-xs flex flex-row justify-between">
                                <p className="font-text text-xs text-unactive">Training Type</p>
                            </label>
                            <div class="grid grid-cols-1">
                                <select id="course_type" name="course_type" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                    // value={formik2.values.course_type}
                                    // onChange={formik2.handleChange}
                                    // onBlur={formik2.handleBlur}
                                >
                                <option value="">Select a Training Type</option>
                                <option value="">Mandatory</option>
                                <option value="">Non-Mandatory</option>
                                {/* {coursetypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.type_name}</option>
                                ))} */}
                                </select>
                                <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                                {/* {formik2.touched.course_type && formik2.errors.course_type ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_type}</div>):null} */}
                        </div>
                        <div className="flex flex-row gap-2 w-full py-2">
                            <div className="border-2 border-primary rounded-md w-full py-2 px-4 font-header text-white bg-primary flex justify-center items-center hover:cursor-pointer hover:bg-primaryhover transition-all ease-in-out shadow-md">
                                <p>Filter</p>
                            </div>
                            <div className="border-2 border-primary rounded-md w-full py-2 px-4 font-header text-primary bg-white flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out shadow-md">
                                <p>Clear</p>
                            </div>
                        </div>
                    </div>
                    </SheetContent>
                </Sheet>

            </div>

            {/* Course List */}
            <div className="flex flex-row gap-2 pl-5 items-center col-span-2">
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
                {/* Duration type */}
                <div className="inline-flex flex-col gap-1 row-start-4 col-span-1 w-1/2">
                    <div class="grid grid-cols-1">
                        <select id="duration" name="duration" class="border-2 text-primary font-header col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary border-primary"
                            value={duration}
                            onChange={handleDurationState}
                            // onBlur={formik2.handleBlur}
                        >
                        <option value="enrolled">Enrolled</option>
                        <option value="ongoing">On-going</option>
                        <option value="finished">Finished</option>
                        </select>

                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-primary sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
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

            {
                loading ? (
                    <div className="col-span-4 grid grid-rows-2 grid-cols-4 gap-2 px-5 py-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-white w-full h-full rounded-md shadow-md"/>
                    ))}
                    </div>
                ) : enrolled.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center gap-2 col-span-4">
                        <p className="text-unactive font-text">No Courses Enrolled Yet</p>
                    </div>
                ) : (
                    <div className="col-span-4 grid grid-rows-2 grid-cols-4 gap-2 px-5 py-2">
                        {
                            enrolled?.map((course) => (
                                // <div className='bg-white text-white h-full rounded-md shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out grid grid-rows-[min-content_1fr_1fr_min-content]'
                                //     onClick={() => {navigate(`/learner/course/${course.id}`), SetCourse(course)}}
                                // >
                                //     {/* Course Thumbnail */}
                                //     <div className="flex flex-row justify-end bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-t-md p-4 gap-2">
                                //         {/* <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">Published</span> */}
                                //         <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">{course.training_type}</span>
                                //     </div>
                                //     <div className='px-4 py-2 flex flex-col justify-center row-span-2'>
                                //     <h1 className='font-header text-sm text-primary'>{course.name}</h1>
                                //         <p className='font-text text-primary text-xs'>{course?.types[0]?.type_name} - {course?.categories[0]?.category_name}</p>
                                //         <p className='font-text text-xs text-unactive'>Course ID: {course.CourseID}</p>
                                //     </div>
                                //         {/* Progress */}
                                //     <div className="px-4 pb-5">
                                //         <div className="flex flex-row justify-between font-text text-unactive text-xs py-2">
                                //             <p>Progress</p>
                                //             <p>{course.progress} %</p>
                                //         </div>
                                //         <Progress value={course.progress}/>
                                //     </div>
                                //         {/* Datas */}
                                //     </div>
                                <CourseCard course={course} type='learnerCourseManager' />
                            ))
                        }
                    </div>
                )

            }
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
                                loading ? (
                                    <a className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset text-primary`}>...</a>
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

    )
}
