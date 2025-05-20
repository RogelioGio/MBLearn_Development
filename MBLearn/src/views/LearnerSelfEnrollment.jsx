import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { useContext, useEffect, useState } from "react"
import { FerrisWheel } from "lucide-react"
import { faArrowDownShortWide, faArrowDownZA, faArrowUpAZ, faArrowUpWideShort, faChevronLeft, faChevronRight, faFilter, faSearch, faSort } from "@fortawesome/free-solid-svg-icons"
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
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_1fr_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Self-Enrollment</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>Self Course Enrollment</h1>
                <p className='font-text text-sm text-unactive'>View shows all available courses learners can freely enroll in to expand their skills at their own pace.</p>
            </div>

            <div className="flex items-center justify-center mr-5 border-b border-divider">
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md font-text shadow-md w-full'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="col-span-3 py-2 ml-5">
                <p className="text-xs text-unactive pb-2">Course Filter:</p>
                <div className="flex flex-row justify-between gap-x-2">
                    <div className="inline-flex flex-col gap-1 w-full">
                        <div className="grid grid-cols-1">
                            <select id="role" name="role" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                // value={filterformik.values.role}
                                // onChange={filterformik.handleChange}
                                // onBlur={filterformik.handleBlur}
                                >
                                <option value=''>Select Category</option>
                                {
                                    coursecategories.map((c) => (
                                        <option key={c.id} value={c.id}>{c.category_name}</option>
                                    ))
                                }
                            </select>
                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <label htmlFor="role" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Category</p>
                        </label>
                    </div>
                    <div className="inline-flex flex-col gap-1 w-full">
                        <div className="grid grid-cols-1">
                            <select id="role" name="role" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                // value={filterformik.values.role}
                                // onChange={filterformik.handleChange}
                                // onBlur={filterformik.handleBlur}
                                >
                                <option value=''>Select Type</option>
                                {
                                    coursetypes.map((c) => (
                                        <option key={c.id} value={""}>{c.type_name}</option>
                                    ))
                                }
                            </select>
                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <label htmlFor="role" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Type</p>
                        </label>
                    </div>
                    <div className="inline-flex flex-col gap-1 w-full" >
                        <div className="grid grid-cols-1">
                            <select id="role" name="role" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                // value={filterformik.values.role}
                                // onChange={filterformik.handleChange}
                                // onBlur={filterformik.handleBlur}
                                >
                                <option value=''>Select Training Type</option>
                                <option value='mandatory'>Mandatory</option>
                                <option value='unmandatory'>Non-Mandatory</option>

                            </select>
                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <label htmlFor="role" className="font-header text-xs flex flex-row justify-between">
                            <p className="text-xs font-text text-unactive">Training Type</p>
                        </label>
                    </div>

                {/* FilterButton */}
                    <div className="w-fit h-full">
                        <div className="w-10 aspect-square bg-white shadow-md border-2 border-primary text-primary rounded-md flex items-center justify-center hover:text-white hover:cursor-pointer hover:bg-primary hover:scale-105 transition-all ease-in-out">
                            <FontAwesomeIcon icon={faFilter}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sorter */}
            <div className="flex flex-row gap-2 pr-5 items-center justify-end">
                {/* Sort by Name */}
                <div className={`h-fit flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.name === "asc" ? '!bg-primary !text-white' : sort.name === "desc" ? '!bg-primary !text-white': 'bg-secondarybackground' }`} onClick={() => setOrder("name", tab)}>
                    <p>Name</p>
                    <FontAwesomeIcon icon={sort.name === "asc" ? faArrowUpAZ : sort.name === "desc" ? faArrowDownZA : faSort}/>
                </div>
                {/* Sort By Date-Added */}
                <div className={`h-fit flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.created_at === "asc" ? '!bg-primary !text-white' : sort.created_at === "desc" ? '!bg-primary !text-white': 'bg-secondarybackground' }`} onClick={() => setOrder("created_at", tab)}>
                    <p>Date</p>
                    <FontAwesomeIcon icon={sort.created_at === "asc" ? faArrowUpWideShort : sort.created_at === "desc" ? faArrowDownShortWide : faSort}/>
                </div>
            </div>


            <div className="row-start-3 col-span-4 grid grid-cols-4 grid-rows-2 gap-2 px-5 py-2">
                {
                    !loading ? (
                        course && course.length > 0 ? (
                            course.map((course, index) => (
                            <AssignedCourseCatalogCard key={index}
                                        id={course.id}
                                        name={course.name}
                                        courseId={course?.CourseID}
                                        courseType={course.types[0]?.type_name}
                                        courseCategory={course.categories[0]?.category_name}
                                        trainingMode={course.training_modes[0]?.modes_name}
                                        trainingType={course.training_type}
                                        tab={"allCourses"}
                                        adder={course?.adder}
                                        role={"learner"}
                                        selfEnroll={()=>{setOpenEnroll(true), setSelectedCourse(course)}}/>
                                    )
                        )):(
                                <div className="col-span-4 row-span-2 flex flex-col gap-4 items-center justify-center text-center h-full">
                                    <p className="text-sm font-text text-unactive">No available courses yet</p>
                                </div>
                        )
                    ): (
                        <div className="col-span-4 row-span-2 flex flex-col gap-4 items-center justify-center text-center h-full">
                                <img src={CourseLoading} alt="" className="w-80"/>
                                <p className="text-sm font-text text-primary">Hang tight! 🚀 Loading courses for — great things take a second!</p>
                        </div>
                    )
                }
                {/* {} */}
            </div>

            {/* Paganation */}
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

        <SelfEnrollmentModal open={openEnroll} onClose={()=>{setOpenEnroll(false)}} course={selectedCourse} setDuration={()=>{setDuration(true)}}/>
        <SelfEnrollmentSuccessfullyModal open={enrolled} close={()=> {setEnrolled(false), setSelectedCourse(),fetchCourses()}} course={selectedCourse}/>
        <TraningDurationModal open={duration} close={()=>{setDuration(false)}} enroll={()=>handleEnrollment(selectedCourse)} date={date} _setDate={setDate} course={selectedCourse} enrolling={enrolling}/>
        </>
    )
}
