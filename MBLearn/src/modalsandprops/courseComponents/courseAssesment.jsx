import { faChevronLeft, faChevronRight, faPause } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PortalToolTip from "MBLearn/src/components/ui/portal"
import { Progress } from "MBLearn/src/components/ui/progress"
import { useEffect, useRef, useState } from "react"
import CourseAssesmentItem from "./courseAssementItem"
import CircleChart from "MBLearn/src/components/ui/circleChart"


const CourseAssesment = ({course,complete}) => {
    const iconRef = useRef(null);
    const [hover, setHover] = useState(false);

    const [timeleft, setTimeleft] = useState(0)
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState(0)
    const [quizState, setQuizState] = useState("start")

    useEffect(()=>{
        // if(timeleft <= 0 && quizState === "on-going") {
        //     setQuizState("complete");
        // }
        if(timeleft <= 0 || quizState === "paused") return

        const timer = setInterval(()=>{
            setTimeleft((prev) => prev - 1)
        },1000);

        return () => clearInterval(timer);

    },[timeleft,quizState])

    const formatTime = (second) => {
        const m = Math.floor(second / 60);
        const s = second % 60;

        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    const next = () => {
        if(active === assessment.assesmentItems.length-1) return
        setActive(prev => prev + 1)
    }

    const back = () => {
        if(active <= 0) return
        setActive(prev => prev - 1)
    }

    const startAssesment = () => {
        setQuizState("on-going")
        if(quizState === "start"){
            setTimeleft(300)
        }
    }
    const pauseAssessment = () => {
        setQuizState("paused")
    }
    const completeAssesment = () => {
        setQuizState("complete")
    }

    useEffect(()=>{
       setProgress(Math.round(((active + 1) / assessment.assesmentItems.length) * 100));
    },[active])

    // Sample Quiz Object
    const assessment =
    {
        assesmentItems: [
            {
                id: 1,
                questionType: "trueOrfalse",
                question: "Capital Gains Tax is imposed on profits made from the sale of income-generating properties only",
                answerKey: "true",
                choices: [
                    {
                        id: 1,
                        name: "True",
                        value: "true"
                    },
                    {
                        id: 2,
                        name: "False",
                        value: "false"
                    }
                ]
            },
            {
                id: 2,
                questionType: "trueOrfalse",
                question: "Value-Added Tax (VAT) is only applied to goods and not services.",
                answerKey: "false",
                choices: [
                    {
                        id: 1,
                        name: "True",
                        value: "true"
                    },
                    {
                        id: 2,
                        name: "False",
                        value: "false"
                    }
                ]
            },
            {
                id: 3,
                questionType: "trueOrfalse",
                question: "Documentary Stamp Tax is required for loan agreements and other financial instruments.",
                answerKey: "true",
                choices: [
                    {
                        id: 1,
                        name: "True",
                        value: "true"
                    },
                    {
                        id: 2,
                        name: "False",
                        value: "false"
                    }
                ]
            },
            {
                id: 3,
                questionType: "multipleChoice",
                question: " Which of the following is NOT a type of direct tax in the Philippines?",
                answerKey: "true",
                choices: [
                    {
                        id: 1,
                        name: "Income Tax",
                        value: "true"
                    },
                    {
                        id: 2,
                        name: "Value-Added Tax",
                        value: "false"
                    },
                    {
                        id: 1,
                        name: "Capital Gains Tax",
                        value: "true"
                    },
                    {
                        id: 1,
                        name: "Corporate Tax",
                        value: "true"
                    },
                ]
            }
        ]
    }

    // useEffect(()=>{
    //     console.log("state: ", quizState)
    // },[quizState])

    return(
        // <div className="pl-1 grid grid-cols-1 grid-rows-[min-content_min-content] gap-2">
        //     <div>
        //         <p className="font-header text-primary">Course Assesment</p>
        //         <p className="font-text text-sm">
        //             This is a sample course assesment. Please answer the following questions to the best of your ability.
        //         </p>
        //     </div>
        //     {/* Assesment items Content */}
        //     <div className="col-span-1 row-span-1 flex flex-col gap-2">
        //         <div className="flex flex-col gap-10 border-2 border-primary rounded-md p-4 bg-white shadow-md">
        //             {/* Question */}
        //             <div>
        //                 <p className="font-header text-primary">Question 1: (True or False)</p>
        //                 <p className="font-text text-sm">
        //                     Capital Gains Tax is imposed on profits made from the sale of income-generating properties only.
        //                 </p>
        //             </div>
        //             {/* Answers */}
        //             <div className="grid grid-cols-2 gap-2">
        //             <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out">
        //                 <p className="group-hover:text-white font-header text-primary">True</p>
        //             </div>
        //             <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out ">
        //                 <p className="group-hover:text-white font-header text-primary">False</p>
        //             </div>
        //             </div>
        //         </div>
        //         <div className="flex flex-col gap-10 border-2 border-primary rounded-md p-4 bg-white shadow-md">
        //             {/* Question */}
        //             <div>
        //                 <p className="font-header text-primary">Question 2: (Multiple Choice)</p>
        //                 <p className="font-text text-sm">
        //                 Which of the following is NOT a type of direct tax in the Philippines?
        //                 </p>
        //             </div>
        //             {/* Answers */}
        //             <div className="grid grid-cols-2 grid-rows-2 gap-2">
        //             <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out">
        //                 <p className="group-hover:text-white font-header text-primary">A. Income Tax</p>
        //             </div>
        //             <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out ">
        //                 <p className="group-hover:text-white font-header text-primary">B. Value-Added Tax</p>
        //             </div>
        //             <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out ">
        //                 <p className="group-hover:text-white font-header text-primary">C. Capital Gains Tax</p>
        //             </div>
        //             <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out ">
        //                 <p className="group-hover:text-white font-header text-primary">D. Corporate Tax</p>
        //             </div>
        //             </div>
        //         </div>
        //         <div className="flex flex-col gap-10 border-2 border-primary rounded-md p-4 bg-white shadow-md">
        //             {/* Question */}
        //             <div>
        //                 <p className="font-header text-primary">Question 3: (Essay)</p>
        //                 <p className="font-text text-sm">
        //                     Explain the importance of direct taxes in the Philippine economy.
        //                 </p>
        //             </div>
        //             {/* Answers */}
        //             <div className="grid grid-cols-1 gap-2">
        //                 <textarea id="essay" name="essay" rows="5" placeholder="Write your answer here..."
        //                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        //             </div>
        //         </div>

        //     </div>
        //     {/* Submit */}
        //     <div className="py-2">
        //         <div className="flex items-center justify-center w-full h-full py-4 border-2 bg-primary rounded-md shadow-md hover:cursor-pointer hover:bg-primaryhover transition-all ease-in-out">
        //             <p className="font-header text-white">Submit Assesment</p>
        //         </div>
        //     </div>
        // </div>
        //
        <div className="py-5 h-[calc(100vh-12.25rem)] grid grid-cols-1 grid-rows-[min-content_min-content_1fr_min-content] overflow-visible">
            {/* Quiz Premise */}
            {
                quizState === "on-going" ? (
                    <>
                    {/* Quiz Header */}
                        <div className="grid grid-cols-4 overflow-visible">
                            <div className="py-2 flex flex-row items-center gap-3 overflow-visible col-span-2">
                                <div className="relative w-fit group">
                                    <div className="overflow-visible relative border-primary border-2 w-10 h-10 bg-white shadow-md rounded-md flex items-center justify-center text-primary hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out"
                                        onClick={()=>{pauseAssessment(),setHover(false)}}
                                        ref={iconRef} onMouseLeave={()=>setHover(false)} onMouseEnter={()=>setHover(true)}>
                                        <FontAwesomeIcon icon={faPause}/>
                                    </div>

                                    <PortalToolTip anchorRef={iconRef} visible={hover}>
                                        Pause Quiz
                                    </PortalToolTip>
                                </div>
                                <div>
                                    <p className="font-text text-unactive text-xs">Time Left:</p>
                                    <p className="font-header text-lg text-primary">{formatTime(timeleft)} <span className="text-unactive font-text text-xs">minutes Left</span></p>
                                </div>
                                <div>
                                    <p className="font-text text-unactive text-xs">Attempt:</p>
                                    <p className="font-header text-lg text-primary">1 out of 1 <span className="text-unactive font-text text-xs">max attempt</span></p>
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="flex flex-col items-end pr-4">
                                    <p className="font-text text-unactive text-xs">Questions:</p>
                                    <p className="font-header text-lg text-primary">{active+1} out of {assessment.assesmentItems.length} <span className="text-unactive font-text text-xs">items</span></p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center col-start-4">

                                <div className="flex flex-col gap-2 ">
                                    <div className="flex font-text text-unactive text-sm justify-between">
                                        <p>Progress</p>
                                        <p>{progress}%</p>
                                    </div>
                                    <Progress value={progress}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col py-5 items-center">
                            <p className="text-primary font-header leading-none">{course.name}</p>
                            <p className="text-xs font-text text-unactive">Course Assesment</p>
                        </div>

                        {/* Quiz Content */}
                        <CourseAssesmentItem assesmentItem={assessment.assesmentItems[active]} active={active}/>


                        {/* Quiz Navigation */}
                        <div className="flex flex-row justify-between">
                            <div className="h-10 w-10 bg-white border-2 border-primary rounded-md shadow-md flex items-center justify-center text-primary hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out"
                                onClick={() => {back()}}>
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </div>
                            {/* Quiz Lenght */}
                            <div className="flex flex-row gap-2 items-center">
                                {Array.from({length: assessment.assesmentItems.length}).map((_, i)=>(
                                    <div key={i} className={`h-2 w-2 rounded-full ${active === i ? "bg-primary":"bg-unactive"}`}/>
                                ))}
                            </div>
                            <div className="h-10 w-10 bg-white border-2 border-primary rounded-md shadow-md flex items-center justify-center text-primary hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out"
                                onClick={()=>{
                                        if(assessment.assesmentItems.length-1 === active){
                                            completeAssesment()
                                        }
                                        next()
                                    }}>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </div>
                        </div>
                    </>
                ) : quizState === "start" || quizState === "paused" ? (
                    <>
                    {/* Starting entry */}
                    <div className="row-span-4 grid grid-cols-4 grid-rows-2">
                        <div className="flex flex-col items-center gap-2 col-span-4 justify-end mb-5">
                            <div className="flex flex-col items-center">
                                <p className="font-text text-primary text-xs">{course.name}</p>
                                <p className="font-header text-primary text-3xl">Course Assesment</p>
                            </div>
                            <p className="font-text text-sm">
                                This is a sample course assesment. Please answer the following questions to the best of your ability.
                            </p>
                        </div>
                        <div className="flex flex-row justify-between items-start col-span-2 col-start-2">
                            <div>
                                <p className="font-text text-sm">Number of Attempt: <span className="font-header text-primary text-lg">1</span></p>
                                <p className="font-text text-sm">Max Attempt: <span className="font-header text-primary text-lg">1</span></p>
                            </div>
                            <div className="font-header text-primary border-primary border-2 rounded-md shadow-md py-2 px-5 hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out"
                                onClick={()=>{startAssesment()}}>
                                Take an Assement
                            </div>
                        </div>
                    </div>
                    </>
                ) : quizState === "complete" ? (
                    <>
                        {/* <div className="row-span-4 grid grid-cols-4 grid-rows-2">
                            <div className="flex flex-col items-center gap-2 col-span-4 justify-end mb-5">
                                <div className="flex flex-col items-center">
                                    <p className="font-text text-primary text-xs">{course.name}</p>
                                    <p className="font-header text-primary text-3xl">Course Assesment</p>
                                </div>
                                <p className="font-text text-sm">
                                    Complete
                                </p>
                            </div>
                        </div> */}
                        <div className="grid grid-cols-4 overflow-visible py-2">
                            <div className="col-span-2">
                                <p className="text-primary font-header leading-none">{course.name}</p>
                                <p className="text-xs font-text text-unactive">Course Assesment</p>
                            </div>
                            <div className="flex flex-col col-start-4 items-end">
                                <p className="text-primary font-header leading-none">Answer Summary</p>
                                <p className="text-xs font-text text-unactive">Review your Answer before submitting</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                                <div>
                                    <p className="font-text text-unactive text-xs">Time Left:</p>
                                    <p className="font-header text-lg text-primary">{formatTime(timeleft)} <span className="text-unactive font-text text-xs">minutes Left</span></p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-text text-unactive text-xs">Attempt:</p>
                                    <p className="font-header text-lg text-primary">1 out of 1 <span className="text-unactive font-text text-xs">max attempt</span></p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-text text-unactive text-xs"> Answered Questions:</p>
                                    <p className="font-header text-lg text-primary">{active+1} out of {assessment.assesmentItems.length} <span className="text-unactive font-text text-xs">items</span></p>
                                </div>
                                <div className="flex flex-col gap-2 justify-center">
                                    <div className="flex font-text text-unactive text-xs justify-between">
                                        <p> Assessment Progress:</p>
                                        <p>{progress}%</p>
                                    </div>
                                    <Progress value={progress}/>
                                </div>
                        </div>
                        <div></div>
                        <div className="grid grid-cols-2 gap-2">
                            {
                                timeleft <=0 ? null :
                                <div className="py-3 border-2 border-primary text-primary bg-white rounded-md font-header flex items-center justify-center shadow-md hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out"
                                    onClick={()=>{setQuizState("on-going")}}>
                                    <p>Review</p>
                                </div>
                            }
                            <div className={`py-3 border-2 border-primary text-white bg-primary rounded-md font-header flex items-center justify-center shadow-md hover:cursor-pointer ${timeleft <=0 ? "col-span-2":null}`}
                                onClick={()=>{setQuizState("result")}}>
                                <p>Submit</p>
                            </div>
                        </div>
                    </>
                ) : quizState === "result" ? (
                    // <div className="row-span-4 flex items-center justify-center gap-5">
                    //     <CircleChart label="Assesment Performance" size={250}  type="finished"/>
                    //     <div className="flex flex-col items-center gap-4">
                    //         <div>
                    //             <p className="font-header text-primary text-2xl">{course.name}</p>
                    //             <p className="font-text text-unactive">Course Assessment</p>
                    //         </div>
                    //         <div className="flex flex-col items-center">
                    //             <p className="font-text text-unactive">You got</p>
                    //             <p className="font-header text-4xl text-primary">10 out of {assessment.assesmentItems.length}</p>
                    //             <p className="font-text text-unactive">Assessment Score</p>
                    //         </div>
                    //         <div className="py-2 px-10 border-2 border-primary text-primary bg-white rounded-md font-header flex items-center justify-center shadow-md hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out"
                    //             //onClick={complete()}
                    //             >
                    //             Complete Course
                    //         </div>

                    //     </div>
                    // </div>
                    <>
                    <div className="row-span-3 grid grid-cols-4 grid-rows-[min-content_min-content_1fr]">
                        <div className="flex flex-col items-end col-start-3 col-span-2">
                            <p className="font-header text-primary">{course.name}</p>
                            <p className="font-text text-unactive text-xs">Course Assessment</p>
                        </div>
                        <div className="flex flex-col col-start-2 row-start-1">
                            <p className="font-header text-primary">Result</p>
                            <p className="font-text text-unactive text-xs">Assessment Review</p>
                        </div>
                        <div className="flex flex-col items-center justify-center col-start-1 row-start-1 row-span-3 gap-10">
                            <CircleChart label="Assesment Performance" size={200}  type="finished"/>
                            <div className="flex flex-col items-center">
                                <p className="font-text text-xs text-unactive">You got</p>
                                <p className="font-header text-2xl text-primary">10 out of {assessment.assesmentItems.length}</p>
                                <p className="font-text text-xs text-unactive">Assessment Score</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="py-3 border-2 border-primary text-primary bg-white rounded-md font-header flex items-center justify-center shadow-md hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out"
                            onClick={()=>{setQuizState("on-going")}}>
                            <p>Review</p>
                        </div>
                        <div className={`py-3 border-2 border-primary text-white bg-primary rounded-md font-header flex items-center justify-center shadow-md hover:cursor-pointer`}
                            onClick={()=>{setQuizState("result")}}>
                            <p>Submit</p>
                        </div>
                    </div>
                    </>
                ) : null
            }
        </div>
    )
}
export default CourseAssesment
