
import { faCircleCheck as faCircleCheckRegular, faCircleLeft as faCircleLeftRegular } from "@fortawesome/free-regular-svg-icons"
import { faArrowDownShortWide, faArrowDownZA, faArrowLeft, faArrowUpAZ, faArrowUpWideShort, faBook, faCakeCandles, faGraduationCap, faPenToSquare, faSort, faSquareCheck, faTrash, faUser, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons"
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




export default function Course() {
    const navigate = useNavigate();
    const {user} = useStateContext();
    const {id} = useParams();
    const [course, setCourse] = useState([]);
    const [isLoading ,setLoading] = useState(true);
    const [tab, setTab] = useState("module");
    const [open, setOpen] = useState(false);

    const tabComponents = {
        module: <CourseModuleProps />,
        learner: <CourseLearenerProps />,
        enrollment: <CourseEnrollmentProps />,
    };


    //API Call for specific course
    const fetchCourses = () => {
        setLoading(true)
        axiosClient.get(`/courses/${id}`)
        .then(({data}) => {
            setCourse(data.data)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchCourses();
    },[])

    useEffect(() => {
        console.log("Active Tab:", tab);
    }, [tab]);

    return(
        <>
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_1fr_min-content] h-full w-full overflow-hidden'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | {isLoading ? "Loading..." : course?.name || "No Course Found"}</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-row col-span-3 row-span-1 item-center ml-5">
                <div className="text-primary flex flex-row justify-center items-center border-b border-divider">
                    <div className="flex flex-row justify-center items-center w-10 aspect-square border-2 border-primary rounded-full hover:scale-105 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out">
                        <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" onClick={() => navigate(-1)}/>
                    </div>
                </div>
                <div className=' pl-5 flex flex-col justify-center border-b border-divider w-full'>
                    <h1 className='text-primary text-4xl font-header'> {course?.name || 'Loading...'}</h1>
                    <p className='font-text text-sm text-unactive'>{course?.category || 'Loading...'} - {course?.type || 'Loading...'}</p>
                </div>
                <div className="flex flex-row justify-center items-center border-b border-divider pr-5">
                    <div className="hover:scale-105 ease-in-out transition-all hover:cursor-pointer" onClick={()=>setOpen(true)}>
                        <FontAwesomeIcon icon={faPenToSquare} className="border-2 border-primary rounded-md aspect-square p-3 text-lg text-primary shadow-md hover:bg-primary hover:text-white"/>
                    </div>
                </div>
            </div>

            {/* Tab Buttons */}
            <div className='row-start-2 col-span-4 w-auto mx-5 py-3 gap-3'>
                <div className="w-full flex flex-row rounded-md shadow-md hover:cursor-pointer">
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
            <div className="row-start-1 row-span-1 col-start-4 col-span-1 pb-2 pl-5 mr-5 mt-5 border-b border-l border-divider">
                <p className="text-primary font-header"> Course Status:</p>
                <p className="text-primary font-text text-xs"> Latest Enrollement:</p>
                <p className="text-primary font-text text-xs"> On-Going Status:</p>
            </div>

            {/* Course content */}
            {tabComponents[tab] || null}


        </div>
        {/* Edit */}
        <EditCourseModal open={open} close={()=>setOpen(false)} id={course.id}/>
        </>

    )
}
