import { faCircleCheck as faCircleCheckRegular, faClipboard, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import CourseOverview from "../modalsandprops/courseComponents/CourseOverview";
import CourseText from "../modalsandprops/courseComponents/courseText";
import CourseVideo from "../modalsandprops/courseComponents/courseVideo";
import { faBackward, faBook, faCircleChevronLeft, faCircleChevronRight, faForward, faPause, faSpinner } from "@fortawesome/free-solid-svg-icons";
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



const CourseModuleProps = ({headers, course, LearnerProgress = [], setLearnerProgress, fetchingLearnerProgress, usedTo}) => {
    const stepperRef = useRef();
    const [activeStepMeta, setActiveMeta] = useState({title: "", desc: "", stepID:""})
    const {role,user} = useStateContext()
    const [loading, setLoading] = useState(false)
    const [miscProgress, setMiscProgress] = useState([])
    //const {setCourse} = useCourse();

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

    // useEffect(() => {
    //     console.log("Learner Progress: ", LearnerProgress)
    //     setLearnerProgress(LearnerProgress)
    // }, [LearnerProgress])
    // const [learnerProgress, setLearnerProgress] = useState(LearnerProgress || [])
    const [progress, setProgress] = useState(0)

    //New handleNext
    const completeModule = (moduleId) => {
        if(!moduleId) {
            setLoading(true)
            setTimeout(() => {
                stepperRef.current?.next()
                setLoading(false)
            },2000)
            return
        }

        if(typeof moduleId === "string"){
            setMiscProgress(prev => {if(prev.includes(moduleId)) return prev
            return [...prev, moduleId]})
        }else{
            setLearnerProgress(prev => {
                if(prev.includes(moduleId)) return prev
                return [...prev, moduleId]
            })
        }


        setLoading(true)
        if (LearnerProgress.some(p => p === moduleId) || miscProgress.some(m => m === moduleId)) {
            setLoading(false)
            stepperRef.current?.next()
            return
        } else {
            setTimeout(() => {
                stepperRef.current?.next()
                setLoading(false)
            },2000)
        }

        if(typeof moduleId === "string") return

        axiosClient.get(`/status/${user.user_infos.id}/${moduleId}`)
        .then((res) => {console.log(res)})
        .catch((e) => console.log(e))
    }

    const calculateProgress = () => {
        if(!LearnerProgress) return 0
        const p =  Math.round((LearnerProgress.length / course?.lessons?.length) * 100);
        setProgress(p)
        //console.log("Total Progress",p)
    }

    useEffect(() => {
        calculateProgress()
        //console.log('learner progress: ', LearnerProgress)
    },[LearnerProgress])

    return (
        <>
        {
            !course ?
            <div className="flex items-center justify-center h-full w-full gap-4">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin"/>
                <p className="text-unactive font-text text-xs">Loading Content...</p>
            </div>
            : usedTo === "Course Admin" ?
            <>
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
                </Stepper>
            </>
            : <>
                <Stepper initialStep={0} enableStepClick={true} ref={stepperRef} onStepChange={(index,meta) => setActiveMeta(meta)} learnerProgress={LearnerProgress || []} tempProgress={miscProgress || []} completionPercent={progress}>
                    {
                        course?.description && course?.course_objectives && course?.course_outcomes ? (
                            <Step stepTitle={"Course Overview"} stepDesc={"Quick Summary of the course"} icon={faBook} stepID={"overview"}>
                                <CourseOverview course={course}/>
                            </Step>
                        ) : (null)
                    }

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
                                {content}
                            </Step>
                            );
                        })
                    }
                </Stepper>
            </>
        }
        </>

    )

};

export default CourseModuleProps;
