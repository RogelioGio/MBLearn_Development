import { faCircleCheck as faCircleCheckRegular, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import CourseOverview from "../modalsandprops/courseComponents/CourseOverview";
import CourseText from "../modalsandprops/courseComponents/courseText";
import CourseVideo from "../modalsandprops/courseComponents/courseVideo";
import { faBackward, faBook, faForward } from "@fortawesome/free-solid-svg-icons";
import { Step, Stepper, StepperCompleted, useStepper } from "../components/ui/courseStepper";

const CourseModuleProps = () => {
    const stepperRef = useRef();

    const nextStep = () => {

    };

    const prevStep = () => {

    };

    return (
        <>
    <div className="grid grid-cols-[20rem_1fr] grid-rows-[3rem_auto] pr-5 pb-5 ">

        {/* Left Sidebar */}
        <div className="flex flex-col justify-center">
            <h1 className="font-header text-primary text-lg">Module Contents</h1>
            <p className="font-text text-unactive text-xs">List of the the available content for the course</p>
        </div>
        <div className="col-start-1 row-start-2 py-4 px-2">
        <Stepper initialStep={1} enableStepClick={true} ref={stepperRef}>
            <Step stepTitle={"Step 1"} stepDesc={"Step Description"}>
                <div>Step 1 Content</div>
            </Step>
            <Step stepTitle={"Step 2"} stepDesc={"Step Description"}>
                <div>Step 2 Content</div>
            </Step>
            <Step stepTitle={"Step 3"} stepDesc={"Step Description"}>
                <div>Step 3 Content</div>
            </Step>
        </Stepper>
        </div>

        {/* Module Navigation */}
        <div className="flex flex-row justify-between items-center w-full py-1">
            <div className="group h-full px-5 border-primary border-2 rounded-md shadow-md flex flex-col justify-center bg-white hover:bg-primary transition-all ease-in-out"
                onClick={()=> stepperRef.current?.back()}>
                <p className="font-header text-sm text-primary group-hover:text-white">BACK</p>
            </div>
            <div>
                <p className="font-header text-primary">
                    Module Content Name
                </p>
            </div>
            <div className=" group h-full px-5 border-primary border-2 rounded-md shadow-md flex flex-col justify-center bg-white hover:bg-primary transition-all ease-in-out"
                onClick={()=> stepperRef.current?.next()}>
                <p className="font-header text-sm text-primary group-hover:text-white">NEXT</p>
            </div>
        </div>

      {/* Main Content */}
      <div className="bg-white p-4 overflow-y-auto h-[calc(100vh-14rem)] col-span-2  col-start-2 row-start-2">
        <p className="mb-4">Main content</p>
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>Main item {i + 1}</p>
        ))}
      </div>
    </div>
  </>

    );
};

export default CourseModuleProps;
