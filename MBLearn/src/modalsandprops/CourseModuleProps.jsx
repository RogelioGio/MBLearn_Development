import { faCircleCheck as faCircleCheckRegular, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stepper } from "@mantine/core";
import React, { useState } from "react";
import CourseOverview from "../modalsandprops/courseComponents/CourseOverview";
import CourseText from "../modalsandprops/courseComponents/courseText";
import CourseVideo from "../modalsandprops/courseComponents/courseVideo";
import { faBackward, faBook, faForward } from "@fortawesome/free-solid-svg-icons";

const CourseModuleProps = () => {
    const [step, setStep] = useState(0);

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 4)); // Ensure it doesn't exceed the last step index (4)
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 0)); // Ensure it doesn't go below 0
    };

    return (
        <>
            <div className="grid grid-cols-[auto_1fr] grid-rows-1">
                {/* Course Sidebar */}
                <div className="my-2 border-r border-r-divider">
                    {/* Header */}
                    <div className="py-3 px-5">
                        <p className="font-header text-primary">Module content</p>
                    </div>
                    {/* Module List */}
                    <div className="py-3 px-5">
                        <Stepper
                            orientation="vertical"
                            active={step}
                            onStepClick={setStep}
                            classNames={{
                                step: "transition-all duration-300 !py-2",
                                stepIcon: "!border-primary",
                                stepCompletedIcon: "!bg-primary !rounded-full !border-primary !border-2",
                                content: "!pt-0",
                                verticalSeparator: "!border-primary !border !my-0 !h-full",
                            }}
                            completedIcon={<FontAwesomeIcon icon={faCircleCheckRegular} className="!text-white" />}
                        >
                            <Stepper.Step label="Course Overview" description="Course Description and expected outcome"
                            icon={<FontAwesomeIcon icon={faBook} className="!text-primary" />}
                            />
                            <Stepper.Step label="Module 1" description="Text Module with links attachment" icon={1} />
                            <Stepper.Step label="Module 2" description="Video Module with links attachment" icon={2} />
                            <Stepper.Step label="Module 3" description="Slide Show with downloadable attachment" icon={3} />
                            <Stepper.Step label="Assessment" description="Sample Assessment Module" icon={<FontAwesomeIcon icon={faSquareCheck} className="!text-primary" />} />

                            <style>
                                {`
                                .mantine-Stepper-step[data-active="true"] .mantine-Stepper-stepLabel {
                                    font-weight: bold; /* Make text bolder */
                                    color: #3498db; /* Change the color */
                                }
                                `}
                            </style>
                        </Stepper>
                    </div>
                </div>

                <div className="w-full grid grid-cols-3 grid-rows-[auto_1fr] col-start-2 col-span-3 px-5">
                {/* Navigation */}
                <div className="col-span-3 flex flex-row justify-between p-1 font-header text-primary">
                    <div className="py-1 px-4 border-2 border-primary rounded-md hover:scale-105 transition-all ease-in-out hover:cursor-pointer hover:bg-primary hover:text-white flex items-center gap-2"
                        onClick={prevStep}>
                        <FontAwesomeIcon icon={faBackward} className="text-sm" />
                        <p>Back</p>
                    </div>
                    <p className="py-2">Module Name</p>
                    <div className="py-1 px-4 border-2 border-primary rounded-md hover:scale-105 transition-all ease-in-out hover:cursor-pointer hover:bg-primary hover:text-white flex items-center gap-2"
                        onClick={nextStep}>
                        <FontAwesomeIcon icon={faForward} className="text-sm" />
                        <p>Next</p>
                    </div>
                </div>

                <div className="w-full h-full col-span-3 row-span-1 p-3 pb-5 overflow-hidden flex flex-col">
                    {
                        step === 0 ? (
                            <CourseOverview />
                        ) : step === 1 ? (
                            <CourseText />
                        ) : step === 2 ? (
                            <CourseVideo />
                        ) : null
                    }
                </div>

            </div>
            </div>
        </>
    );
};

export default CourseModuleProps;
