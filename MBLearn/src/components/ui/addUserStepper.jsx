import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useContext, useState, useImperativeHandle, forwardRef, useEffect,} from "react";

const AddUserStepper = createContext()

export const AddUser = forwardRef(({children, initialStep = 0, enableStepClick = false, onStepChange, formProgress= []},ref) => {
    const [activeStep, setActiveStep] = useState(initialStep);

    const steps = React.Children.toArray(children).filter(
        (child) => child.type === Step
    );

    const completedStep = React.Children.toArray(children).find(
        (child) => child.type === StepperCompleted
    );

    const isCompleted = activeStep >= steps.length;

    useImperativeHandle(ref, () => ({
        next: () => {
            setActiveStep((prev) => Math.min(prev + 1, steps.length));
        },
        back: () => {
            setActiveStep((prev) => Math.max(prev - 1, 0));
        },
        goTo: (stepIndex) => {
            if (stepIndex >= 0 && stepIndex < steps.length) {
                setActiveStep(stepIndex);
            }
        },
        reset: () => setActiveStep(initialStep),
        activeStep,
        stepsMeta
    }));

    const stepsMeta = steps.map((step) => ({
        title: step.props.stepTitle,
        desc: step.props.stepDesc,
        stepID: step.props.stepID,
        icon: step.props.icon,
    }));
    useEffect(() => {
        if(onStepChange) onStepChange(activeStep, stepsMeta[activeStep]);
    }, [activeStep]);

    const setCurrent = () => {
        return formProgress.length
    }


    return (
        <AddUserStepper.Provider value={{activeStep, setActiveStep, stepsMeta}}>
            <div className="flex flex-row justify-between mx-4 gap-x-1">
                {steps.map((steps, index)=>{
                    const isActive = activeStep === index;
                    const isDone = formProgress.includes(steps.props.stepID);
                    const isCurrent = setCurrent() === index;

                    return (
                        <div key={index} className={`group grid gap-2 grid-rows-[min-content_1fr] rounded-md w-full p-3 ${isActive ? 'border-2 border-primary': 'border-2 border-transparent'} ${isCurrent ? 'bg-primarybg':null} hover:border-primary transition-all ease-in-out cursor-pointer hover:shadow-md hover:bg-primarybg`}
                                onClick={() => {
                                    if (enableStepClick && formProgress.includes(steps.props.stepID) || isCurrent) {
                                        setActiveStep(index);
                                    }
                                }}>
                            <div className="flex items-center justify-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-primary ${isActive ? '!bg-primary': null} ${isCurrent ? "bg-primary": isDone ? "bg-primarybg" :"bg-divider"}`}>
                                    <FontAwesomeIcon icon={isDone ? faCheckCircle : steps.props.icon} className={`text-lg text-primary group-hover:text-primarybg ${isActive ? 'text-white': null} ${isCurrent ? "text-primarybg": isDone ? "text-primary" : "text-unactive"}`} />
                                </div>
                            </div>
                            <div className="flex flex-col justify-start">
                                <p className={`font-header text-sm group-hover:text-primary ${isActive ? '!text-primary': null} ${isCurrent ? "text-primary": isDone ? "text-primary" :"text-unactive"}`}>{steps.props.stepTitle}</p>
                                <p className={`font-text text-xs group-hover:text-primary ${isActive ? '!text-primary': null} ${isCurrent ? "text-primary":"text-unactive"}`}>{steps.props.stepDesc}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="mx-4 py-2">
                {isCompleted ? completedStep : steps[activeStep]}
            </div>
        </AddUserStepper.Provider>
    );
})

export const Step = ({children}) => {
    return <div>{children}</div>
}

export const StepperCompleted = ({ children }) => {
    return <div>{children}</div>;
};

export const useAddUserStepper = () => useContext(AddUserStepper);
