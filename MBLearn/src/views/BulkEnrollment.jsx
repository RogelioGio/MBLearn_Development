import { faBook, faBookBookmark, faCalendar, faChalkboardUser, faChevronLeft, faChevronRight, faFilter, faGraduationCap, faMagnifyingGlass, faSearch, faSpinner, faSwatchbook, faUserPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { act, useEffect, useMemo, useRef, useState } from "react"
import Learner from "../modalsandprops/LearnerEnroleeEntryProps"
import EnrollmentTableProps from "../modalsandprops/EnrollmentTableProps"
import AssignedCourseEnrollmentCard from "../modalsandprops/AssignedCourseEnrollmentCard"
import LearnerLoadingProps from "../modalsandprops/LearnerLoadingProps"
import { useStateContext } from "../contexts/ContextProvider"
import CourseLoading from "../assets/Course_Loading.svg";
import { useFormik } from "formik"
import React from "react"
import EnrolledSuccessfullyModal from "../modalsandprops/EnrollmentSuccessfulyModal"
import EnrollmentFailedModal from "../modalsandprops/EnrollmentFailedModal"
import NoEmployeeSelectedModal from "../modalsandprops/NoEmployeeSelectedModal"
import { add, format, set } from "date-fns"
import { ScrollArea } from "../components/ui/scroll-area"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet"
import BulkEnrollmentCourseDuration from "../modalsandprops/BulkEnrollmentCourseDuration"
import { use } from "react"
import BulkEnrollmentCourseSelectorModal from "../modalsandprops/BulkEnrollmentCourseSelectorModal"
import { createPortal } from "react-dom"



function UseElementPos (ref,enabled=true, offset=8){
    const [coords, setCoords] = useState(null);

    useEffect(()=>{
        const toolTip = () => {
            const rect = ref.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + offset,
                left: rect.left + rect.width / 2
            });
        }

        toolTip();
        window.addEventListener('resize', toolTip);
        window.addEventListener('scroll', toolTip, true);

        return () => {
            window.removeEventListener('resize', toolTip);
            window.removeEventListener('scroll', toolTip, true);
        }
    },[ref, enabled, offset])

    return coords;
}

export default function BulkEnrollment() {

    const {user} = useStateContext();
    const [assigned_courses, setAssigned_courses] = useState([]);
    const [learners, setLearners] = useState([]); //List all learners
    const [selected, setSelected] = useState([]); //Select learner to ernoll
    const [results, setResults] = useState([]); //Enrolled results
    const [course, setCourse] = useState({}); //Select course
    const [courseId, setCourseId] = useState([]); //Select course to enroll id
    const [isLoading, setLoading] = useState(true); //Loading state
    const [learnerLoading, setLearnerLoading] = useState(true); //Loading state
    const selectAll = useRef(null) //select all learners
    const [tab, setTab] = useState(1)//Tabs
    const [enrolled, setEnrolled] = useState(false) //Modal for successfully Enrolled
    const [error, setError] = useState([]) //Error state
    const [enrollmentFailed, setEnrollmentFailed] = useState(false) //Enrollment failed state
    const [empty, setEmpty] = useState(false) //No selected user state
    const [enrolling, setEnrolling] = useState(false) //Enrolling state
    const [openDuration, setOpenDuration] = useState(false)
    const [processing, setProccess] = useState(false);
    const [openSelector, setOpenSelector] = useState(false);
    const buttonRef = useRef();
    const dateButton = useRef();
    const [coords, setCoords] = useState(null);

    //Form
    const DateFormik = useFormik({
        enableReinitialize: true,
            initialValues:{
                months: course.months || 0,
                weeks: course.weeks || 0,
                days: course.days || 0,
            },
    })


    //Pagenation States
    const [pageState, setPagination] = useState({
        currentPage: 1,
        perPage:10,
        totalUser: 0,
        lastPage: 1,
        startNumber: 0,
        endNumber: 0,
        currentPerPage:0
    })
    //Pagination Change State
    const pageChangeState = (key, value) => {
        setPagination((prev) => ({
            ...prev,
            [key]: value
        }))
    }
    const [bufferedUserList, setBufferedUserList] = useState([])
    const [currentChunk, setCurrentChunk] = useState(1);
    //use Current Page
    const entry_per_chunk = 5;



    //Next and Previous Page
    const back = () => {
        if(isLoading || learnerLoading) return;
        if(currentChunk > 1) {
            setCurrentChunk(prev => prev-1);
        } else if (pageState.currentPage > 1) {
                pageChangeState("currentPage", pageState.currentPage - 1)
                setCurrentChunk(3);
        }
        // if (pageState.currentPage > 1){
        //     pageChangeState("currentPage", pageState.currentPage - 1)
        //     pageChangeState("startNumber", pageState.perPage - 4)
        // }
    }
    const next = () => {
        if(isLoading || learnerLoading) return;
        if(currentChunk < 2) {
            setCurrentChunk(prev => prev+1);
        } else {
            if (pageState.currentPage === pageState.lastPage) return;
            pageChangeState("currentPage", pageState.currentPage + 1)
            setCurrentChunk(1);
        };
        // if (pageState.currentPage < pageState.lastPage){
        //     pageChangeState("currentPage", pageState.currentPage + 1)

        // }
    }

    //Page Navigation
    const pageChange = (page) => {
        if(isLoading) return;

        const serverPage = Math.ceil(page / chunkPerPage);
        const currentChunkPage = ((page-1) % chunkPerPage) + 1

        pageChangeState("currentPage", serverPage)
        setCurrentChunk(currentChunkPage);
        // if(page > 0 && page <= pageState.lastPage){
        //     pageChangeState("currentPage", page)
        // }
    }

    //Calculate Course Duration

    //Handle Learner to be enroll
    const handleLearnerChange = (courseId) => {
        setLearnerLoading(true)
        if(!courseId) return
        axiosClient.get(`/index-user-enrollments/${courseId}`,{
            params: {
                        page: pageState.currentPage,
                        perPage: pageState.perPage
                    }
        }
        ).then(({data})=>{
            // setLearners(data.data)
            pageChangeState('totalUser', data.total)
            pageChangeState('lastPage', data.lastPage)

            setBufferedUserList(data.data)
            setLearnerLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    }


    const LearnerPaginated = useMemo(()=>{
        const startIndex = (currentChunk - 1) * entry_per_chunk;
        return bufferedUserList.slice(startIndex, startIndex + entry_per_chunk);
    }, [bufferedUserList, currentChunk])

    //Handle course change
    // const handleCourseChange = (Course) => {
    //     setCourse(Course)
    //     //Fetch Learner
    //     //handleLearnerChange(Course?.id);
    // }

    //Learner to enroll
    const handleCheckbox = (User, course) => {
        setSelected((prevUsers) => {
            if(!User&&!course) return

            const exists = prevUsers.some(
                (entry) => entry.userId === User.id && entry.courseId === course.id
            );

            if(exists){
                return prevUsers.filter(
                    (entry) => !(entry.userId === User.id && entry.courseId === course.id )
                )
            }else{
                const start = new Date()

                const months = course?.months || 0;
                const weeks = course?.weeks || 0;
                const days = course?.days || 0;

                const end = add(start, {
                    months,
                    weeks,
                    days,
                });

                return [...prevUsers, {userId: User.id, courseId: course.id, enrollerId: user.user_infos.id,  start_date: format(start, 'yyyy-MM-dd') + ' 00:00:00', end_date: format(end, 'yyyy-MM-dd')+' 23:59:59'}]
            }
        })
        setResults((prevCourses) => {
            if(!User&&!course) return prevCourses;


            const updated = [...prevCourses];
            const existingCourse = updated.findIndex(
                (c) => c.course.id === course.id
            );



            if(existingCourse !== -1){
                const courseToUpdate = { ...updated[existingCourse] }
                const enrolled = courseToUpdate.enrollees.some(
                    (u) => u.id === User.id
                );

                courseToUpdate.enrollees = courseToUpdate.enrollees || [];


                if(!enrolled){
                    courseToUpdate.enrollees.push(User);
                } else {
                    courseToUpdate.enrollees = courseToUpdate.enrollees.filter((u) => u.id !== User.id);
                }

                if(courseToUpdate.enrollees?.length === 0){
                    updated.splice(existingCourse, 1);
                } else {
                    updated[existingCourse] = courseToUpdate;
                }

            } else {
                updated.push({
                    course: course,
                    enrollees: [User],
                    months: course?.months,
                    weeks: course?.weeks,
                    days: course?.days,
                });
            }
            return updated;
        });
    }

    //Select All Learners
    const handleSelectAll = (Course) => {
        //Handle all selected
        const allSelected = selected.filter(s => s.courseId === Course.id).length === learners.length
        if (allSelected) {
            setSelected(prev =>
                prev.filter(entry => entry.courseId !== Course.id)
            );

            console.log("unselect all")
        }else{
            const start = new Date()

            const months = Course?.months || 0;
            const weeks = Course?.weeks || 0;
            const days = Course?.days || 0;

            const end = add(start, {
                months,
                weeks,
                days,
            });

            const newSelections = learners.map(e => ({
                userId: e.id,
                courseId: Course.id,
                enrollerId: user.user_infos.id,
                start_date: format(start, 'yyyy-MM-dd') + ' 00:00:00',
                end_date: format(end, 'yyyy-MM-dd') + ' 23:59:59',
            }));

            setSelected(prev =>
                [...prev.filter(entry => entry.courseId !== Course.id), ...newSelections]
            );
        }

        // Set Results
        setResults((prevCourses) => {
            if(!Course) return prevCourses;

            const updated = [...prevCourses];
            const exist = updated.findIndex(
                (c) => c.course.id === Course.id
            );

            const learnerIds = learners.map((learner) => learner.id);

            if(exist !== -1){
                const courseToUpdate = {...updated[exist] };
                const currentEnrollees = (courseToUpdate.enrollees || []).map((u) => u.id);

                const allSelected = learnerIds.every(id => currentEnrollees.includes(id))

                if(allSelected){
                    courseToUpdate.enrollees = []
                } else {
                    const newEnrollees = learners.filter((l) => !currentEnrollees.includes(l.id))
                    courseToUpdate.enrollees = [...(courseToUpdate.enrollees || []), ...newEnrollees]
                }

                updated[exist] = courseToUpdate;
            } else {
                updated.push({
                    course: Course,
                    enrollees: [...learners],
                    months: Course?.months,
                    weeks: Course?.weeks,
                    days: Course?.days,
                })
            }
            return updated;
        })

    }


    //handle indertiminate checkbox
    useEffect(() => {
        if (!selectAll.current) return;

        const courseLearners = learners.map((user) => user.id);
        const selectedLearners = selected.filter((entry) => entry.courseId === courseId).map((entry) => entry.userId);

        if (courseLearners.length === selectedLearners.length && courseLearners.length > 0) {
            selectAll.current.indeterminate = false;
            selectAll.current.checked = true;
        } else if (selectedLearners.length > 0) {
            selectAll.current.indeterminate = true;
        } else {
            selectAll.current.indeterminate = false;
            selectAll.current.checked = false;
        }
    }, [selected, learners, courseId]);

    //Number of enrollees
    const numberOfEnrollees = (courseName) => {
        return selected.filter((entry) => entry.courseId === courseName).length;
    };

    //handle ernollment
    const enrollLearners = () => {
        setEnrolling(true)
        if(selected.length === 0){
            setEmpty(true)
            setEnrolling(false)
            return
        }
        setOpenDuration(true)
    }


    // useEffect(() =>{
    //     setLoading(true)
    //     setLearnerLoading(true)

    //     //fetch courses
    //     axiosClient.get('/courses').then(({data})=>{
    //         setAssigned_courses(data.data);
    //         handleCourseChange(data.data[0]);
    //         selectCourse(data.data[0].name);
    //         setLoading(false);
    //     }).catch((err)=>
    //     console.log(err)
    //     );
    // },[]);


    useEffect(() => {
        const frontEndPagination = (pageState.currentPage - 1) * 2 + currentChunk;

        pageChangeState("startNumber", (frontEndPagination - 1)*entry_per_chunk + 1)
        pageChangeState("endNumber", Math.min(frontEndPagination * entry_per_chunk, pageState.totalUser))

        // pageChangeState('startNumber', (pageState.currentPage - 1) * pageState.perPage + 1)
        // pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.totalUser))
    },[pageState.currentPage, currentChunk, pageState.totalUser])


    // Dynamic Page Number
    const Pages = [];
    const chunkPerPage = pageState.perPage / entry_per_chunk;
    const totalFrontendPages = pageState.lastPage * chunkPerPage;
    for(let p = 1; p <= totalFrontendPages; p++){
        Pages.push(p)
    }

    //Formik for filter
    const formik = useFormik({
        initialValues : {
            filter: "myCourses"
        }
    });

    useEffect(() => {
        console.log(formik.values.filter)
        setLoading(true)
        setLearnerLoading(true)
        if(formik.values.filter === "myCourses"){
            axiosClient.get(`/select-user-added-courses/${user.user_infos?.id}`,{
                params: {
                    page: pageState.currentPage,
                    perPage: pageState.perPage,
                }
            })
            .then(({data}) => {
                setAssigned_courses(data.data)
                setCourse(data.data[0])
                pageChangeState("totalCourses", data.total)
                pageChangeState("lastPage", data.lastPage)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
        } else if(formik.values.filter ==="Assigned"){
            axiosClient.get(`/select-user-assigned-courses/${user.user_infos?.id}`,{
                    params: {
                        page: pageState.currentPage,
                        per_page: pageState.perPage,
                    }
                })
                .then(({ data }) => {
                    setAssigned_courses(data.data)
                    pageChangeState("totalCourses", data.total)
                    pageChangeState("lastPage", data.lastPage)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    },[formik.values.filter])
    useEffect(() => {
        handleLearnerChange(course?.id)
    },[course, pageState.currentPage])
    // useEffect(() => {
    //     if (!Array.isArray(assigned_courses) || assigned_courses.length === 0) return;
    //     handleCourseChange(assigned_courses[0]); // Automatically select the first entry
    // }, [assigned_courses]);

    //reset the operation
    const reset = () => {
        setTimeout(() => {
            handleCourseChange(assigned_courses[0]);
            setResults([])
            setSelected([]);
            pageChangeState("currentPage", 1)
        },250)
    }

    //Handle Enrollment Submisstion
    const handleEnrollment = () => {
        setProccess(true)
        axiosClient.post('enrollments/bulk', selected)
        .then(({data}) => {
            setEnrolled(true);
            setOpenDuration(false)
            setEnrolling(false)
            setProccess(false)
        }).catch((err)=>{
            console.log(err)
        })

    }

    useEffect(() => {
        console.log("currentPage", pageState.currentPage)
    },[pageState.currentPage])

    // useEffect(()=>{
    //     const tooltip = () => {
    //         const rect = buttonRef.current.getBoundingClientRect();
    //         setCoords({
    //             top: rect.bottom + 8,
    //             left: rect.left + rect.width / 2
    //         })
    //     }

    //     tooltip();
    //     window.addEventListener('resize', tooltip);
    //     window.addEventListener('scroll', tooltip,true );

    // return () => {
    //     window.removeEventListener("resize", tooltip);
    //     window.removeEventListener("scroll", tooltip, true);
    // };
    // }, [openSelector])

    const selectCourseToolTip = UseElementPos(buttonRef, openSelector, 8);
    const dateToolTip = UseElementPos(dateButton, openDuration, 8);


    const content1 = () => {
        <div className='inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                        <input type="text" className='focus:outline-none text-sm px-4 rounded-md bg-white' placeholder='Search...'
                            name='search'
                            //value={searchFormik.values.search}
                            //onChange={searchFormik.handleChange}
                            // onKeyDown={(e) => {
                            //     if (e.key === 'Enter') {
                            //         e.preventDefault();
                            //         searchFormik.handleSubmit();
                            //     }
                            // }}
                            />
                             {/* ${search ? "hover:cursor-pointer":null} */}
                        <div className={`min-w-10 h-10 bg-primary text-white flex items-center justify-center`}
                            // onClick={() => {
                            //     if (search) {
                            //         setSearch(false);
                            //         searchFormik.resetForm();
                            //         fetchUsers();
                            //     }
                            // }}
                            >
                            {/* <FontAwesomeIcon icon={search ? faXmark : faMagnifyingGlass}/> */}
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </div>
                    </div>
    }

    return (
        <>
        <div className='grid grid-cols-4 h-full w-full
                        grid-rows-[6.25rem_min-content_min-content_min-content_1fr_min-content]
                        md:grid-rows-[6.25rem_min-content_min-content_auto_min-content]'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Enroll Trainee</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center row-span-1 border-b border-divider
                            col-start-1 row-start-1 col-span-3 ml-3
                            xl:col-span-3
                            sm:col-span-3 sm:ml-4'>
                <h1 className='text-primary font-header
                                text-xl
                                sm:text-2xl
                                xl:text-4xl'>Enroll Learner</h1>
                <p className='font-text text-unactive
                                text-xs
                                xl:text-sm
                                sm:text-xs'>Quickly enroll large groups of trainees into assigned courses for efficient training delivery.</p>
            </div>

            {/* Enroll button */}
            <div className="row-start-1 flex flex-col justify-center border-divider border-b
                            items-end mr-3
                            xl:col-start-4 xl:pl-5 xl:mr-5
                            sm:col-span-1 sm:col-start-4 sm:py-2 sm:mr-4">
                <div className='relative group sm:w-full'>
                    <button className='inline-flex flex-row shadow-md items-center justify-center bg-primary font-header text-white text-base p-4 rounded-full hover:bg-primaryhover hover:scale-105 transition-all ease-in-out
                                    w-16 h-16
                                    sm:w-full'
                        onClick={enrollLearners}>
                        <FontAwesomeIcon icon={faUserPlus} className='sm:mr-2'/>
                        <p className='hidden
                                    sm:block'>Enroll</p>
                    </button>
                    <div className='absolute bottom-[-2.5rem] w-full bg-tertiary rounded-md text-white font-text text-xs p-2 items-center justify-center whitespace-nowrap scale-0 group-hover:scale-100 block transition-all ease-in-out
                                    sm:hidden'>
                        <p>Enroll</p>
                    </div>
                </div>
            </div>

            {/* Course */}
            <div className="row-start-2 col-span-4 flex flex-col gap-2 pl-3 pt-2
                            md:pr-2 md:col-span-2 md:pl-4 md:py-2">
                <p className=" font-text text-xs">Selected Course:</p>
                <div className="flex flex-row gap-2">
                    <div className="group relative">
                        <div className={`w-10 h-10 text-primary border-2 border-primary rounded-md flex items-center justify-center bg-white shadow-md transition-all ease-in-out ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer hover:bg-primary hover:text-white hover:scale-105"}`}
                            onClick={() => {setOpenSelector(true)}}
                            ref={buttonRef}>
                            <FontAwesomeIcon icon={faBookBookmark}/>
                        </div>
                        <div
                            style={{
                                top: `${selectCourseToolTip?.top}px`,
                                left: `${selectCourseToolTip?.left}px`,
                            }}
                        className={`fixed  -translate-x-1/2 scale-0 group-hover:scale-100 bg-tertiary text-white font-text p-2 text-xs rounded-md shadow-lg whitespace-nowrap z-50 transition-all ease-in-out`}>
                        <p>Select Course</p>
                        </div>
                        {/* <div className='absolute -bottom-10 left-1/2 transform-y-1/2 w-fit bg-tertiary rounded-md text-white font-text text-xs p-2 items-center justify-center whitespace-nowrap scale-100 group-hover:scale-100 block transition-all ease-in-out'>
                        <p>Select Course</p>
                    </div> */}
                    </div>
                    <div className={`${isLoading ? "flex-row items-center justify-between":"flex-col"} flex `}>
                        {
                            isLoading ?
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="text-primary mr-2 animate-spin"/>
                                <p className="font-header text-base text-primary">Loading...</p>
                            </>
                            :<>
                                <p className="text-primary font-header text-sm lg:text-base">{course?.name || "No Selected Course"}</p>
                                <p className="text-unactive font-text text-xs">{course && (<>Course ID: {course.CourseID}</>)}</p>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="py-2 flex flex-col gap-2 col-span-4 px-3
                            md:row-start-2 md:col-span-2 md:col-start-3 md:mr-5 md:px-0">
                <p className="font-text text-xs lg:text-right">Course Enrollment Duration</p>
                <div className="flex flex-row gap-2 justify-end w-full">
                    <div className="group">
                        <div ref={dateButton} className={`min-w-10 h-10 text-primary border-2 border-primary rounded-md flex items-center justify-center bg-white shadow-md transition-all ease-in-out ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer hover:bg-primary hover:text-white hover:scale-105"}`}>
                            <FontAwesomeIcon icon={faCalendar}/>
                        </div>
                        <div
                                style={{
                                    top: `${dateToolTip?.top}px`,
                                    left: `${dateToolTip?.left}px`,
                                }}
                            className={`fixed  -translate-x-1/2 scale-0 group-hover:scale-100 bg-tertiary text-white font-text p-2 text-xs rounded-md shadow-lg whitespace-nowrap z-50 transition-all ease-in-out`}>
                            <p>Date Adjustment</p>
                        </div>
                    </div>
                    <form action="" className="grid grid-cols-3 gap-2 w-full">
                        <div className="inline-flex flex-col gap-1 w-full">
                        <input type="text" name="months"
                            readOnly
                            value={DateFormik.values.months ? `${DateFormik.values.months} Month/s` : "0 Month/s"}
                            onChange={DateFormik.handleChange}
                            // onBlur={(e) => {
                            //     courseFormik.handleBlur(e);
                            //     normalizationDuration({
                            //         ...courseFormik.values,
                            //         months: e.target.value,
                            //     }, courseFormik.setFieldValue);
                            // }}
                            className={`font-text border border-divider rounded-md p-2 ${isLoading ? "opacity-50 cursor-not-allowed focus-within:outline-none":"focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"}`}/>
                            {/* {courseFormik.touched.months && courseFormik.errors.months ? (<div className="text-red-500 text-xs font-text">{courseFormik.errors.months}</div>):null} */}
                        </div>
                        <div className="inline-flex flex-col gap-1 w-full">
                        <input type="text" name="weeks"
                            readOnly
                            value={DateFormik.values.weeks ? `${DateFormik.values.weeks} Week/s` : "0 Week/s"}
                            //onChange={courseFormik.handleChange}
                            // onBlur={(e) => {
                            //     courseFormik.handleBlur(e);
                            //     normalizationDuration({
                            //         ...courseFormik.values,
                            //         months: e.target.value,
                            //     }, courseFormik.setFieldValue);
                            // }}
                            className={`font-text border border-divider rounded-md p-2 ${isLoading ? "opacity-50 cursor-not-allowed focus-within:outline-none":"focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"}`}/>
                            {/* {courseFormik.touched.months && courseFormik.errors.months ? (<div className="text-red-500 text-xs font-text">{courseFormik.errors.months}</div>):null} */}
                        </div>
                        <div className="inline-flex flex-col gap-1 w-full">
                        <input type="text" name="days"
                            readOnly
                            value={DateFormik.values.days ? `${DateFormik.values.days} day/s` : "0 Week/s"}
                            //value={courseFormik.values.months}
                            //onChange={courseFormik.handleChange}
                            // onBlur={(e) => {
                            //     courseFormik.handleBlur(e);
                            //     normalizationDuration({
                            //         ...courseFormik.values,
                            //         months: e.target.value,
                            //     }, courseFormik.setFieldValue);
                            // }}
                            className={`font-text border border-divider rounded-md p-2 ${isLoading ? "opacity-50 cursor-not-allowed focus-within:outline-none":"focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"}`}/>
                            {/* {courseFormik.touched.months && courseFormik.errors.months ? (<div className="text-red-500 text-xs font-text">{courseFormik.errors.months}</div>):null} */}
                        </div>
                    </form>
                </div>

            </div>




            {/* Search */}
            <div className='col-span-2 pl-4 py-2
                            lg:row-start-3 lg:col-span-1'>
                {/* {
                    //search
                    true ? (
                        <div className='border-primary border-2 rounded-md shadow-md bg-white flex items-center justify-center text-primary hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out w-11 h-11'
                        onClick={()=>{setSearch(false), searchFormik.resetForm(), fetchUsers()}}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                    ) : null
                } */}
                <form>
                    <div className="border-primary inline-flex flex-row place-content-between border-2 font-text rounded-md shadow-md w-full">
                        <input type="text" className='focus:outline-none text-sm px-4 rounded-md bg-white w-full' placeholder='Search...'
                            name='search'
                            //value={searchFormik.values.search}
                            //onChange={searchFormik.handleChange}
                            // onKeyDown={(e) => {
                            //     if (e.key === 'Enter') {
                            //         e.preventDefault();
                            //         searchFormik.handleSubmit();
                            //     }
                            // }}
                            />
                        <div className="min-h-10 min-w-10 bg-primary text-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </div>
                    </div>
                </form>
            </div>
            {/* Filter */}
            <div className="col-start-4 py-2 flex flex-row items-center justify-end pr-4
                            lg:row-start-3">
                <div className="border-2 border-primary w-10 h-10 rounded-md bg-white shadow-md flex items-center justify-center text-primary gap-2 hover:cursor-pointer hover:border-primaryhover hover:bg-primaryhover hover:text-white transition-all ease-in-out
                                md:w-fit md:h-full md:px-4">
                    <FontAwesomeIcon icon={faFilter} className="text-lg"/>
                    <p className="font-header md:block hidden">Filter</p>
                </div>
            </div>

            {/* Table */}
            <div className="py-2 col-span-4 px-4">
                <EnrollmentTableProps>
                    {
                        learnerLoading || isLoading  ? (
                            <LearnerLoadingProps/>
                        ):
                        LearnerPaginated.map((learner)=>(
                            <Learner key={learner?.id} learner={learner} handleCheckbox={()=>{handleCheckbox(learner, course)}} selectedCourse={course} enrolled={selected}/>
                        ))
                    }
                </EnrollmentTableProps>
            </div>

            {/* Pagination */}
            <div className="py-4 px-4 col-span-4 flex flex-row justify-between items-center">
                <div>
                    <p className='text-sm font-text text-unactive'>
                        {
                            isLoading || learnerLoading ?
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin"/> Retrieving Learners...
                            </>:
                            <>
                                Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUser}</span> <span className='text-primary'>results</span>
                            </>
                        }
                    </p>
                </div>
                <div>
                <nav className={`isolate inline-flex -space-x-px round-md shadow-xs ${isLoading || learnerLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                    {/* Previous */}
                    <a href="#"
                        onClick={back}
                        className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset transition-all ease-in-out ${isLoading || learnerLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary hover:text-white"}`}>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </a>

                    {/* Current Page & Dynamic Paging */}
                    {Pages.map((page)=>(
                        <a href="#"
                            key={page}
                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                ${
                                    isLoading || learnerLoading ? "opacity-50 cursor-not-allowed" :
                                    page === ((pageState.currentPage - 1)* chunkPerPage + currentChunk)
                                    ? 'bg-primary text-white'
                                    : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                } transition-all ease-in-out`}
                                onClick={() => pageChange(page)}>
                            {page}</a>
                    ))}

                    {/* Next */}
                    <a href="#"
                        onClick={next}
                        className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset transition-all ease-in-out ${isLoading || learnerLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary hover:text-white"}`}>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </a>
                </nav>
            </div>
            </div>



        </div>

        {/* Successfully Enrolled */}
        <EnrolledSuccessfullyModal isOpen={enrolled} onClose={() => {setEnrolled(false); reset()}} result={results}/>

        {/* Course Selector */}
        <BulkEnrollmentCourseSelectorModal open={openSelector} close={()=>{setOpenSelector(false)}} formik={formik} courselist={assigned_courses} selectedCourse={course}/>
        {/* Training Duration */}
        {/* <BulkEnrollmentCourseDuration open={openDuration} close={()=>{setOpenDuration(false),setProccess(false),setEnrolling(false)}} result={results} selected={selected} setSelected={setSelected} setResults={setResults} handleEnrollment={()=>handleEnrollment()} enrolling={processing}/> */}
        {/* Error */}
        <EnrollmentFailedModal isOpen={enrollmentFailed} onClose={()=>setEnrollmentFailed(false)}/>
        {/* When no Selected Users */}
        <NoEmployeeSelectedModal isOpen={empty} onClose={()=>{setEmpty(false);}} />
        </>
    )
}
