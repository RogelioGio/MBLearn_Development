import { faChevronLeft, faChevronRight, faPause } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Progress } from "MBLearn/src/components/ui/progress"
import { useEffect, useState } from "react"


const CourseAssesment = ({course}) => {
    const [start, setStart] = useState(false);
    const [timeleft, setTimeleft] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(()=>{
        if(timeleft <= 0 || paused) return

        const timer = setInterval(()=>{
            setTimeleft((prev) => prev - 1)
        },1000);

        return () => clearInterval(timer);

    },[timeleft,paused])

    const formatTime = (second) => {
        const m = Math.floor(second / 60);
        const s = second % 60;

        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    // Sample Quiz Object

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
        <div className="py-5 h-[calc(100vh-12.25rem)] grid grid-cols-1 grid-rows-[min-content_min-content_1fr_min-content] overflow-visible relative">
            {/* Quiz Premise */}
            {
                start ? (
                    <>
                    {/* Quiz Header */}
                        <div className="grid grid-cols-4 overflow-visible">
                            <div className="py-2 flex flex-row items-center gap-2 overflow-visible">
                                <div>
                                    <p className="font-text text-unactive text-xs">Time Left:</p>
                                    <p className="font-header text-lg text-primary">{formatTime(timeleft)} minutes Left</p>
                                </div>
                                <div className="relative inline-block isolate w-fit group"
                                    onClick={()=>{setStart(false),setPaused(true)}}>
                                    <div className="overflow-visible relative border-primary border-2 w-10 h-10 bg-white shadow-md rounded-md flex items-center justify-center text-primary hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out">
                                        <FontAwesomeIcon icon={faPause}/>
                                    </div>
                                    <p className="font-text p-2 text-xs bg-tertiary text-white rounded-sm whitespace-nowrap absolute top-12 transition-all ease-in-out left-1/2 -translate-x-1/2 z-50 shadow-lg scale-0 group-hover:scale-100">Pause Quiz</p>
                                </div>
                            </div>
                            <div className="col-start-4 flex flex-col justify-center gap-1">
                                <div className="flex font-text text-unactive text-sm justify-between">
                                    <p>Progress</p>
                                    <p>10%</p>
                                </div>
                                <Progress value={10}/>
                            </div>
                        </div>
                        <div className="flex flex-col py-5 items-center">
                            <p className="text-primary font-header leading-none">{course.name}</p>
                            <p className="text-xs font-text text-unactive">Course Assesment</p>
                        </div>
                        {/* Quiz Content */}
                        <div>
                            <div className="flex flex-col gap-10 border-2 border-primary rounded-md p-4 bg-white shadow-md">
                                {/* Question */}
                                    <div>
                                        <p className="font-header text-primary">Question 1: (True or False)</p>
                                        <p className="font-text text-sm">
                                            Capital Gains Tax is imposed on profits made from the sale of income-generating properties only.
                                        </p>
                                    </div>
                                {/* Answers */}
                                    <div className="grid grid-cols-2 gap-2">
                                    <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out">
                                        <p className="group-hover:text-white font-header text-primary">True</p>
                                    </div>
                                    <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out ">
                                        <p className="group-hover:text-white font-header text-primary">False</p>
                                    </div>
                                    </div>
                                </div>
                        </div>
                        {/* Quiz Navigation */}
                        <div className="flex flex-row justify-between">
                            <div className="h-10 w-10 bg-white border-2 border-primary rounded-md shadow-md flex items-center justify-center text-primary hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out">
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </div>
                            {/* Quiz Lenght */}
                            <div className="flex flex-row gap-2 items-center">
                                {Array.from({length: 10}).map((i)=>(
                                    <div className="h-2 w-2 rounded-full bg-unactive"/>
                                ))}
                            </div>
                            <div className="h-10 w-10 bg-white border-2 border-primary rounded-md shadow-md flex items-center justify-center text-primary hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out">
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </div>
                        </div>
                    </>
                ) : (
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
                                onClick={()=>{setStart(true); if(!setPaused){setTimeleft(300)} else{setPaused(false)} }}>
                                Take an Assement
                            </div>
                        </div>
                    </div>
                    </>
                )
            }
        </div>
    )
}
export default CourseAssesment
