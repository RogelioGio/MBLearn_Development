import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useContext, useState, useImperativeHandle, forwardRef, useEffect,} from "react";
import { faCircleCheck as faCircleCheckRegular, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { useStateContext } from "MBLearn/src/contexts/ContextProvider";
import { Progress } from "./progress";
import { ScrollArea } from "./scroll-area";
import { faChevronCircleLeft, faChevronCircleRight, faCircleRight } from "@fortawesome/free-solid-svg-icons";

const StepperContext = createContext();

export const Stepper = forwardRef(
({ children, initialStep = 0, enableStepClick = false, onStepChange ,complete, learnerProgress=[], tempProgress=[]}, ref) => {
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
    const doneIndexes = steps
    .map((step, index) =>
        learnerProgress.includes(step.props.stepID) || tempProgress.includes(step.props.stepID)
        ? index
        : -1
    )
    .filter(index => index !== -1);

    const lastVisitedIndex = doneIndexes.length > 0 ? Math.max(...doneIndexes) : 0;

    const nextIndex =
    lastVisitedIndex + 1 < steps.length ? lastVisitedIndex + 1 : lastVisitedIndex;

    const {role} = useStateContext()
    return (
        <StepperContext.Provider
            value={{ active, setActive, step: steps.length, stepsMeta}}
        >
            {
                role === "Course Admin" ?
                <>
                    <div className="w-full grid grid-cols-[20rem_1fr] gap-x-2 h-full pt-2">
                {/* Step Indicators */}
                <div>
                    <div>
                        <p className="font-text text-unactive text-xs py-1">Course Content:</p>
                    </div>
                    <div className="flex flex-col gap-y-1 transition-all ease-in-out pr-2 mb-2">
                    {steps.map((step, index) => {
                        const isActive = index === active;
                        const customIcon = step.props.icon;

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
                                    ${isActive ? "border-2 border-primary bg-primary" : "border-2 border-unactive group-hover:border-primary"}`}
                                >
                                    <p className={`text-primary font-header text-base ${!isActive ? "text-unactive group-hover:text-primary": isActive ? "text-white" : null}`}>{index + 1}</p>
                                </div>
                                {/* Step Description */}
                                <div className="font-text text-primary ">
                                    <h1 className={`font-header text-sm ${!isActive ? "text-unactive":null} group-hover:text-primary`}>{step.props.stepTitle}</h1>
                                    <p className="text-xs text-unactive group-hover:text-primary">{step.props.stepDesc}</p>
                                </div>

                                {/* {index < steps.length - 1 && (
                                <div className="flex-1 h-1 bg-gray-300 mx-2" />
                                )} */}
                            </div>
                        );
                    })}
                </div>
                </div>

                {/* Step Content */}
                <div>
                    <div className="pb-2 pt-1 border-b border-divider flex flex-row justify-between items-center mr-2">
                        <div>
                            <p className="text-unactive font-text text-xs">Current Content Title:</p>
                            <p className="font-header text-primary text-lg">{stepsMeta[active]?.title}</p>
                        </div>
                        <div className="flex flex-row gap-x-1">
                            <div className={`w-10 h-10 text-lg border-2 border-primary rounded-md flex justify-center items-center text-primary  transition-all ease-in-out shadow-md ${active === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer"}`}
                                onClick={() => setActive((prev) => Math.max(prev - 1, 0))}
                                disabled={active === 0}>
                                <FontAwesomeIcon icon={faChevronCircleLeft}/>
                            </div>
                            <div className={`w-10 h-10 text-lg border-2 border-primary rounded-md flex justify-center items-center text-primary  transition-all ease-in-out  shadow-md ${active >= steps.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:text-white hover:bg-primaryhover hover:border-primaryhover  hover:cursor-pointer"}`}
                                onClick={() => setActive((prev) => Math.min(prev + 1, steps.length-1))}
                                disabled={active >= steps.length - 1}>
                                <FontAwesomeIcon icon={faChevronCircleRight}/>
                            </div>
                        </div>
                    </div>
                    <ScrollArea className="h-[calc(100vh-16.5rem)] pr-5">
                        <div>
                            {isCompleted ? completedStep : steps[active]}
                        </div>
                    </ScrollArea>
                </div>

                </div>
                </>
                :
                <>
                <div className="w-full grid grid-cols-[1fr_20rem] h-[calc(100vh-12.25rem)] overflow-auto">
                {/* Step Content */}
                <ScrollArea className="mr-5 pl-2 overflow-auto">
                        {isCompleted ? completedStep : steps[active]}
                </ScrollArea>

                {/* Step Indicators */}
                <div className="flex flex-col gap-y-1 transition-all ease-in-out pr-3 pl-2 border-l border-divider mb-2">
                    {steps.map((step, index) => {
                        const stepID = step.props.stepID;
                        const isDone = learnerProgress.includes(stepID) || tempProgress.includes(stepID);
                        const isActive = index === active;
                        const customIcon = step.props.icon;
                        const isLastVisited = index === lastVisitedIndex;
                        const isNext = index === nextIndex;
                        return (
                            <div
                                key={index}
                                className={`group grid grid-cols-[min-content_1fr] py-3 px-2 hover:cursor-pointer hover:bg-primarybg gap-2 transition-all ease-in-out rounded-md border-2 border-transparent ${isActive ? "border-2 !border-primary":null} ${isNext ? "bg-primarybg" : ""}`}
                                onClick={()=>{
                                    const isDone = learnerProgress.includes(stepID) || tempProgress.includes(stepID);
                                    if(enableStepClick && index !== active && isDone || isNext){
                                    setActive(index)
                                }}}
                            >
                                {/* Indicator */}
                                <div
                                    className={`w-10 aspect-square flex flex-col justify-center items-center rounded-full hover:!border-primary
                                    ${isDone ? "border-primary bg-primary border-2" :
                                    isActive ? "border-2 border-primary bg-primary" :
                                    isNext ? "bg-primary border-primary bnorder-2"  : "border-2 border-unactive group-hover:border-primary"}`}
                                >
                                    {isDone ? (
                                            <FontAwesomeIcon
                                                icon={faCircleCheckRegular} // ← Use it here
                                                className="text-white p-2"
                                            />
                                        ) : (
                                            customIcon ? (
                                                <FontAwesomeIcon
                                                    icon={customIcon}
                                                    className={`text-primary font-header text-base ${isNext ? "text-white" : !isDone && !isActive ? "text-unactive group-hover:text-primary" : isActive ? "text-white": null}`}
                                                />
                                            ) : (
                                                <p className={`text-primary font-header text-base ${isNext ? "text-white" : !isDone && !isActive ? "text-unactive group-hover:text-primary" : isActive ? "text-white": null}`}>{index}</p>
                                            )
                                        )}
                                </div>
                                {/* Step Description */}
                                <div className={`font-text text-primary`}>
                                    <h1 className={`font-header text-sm ${isNext ? "text-primary":!isDone && !isActive ? "text-unactive":null} group-hover:text-primary`}>{step.props.stepTitle}</h1>
                                    <p className={`text-xs group-hover:text-primary ${isNext ? "text-primary" :"text-unactive"}`}>{step.props.stepDesc}</p>
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

export const Step = ({ children, icon }) => {
  return <div data-icon={icon}>{children}</div>;
};


export const StepperCompleted = ({ children }) => {
    return <div>{children}</div>;
};

export const useStepper = () => {
    return useContext(StepperContext);
};

