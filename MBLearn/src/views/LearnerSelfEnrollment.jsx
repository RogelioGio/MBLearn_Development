import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { useContext, useEffect, useState } from "react"
import { FerrisWheel } from "lucide-react"
import { faArrowDownShortWide, faArrowDownZA, faArrowUpAZ, faArrowUpWideShort, faChevronLeft, faChevronRight, faFilter, faSearch, faSort, faSpinner, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCourseContext } from "../contexts/CourseListProvider"
import AssignedCourseCatalogCard from "../modalsandprops/AssignedCourseCatalogCard"
import CourseLoading from "../assets/Course_Loading.svg"
import SelfEnrollmentModal from "../modalsandprops/SelfEnrollmentModal"
import TraningDurationModal from "../modalsandprops/TrainingDurationModal"
import React from "react"
import { useStateContext } from "../contexts/ContextProvider"
import { format } from "date-fns"
import SelfEnrollmentSuccessfullyModal from "../modalsandprops/SelfEnrollmentSuccessfullyModal"
import CourseCard from "../modalsandprops/CourseCard"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet"



export default function LearnerSelfEnrollment() {
    const {user} = useStateContext()
    const {coursetypes, coursecategories} = useCourseContext()
    const [course, setCourse] = useState([])
    const [selectedCourse, setSelectedCourse] = useState()
    const [loading, setLoading] = useState(true)
    const [openEnroll, setOpenEnroll] = useState(false)
    const [duration, setDuration] = useState(false)
    const [enrolling, setEnrolling] = useState()
    const [enrolled, setEnrolled] = useState(false)
    const [isFiltered, setIsFiltered] = useState(false)

    const [date, setDate] = React.useState({
        from: new Date(),
        to: undefined,
    });

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
    const setOrder = (key) => {
        const order = sort[key] === "none" ? "asc" : sort[key] === "asc" ? "desc" : "none";
        toggleSort(key, order);
    }

    const fetchCourses = () => {
        setLoading(true)
        axiosClient.get('/courses', {
           params: {
                    page: pageState.currentPage,
                    perPage: pageState.perPage,
                }
        })
        .then(({ data }) => {
            setCourse(data.data.data)
            pageChangeState("totalCourses", data.data.total)
            pageChangeState("lastPage", data.lastPage)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
            setLoading(false)
        })
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

            useEffect(()=>{
                fetchCourses()
            },[pageState.currentPage, pageState.perPage])


    //Handle Enrollment
    const handleEnrollment = (course) => {
        setEnrolling(true)
        const payload = [
            {
            userId: user.user_infos.id,
            courseId: course.id,
            enrollerId: user.user_infos.id,
            start_date: format(new Date(date.from), 'yyyy-MM-dd' + ' 00:00:00'),
            end_date: format(new Date(date.to), 'yyyy-MM-dd' + ' 23:59:59')
            }
        ]

        axiosClient.post('enrollments/bulk', payload)
                    .then(({data}) => {
                        setEnrolling(false)
                        setOpenEnroll(false)
                        setDuration(false)
                        setEnrolled(true)
                    })
                    .catch((err)=>console.log(err));
    }

    return(
    <>
        <div className='grid grid-cols-4 h-full w-full
                        grid-rows-[6.25rem_min-content_1fr_min-content]
                        xl:grid-rows-[6.25rem_min-content_1fr_min-content]'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Self-Enrollment</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center row-span-1 border-b border-divider
                            col-start-1 row-start-1 col-span-4 mx-3
                            xl:col-span-4
                            sm:col-span-4 sm:ml-4'>
                <h1 className='text-primary font-header
                                text-xl
                                sm:text-2xl
                                xl:text-4xl'>Self Enrollment</h1>
                <p className='font-text text-unactive
                                text-xs
                                xl:text-sm
                                sm:text-xs'>Shows all available courses and let the learners can freely enroll in to expand their skills at their own pace.</p>
            </div>

            <div className="col-span-4 px-3 py-2 grid grid-rows-2 gap-y-2
                            md:pl-4 md:pr-3 md:grid grid-cols-2 md:grid-rows-1">
                <div className="flex flex-row gap-2 col-span-2 md:col-span-1">
                    {/* Search */}
                    <div className="md:w-80 w-full">
                        <div className='inline-flex flex-row place-content-between border-2 border-primary rounded-md font-text shadow-md w-full'>
                            <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                            <div className='bg-primary py-2 px-4 text-white'>
                                <FontAwesomeIcon icon={faSearch}/>
                            </div>
                        </div>
                    </div>
                    {/* Filter */}
                    <div>
                        <Sheet>
                            <SheetTrigger>
                                <div className={`h-11 w-11 flex justify-center items-center bg-primary aspect-square border-2 border-primary rounded-md shadow-md hover:cursor-pointer hover:scale-105 hover:bg-primaryhover hover:text-white transition-all ease-in-out ${isFiltered ? "bg-primary text-white":"bg-white text-primary"}`}>
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
                </div>
                <div className="flex flex-row gap-2 items-center md:justify-end col-span-2 md:col-span-1">
                    <div className={`h-fit flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-sm lg:text-base text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.dateOrder === "asc" ? '!bg-primary !text-white' : sort.dateOrder === "desc" ? '!bg-primary !text-white': 'bg-white' }`} onClick={() => setOrder("dateOrder")}>
                        <p>Date</p>
                        <FontAwesomeIcon icon={sort.dateOrder === "asc" ? faArrowUpWideShort : sort.dateOrder === "desc" ? faArrowDownShortWide : faSort}/>
                    </div>
                    <div className={`h-fit flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-sm lg:text-base text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.nameOrder === "asc" ? '!bg-primary !text-white' : sort.nameOrder === "desc" ? '!bg-primary !text-white': 'bg-white' }`} onClick={() => setOrder("nameOrder")}>
                        <p>Name</p>
                        <FontAwesomeIcon icon={sort.nameOrder === "asc" ? faArrowUpAZ : sort.nameOrder === "desc" ? faArrowDownZA : faSort}/>
                    </div>
                </div>

            </div>


            <div className="col-span-4 grid grid-cols-2 grid-rows-4
                            px-3 pb-2 gap-2
                            lg:grid-rows-2 lg:grid-cols-4
                            xl:pl-4 xl:pr-3 xl:pb-2">
                {/* {
                    !loading ? (
                        course && course.length > 0 ? (
                            course.map((course, index) => (
                            <CourseCard index={index} course={course} type='general'/>)
                        )):(
                                <div className="col-span-4 row-span-2 flex flex-col gap-4 items-center justify-center text-center h-full">
                                    <p className="text-sm font-text text-unactive">No available courses yet</p>
                                </div>
                        )
                    ): (
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-white w-full h-full rounded-md shadow-md"/>
                        ))
                    )
                } */}

                {
                    loading ?
                    Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-white w-full h-full rounded-md shadow-md border-divider border min-h-24"/>
                    ))
                    : course.length === 0 ?
                    <div className="w-full h-full flex flex-col items-center justify-center lg:col-span-4 col-span-2 lg:row-span-2 row-span-4 ">
                        <div className="flex flex-col items-center justify-center gap-2 rounded-full w-20 h-20 text-primary bg-primarybg text-4xl">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                        </div>
                        <p className="text-unactive font-text text-xs">No Courses Enrolled Yet</p>
                    </div>
                    :
                    course.map((course, index) => (
                            <CourseCard index={index} course={course} type='general' click={()=>{setOpenEnroll(true),setSelectedCourse(course)}}/>
                        ))
                }
            </div>

            {/* Paganation */}
            <div className="mx-5 col-span-4 row-start-5 row-span-1 flex flex-row justify-between items-center py-3 border-t border-divider">
                {/* Total number of entries and only be shown */}
                <div className="flex flex-row items-center gap-2">
                    {
                        loading ?
                        <>
                            <FontAwesomeIcon icon={faSpinner} className='animate-spin text-unactive'/>
                            <p className='text-sm font-text text-unactive'>Loading courses...</p>
                        </>
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

        <SelfEnrollmentModal open={openEnroll} onClose={()=>{setOpenEnroll(false)}} course={selectedCourse} setDuration={()=>{setDuration(true)}}/>
        <SelfEnrollmentSuccessfullyModal open={enrolled} close={()=> {setEnrolled(false), setSelectedCourse(),fetchCourses()}} course={selectedCourse}/>
        <TraningDurationModal open={duration} close={()=>{setDuration(false)}} enroll={()=>handleEnrollment(selectedCourse)} date={date} _setDate={setDate} course={selectedCourse} enrolling={enrolling}/>
        </>
    )
}
