import { faCircleCheck as faCircleCheckRegular, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import CourseOverview from "../modalsandprops/courseComponents/CourseOverview";
import CourseText from "../modalsandprops/courseComponents/courseText";
import CourseVideo from "../modalsandprops/courseComponents/courseVideo";
import { faBackward, faBook, faCircleChevronLeft, faCircleChevronRight, faForward } from "@fortawesome/free-solid-svg-icons";
import { Step, Stepper, StepperCompleted, useStepper } from "../components/ui/courseStepper";
import { ScrollArea } from "../components/ui/scroll-area";
import CourseAssesment from "./courseComponents/courseAssesment";

const CourseModuleProps = () => {
    const stepperRef = useRef();
    const [activeStepMeta, setActiveMeta] = useState({title: "", desc: ""})
    return (
        <>
    <div className="grid grid-cols-[20rem_1fr] grid-rows-[min-content_auto] h-full ">

        {/* Left Sidebar */}
        <div className="flex flex-col justify-center py-3 pr-2 border-r border-divider">
            <h1 className="font-header text-primary text-lg">Module Contents</h1>
            <p className="font-text text-unactive text-xs">List of the the available content for the course</p>
        </div>
        <div className="col-start-1 col-span-2 row-start-2">
        <Stepper initialStep={1} enableStepClick={true} ref={stepperRef} onStepChange={(index,meta) => setActiveMeta(meta)}>
            <Step stepTitle={"Course Overview"} stepDesc={"Quick Summary of the course"}>
                <CourseOverview/>
            </Step>
            <Step stepTitle={"Sample Module Content 1"} stepDesc={"Sample Module with text content "}>
                <CourseText/>
            </Step>
            <Step stepTitle={"Sample Module Content 2"} stepDesc={"Sample module with video content"}>
                <CourseVideo/>
            </Step>
            <Step stepTitle={"Course Assesment"} stepDesc={"Sample module with course assessment"}>
                <CourseAssesment/>
            </Step>
            <StepperCompleted>
                <div className="text-center mt-10">
                <h1 className="text-xl font-bold text-primary">Congratualtions!</h1>
                <p className="text-unactive mt-2">You have Completed the Course</p>
                </div>
            </StepperCompleted>
        </Stepper>
        </div>

        {/* Module Navigation */}
        <div className="flex flex-row justify-between items-center w-full py-1 pl-2">
            <div className="group h-fit px-5 py-2 border-primary border-2 rounded-md shadow-md flex flex-row justify-center items-center bg-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out gap-2"
                onClick={()=> stepperRef.current?.back()}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className="text-primary group-hover:text-white"/>
                <p className="font-header text-sm text-primary group-hover:text-white">BACK</p>
            </div>
            <div>
                <p className="font-header text-primary">
                    {activeStepMeta?.title}
                </p>
            </div>
            <div className="group h-fit py-2 px-5 border-primary border-2 rounded-md shadow-md flex flex-row  justify-center items-center bg-white hover:bg-primary transition-all ease-in-out gap-2 hover:cursor-pointer"
                onClick={()=> stepperRef.current?.next()}>
                <p className="font-header text-sm text-primary group-hover:text-white">NEXT</p>
                <FontAwesomeIcon icon={faCircleChevronRight} className="text-primary group-hover:text-white"/>
            </div>
        </div>
    </div>
  </>

    );
};

export default CourseModuleProps;
