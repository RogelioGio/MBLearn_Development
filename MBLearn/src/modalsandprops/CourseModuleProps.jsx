
import { faCircleCheck as faCircleCheckRegular, faCircleLeft as faCircleLeftRegular } from "@fortawesome/free-regular-svg-icons"
import { faArrowDownShortWide, faArrowDownZA, faArrowLeft, faArrowUpAZ, faArrowUpWideShort, faBook, faCakeCandles, faGraduationCap, faPenToSquare, faSort, faSquareCheck, faTrash, faUser, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Stepper } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { ContextProvider, useStateContext } from "../contexts/ContextProvider"
import CourseOverview from "../modalsandprops/courseComponents/CourseOverview"
import CourseText from "../modalsandprops/courseComponents/courseText"
import CourseVideo from "../modalsandprops/courseComponents/courseVideo"

const CourseModuleProps = () => {
    const [step, setStep] = useState(0)

    return(
        <>
            {
                step === 0 ? (
                    <CourseOverview/>
                ) : step === 1 ? (
                    <CourseText/>
                ) : step === 2 ? (
                    <CourseVideo/>
                ) : (null)
            }

            {/* Course Sidebar */}
            <div className="row-start-3 col-start-4 my-2 border-l border-l-divider">
                {/* Header */}
                <div className="py-3 px-5">
                    <p className="font-header text-primary">Module conntent</p>
                </div>
                {/* Module List */}
                <div className="py-3 px-5">
                    <Stepper orientation="vertical"
                    active={step}
                    onStepClick={setStep}
                    classNames={{
                                step: "transition-all duration-300 !py-2",
                                stepIcon: "!border-primary",
                                stepCompletedIcon: "!bg-primary !rounded-full !border-primary !border-2",
                                content: "!pt-0",
                                verticalSeparator: "!border-primary !border !my-0 !h-full"
                            }}
                    completedIcon={<FontAwesomeIcon icon={faCircleCheckRegular} className="!text-white"/>}>
                    <Stepper.Step label="Course Overview" description="Course Description and expected outcome" icon={<FontAwesomeIcon icon={faBook} className="!text-primary"/>}/>
                    <Stepper.Step label="Module 1" description="Text Module with links attachment"  icon={1}/>
                    <Stepper.Step label="Module 2" description="Video Module with links attacment" icon={2}/>
                    <Stepper.Step label="Module 3" description="Slide Show with downloadable attachment" icon={3}/>
                    <Stepper.Step label="Assesment" description="Sample Assesment Module" icon={<FontAwesomeIcon icon={faSquareCheck} className="!text-primary"/>}/>
                    </Stepper>
                </div>
            </div>
        </>
    );
}
export default CourseModuleProps
