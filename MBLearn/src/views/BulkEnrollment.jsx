import { faBook, faBookBookmark, faChalkboardUser, faChevronLeft, faChevronRight, faFilter, faGraduationCap, faSearch, faSwatchbook, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { act, useEffect, useRef, useState } from "react"
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

export default function BulkEnrollment() {

    const {user} = useStateContext();
    const [assigned_courses, setAssigned_courses] = useState([]);
    const [learners, setLearners] = useState([]); //List all learners
    const [selected, setSelected] = useState([]); //Select learner to ernoll
    const [results, setResults] = useState([]); //Enrolled results
    const [course, selectCourse] = useState([]); //Select course to enroll name
    const [_course, _selectCourse] = useState([])
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

    //Pagenation States
    const [pageState, setPagination] = useState({
        currentPage: 1,
        perPage:5,
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

    //Next and Previous Page
    const back = () => {
        if(isLoading) return;
        if (pageState.currentPage > 1){
            pageChangeState("currentPage", pageState.currentPage - 1)
            pageChangeState("startNumber", pageState.perPage - 4)
        }
    }
    const next = () => {
        if(isLoading) return;
        if (pageState.currentPage < pageState.lastPage){
            pageChangeState("currentPage", pageState.currentPage + 1)

        }
    }

    //Page Navigation
    const pageChange = (page) => {
        if(isLoading) return;
        if(page > 0 && page <= pageState.lastPage){
            pageChangeState("currentPage", page)
        }
    }

    //Calculate Course Duration

    //Handle Learner to be enroll
    const handleLearnerChange = (courseId) => {
        setLearnerLoading(true)
        axiosClient.get(`/index-user-enrollments/${courseId}`,{
            params: {
                        page: pageState.currentPage,
                        perPage: pageState.perPage
                    }
        }
        ).then(({data})=>{
            setLearners(data.data)
            pageChangeState('totalUser', data.total)
            pageChangeState('lastPage', data.lastPage)
            pageChangeState('currentPerPage', data.data.length)
            setLearnerLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(() => {
        handleLearnerChange(courseId)
    },[pageState.currentPage, pageState.perPage])


    //Handle course change
    const handleCourseChange = (Course) => {
        selectCourse(Course?.name);
        setCourseId(Course?.id);
        _selectCourse(Course)
        //Fetch Learner
        handleLearnerChange(Course?.id);


    }

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

                return [...prevUsers, {userId: User.id, courseId: course.id, enrollerId: user.user_infos.id,  start_date: format(start, 'yyyy-MM-dd'), end_date: format(end, 'yyyy-MM-dd')}]
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
                courseToUpdate.enrollees = courseToUpdate.enrollees || [];

                const enrolled = courseToUpdate.enrollees.some(
                    (u) => u.id === User.id
                );

                if(!enrolled){
                    courseToUpdate.enrollees.push(User);
                } else {
                    courseToUpdate.enrollees = courseToUpdate.enrollees.filter((u) => u.id !== User.id);
                }

                updated[existingCourse] = courseToUpdate;
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
                start_date: format(start, 'yyyy-MM-dd'),
                end_date: format(end, 'yyyy-MM-dd'),
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
        // console.log(selected)
        // console.log(results)
        if(selected.length === 0){
            setEmpty(true)
            setEnrolling(false)
            return
        }

        // axiosClient.post('enrollments/bulk', selected)
        // .then(({data}) => {
        //     setEnrolling(false)
        //     console.log(data);
        //     setEnrolled(true);
        //     setSelected([]);
        // })
        // .catch((err)=>console.log(err));

        setEnrolling(false)
        setOpenDuration(true)
    }

    useEffect(()=>{
        console.log(selected)
        console.log(results)
        console.log(course)
    },[selected,results])

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
        pageChangeState('startNumber', (pageState.currentPage - 1) * pageState.perPage + 1)
        pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.totalUser))
    },[pageState.currentPerPage])


    // Dynamic Page Number
    const Pages = [];
    for(let p = 1; p <= pageState.lastPage; p++){
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
        if (!Array.isArray(assigned_courses) || assigned_courses.length === 0) return;

        handleCourseChange(assigned_courses[0]); // Automatically select the first entry
    }, [assigned_courses]);

    //reset the operation
    const reset = () => {
        console.log("reseting")
        handleCourseChange(assigned_courses[0]);
        setResults([])
    }

    return (
        <>
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_1fr_3.75rem] h-full w-full'>
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
                    {enrolling ? 'Enrolling...' : 'Enroll Trainee'}
                </button>
            </div>
            {/* Learner table */}
            <div className='row-start-2 row-span-3 col-span-4 px-5 py-2 grid grid-rows-[min-content_1fr_min-content] grid-cols-4'>

            <div className="col-start-1 row-start-1 py-2 flex flex-row gap-3 items-center">
                <Sheet>
                    <SheetTrigger>
                        <div className="border-2 border-primary rounded-md bg-white shadow-md flex items-center justify-center p-3 text-primary hover:cursor-pointer hover:bg-primary hover:text-white hover:scale-105 transition-all ease-in-out">
                            <FontAwesomeIcon icon={faSwatchbook}/>
                        </div>
                    </SheetTrigger>
                    <SheetOverlay className="bg-gray-500/75 backdrop-blur-sm transition-all" />
                    <SheetContent className="h-full flex-col flex" side={"left"}>
                        {/* Course Header */}
                        <div className="inline-flex flex-col gap-1 row-start-3 col-span-1 py-2 w-full">
                        <label htmlFor="filter">
                            <div>
                                <p className="font-header text-lg text-primary">Courses</p>
                                <p className="font-text text-xs text-unactive">Quickly choose a course a leaner can be enrolled</p>
                            </div>
                        </label>
                        <div className="grid grid-cols-1">
                            <select id="filter" name="filter" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                value={formik.values.filter}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                >
                                <option value="myCourses"> My Courses</option>
                                <option value="Assigned"> Assigned Courses</option>
                            </select>
                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        </div>
                        {/* Courses Available */}
                        {
                        isLoading ? (
                            <div className="flex flex-col gap-2 items-center justify-center text-center h-full pr-4">
                                <img src={CourseLoading} alt="" className="w-44"/>
                                <p className="text-xs font-text text-primary">Hang tight! 🚀 Loading assigned courses for bulk enrollment—great things take a second!</p>
                            </div>
                        )
                        : (
                            <ScrollArea className="h-[calc(100vh-6rem)] w-full mr-1">
                                <div className="gap-2 h-full flex flex-col snap-y snap-mandatory overflow-y-auto">
                                {
                                        assigned_courses.map((Course) => (
                                            <AssignedCourseEnrollmentCard
                                                id={Course.id}
                                                name={Course.name}
                                                coursetype={Course.types?.[0]?.type_name}
                                                coursecategory={Course.categories?.[0]?.category_name}
                                                duration={Course.duration}
                                                trainingmode={Course.training_modes?.[0]?.mode_name}
                                                trainingtype={Course.training_type}
                                                course={course}
                                                selected={selected}
                                                onclick={() => handleCourseChange(Course)}
                                                numberOfEnrollees={numberOfEnrollees}
                                                />))
                                    }
                                </div>
                            </ScrollArea>
                        )
                        }

                    </SheetContent>
                </Sheet>

                <div>
                    <p className="text-unactive font-text text-xs">Selected Course:</p>
                    <p className="text-primary font-header">{_course?.name || "No Selected Course"}</p>
                    <p className="text-unactive font-text text-xs">{_course && (<>Course ID: {_course.CourseID}</>)}</p>
                </div>
            </div>

            <div className="col-start-2  py-2 flex flex-row gap-3">
                <div>
                    <p className="text-unactive font-text text-xs">Number of Enrolless:</p>
                    <p className="text-primary font-text">{numberOfEnrollees(_course?.id)} Learner</p>
                </div>
            </div>

            <div className="col-start-4 w-full py-2 items-center flex">
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md font-text shadow-md w-full'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>

            <div className="col-start-3 pr-2 row-start-1 flex flex-row items-center justify-end">
                <Sheet>
                    <SheetTrigger>
                        <div className="h-fit p-2 flex justify-center items-center bg-primary aspect-square border-2 border-primary rounded-md shadow-md text-white hover:cursor-pointer hover:scale-105 hover:bg-primaryhover transition-all ease-in-out">
                            <FontAwesomeIcon icon={faFilter}/>
                        </div>
                    </SheetTrigger>
                    <SheetOverlay className="bg-gray-500/75 backdrop-blur-sm transition-all" />
                    <SheetContent className="h-full flex-col flex">
                    <div>
                        <h1 className='font-header text-2xl text-primary'>Learner Filter</h1>
                        <p className='text-md font-text text-unactive text-sm'>Categorize learner to enroll</p>
                    </div>
                    </SheetContent>
                </Sheet>
            </div>

            {
                learnerLoading ? (
                    <EnrollmentTableProps>
                        <LearnerLoadingProps/>
                    </EnrollmentTableProps>
                ):
                (assigned_courses.map((Course) => (
                    course === Course.name ? (
                    <EnrollmentTableProps selectAll={selectAll} onchange={handleSelectAll} course={Course} key={Course.name}>
                        {
                            learnerLoading ? (
                                <LearnerLoadingProps/>
                            ) :(
                            learners.map((learner)=>(
                                <Learner
                                    key={learner?.id}
                                    id={learner}
                                    profile_image={learner?.profile_image}
                                    name={[learner?.first_name, learner?.middle_name, learner?.last_name].filter(Boolean).join(" ")}
                                    employeeID={learner?.employeeID}
                                    division={learner?.division.division_name}
                                    department={learner?.department.department_name}
                                    section={learner?.section.section_name}
                                    title={learner?.title.title_name}
                                    branch={learner?.branch.branch_name}
                                    city={learner?.city.city_name}
                                    enrolled={selected}
                                    selectedCourse={Course}
                                    handleCheckbox={handleCheckbox}
                                    selected={selected}/>
                            ))
                        )
                        }
                    </EnrollmentTableProps>) : (null)
                )))
            }

            <div className='flex flex-row items-center justify-between col-span-4 border-t border-divider py-3'>
                {/* Total number of entries and only be shown */}
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUser}</span> <span className='text-primary'>results</span>
                    </p>
                </div>
                {/* Paganation */}
                <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a href="#"
                            onClick={back}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {Pages.map((page)=>(
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
                        ))}

                        {/* Next */}
                        <a href="#"
                            onClick={next}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>
            </div>
        </div>

        {/* Successfully Enrolled */}
        <EnrolledSuccessfullyModal isOpen={enrolled} onClose={() => {setEnrolled(false); reset()}} result={results}/>
        {/* Training Duration */}
        <BulkEnrollmentCourseDuration open={openDuration} close={()=>{setOpenDuration(false)}} result={results} selected={selected} setSelected={setSelected} setResults={setResults}/>
        {/* Error */}
        <EnrollmentFailedModal isOpen={enrollmentFailed} onClose={()=>setEnrollmentFailed(false)}/>
        {/* When no Selected Users */}
        <NoEmployeeSelectedModal isOpen={empty} onClose={()=>{setEmpty(false);}} />
        </>
    )
}
