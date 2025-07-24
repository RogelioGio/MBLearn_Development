import { ScrollArea } from "MBLearn/src/components/ui/scroll-area"

const CourseAssesmentItem = ({assesmentItem, active, usedTo, assesmentItems, usedFor}) => {
    const renderReview = []

    // console.log(assesmentItem.assesmentItems)

    const content = (assesmentItemType) => {
        if(assesmentItemType === "trueOrfalse"){
            return(
                <div className="grid gird-cols-1 grid-rows-[min-content_1fr_min-content] gap-2 h-full">
                    <div className="flex items-center justify-between">
                        <p className={ `font-header text-primary ${usedFor === "review" ? "text-sm":"text-lg"}`}>Question {active + 1}</p>
                        <p className={`font-text text-unactive text-sm ${usedFor === "review" ? "hidden":"block"}`}>{active + 1}/{assesmentItems}</p>
                    </div>
                    <div>
                        <p className={`font-text ${usedFor === "review" ? "text-sm":"text-base"}`}>
                            {assesmentItem.question}
                        </p>
                    </div>
                    <div className="flex items-center justify-between gap-x-2">
                        <div className={`flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md bg-white shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out
                                        ${usedFor === "review" ? "p-2 text-sm" : "p-4 text-lg"}`}>
                            <p>True</p>
                        </div>
                        <div className={`flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md bg-white shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out
                                        ${usedFor === "review" ? "p-2 text-sm" : "p-4 text-lg"}`}>
                            <p>False</p>
                        </div>
                    </div>
                </div>
            )
        } else if(assesmentItemType === "multipleChoice") {
            return(
                <div className="grid gird-cols-1 grid-rows-[min-content_1fr_min-content] gap-2 h-full">
                    <div className="flex items-center justify-between">
                        <p className="font-header text-primary text-lg">Question {active + 1}</p>
                        <p className="font-text text-sm text-unactive">{active + 1}/{assesmentItems}</p>
                    </div>
                    <div>
                        <p className="font-text ">
                            {assesmentItem.question}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 items-center justify-between gap-2">
                        {/* <div className="text-lg flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md p-4 bg-white shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out">
                            <p>True</p>
                        </div>
                        <div className="text-lg flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md p-4 bg-white shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out">
                            <p>False</p>
                        </div> */}
                        {
                            assesmentItem.choices.map((i) => (
                                <div className="flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md p-2 bg-white shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out">
                                    <p>{i.name}</p>
                                </div>
                            ))
                        }

                    </div>
                </div>
                // <div className="grid grid-cols-2 grid-rows-2 gap-2">
                //             {
                //                 assesmentItem.choices.map((i) => (
                //                     <div className=" group flex items-center justify-center w-full h-full py-2 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out">
                //                         <p className="group-hover:text-white font-header text-primary">{i.name}</p>
                //                     </div>
                //                 ))
                //             }
                //         </div>
            )
        }
    }

    const review = (assesmentItemType, item, index) => {
        if(assesmentItemType === "trueOrfalse"){
            return(
                <div className="flex flex-col justify-between border-2 border-primary rounded-md p-4 bg-white shadow-md h-full">
                     {/* Question */}
                        <div>
                            <p className="font-header text-primary">Question {index+1}</p>
                            <p className="font-text text-sm">
                                {item.question}
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
            )
        } else if(assesmentItemType === "multipleChoice") {
            return(
                <div className="flex flex-col justify-between border-2 border-primary rounded-md p-4 bg-white shadow-md h-full">
                     {/* Question */}
                        <div>
                            <p className="font-header text-primary">Question {index+1}</p>
                            <p className="font-text text-sm">
                                {item.question}
                            </p>
                        </div>
                        {/* Answers */}
                        <div className="grid grid-cols-2 grid-rows-2 gap-2">
                            {
                                item.choices.map((i) => (
                                    <div className=" group flex items-center justify-center w-full h-full py-2 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out">
                                        <p className="group-hover:text-white font-header text-primary">{i.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                </div>
            )
        }
    }



    return(
        //content(assesmentItem?.questionType)
        <div className="grid gird-cols-1 grid-rows-[min-content_1fr_min-content] gap-2 h-full">
            <div className="flex items-center justify-between">
                <p className={ `font-header text-primary ${usedFor === "review" ? "text-sm":"text-lg"}`}>Question {active + 1}</p>
                <p className={`font-text text-unactive text-sm ${usedFor === "review" ? "hidden":"block"}`}>{active + 1}/{assesmentItems}</p>
            </div>
            <div>
                <p className={`font-text ${usedFor === "review" ? "text-sm":"text-base"}`}>
                    {assesmentItem.question}
                </p>
            </div>
            {
                assesmentItem.questionType === "trueOrfalse" ?
                <div className={`flex items-center justify-between gap-x-2 ${usedFor === "review" ? "py-2": ""}`}>
                    <div className={`flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md bg-white shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out
                                    ${usedFor === "review" ? "p-2 text-sm" : "p-4 text-lg"}`}>
                        <p>True</p>
                    </div>
                    <div className={`flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md bg-white shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out
                                    ${usedFor === "review" ? "p-2 text-sm" : "p-4 text-lg"}`}>
                        <p>False</p>
                    </div>
                </div>
                : assesmentItem.questionType === "multipleChoice" ?
                <div className={`grid grid-cols-2 grid-rows-2 items-center justify-between gap-2 ${usedFor === "review" ? "py-2": ""}`}>
                        {
                            assesmentItem.choices.map((i) => (
                                <div className={`flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md p-2 bg-white shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out
                                                ${usedFor === "review" ? "text-sm" : "text-lg"}`}>
                                    <p>{i.name}</p>
                                </div>
                            ))
                        }
                </div>
                : null
            }

        </div>
    )
}
export default CourseAssesmentItem
