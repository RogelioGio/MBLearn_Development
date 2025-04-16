import { faCircleCheck as faCircleCheckRegular, faCircleLeft as faCircleLeftRegular } from "@fortawesome/free-regular-svg-icons"
import { faArrowDownShortWide, faArrowDownZA, faArrowLeft, faArrowUpAZ, faArrowUpWideShort, faBook, faBookOpenReader, faCakeCandles, faGraduationCap, faPenToSquare, faSort, faSquareCheck, faTrash, faUser, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Stepper } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { ContextProvider, useStateContext } from "../contexts/ContextProvider"
import CourseOverview from "../modalsandprops/courseComponents/CourseOverview"
import CourseText from "../modalsandprops/courseComponents/courseText"
import CourseVideo from "../modalsandprops/courseComponents/courseVideo"
import CourseModuleProps from "../modalsandprops/CourseModuleProps"
import CourseLearenerProps from "../modalsandprops/CourseLearnerProps"
import CourseEnrollmentProps from "../modalsandprops/CourseEnrollmentProps"
import { use } from "react"
import EditCourseModal from "../modalsandprops/EditCourseModal"
import { useCourse } from "../contexts/selectedcourseContext"
import { set } from "date-fns"
import AssignCourseAdmin from "../modalsandprops/AssignCourseAdminModal"
import dayjs from "dayjs"




export default function Course() {
    const navigate = useNavigate();
    const {user} = useStateContext();
    const {id} = useParams();
    const [course, setCourse] = useState([]);
    const [isLoading ,setLoading] = useState(true);
    const [tab, setTab] = useState("module");
    const [open, setOpen] = useState(false);
    const [assign, setAssign] = useState(false);
    const {selectCourse, selectedCourse, isFetching, resetSelectedCourse} = useCourse();

    const tabComponents = {
        module: <CourseModuleProps />,
        learner: <CourseLearenerProps />,
        enrollment: <CourseEnrollmentProps />,
    };

    useEffect(() => {
        resetSelectedCourse(id);
        selectCourse(id);
        setLoading(isFetching);
        setCourse(selectedCourse);
    }, [selectedCourse,id, isFetching]);

    useEffect(() => {
        console.log(`Fetching: ${isFetching} Loading: ${isLoading}`);
        console.log(course)
    },[isFetching, isLoading])

    useEffect(() => {
        console.log("Active Tab:", tab);
    }, [tab]);

    return(
        <>
        <div className='grid grid-cols-4 grid-rows-[7rem_4rem_1fr] h-full w-full overflow-hidden h-'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | {isLoading ? "Loading..." : course?.name || "No Course Found"}</title>
            </Helmet>

            {/* Header */}
            {
                // IsLoading the whole page tomorrow
            }
            <div className="flex flex-row col-span-3 row-span-1 item-center w-full justify-between border-b border-divider">
                <div className="text-primary flex flex-row justify-center items-center p-3">
                    <div className="flex flex-row justify-center items-center w-10 aspect-square border-2 border-primary rounded-full hover:scale-105 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out">
                        <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" onClick={() => navigate(-1)}/>
                    </div>
                </div>
                <div className='pl-2 grid grid-rows-[auto_auto] grid-cols-[1fr_1fr_1fr] w-full py-3'>
                    {
                        !isLoading ? (
                            <>
                                <div className="flex flex-row justify-between items-end col-span-3">
                                    <h1 className='text-primary text-4xl font-header row-start-1 col-span-3 '> {course?.name}</h1>
                                </div>
                                <div className="flex flex-col col-start-1 py-1">
                                    <p className="font-header text-sm text-unactive ">Course ID: <span className="font-text">Sample Course ID</span></p>
                                </div>
                                <div className="flex flex-col col-start-2 py-1">
                                    <p className="font-header text-sm text-unactive ">Date Added: <span className="font-text">{dayjs(course?.create_at).format("MMMM DD, YYYY")}</span></p>
                                </div>
                                {/* <div className="flex flex-col col-start-1 py-1">
                                    <p className="font-text text-xs text-unactive ">Course Category:</p>
                                    <p className="text-unactive font-header text-sm">{course?.categories?.[0]?.category_name}</p>
                                </div>
                                <div className="flex flex-col col-start-2 py-1">
                                    <p className="font-text text-xs text-unactive ">Course Type:</p>
                                    <p className="text-unactive font-header text-sm">{course?.types?.[0]?.type_name}</p>
                                </div>
                                <div className="flex flex-col col-start-3 py-1">
                                    <p className="font-text text-xs text-unactive ">Training Type:</p>
                                    <p className="text-unactive font-header text-sm">{course?.training_type}</p>
                                </div> */}
                            </>
                        ) : (
                            <div className="col-span-2 row-span-2 flex flex-col justify-center">
                                <h1 className='text-primary text-4xl font-header '>Loading Course Information....</h1>
                            </div>
                        )
                    }
                </div>
                {
                    !isLoading && user.roles?.some(r => r.role_name === "Course Admin")? (<div className="flex flex-row justify-center items-center gap-2 pr-5">
                        <div className="hover:scale-105 ease-in-out transition-all hover:cursor-pointer" onClick={()=>setOpen(true)}>
                            <FontAwesomeIcon icon={faPenToSquare} className="border-2 border-primary rounded-md aspect-square p-3 text-lg text-primary shadow-md hover:bg-primary hover:text-white"/>
                        </div>
                        <div className="hover:scale-105 ease-in-out transition-all hover:cursor-pointer" onClick={()=>setAssign(true)}>
                            <FontAwesomeIcon icon={faBookOpenReader} className="border-2 border-primary rounded-md aspect-square p-3 text-lg text-primary shadow-md hover:bg-primary hover:text-white"/>
                        </div>
                    </div>) : (null)
                }

            </div>

            {/* Tab Buttons */}
            <div className='row-start-2 col-span-4 w-full py-3 gap-3 pr-5 pl-1 '>
                <div className="flex flex-row rounded-md shadow-md hover:cursor-pointer">
                    <span className={`w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-l-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === "module" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={()=> setTab("module")}>
                        <FontAwesomeIcon icon={faBook}/>
                        Module
                    </span>
                    <span className={` w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === "learner" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={()=> setTab("learner")}>
                        <FontAwesomeIcon icon={faGraduationCap}/>
                        Learners
                    </span>
                    <span className={` w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-r-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === "enrollment" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={()=> setTab("enrollment")}>
                        <FontAwesomeIcon icon={faUserPlus}/>
                        Expected Audience
                    </span>

                </div>
            </div>

            {/* Course status */}
            <div className={`row-start-1 row-span-1 col-start-4 col-span-1 pb-3 pl-5 mr-5 mt-3 border-b ${isLoading ? "": "border-l"} border-divider grid grid-cols-[auto_1fr] grid-rows-[auto] gap-x-2 gap-y-1`}>

                {
                    !isLoading ? (
                        <>
                            {
                                !isLoading ? (
                                <>
                                    <p className="text-primary font-header col-start-1"> Course Status:</p>
                                    <span className=" col-start-2 inline-flex items-center justify-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                                        Course Status Sample
                                    </span>
                                </>
                                ) : (null)
                            }
                            <p className="text-primary font-text text-xs col-start-1">Category: </p>
                            <div className="text-primary font-text text-xs">
                                {course?.categories?.[0]?.category_name}
                            </div>
                            <p className="text-primary font-text text-xs col-start-1">Type: </p>
                            <div className="text-primary font-text text-xs">
                                {course?.types?.[0]?.type_name}
                            </div>
                            <p className="text-primary font-text text-xs col-start-1">Training Type: </p>
                            <div className="text-primary font-text text-xs">
                                {course?.training_type}
                            </div>
                        </>
                    ) : (null)
                }

            </div>

            {/* Course content */}
            <div className="w-full h-full col-span-4 row-span-1">
                {tabComponents[tab] || null}
            </div>




        </div>
        {/* Edit */}
        <EditCourseModal open={open} close={()=>setOpen(false)} id={course?.id}/>
        {/* Assign Course Admin */}
        <AssignCourseAdmin open={assign} close={()=>setAssign(false)} id={course?.id}/>
        </>

    )
}
