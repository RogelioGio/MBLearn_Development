import { faCircleCheck as faCircleCheckRegular, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import CourseOverview from "../modalsandprops/courseComponents/CourseOverview";
import CourseText from "../modalsandprops/courseComponents/courseText";
import CourseVideo from "../modalsandprops/courseComponents/courseVideo";
import { faBackward, faBook, faCircleChevronLeft, faCircleChevronRight, faForward } from "@fortawesome/free-solid-svg-icons";
import { Step, Stepper, StepperCompleted, useStepper } from "../components/ui/courseStepper";
import { ScrollArea } from "../components/ui/scroll-area";
import CourseAssesment from "./courseComponents/courseAssesment";
import Content from "./courseComponents/courseContent";
import courseCompleted from ".././assets/Course Completed.svg"
import { useStateContext } from "../contexts/ContextProvider";
import { Progress } from "../components/ui/progress";
import Course from "../views/Course";
import axiosClient from "../axios-client";
import Loading from "../assets/course_Loading.svg"

const CourseModuleProps = ({headers, course, LearnerProgress}) => {
    const stepperRef = useRef();
    const [activeStepMeta, setActiveMeta] = useState({title: "", desc: "", stepID:""})
    const {role,user} = useStateContext()
    const [loading, setLoading] = useState()

    //Lesson must be in this object structure
    // const LessonObject = {
    //     id: 1,
    //     courseid: 1,
    //     oldOrderPosition: 0,
    //     currentOrderPosition: 4,
    //     LessonName: "Lesson 1",
    //     Lesson_Description: "Lesson Description",
    //     file_path: null,
    //     created_at: "2025-05-09T09:30:03.000000Z",
    //     updated_at: "2025-05-10T11:15:09.000000Z",
    //     Lesson_Type: "text",
    //     LessonContentAsJSON: "",
    //     files: []
    // }

    useEffect(() => {
        console.log("Learner Progress: ", LearnerProgress)
    }, [LearnerProgress])
    const [learnerProgress, setLearnerProgress] = useState(LearnerProgress || [])
    const [progress, setProgress] = useState()

    //New handleNext
    const completeModule = (moduleId) => {
        if(!moduleId) return

        setLearnerProgress(prev => {
            if(prev.includes(moduleId)) return prev
            return [...prev, moduleId]
        })

        setLoading(true)
        if (learnerProgress.some(p => p === moduleId)) {
            setLoading(false)
            stepperRef.current?.next()
            return
        } else {
            setTimeout(() => {
                stepperRef.current?.next()
                setLoading(false)
            },2000)
        }

        axiosClient.get(`/status/${user.user_infos.id}/${moduleId}`)
        .then((res) => {console.log(res)})
        .catch((e) => console.log(e))
    }
    const LessonHop = (moduleId) => {
        if(!moduleId) return

        setLearnerProgress(prev => {
            if(prev.includes(moduleId)) return prev
            return [...prev, moduleId]
        })
        setLoading(true)
        if (learnerProgress.some(p => p === moduleId)) {
            setLoading(false)
            return
        } else {
            setTimeout(() => {
                setLoading(false)
            },2000)
        }

        axiosClient.get(`/status/${user.user_infos.id}/${moduleId}`)
        .then((res) => {console.log(res)})
        .catch((e) => console.log(e))
    }

    const calculateProgress = () => {
        //course?.lessons
        const p = (learnerProgress.length / course?.lessons?.length) * 100;
        setProgress(Math.round(p))
        console.log("Total Progress",progress)
    }

    useEffect(()=> {
        console.log("Learner Progress: ", learnerProgress)
        console.log(learnerProgress.length, "/" , course?.lessons?.length)
        calculateProgress()
    },[learnerProgress, course?.lessons])

    useEffect(() => {
        console.log("course", course)
    }, [course])

    return (
        <>
        {
            role === "Course Admin" ?
            <div className="grid grid-cols-[20rem_1fr] grid-rows-[min-content_auto] h-full ">

                {/* Course Content */}
                <div className="flex flex-col justify-center py-3 pr-2 border-r border-divider">
                    <h1 className="font-header text-primary text-lg">Module Contents</h1>
                    <p className="font-text text-unactive text-xs">List of the the available content for the course</p>
                </div>
                <div className="col-start-1 col-span-2 row-start-2">
                <Stepper initialStep={0} enableStepClick={true} ref={stepperRef} onStepChange={(index,meta) => setActiveMeta(meta)}>
                {

                        course?.lessons.map((lesson, index) => {
                            let content;
                            switch (lesson.lesson_type) {
                            case "text":
                                content = <Content  course={lesson.lesson_content_as_json}/>;
                                break;
                            default:
                                content = (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="font-text text-primary text-sm">No Content Available</p>
                                </div>
                                );
                            }

                            return (
                            <Step key={index} stepTitle={lesson.lesson_name} stepDesc={`This is the ${lesson.lesson_name} short description`}>
                                {content}
                            </Step>
                            );
                        })
                        }
                    {/* <Step stepTitle={"Course Overview"} stepDesc={"Quick Summary of the course"}>
                        <CourseOverview/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 1"} stepDesc={"Course Content that is created from Comp-e-Learn Canvas"}>
                        <Content/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 2"} stepDesc={"Course Content that is created from Comp-e-Learn File Import (docx, and pdf)"}>
                        <CourseText/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 3"} stepDesc={"Course Content that is created from Comp-e-Learn MP4 import"}>
                        <CourseVideo/>
                    </Step> */}
                    <StepperCompleted>
                        <div className="w-full h-[calc(100vh-11.5rem)] flex flex-col items-center justify-center gap-y-3">
                                <img src={courseCompleted} alt="" className="w-40"/>
                            <div className="text-center">
                                <p className="font-header text-primary text-4xl">Congratulations</p>
                                <p className="font-text text-primary text-sm">"You have completed the given course"</p>
                            </div>
                        </div>
                    </StepperCompleted>
                </Stepper>
                </div>

                {/* Module Navigation */}
                <div className="flex flex-row justify-between items-center w-full py-1 pl-2">
                    <div className="group h-fit px-5 py-2 border-primary border-2 rounded-md shadow-md flex flex-row justify-center items-center bg-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out gap-2"
                        onClick={()=> stepperRef.current?.back()}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} className="text-primary group-hover:text-white"/>
                        <p className="font-header text-sm text-primary group-hover:text-white">BACK</p>
                    </div>
                    <div>
                        <p className="font-header text-primary">
                            {activeStepMeta?.title}
                        </p>
                    </div>
                    <div className="group h-fit py-2 px-5 border-primary border-2 rounded-md shadow-md flex flex-row  justify-center items-center bg-white hover:bg-primary transition-all ease-in-out gap-2 hover:cursor-pointer"
                        onClick={()=> stepperRef.current?.next()}>
                        <p className="font-header text-sm text-primary group-hover:text-white">NEXT</p>
                        <FontAwesomeIcon icon={faCircleChevronRight} className="text-primary group-hover:text-white"/>
                    </div>
                </div>
            </div>

            :
            // Learner
            <>
            <div className="flex flex-row items-center justify-between gap-4 border-b border-divider py-4">
                {headers}
            </div>
            <div className="flex flex-col justify-center py-3 pl-4 border-l border-divider row-span-1">
            <h1 className="font-header text-primary text-lg">Module Contents</h1>
            <p className="font-text text-unactive text-xs">List of the the available content for the course</p>
            </div>

             {/* Module Navigation */}
            <div className="flex flex-row justify-between items-center w-full py-1 pl-2 pr-5">
                    <div className="group h-fit px-5 py-2 border-primary border-2 rounded-md shadow-md flex flex-row justify-center items-center bg-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out gap-2"
                        onClick={()=> stepperRef.current?.back()}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} className="text-primary group-hover:text-white"/>
                        <p className="font-header text-sm text-primary group-hover:text-white">BACK</p>
                    </div>
                    <div>
                        <p className={`${loading ? "font-text text-unactive":"font-header text-primary" } text-primary`}>
                            {loading ? "Loading..." : activeStepMeta?.title}
                        </p>
                    </div>
                    <div className="group h-fit py-2 px-5 border-primary border-2 rounded-md shadow-md flex flex-row  justify-center items-center bg-white hover:bg-primary transition-all ease-in-out gap-2 hover:cursor-pointer"
                        onClick={()=>{
                                    completeModule(activeStepMeta?.stepID)
                                }
                                // stepperRef.current?.next()
                            }>
                        <p className="font-header text-sm text-primary group-hover:text-white">NEXT</p>
                        <FontAwesomeIcon icon={faCircleChevronRight} className="text-primary group-hover:text-white"/>
                    </div>
            </div>

            {/* Course Progress */}
            <div className="pl-4 pr-3 py-2 border-l border-divider flex flex-col gap-y-2 justify-center">
                <div className="flex flex-row justify-between font-text text-sm text-unactive">
                    <p>Progress:</p>
                    <p>{progress || 0}%</p>
                </div>
                <div>
                    <Progress value={progress || 0}/>
                </div>
            </div>

            {/* Modules */}
            <div className="col-start-1 col-span-2 row-start-3 row-span-2 border-divider">
                <Stepper initialStep={0} enableStepClick={true} ref={stepperRef} onStepChange={(index,meta) => setActiveMeta(meta)} complete={()=> LessonHop(activeStepMeta?.stepID)} learnerProgress={learnerProgress}>
                    {
                        course?.lessons.map((lesson, index) => {
                            let content;
                            switch (lesson.lesson_type) {
                            case "text":
                                content = <Content  course={lesson.lesson_content_as_json}/>;
                                break;
                            default:
                                content = (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="font-text text-primary text-sm">No Content Available</p>
                                </div>
                                );
                            }

                            return (
                            <Step key={index} stepTitle={lesson.lesson_name} stepDesc={`This is the ${lesson.lesson_name} short description`} stepID={lesson.id} onClick={()=>completeModule(lesson.id)}>
                                {
                                    loading ? (
                                        <div className="h-[calc(100vh-11rem)] flex flex-col items-center justify-center">
                                            <img src={Loading} alt="" className="w-40"/>
                                            <h1 className='font-header text-xl text-primary'>"Loading your learning journey..."</h1>
                                            <p className='font-text'>Empowering you with the knowledge to achieve your goals</p>
                                        </div>
                                    ) : content
                                }
                            </Step>
                            );
                        })
                        }
                    {/* <Step stepTitle={"Course Overview"} stepDesc={"Quick Summary of the course"}>
                        <CourseOverview/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 1"} stepDesc={"Course Content that is created from Comp-e-Learn Canvas"}>
                        <Content/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 2"} stepDesc={"Course Content that is created from Comp-e-Learn File Import (docx, and pdf)"}>
                        <CourseText/>
                    </Step>
                    <Step stepTitle={"Sample Course Content 3"} stepDesc={"Course Content that is created from Comp-e-Learn MP4 import"}>
                        <CourseVideo/>
                    </Step> */}
                    <StepperCompleted>
                        <div className="w-full h-[calc(100vh-11.5rem)] flex flex-col items-center justify-center gap-y-3">
                                <img src={courseCompleted} alt="" className="w-40"/>
                            <div className="text-center">
                                <p className="font-header text-primary text-4xl">Congratulations</p>
                                <p className="font-text text-primary text-sm">"You have completed the given course"</p>
                            </div>
                        </div>
                    </StepperCompleted>
                </Stepper>
            </div>
            </>
        }
  </>

    );
};

export default CourseModuleProps;
