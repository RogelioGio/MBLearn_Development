
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




export default function Course() {
    const navigate = useNavigate();
    const {user} = useStateContext();
    const {id} = useParams();
    const [course, setCourse] = useState([]);
    const [isLoading ,setLoading] = useState(true);
    const [tab, setTab] = useState("module");
    const [step, setStep] = useState(0)


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

    return(
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
            </div>

            {/* Tab Buttons */}
            <div className='row-start-2 col-span-3 w-auto mx-5 py-3 gap-3'>
                {/* <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}>
                    <p>Modules</p>
                </div>
                <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}>
                    <p>Learners</p>
                </div>
                <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}>
                    <p>Enrollment</p>
                </div> */}
                <div className="w-full flex flex-row rounded-md shadow-md hover:cursor-pointer">
                    <span className={`w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-l-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === "module" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={()=> setTab("learner")}>
                        <FontAwesomeIcon icon={faBook}/>
                        Module
                    </span>
                    <span className={` w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === "learner" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={()=> setTab("learner")}>
                        <FontAwesomeIcon icon={faGraduationCap}/>
                        Learner
                    </span>
                    <span className={` w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-r-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === "enrollment" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={()=> setTab("enrollment")}>
                        <FontAwesomeIcon icon={faUserPlus}/>
                        Expected Audience
                    </span>

                </div>
            </div>

            {/* Action Button */}
            <div className="grid grid-rows-1 grid-cols-2 py-3 gap-2 mr-5">
                <div className="flex flex-row justify-center items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md">
                    <FontAwesomeIcon icon={faPenToSquare}/>
                    <p>Edit </p>

                </div>
                <div className="flex flex-row justify-center items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`">
                    <FontAwesomeIcon icon={faTrash}/>
                    <p>Delete</p>

                </div>
            </div>
            {/* Course status */}
            <div className="row-start-1 row-span-1 col-start-4 col-span-1 pb-2 pl-5 mr-5 mt-5 border-b border-l border-divider">
                <p className="text-primary font-header"> Course Status:</p>
                <p className="text-primary font-text text-xs"> Latest Enrollement:</p>
                <p className="text-primary font-text text-xs"> On-Going Status:</p>
            </div>

            {/* Course content */}
            {
                step === 0 ? (
                    <CourseOverview/>
                ) : step === 1 ? (
                    <CourseText/>
                ) : step === 2 ? (
                    <CourseVideo/>
                ) : (null)
            }

            {/* Course Sidebar */}
            <div className="row-start-3 col-start-4 my-2 border-l border-l-divider">
                {/* Header */}
                <div className="py-3 px-5">
                    <p className="font-header text-primary">Module conntent</p>
                </div>
                {/* Module List */}
                <div className="py-3 px-5">
                    <Stepper orientation="vertical"
                    active={step}
                    onStepClick={setStep}
                    classNames={{
                                step: "transition-all duration-300 !py-2",
                                stepIcon: "!border-primary",
                                stepCompletedIcon: "!bg-primary !rounded-full !border-primary !border-2",
                                content: "!pt-0",
                                verticalSeparator: "!border-primary !border !my-0 !h-full"
                            }}
                    completedIcon={<FontAwesomeIcon icon={faCircleCheckRegular} className="!text-white"/>}>
                    <Stepper.Step label="Course Overview" description="Course Description and expected outcome" icon={<FontAwesomeIcon icon={faBook} className="!text-primary"/>}/>
                    <Stepper.Step label="Module 1" description="Text Module with links attachment"  icon={1}/>
                    <Stepper.Step label="Module 2" description="Video Module with links attacment" icon={2}/>
                    <Stepper.Step label="Module 3" description="Slide Show with downloadable attachment" icon={3}/>
                    <Stepper.Step label="Assesment" description="Sample Assesment Module" icon={<FontAwesomeIcon icon={faSquareCheck} className="!text-primary"/>}/>
                    </Stepper>
                </div>
            </div>

        </div>


    )
}
