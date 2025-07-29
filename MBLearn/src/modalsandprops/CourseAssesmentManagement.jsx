import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import { Switch } from "../components/ui/switch";
import CourseAssesmentManagementItems from "./CourseAssesmentManagementItems";


const _assessment =
    {
        passing: 75,
        timeLimit: 300, // in seconds
        maxAttempts: 4,
        assesmentItems: [
            {
                id: 1,
                questionType: "trueOrfalse",
                question: "Capital Gains Tax is imposed on profits made from the sale of income-generating properties only",
                answerKey: "true",
                points: 1,
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
                points: 1,
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
                points: 1,
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
                points: 5,
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

const CourseAssesmentManagement = ({}) => {
    const [assessment, setAssesment] = useState(_assessment);
    const [showAnswerKey, setShowAnswerKey] = useState(false);

    const formatTime = (second) => {
        const m = Math.floor(second / 60);
        const s = second % 60;

        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    // useEffect(() => {
    //     console.log("Anskey toggled:", showAnswerKey);
    // }, [showAnswerKey]);

    // Setting must includes:
    // - Passing Average - toggle and perccentage
    // - Time Limit - toggle and time in must be in selector and have max
    // - Max Attempts - toggle and number of attempts or unlimited
    // - Shows Attempts History - toggle and show history of attempts
    // - Show Answer Key - toggle and show answer key when the attempt history is toggled

    return (
        <div className="grid grid-cols-1 grid-rows-[min-content_min-content-1fr] h-full">
            {/* Header */}
            <div className="py-2 flex items-center gap-x-2">
                    <div className="group">
                        <div className="min-h-10 h-10 w-10 rounded-md border-primary border-2 bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all ease-in-out cursor-pointer">
                            <FontAwesomeIcon icon={faSliders}/>
                        </div>
                        <div className="w-fit mt-1 absolute whitespace-nowrap bg-tertiary rounded-md text-white font-text text-xs p-2 items-center justify-center text-center scale-0 group-hover:scale-100 block transition-all ease-in-out">
                            <p>Course Assesment Setting</p>
                        </div>
                    </div>
                <div className="flex flex-row justify-between w-full">
                    <div className="w-full whitespace-nowrap">
                        <p className="text-xs font-text text-unactive">Total Questions:</p>
                        <p className="font-header text-primary">{assessment.assesmentItems.length} {assessment.assesmentItems.length === 1 ? "Question" : "Questions" }</p>
                    </div>
                    <div className="w-full whitespace-nowrap">
                        <p className="text-xs font-text text-unactive">Total Points:</p>
                        <p className="font-header text-primary">{assessment.assesmentItems.reduce((acc, i) => acc + i.points,0)} {assessment.assesmentItems.reduce((acc, i) => acc + i.points,0) === 1 ? "Point" : "Points" }</p>

                    </div>
                    <div className="w-full whitespace-nowrap">
                        <p className="text-xs font-text text-unactive">Passing Average:</p>
                        <p className="font-header text-primary">{assessment.passing}%</p>
                    </div>
                    <div className="w-full whitespace-nowrap">
                        <p className="text-xs font-text text-unactive">Max Attempt:</p>
                        <p className="font-header text-primary">{assessment.maxAttempts} {assessment.maxAttempts === 1 ? "Attempt" : "Attempts"}</p>

                    </div>
                    <div className="w-full whitespace-nowrap">
                        <p className="text-xs font-text text-unactive">Time Limit:</p>
                        <p className="font-header text-primary">{formatTime(assessment.timeLimit)} {assessment.timeLimit === 60 ? "minute" : assessment.timeLimit < 60 ? "second" : "minutes"}</p>
                    </div>
                </div>
            </div>
            {/* Toggle Answer key */}
            <div className="flex items-center justify-between py-2 font-text text-unactive text-xs">
                <p className="text-sm font-header text-primary">Assesment Items</p>
                <div className="flex items-center gap-x-2">
                    <p>Toggle Answer Keys</p>
                    <div>
                        <Switch id="showAnswerKey" checked={showAnswerKey} onCheckedChange={setShowAnswerKey}/>
                    </div>
                </div>
            </div>
            {/* Content */}
            <ScrollArea className="h-[calc(100vh-22rem)] pr-5 rounded-md bg-white shadow-md border-divider border">
                <div className="p-4 pr-0 flex-col gap-y-2 flex items-center justify-center h-full">
                    {assessment.assesmentItems.map((item, index) => (
                        <CourseAssesmentManagementItems key={index} item={item} index={assessment.assesmentItems.findIndex(entry => entry.id === item.id)} show={showAnswerKey}/>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default CourseAssesmentManagement;
