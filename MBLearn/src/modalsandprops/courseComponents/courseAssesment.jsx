import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Progress } from "MBLearn/src/components/ui/progress"


const CourseAssesment = ({course}) => {
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
        <div className="py-5 h-[calc(100vh-12.25rem)] grid grid-cols-1 grid-rows-[min-content_1fr_min-content]">
            {/* Starting entry */}
            {/* <div className="">
                <div className="flex flex-col items-center gap-2 mb-5">
                    <div className="flex flex-col items-center">
                        <p className="font-text text-primary text-xs">{course.name}</p>
                        <p className="font-header text-primary text-3xl">Course Assesment</p>
                    </div>
                    <p className="font-text text-sm">
                        This is a sample course assesment. Please answer the following questions to the best of your ability.
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className="font-text text-sm">Number of Attempt: <span className="font-header text-primary text-lg">1</span></p>
                        <p className="font-text text-sm">Max Attempt: <span className="font-header text-primary text-lg">1</span></p>
                    </div>
                    <div className="font-header text-primary border-primary border-2 rounded-md shadow-md py-2 px-5 hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out">
                        Take an Assement
                    </div>
                </div>
            </div> */}
            {/* Quiz Premise */}
            {/* Quiz Header */}
            {/* <div className="grid grid-cols-4">
                <div className="flex flex-col py-2 col-span-2">
                    <p className="text-primary font-header leading-none">{course.name}</p>
                    <p className="text-xs font-text text-unactive">Course Assesment</p>
                </div>
                <div className="col-start-4 flex flex-col justify-center gap-1">
                    <div className="flex font-text text-unactive text-sm justify-between">
                        <p>Progress</p>
                        <p>10%</p>
                    </div>
                    <Progress value={10}/>
                </div>
            </div> */}
            {/* Quiz Content */}
            {/* <div>
                <div className="flex flex-col gap-10 border-2 border-primary rounded-md p-4 bg-white shadow-md">
                     Question
                        <div>
                            <p className="font-header text-primary">Question 1: (True or False)</p>
                            <p className="font-text text-sm">
                                Capital Gains Tax is imposed on profits made from the sale of income-generating properties only.
                            </p>
                        </div>
                     Answers
                        <div className="grid grid-cols-2 gap-2">
                        <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out">
                            <p className="group-hover:text-white font-header text-primary">True</p>
                        </div>
                        <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out ">
                            <p className="group-hover:text-white font-header text-primary">False</p>
                        </div>
                        </div>
                    </div>
            </div> */}
            {/* Quiz Navigation */}
            {/* <div className="flex flex-row justify-between">
                <div className="h-10 w-10 bg-white border-2 border-primary rounded-md shadow-md flex items-center justify-center text-primary hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out">
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </div>
                Quiz Lenght
                <div className="flex flex-row gap-2 items-center">
                    {Array.from({length: 10}).map((i)=>(
                        <div className="h-2 w-2 rounded-full bg-unactive"/>
                    ))}
                </div>
                <div className="h-10 w-10 bg-white border-2 border-primary rounded-md shadow-md flex items-center justify-center text-primary hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out">
                    <FontAwesomeIcon icon={faChevronRight}/>
                </div>
            </div> */}
        </div>
    )
}
export default CourseAssesment
