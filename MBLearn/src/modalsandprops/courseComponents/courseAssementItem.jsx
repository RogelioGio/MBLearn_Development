import { ScrollArea } from "MBLearn/src/components/ui/scroll-area"
import { useEffect } from "react";

const CourseAssesmentItem = ({assesmentItem, active, usedTo, assesmentItems, usedFor, handleAnswer, currentAttempt}) => {


    const selected = currentAttempt?.assesmentAnswers?.find(e => e.questionId === assesmentItem.id)?.answer;


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
            {
                assesmentItem.questionType === "trueOrfalse" ?
                <div className={`flex items-center justify-between gap-x-2 ${usedFor === "review" ? "py-2": ""}`}>
                    <div className={`flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out
                                    ${selected === "true" ? "bg-primary text-white" : "bg-white text-primary"}
                                    ${usedFor === "review" ? "p-2 text-sm" : "p-4 text-lg"}`}
                                    onClick={() => {
                                        if(usedFor === "review") return
                                        handleAnswer("true", assesmentItem.id)
                                    }}>
                        <p>True</p>
                    </div>
                    <div className={`flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out
                                    ${selected === "false" ? "bg-primary text-white" : "bg-white text-primary"}
                                    ${usedFor === "review" ? "p-2 text-sm" : "p-4 text-lg"}`}
                                    onClick={() => {
                                        if(usedFor === "review") return
                                        handleAnswer("false", assesmentItem.id)
                                    }}>
                        <p>False</p>
                    </div>
                </div>
                : assesmentItem.questionType === "multipleChoice" ?
                <div className={`grid grid-cols-2 grid-rows-2 items-center justify-between gap-2 ${usedFor === "review" ? "py-2": ""}`}>
                        {
                            assesmentItem.choices.map((i) => (
                                <div key={i.name} className={`flex items-center text-primary justify-center w-full font-header border-2 border-primary rounded-md p-2 shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer transition-all ease-in-out
                                                ${selected === i.value ? "bg-primary text-white" : "bg-white text-primary"}
                                                ${usedFor === "review" ? "text-sm" : "text-lg"}`}
                                                onClick={() => {
                                                    if(usedFor === "review") return
                                                    handleAnswer(i.value, assesmentItem.id)
                                                }}>
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
