import { faArrowLeft, faChevronLeft, faChevronRight, faCircleChevronLeft, faCircleChevronRight, faPause } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PortalToolTip from "MBLearn/src/components/ui/portal"
import { Progress } from "MBLearn/src/components/ui/progress"
import { useEffect, useRef, useState } from "react"
import CourseAssesmentItem from "./courseAssementItem"
import CircleChart from "MBLearn/src/components/ui/circleChart"
import { RingProgress } from "@mantine/core"
import { ScrollArea } from "MBLearn/src/components/ui/scroll-area"
import { set } from "date-fns"

// Sample Quiz Object
    const assessment =
    {
        passing: 75,
        timeLimit: 1000, // in seconds
        maxAttempts: 4,
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
                id: 4,
                questionType: "multipleChoice",
                question: " Which of the following is NOT a type of direct tax in the Philippines?",
                answerKey: 1,
                choices: [
                    {
                        id: 1,
                        name: "Income Tax",
                        value: 1
                    },
                    {
                        id: 2,
                        name: "Value-Added Tax",
                        value: 2,
                    },
                    {
                        id: 3,
                        name: "Capital Gains Tax",
                        value: 3
                    },
                    {
                        id: 4,
                        name: "Corporate Tax",
                        value: 4
                    },
                ]
            }
        ]
    }




const CourseAssesment = ({course,complete}) => {
    const iconRef = useRef(null);
    const [hover, setHover] = useState(false);
    const [assesment, setAssessment] = useState(assessment);
    const [timeleft, setTimeleft] = useState(0)
    const [initialTime, setInitialTime] = useState(0)
    const [progress, setProgress] = useState([]);
    const [progressPercent, setProgressPercent] = useState(0)
    const [active, setActive] = useState(0)
    const [quizState, setQuizState] = useState("start")
    const [tobeReviewed, setTobeReviewed] = useState(false)

    const [currentAttempt, setCurrentAttempt] = useState([])
    const [attemptHistory, setAttemptHistory] = useState([])
    const [attemptResult, setAttemptResult] = useState([])


    useEffect(()=>{
        // if(timeleft <= 0 && quizState === "on-going") {
        //     setQuizState("complete");
        // } else
            if(quizState === "on-going" || quizState === "review" && timeleft > 0) {
            const timer = setInterval(()=>{
                        setTimeleft((prev) => prev - 1)
                    },1000);

                    return () => clearInterval(timer);
        }
    },[timeleft,quizState])

    const formatTime = (second) => {
        const m = Math.floor(second / 60);
        const s = second % 60;

        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    const next = () => {
        if(active === assessment.assesmentItems.length-1){
            setQuizState("review")
        } else if(quizState === "review") {
            setQuizState("complete")
            return
        }
        setActive(prev => prev + 1)

        setProgress((prev) => {
            return prev.includes(assessment.assesmentItems[active].id) ? prev : [...prev, assessment.assesmentItems[active].id]
        })
    }

    const back = () => {
        if(active <= 0) return
        if(quizState === "review") {
            setQuizState("on-going")
            setActive(assessment.assesmentItems.length)
        }
        setActive(prev => prev - 1)
    }

    const startAssesment = () => {
        if(quizState === "start"){
            setTimeleft(assessment.timeLimit)
            setInitialTime(assessment.timeLimit)
            setQuizState("on-going")

            setCurrentAttempt((prev) => ({...prev, attempt: prev.attempt ?  prev.attempt + 1 : 1, assesmentAnswers: []}))
        }else if(tobeReviewed){
            setQuizState("review")
            return
        }
        else{
            setQuizState("on-going")
        }

    }
    const pauseAssessment = () => {
        if(quizState === "review"){
            setTobeReviewed(true)
        }
        setQuizState("paused")
    }

    useEffect(()=>{
        setProgressPercent(Math.round((progress.length / assessment.assesmentItems.length) * 100))
    },[active])

    useEffect(()=>{
        console.log("Current Attempt: ", currentAttempt)
        console.log("attemptHistory: ", attemptHistory)
        console.log("attemptResult: ", attemptResult)
        //console.log("question: ", assessment.assesmentItems[active])
    },[currentAttempt, attemptHistory])

    const elaspedTime = initialTime - timeleft

    const handleAnswer = (answer, question) => {
        setCurrentAttempt((prev)=>{
            const existingAnswer = prev.assesmentAnswers.find(a => a.questionId === question);

            if(existingAnswer) {
                const answerArray = prev.assesmentAnswers.map(a => a.questionId === question ? {...a, answer: answer} : a);
                return {
                    ...prev,
                    assesmentAnswers: answerArray
                }
            } else {
                return {
                    ...prev,
                    assesmentAnswers: [...prev.assesmentAnswers, {questionId: question, answer: answer}]
                }
            }
        })
    }

    const handleResult = () => {
        const result = currentAttempt.assesmentAnswers.map(({questionId, answer}) => {
            const question = assesment.assesmentItems.find(q => q.id === questionId);
            const isCorrect = question?.answerKey === answer

            return {
                questionId,
                answer,
                correctAnswer: question.answerKey,
                isCorrect
            }
        })

        const correct = result.filter(c => c.isCorrect).length;
        const totalQuestions = assessment.assesmentItems.length;
        const percentage = (correct/totalQuestions) * 100

        setAttemptResult({attempt: currentAttempt.attempt, result: result, score:correct, percentage:percentage})
        setAttemptHistory((prev)=> [...prev, {attempt: currentAttempt.attempt, result: result, score:correct, percentage:percentage}])
    }


    return(
        <div className="flex flex-col items-center justify-center h-[calc(100vh-12.30rem)]">
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
                            <p className="font-header text-lg text-primary">{currentAttempt.attempt === assesment.maxAttempts ? currentAttempt.attempt : currentAttempt.attempt && quizState === "start" ? currentAttempt.attempt + 1 : quizState === "paused" ? currentAttempt.attempt :  1} attempt</p>
                            <p className="font-text text-unactive text-xs">Current Attempt</p>
                        </div>
                        <div>
                            <p className="font-header text-lg text-primary">{assesment.maxAttempts} attempts</p>
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
                                    sections={[{ value: progressPercent, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                    rootColor="hsl(210, 14%, 83%)" // Darker blue track
                                    />
                                    <p className='font-header'>{progressPercent}%</p>
                                </div>
                                <p className="font-text text-unactive text-xs">Assessment Progress</p>
                            </div> : null
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className={`w-fit py-3 px-5 bg-primary rounded-md shadow-md flex flex-col items-center justify-center transition-all ease-in-out hover:cursor-pointer ${attemptHistory.length >= assesment.maxAttempts ? "opacity-50 cursor-not-allowed":"hover:bg-primaryhover"}`}
                        onClick={()=>{
                            if(attemptHistory.length >= assesment.maxAttempts) return
                            startAssesment()
                        }}>
                            <p className="font-header text-white text-sm">
                                {
                                    quizState === "start" ? "Start Assesment" : "Resume Assesment"
                                }
                            </p>
                        </div>
                        {
                            attemptHistory.length >= assesment.maxAttempts &&
                            <div className="py-2 font-text text-unactive text-xs">
                                <p>All attempt is used!</p>
                            </div>
                        }
                    </div>
                </div>
                </> : quizState === "on-going"  ||  quizState === "review" ? <>
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
                                <p className="font-text text-xs">Time Left:</p>
                                <p className="font-header text-lg text-primary">{formatTime(timeleft)} <span className="text-unactive font-text text-xs">minutes Left</span></p>
                            </div>

                        </div>
                        <div className="flex flex-col justify-center items-center whitespace-nowrap">
                            <p className='font-text text-xs'>Attempt:</p>
                            <p className='font-header text-lg text-primary'>{currentAttempt.attempt} <span className="font-text text-xs text-unactive">out of</span> 4 <span className="font-text text-xs text-unactive">max Attempt</span></p>

                        </div>
                        <div className="flex flex-row justify-end gap-2 pr-4 w-full">
                            <div className="flex flex-col items-end justify-end">
                                <p className='font-text text-xs'>Assessment Progress</p>
                                <p className='font-header'>{progressPercent}%</p>
                            </div>
                            <RingProgress
                                size={35} // Diameter of the ring
                                roundCaps
                                thickness={4} // Thickness of the progress bar
                                sections={[{ value: progressPercent, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                rootColor="hsl(210, 14%, 83%)" // Darker blue track
                            />
                        </div>
                    </div>

                    {
                        quizState === "review" ?
                        <>
                            <div className="grid grid-cols-1 grid-rows-[min-content_1fr] gap-2 h-full pr-4">
                                <div className="">
                                    <p className="font-header text-primary text-lg">Review</p>
                                    <p className="font-text text-xs text-unactive">Review your answer in the assessment before submitting the given attempt</p>
                                </div>
                                <ScrollArea className="h-[calc(100vh-23rem)] bg-white w-full rounded-md shadow-md border border-unactive">
                                    {
                                        assessment.assesmentItems.map((item, index) => (
                                            <div key={index} className="p-5">
                                                <CourseAssesmentItem assesmentItem={item} active={index} assesmentItems={assessment.assesmentItems.length} usedFor={"review"} currentAttempt={currentAttempt}/>
                                            </div>
                                        ))
                                    }
                                </ScrollArea>
                            </div>
                        </> :
                        <div className="p-10 pr-14">
                            <CourseAssesmentItem assesmentItem={assessment.assesmentItems[active]} active={active} assesmentItems={assessment.assesmentItems.length} handleAnswer={handleAnswer} currentAttempt={currentAttempt}/>
                        </div>
                    }

                    <div className="flex flex-row items-center justify-between pr-4 py-2">
                        <div className="w-32 h-10 border-2 border-primary rounded-md flex justify-center items-center font-header text-primary transition-all ease-in-out shadow-md gap-2 hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer"
                            onClick={() => {back()}}>
                            <FontAwesomeIcon icon={faCircleChevronLeft}/>
                            <p>Previous</p>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-x-1">
                            {
                                Array.from({length: assessment.assesmentItems.length}).map((i,_)=>{
                                    const qId = assessment.assesmentItems[_].id
                                    const isDone = progress.includes(qId);

                                    return <div key={_} className={`w-2 h-2 rounded-full ${isDone ? 'bg-primary':"bg-unactive"}`}/>
                                })
                            }
                        </div>
                        <div className="w-32 h-10 border-2 border-primary rounded-md flex justify-center items-center font-header text-primary transition-all ease-in-out shadow-md gap-2 hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer"
                            onClick={()=>{
                                if(quizState === "review")
                                {
                                    handleResult()
                                }
                                next()
                            }}>
                            <p>{
                                quizState === "on-going" ? "Next" : "Submit"
                            }</p>
                            <FontAwesomeIcon icon={faCircleChevronRight} />
                        </div>
                    </div>
                </div>
                </> : quizState === "complete" ? <>
                <div className="flex flex-row items-center justify-center col-start-1 row-start-2 row-span-2 gap-5">
                    <div className="space-y-2">
                        <CircleChart label="Assesment Performance" size={200}  type="finished" value={attemptResult.percentage}/>
                        <div className="flex flex-col items-center justify-center">
                            <p className={`font-header text-3xl ${attemptResult.percentage >= assesment.passing ? "text-primary":"text-red-700"}`}>
                                {
                                    attemptResult.percentage >= assesment.passing ?
                                    "Passed!"
                                    : "Failed"
                                }
                            </p>
                            <p className="font-text text-unactive text-xs">Remarks</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-[min-content_1fr_min-content] gap-x-10 gap-y-2">
                        <div className="col-span-3">
                            <p className="font-header text-primary text-2xl">Course Assessment Result</p>
                            <p className="font-text text-xs text-unactive">Assessment attempt result report</p>
                        </div>

                        <div className="py-2">
                            <p className="font-header text-xl text-primary">{attemptResult.score} out of {assessment.assesmentItems.length}</p>
                            <p className="font-text text-unactive text-xs">Total Assessment Score</p>
                        </div>

                        <div className="py-2">
                            <p className="font-header text-xl text-primary">{currentAttempt.attempt} attempt</p>
                            <p className="font-text text-unactive text-xs">Current Attempt</p>
                        </div>

                        <div className="py-2">
                            <p className="font-header text-xl text-primary">{
                                elaspedTime < 60 ?
                                    elaspedTime !== 1 ?
                                    elaspedTime + " seconds":
                                    elaspedTime + " second"
                                : formatTime(elaspedTime) + "minutes"
                                }
                            </p>
                            <p className="font-text text-unactive text-xs">Attempt Duration</p>
                        </div>

                        <div className="flex flex-row items-start justify-center gap-2 py-2 col-span-3">
                            <div className="border-2 border-primary rounded-md w-full h-fit py-2 bg-white shadow-md flex items-center justify-center text-primary hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out"
                                onClick={()=>{setQuizState("attemptReview")}}>
                                <p className="font-header">Review Attempt</p>
                            </div>
                            <div className="w-full flex flex-col items-center justify-center">
                                <div className="mb-2 border-2 border-primary rounded-md w-full h-full py-2 bg-primary shadow-md flex items-center justify-center text-white hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out"
                                    onClick={()=>{
                                                setQuizState("start"),
                                                setActive(0),
                                                setProgress([])
                                            }}>
                                    <p className="font-header">Try Again</p>
                                </div>
                                <p className="font-text text-xs text-unactive">{( assesment.maxAttempts - attemptHistory.length)} attempts left
                                    {
                                        //Attempts left
                                    }
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                </> : quizState === "attemptReview" ? <>
                <div className="grid grid-rows-[min-content_1fr_min-content] w-full h-full">
                    <div className="flex flex-row items-center justify-between py-2 pr-4">
                        <div className="flex flex-row items-center gap-2 ">
                            <div className="overflow-visible relative border-primary border-2 w-10 h-10 bg-white shadow-md rounded-md flex items-center justify-center text-primary hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out"
                                onClick={()=>{setQuizState("complete")}}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </div>
                            <div>
                                <p className="font-header text-primary">Review Attempt</p>
                                <p className="font-text text-unactive text-xs">Quick summary of your current attempt</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-end gap-7">
                            <div className="flex flex-col items-end">
                                <p className="font-text text-unactive text-xs">Attempt Duration</p>
                                <p className="font-header">{
                                elaspedTime < 60 ?
                                    elaspedTime !== 1 ?
                                    elaspedTime + " seconds":
                                    elaspedTime + " second"
                                : formatTime(elaspedTime) + " minutes"
                                }</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="font-text text-unactive text-xs">Current Attempt</p>
                                <p className="font-header">{currentAttempt.attempt} attempt</p>
                            </div>
                            <div className="flex flex-row items-center justify-center gap-2">
                                <div className="flex flex-col items-end">
                                    <p className="font-text text-unactive text-xs">Total Assessment Score</p>
                                    <p className="font-header">1 out of {assessment.assesmentItems.length}</p>
                                </div>
                                <RingProgress
                                    size={35} // Diameter of the ring
                                    roundCaps
                                    thickness={4} // Thickness of the progress bar
                                    sections={[{ value: 10, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                    rootColor="hsl(210, 14%, 83%)" // Darker blue track
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="pr-4 py-2">
                        <ScrollArea className="h-[calc(100vh-20.70rem)] bg-white w-full rounded-md shadow-md border border-unactive">
                            {
                                assessment.assesmentItems.map((item, index) => (
                                    <div key={index} className="p-5">
                                        <CourseAssesmentItem assesmentItem={item} active={index} assesmentItems={assessment.assesmentItems.length} usedFor={"review"} currentAttempt={currentAttempt}/>
                                    </div>
                                ))
                            }
                        </ScrollArea>
                    </div>
                    <div className="flex flex-row items-center justify-between pr-4 py-2">
                        <div className="w-32 h-10 border-2 border-primary rounded-md flex justify-center items-center font-header text-primary transition-all ease-in-out shadow-md gap-2 hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer">
                            <FontAwesomeIcon icon={faCircleChevronLeft}/>
                            <p>Previous</p>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-x-1">
                            {/* {
                                Array.from({length: assessment.assesmentItems.length}).map((i,_)=>{
                                    const qId = assessment.assesmentItems[_].id
                                    const isDone = progress.includes(qId);

                                    return <div key={_} className={`w-2 h-2 rounded-full ${isDone ? 'bg-primary':"bg-unactive"}`}/>
                                })
                            } */}
                        </div>
                        <div className="w-32 h-10 border-2 border-primary rounded-md flex justify-center items-center font-header text-primary transition-all ease-in-out shadow-md gap-2 hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer">
                            {/* <p>{
                                quizState === "on-going" ? "Next" : "Submit"
                            }</p> */}
                            <p>Next</p>
                            <FontAwesomeIcon icon={faCircleChevronRight} />
                        </div>
                    </div>
                </div>
                </>:null
            }
        </div>
    )
}
export default CourseAssesment
