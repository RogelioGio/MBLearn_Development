import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useContext, useState, useImperativeHandle, forwardRef, useEffect,} from "react";

const AddCourseStepper = createContext();
export const AddCourse = forwardRef(({children, initalStep = 0,},ref)=>{
    const [activeStep, setActiveStep] = useState(initalStep);

    const steps = React.Children.toArray(children).filter(
        (child) => child.type === Step
    );

    const completedStep = React.Children.toArray(children).find(
        (child) => child.type === StepperCompleted
    );

    return (
        <AddCourseStepper.Provider value={{activeStep}}>
            <div className="w-full h-full border-red-500 border-2">
                {steps.map((step, index)=>{
                    return (
                        <div key={index} className={`h-3 w-5 flex flex-col items-center justify-center gap-2 p-4 ${activeStep === index ? "bg-gray-100" : "bg-white"}`}>

                        </div>
                    )
                })}
            </div>
        </AddCourseStepper.Provider>
    )
})
