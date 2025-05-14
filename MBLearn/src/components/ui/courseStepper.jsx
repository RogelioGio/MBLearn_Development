import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useContext, useState, useImperativeHandle, forwardRef, useEffect,} from "react";
import { faCircleCheck as faCircleCheckRegular, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { ScrollArea } from "@mantine/core";
import { useStateContext } from "MBLearn/src/contexts/ContextProvider";
import { Progress } from "./progress";

const StepperContext = createContext();

export const Stepper = forwardRef(
({ children, initialStep = 0, enableStepClick = false, onStepChange ,complete, learnerProgress=[]}, ref) => {
    const [active, setActive] = useState(initialStep);

    const steps = React.Children.toArray(children).filter(
        (child) => child.type === Step
    );

    const stepsMeta = steps.map((step) => ({
        title: step.props.stepTitle,
        desc: step.props.stepDesc,
        stepID: step.props.stepID
    }));
    useEffect(() => {
        if(onStepChange) onStepChange(active, stepsMeta[active])
    },[active])

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

    const {role} = useStateContext()
    return (
        <StepperContext.Provider
            value={{ active, setActive, step: steps.length, stepsMeta}}
        >
            {
                role === "Course Admin" ?
                <>
                    <div className="w-full grid grid-cols-[20rem_1fr] gap-x-2 h-full">
                {/* Step Indicators */}
                <div className="flex flex-col gap-y-1 transition-all ease-in-out pr-2 border-r border-divider mb-2">
                    {steps.map((step, index) => {
                        const isDone = index < active;
                        const isActive = index === active;

                        return (
                            <div
                                key={index}
                                className={`group grid grid-cols-[min-content_1fr] py-3 px-2 hover:cursor-pointer hover:bg-primarybg gap-2 transition-all ease-in-out rounded-md border-2 border-transparent ${isActive ? "border-2 !border-primary":null}`}
                                onClick={()=>{if(enableStepClick){
                                    setActive(index)
                                    console.log(index)
                                }}}
                            >
                                {/* Indicator */}
                                <div
                                    className={`w-10 aspect-square flex flex-col justify-center items-center rounded-full hover:!border-primary
                                    ${isDone ? "border-primary bg-primary border-2" :
                                    isActive ? "border-2 border-primary bg-primary" : "border-2 border-unactive group-hover:border-primary"}`}
                                >
                                    {isDone ? (
                                        <FontAwesomeIcon
                                            icon={faCircleCheckRegular}
                                            className="text-white p-2"
                                        />
                                    ) : (
                                        <p className={`text-primary font-header text-base ${!isDone && !isActive ? "text-unactive group-hover:text-primary": isActive ? "text-white" : null}`}>{index + 1}</p>
                                    )}
                                </div>
                                {/* Step Description */}
                                <div className="font-text text-primary ">
                                    <h1 className={`font-header text-sm ${!isDone && !isActive ? "text-unactive":null} group-hover:text-primary`}>{step.props.stepTitle}</h1>
                                    <p className="text-xs text-unactive group-hover:text-primary">{step.props.stepDesc}</p>
                                </div>

                                {/* {index < steps.length - 1 && (
                                <div className="flex-1 h-1 bg-gray-300 mx-2" />
                                )} */}
                            </div>
                        );
                    })}
                </div>
                {/* Step Content */}
                <ScrollArea className="h-[calc(100vh-11.5rem)] pr-5">
                    <div>
                        {isCompleted ? completedStep : steps[active]}
                    </div>
                </ScrollArea>

                </div>
                </>
                :
                <>
                <div className="w-full grid grid-cols-[1fr_20rem] gap-x-2 h-full">
                {/* Step Content */}
                <ScrollArea className="h-[calc(100vh-9.5rem)] pr-5 pl-4">
                    <div>
                        {isCompleted ? completedStep : steps[active]}
                    </div>
                </ScrollArea>

                {/* Step Indicators */}
                <div className="flex flex-col gap-y-1 transition-all ease-in-out pr-3 pl-2 border-l border-divider mb-2">
                    {steps.map((step, index) => {
                        const stepID = step.props.stepID;
                        const isDone = learnerProgress.includes(stepID);
                        const isActive = index === active;
                        return (
                            <div
                                key={index}
                                className={`group grid grid-cols-[min-content_1fr] py-3 px-2 hover:cursor-pointer hover:bg-primarybg gap-2 transition-all ease-in-out rounded-md border-2 border-transparent ${isActive ? "border-2 !border-primary":null}`}
                                onClick={()=>{if(enableStepClick && index !== active){
                                    setActive(index)
                                    complete()
                                }}}
                            >
                                {/* Indicator */}
                                <div
                                    className={`w-10 aspect-square flex flex-col justify-center items-center rounded-full hover:!border-primary
                                    ${isDone ? "border-primary bg-primary border-2" :
                                    isActive ? "border-2 border-primary bg-primary" : "border-2 border-unactive group-hover:border-primary"}`}
                                >
                                    {isDone ? (
                                        <FontAwesomeIcon
                                            icon={faCircleCheckRegular}
                                            className="text-white p-2"
                                        />
                                    ) : (
                                        <p className={`text-primary font-header text-base ${!isDone && !isActive ? "text-unactive group-hover:text-primary": isActive ? "text-white" : null}`}>{index + 1}</p>
                                    )}
                                </div>
                                {/* Step Description */}
                                <div className="font-text text-primary ">
                                    <h1 className={`font-header text-sm ${!isDone && !isActive ? "text-unactive":null} group-hover:text-primary`}>{step.props.stepTitle}</h1>
                                    <p className="text-xs text-unactive group-hover:text-primary">{step.props.stepDesc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>
                </>
            }

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

