import { faCircleCheck as faCircleCheckRegular, faClipboard, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import CourseOverview from "../modalsandprops/courseComponents/CourseOverview";
import CourseText from "../modalsandprops/courseComponents/courseText";
import CourseVideo from "../modalsandprops/courseComponents/courseVideo";
import { faBackward, faBook, faCircleChevronLeft, faCircleChevronRight, faForward, faPause } from "@fortawesome/free-solid-svg-icons";
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
import { useCourse } from "../contexts/CourseContext";


const CourseModuleProps = ({headers, course, LearnerProgress = [], setLearnerProgress, fetchingLearnerProgress}) => {
    const stepperRef = useRef();
    const [activeStepMeta, setActiveMeta] = useState({title: "", desc: "", stepID:""})
    const {role,user} = useStateContext()
    const [loading, setLoading] = useState(false)
    const [miscProgress, setMiscProgress] = useState([])
    const {setCourse} = useCourse();

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

    // useEffect(()=>{
    //     console.log("Course :", course)
    //     console.log(loading)
    // },[loading])
    // useEffect(() => {
    //     console.log("course", course)
    // }, [course])

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
            <div className="row-span-2 col-span-2 pt-2 pr-2">
                <div className=" bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-xl shadow-md">
                    <div className="flex flex-row items-center justify-between gap-4 bg-gradient-to-b from-transparent to-black pt-14 pb-5 rounded-xl">
                        {headers}
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-col justify-center py-3 pl-4 border-l border-divider row-span-1">
            <h1 className="font-header text-primary text-lg">Module Contents</h1>
            <p className="font-text text-unactive text-xs">List of the the available content for the course</p>
            </div> */}
            {
                course && Object.keys(course).length > 0 ?
                <>
                    {/* Module Navigation */}
                    <div className="flex flex-row justify-between items-center w-full py-1 pl-2 pr-5 row-start-3 col-start-1 border-b border-divider">
                            <div className={`group h-fit px-5 py-2 border-primary border-2 rounded-md shadow-md flex flex-row justify-center items-center bg-white transition-all ease-in-out gap-2 ${loading || Object.keys(course).length === 0 || fetchingLearnerProgress ? 'opacity-50':'hover:bg-primary hover:cursor-pointer'}`}
                                onClick={()=> {if(!loading || Object.keys(course).length === 0 || !fetchingLearnerProgress){stepperRef.current?.back()}else return}}>
                                <FontAwesomeIcon icon={faCircleChevronLeft} className={`text-primary ${loading || Object.keys(course).length === 0 || fetchingLearnerProgress? null : "group-hover:text-white"}`}/>
                                <p className={`font-header text-sm text-primary ${loading || Object.keys(course).length === 0 || fetchingLearnerProgress ? null : "group-hover:text-white"}`}>BACK</p>
                            </div>
                            <div>
                                <p className={`${loading || Object.keys(course).length === 0 ? "font-text text-unactive":"font-header text-primary" } text-primary`}>
                                    {loading || Object.keys(course).length === 0 || fetchingLearnerProgress ? "Loading..." : activeStepMeta?.title}
                                </p>
                            </div>
                            <div className={`group h-fit py-2 px-5 border-primary border-2 rounded-md shadow-md flex flex-row  justify-center items-center bg-white transition-all ease-in-out gap-2 ${loading || Object.keys(course).length === 0 || fetchingLearnerProgress ? 'opacity-50':'hover:bg-primary hover:cursor-pointer'}`}
                                onClick={()=>{if(!loading || Object.keys(course).length === 0 || !fetchingLearnerProgress){completeModule(activeStepMeta?.stepID)}else return}}>
                                <p className={`font-header text-sm text-primary ${loading || Object.keys(course).length === 0 || fetchingLearnerProgress ? null : "group-hover:text-white"} `}>NEXT</p>
                                <FontAwesomeIcon icon={faCircleChevronRight} className={`text-primary ${loading || Object.keys(course).length === 0 || fetchingLearnerProgress ? null : "group-hover:text-white"}`}/>
                            </div>
                    </div>
                    {/* Course Progress */}
                    <div className="pl-4 pr-3 mt-2 pb-2 border-l border-divider flex flex-col gap-y-2 justify-center row-start-3 col-start-2">
                        <div className="flex flex-row justify-between font-text text-sm text-unactive">
                            <p>Course Progress:</p>
                            <p>{progress || 0}%</p>
                        </div>
                        <div>
                            <Progress value={progress || 0}/>
                        </div>
                    </div>

                    {
                        fetchingLearnerProgress ?
                        <>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className='font-header text-3xl text-primary'>"Loading your learning journey..."</h1>
                            <p className='font-text text-xs'>Empowering you with the knowledge to achieve your goals</p>
                        </div>
                        <div className="border-l border-divider grid pr-3 pl-2 auto-rows-min gap-1">
                        {
                            Array.from({length:5}).map((index) =>
                                (<div key={index} className="w-full h-20 shadow-md bg-white rounded-md animate-pulse"></div>)
                            )
                        }
                        </div>
                        </> : <>
                            {/* Modules */}
                            <div className="col-start-1 col-span-2 row-start-4 row-span-2 border-divider">
                                <Stepper initialStep={0} enableStepClick={true} ref={stepperRef} onStepChange={(index,meta) => setActiveMeta(meta)} learnerProgress={LearnerProgress || []} tempProgress={miscProgress || []}>
                                    {
                                        course?.description && course?.course_objectives && course?.course_outcomes ? (
                                            <Step stepTitle={"Course Overview"} stepDesc={"Quick Summary of the course"} icon={faBook} stepID={"overview"}>
                                                <CourseOverview course={course}/>
                                            </Step>
                                        ) : (null)
                                    }
                                    {
                                        course?.lessons?.map((lesson, index) => {
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
                                                            <h1 className='font-header text-3xl text-primary'>"Loading your learning journey..."</h1>
                                                            <p className='font-text text-xs'>Empowering you with the knowledge to achieve your goals</p>
                                                        </div>
                                                    ) : content
                                                }
                                            </Step>
                                            );
                                        })
                                        }
                                    <Step stepTitle={"Course Assesment"} stepDesc={"Complete the assesment to complete the course"} icon={faClipboard}>
                                        <CourseAssesment course={course} complete={()=>{completeModule(activeStepMeta?.stepID)}}/>
                                    </Step>
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


                </> :
                <>
                    {/* Loading State */}
                    <div className="border-b border-divider flex flex-row justify-between items-center w-full py-1 pl-2 pr-5 ">
                        <div className={`group h-fit px-5 py-2 border-primary border-2 rounded-md shadow-md flex flex-row justify-center items-center bg-white transition-all ease-in-out gap-2 opacity-50`}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} className={`text-primary`}/>
                            <p className={`font-header text-sm text-primary group-hover:text-white"}`}>BACK</p>
                        </div>
                        <div>
                            <p className={`font-text text-unactive`}>
                                Loading...
                            </p>
                        </div>
                        <div className={`group h-fit px-5 py-2 border-primary border-2 rounded-md shadow-md flex flex-row justify-center items-center bg-white transition-all ease-in-out gap-2 opacity-50`}>
                            <FontAwesomeIcon icon={faCircleChevronRight} className={`text-primary`}/>
                            <p className={`font-header text-sm text-primary group-hover:text-white"}`}>Next</p>
                        </div>
                    </div>
                    <div className="pl-4 pr-3 py-2 border-l border-divider flex flex-col gap-y-2 justify-center row-start-3 col-start-2">
                        <div className="flex flex-row justify-between font-text text-sm text-unactive">
                            <p>Course Progress:</p>
                            <p>{progress || 0}%</p>
                        </div>
                        <div>
                            <Progress value={progress || 0}/>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className='font-header text-3xl text-primary'>"Loading your learning journey..."</h1>
                        <p className='font-text text-xs'>Empowering you with the knowledge to achieve your goals</p>
                    </div>
                    <div className="border-l border-divider grid pr-3 pl-2 auto-rows-min gap-1">
                        {
                            Array.from({length:5}).map((index) =>
                                (<div key={index} className="w-full h-20 shadow-md bg-white rounded-md animate-pulse">

                                </div>)
                            )
                        }

                    </div>
                </>
            }

            </>
        }
</>

    );
};

export default CourseModuleProps;
