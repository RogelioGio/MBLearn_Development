import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useContext, useState, useImperativeHandle, forwardRef,} from "react";
import { faCircleCheck as faCircleCheckRegular, faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const StepperContext = createContext();

export const Stepper = forwardRef(
({ children, initialStep = 0, enableStepClick = false}, ref) => {
    const [active, setActive] = useState(initialStep);
    const steps = React.Children.toArray(children).filter(
        (child) => child.type === Step
    );
    const completedStep = React.Children.toArray(children).find(
        (child) => child.type === StepperCompleted
    );

    const isCompleted = active >= steps.length;
    useImperativeHandle(ref,()=>({
        next: () => {
            setActive((prev) => Math.min(prev + 1, steps.length));
        },
        back: () => {
            setActive((prev) => Math.max(prev - 1, 0));
        },
        goTo: (stepIndex) => {
            if (stepIndex >= 0 && stepIndex < steps.length) {
                setActive(stepIndex);
            }
        },
        reset: () => setActive(initialStep),
    }));

    return (
        <StepperContext.Provider
            value={{ active, setActive, step: steps.length,}}
        >
            <div className="w-full">
                {/* Step Indicators */}
                <div className="flex flex-col gap-y-2 transition-all ease-in-out">
                    {steps.map((step, index) => {
                        const isDone = index < active;
                        const isActive = index === active;

                        return (
                            <div
                                key={index}
                                className={`group grid grid-cols-[auto_1fr] p-4 hover:cursor-pointer hover:bg-primarybg gap-2 transition-all ease-in-out rounded-md border-2 border-transparent ${isActive ? "border-2 !border-primary shadow-md scale-105":null}`}
                                onClick={()=>{if(enableStepClick){
                                    setActive(index)
                                    console.log(index)
                                }}}
                            >
                                {/* Indicator */}
                                <div
                                    className={`aspect-square flex flex-col justify-center items-center rounded-full hover:!border-primary
                                    ${isDone ? "border-primary bg-primary border-2" :
                                    isActive ? "border-2 border-primary bg-primary" : "border-2 border-unactive group-hover:border-primary"}`}
                                >
                                    {isDone ? (
                                        <FontAwesomeIcon
                                            icon={faCircleCheckRegular}
                                            className="text-white p-2"
                                        />
                                    ) : (
                                        <p className={`text-primary font-header text-xl ${!isDone && !isActive ? "text-unactive group-hover:text-primary": isActive ? "text-white" : null}`}>{index + 1}</p>
                                    )}
                                </div>
                                {/* Step Description */}
                                <div className="font-text text-primary ">
                                    <h1 className={`font-header text-xl ${!isDone && !isActive ? "text-unactive":null} group-hover:text-primary`}>{step.props.stepTitle}</h1>
                                    <p className="text-sm text-unactive group-hover:text-primary">{step.props.stepDesc}</p>
                                </div>

                                {/* {index < steps.length - 1 && (
                                <div className="flex-1 h-1 bg-gray-300 mx-2" />
                                )} */}
                            </div>
                        );
                    })}
                </div>

                {/* Step Content */}
                {/* <div className="border rounded p-4 bg-white shadow-sm">
                {isCompleted ? completedStep : steps[active]}
                </div> */}
            </div>
        </StepperContext.Provider>
    );
});

export const Step = ({ children }) => {
    return <div>{children}</div>;
};

export const StepperCompleted = ({ children }) => {
    return <div>{children}</div>;
};

export const useStepper = () => {
    return useContext(StepperContext);
};
