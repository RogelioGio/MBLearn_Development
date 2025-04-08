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
    <div className="grid grid-cols-[20rem_1fr] grid-rows-[3rem_auto] pr-5 pb-5 ">

        {/* Left Sidebar */}
        <div className="flex flex-col justify-center">
            <h1 className="font-header text-primary text-lg">Module Contents</h1>
            <p className="font-text text-unactive text-xs">List of the the available content for the course</p>
        </div>

        {/* Module Navigation */}
        <div className="flex flex-row justify-between items-center w-full py-1">
            <div className="group h-full px-5 border-primary border-2 rounded-md shadow-md flex flex-col justify-center bg-white hover:bg-primary transition-all ease-in-out">
                <p className="font-header text-sm text-primary group-hover:text-white">BACK</p>
            </div>
            <div>
                <p className="font-header text-primary">
                    Module Content Name
                </p>
            </div>
            <div className=" group h-full px-5 border-primary border-2 rounded-md shadow-md flex flex-col justify-center bg-white hover:bg-primary transition-all ease-in-out">
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
