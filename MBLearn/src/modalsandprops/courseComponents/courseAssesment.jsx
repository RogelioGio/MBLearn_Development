import { faChevronLeft, faChevronRight, faPause } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PortalToolTip from "MBLearn/src/components/ui/portal"
import { Progress } from "MBLearn/src/components/ui/progress"
import { useEffect, useRef, useState } from "react"
import CourseAssesmentItem from "./courseAssementItem"
import CircleChart from "MBLearn/src/components/ui/circleChart"
import { RingProgress } from "@mantine/core"


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
        <div className="flex flex-col items-center justify-center h-[calc(100vh-13rem)]">
            {
                quizState === "start" || quizState === "paused" ? <>
                <div className="grid grid-rows-3 gap-2 w-full">
                    <div className="flex flex-col items-center justify-center">
                        <p className="font-header text-primary text-3xl">Course Assesment</p>
                        <p className="font-text text-sm"> This is a sample course assesment. Please answer the following questions to the best of your ability. </p>
                    </div>
                    <div className="flex flex-row items-center justify-around">
                        {
                            quizState === "paused" ?
                            <div>
                                <p className="font-header text-lg text-primary">{formatTime(timeleft)} minutes Left</p>
                                <p className="font-text text-unactive text-xs">Time Left</p>
                            </div> : null
                        }
                        <div>
                            <p className="font-header text-lg text-primary">1 attempt</p>
                            <p className="font-text text-unactive text-xs">Current Attempt</p>
                        </div>
                        <div>
                            <p className="font-header text-lg text-primary">4 attempts</p>
                            <p className="font-text text-unactive text-xs">Max Attempts</p>
                        </div>
                        {
                            quizState === "paused" ?
                            <div>
                                <div className="flex flex-row items-center justify-start gap-2">
                                    <RingProgress
                                    size={35} // Diameter of the ring
                                    roundCaps
                                    thickness={4} // Thickness of the progress bar
                                    sections={[{ value: progress, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                    rootColor="hsl(210, 14%, 83%)" // Darker blue track
                                    />
                                    <p className='font-header'>{progress}%</p>
                                </div>
                                <p className="font-text text-unactive text-xs">Assessment Progress</p>
                            </div> : null
                        }
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <div className="w-fit py-3 px-5 bg-primary rounded-md shadow-md flex flex-row items-center justify-center hover:bg-primaryhover transition-all ease-in-out hover:cursor-pointer"
                        onClick={()=>startAssesment()}>
                            <p className="font-header text-white text-sm">
                                {
                                    quizState === "start" ? "Start Assesment" : "Resume Assesment"
                                }
                            </p>
                        </div>
                    </div>
                </div>
                </> : quizState === "on-going" ? <>
                <div className="grid grid-rows-[min-content_1fr_min-content] w-full h-full">
                    <div className="flex flex-row items-center justify-between py-2">
                        <div className="flex flex-row items-center gap-2 w-full">
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
                                <p className="font-header text-lg text-primary">{formatTime(timeleft)} <span className="text-unactive font-text text-xs">minutes Left</span></p>
                                <p className="font-text text-xs">Time Left:</p>
                            </div>

                        </div>
                        <div className="flex flex-col justify-center items-center whitespace-nowrap">
                            <p className='font-header text-lg text-primary'>1 <span className="font-text text-xs text-unactive">out of</span> 4 <span className="font-text text-xs text-unactive">max Attempt</span></p>
                            <p className='font-text text-xs'>Attempt:</p>

                        </div>
                        <div className="flex flex-row justify-end gap-2 pr-4 w-full">
                            <div className="flex flex-col items-end justify-end">
                                <p className='font-header'>{progress}%</p>
                                <p className='font-text text-xs'>Assessment Progress</p>
                            </div>
                            <RingProgress
                                size={35} // Diameter of the ring
                                roundCaps
                                thickness={4} // Thickness of the progress bar
                                sections={[{ value: progress, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                rootColor="hsl(210, 14%, 83%)" // Darker blue track
                            />
                        </div>
                    </div>
                </div>
                </> : null
            }
        </div>
    )
}
export default CourseAssesment
