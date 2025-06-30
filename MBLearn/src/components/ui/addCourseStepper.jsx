import { faCheckCircle, faHelicopterSymbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useContext, useState, useImperativeHandle, forwardRef, useEffect,} from "react";

const AddCourseStepper = createContext();
export const AddCourse = forwardRef(({children, initialStep = 0,formProgress=[], eneableStepClick=false},ref)=>{
    const [activeStep, setActiveStep] = useState(initialStep);

    const steps = React.Children.toArray(children).filter(
        (child) => child.type === Step
    );

    const completedStep = React.Children.toArray(children).find(
        (child) => child.type === StepperCompleted
    );

    const isCompleted = activeStep >= steps.length;

    // Navigations
    useImperativeHandle(ref,()=> ({
        next: () => {
            setActiveStep((prev) => Math.min(prev + 1, steps.length));
        },
        back: () => {
            setActiveStep((prev) => Math.max(prev - 1, 0));
        },
        activeStep,
        stepMeta,
        isCompleted,
    }))

    const stepMeta = steps.map((step) => ({
        title: step.props.stepTitle,
        desc: step.props.stepDesc,
        stepID: step.props.stepID,
        icon: step.props.icon,
    }))

    const setCurrent = () => {
        return formProgress.length
    }
    return (
        <AddCourseStepper.Provider value={{activeStep}}>
            <div className="flex flex-row justify-between gap-x-1
                            ">
                {/* lg:flex
                            hidden */}
                {
                    !isCompleted ? steps.map((step, index) => {
                            const isActive = activeStep === index;
                            const isDone = formProgress.includes(step.props.stepID);
                            const isCurrent = setCurrent() === index;

                            return (
                                <div key={index} className={`group grid rounded-md p-3 ${isActive ? 'shadow-md border-2 border-primary': 'border-2 border-transparent'} ${isCurrent ? 'bg-primarybg':null} hover:border-primary transition-all ease-in-out cursor-pointer hover:shadow-md hover:bg-primarybg
                                                        grid-cols-1 w-fit
                                                        md:grid-cols-[min-content_1fr] md:gap-2 md:w-full`}
                                    onClick={()=>{
                                        if((!isCompleted && eneableStepClick && formProgress.includes(step.props.stepID)) || isCurrent) {
                                            setActiveStep(index);
                                        }
                                    }}>
                                    <div className="flex">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-primary ${isActive ? '!bg-primary': null} ${isCurrent ? "bg-primary": isDone ? "bg-primarybg" :"bg-divider"}`}>
                                            <FontAwesomeIcon icon={isDone ? faCheckCircle : step.props.icon} className={`text-lg text-primary group-hover:text-primarybg ${isActive ? 'text-white': null} ${isCurrent ? "text-primarybg": isDone ? "text-primary" : "text-unactive"}`} />
                                        </div>
                                    </div>
                                    <div className="flex-col justify-start hidden md:flex">
                                        <p className={`font-header text-sm group-hover:text-primary ${isActive ? '!text-primary': null} ${isCurrent ? "text-primary": isDone ? "text-primary" :"text-unactive"}`}>{step.props.stepTitle}</p>
                                        <p className={`font-text text-xs group-hover:text-primary ${isActive ? '!text-primary': null} ${isCurrent ? "text-primary":"text-unactive"} lg:block md:hidden`}>{step.props.stepDesc}</p>
                                    </div>
                                    <div></div>
                                </div>
                            )
                        }) : null
                }

            </div>
            <div className="py-2">
                {
                    isCompleted ? completedStep : steps[activeStep]
                }
            </div>
        </AddCourseStepper.Provider>
    )
})

export const Step = ({children}) => {
    return <div>{children}</div>
}

export const StepperCompleted = ({children}) => {
    return <div>{children}</div>
}

export const useAddCourseStepper = () => useContext(AddCourseStepper);
