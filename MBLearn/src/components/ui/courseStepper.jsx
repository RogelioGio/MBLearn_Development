import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useContext, useState, useImperativeHandle, forwardRef, useEffect,} from "react";
import { faCircleCheck as faCircleCheckRegular, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { useStateContext } from "MBLearn/src/contexts/ContextProvider";
import { Progress } from "./progress";
import { ScrollArea } from "./scroll-area";
import { faChevronCircleLeft, faChevronCircleRight, faChevronLeft, faChevronRight, faCircleArrowLeft, faCircleRight, faList, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetOverlay, SheetPortal
} from "./sheet";
import { RingProgress } from "@mantine/core";

const StepperContext = createContext();

export const Stepper = forwardRef(
({ children, initialStep = 0, enableStepClick = false, onStepChange ,complete, learnerProgress=[], tempProgress=[],completionPercent, isLoading}, ref) => {
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



    const content = () => {
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
    }

    return (
        <StepperContext.Provider
            value={{ active, setActive, step: steps.length, stepsMeta}}
        >
            {
                role === "Course Admin" ?
                <>
                <div className="lg:grid hidden w-full grid-cols-[20rem_1fr] gap-x-2 h-full pt-2">
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

                {/* Mobile */}
                <div className="min-h-[1000px] flex flex-col px-4 py-2 pb-[3.5rem]  lg:hidden">
                    <div>
                        {isCompleted ? completedStep : steps[active]}
                    </div>
                </div>
                <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white z-10 py-2 border-t border-divider grid grid-cols-[min-content_1fr_min-content] px-4 gap-4">
                    <div>
                        <Sheet>
                            <SheetTrigger disabled={steps.length <= 1 || steps.length === 0}>
                                <div className="flex items-center justify-center w-10 h-10 text-lg border-2 border-primary rounded-md text-primary transition-all ease-in-out shadow-md hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer">
                                    <FontAwesomeIcon icon={faList} />
                                </div>
                            </SheetTrigger>
                            <SheetOverlay className="bg-gray-500/75 backdrop-blur-sm transition-all" />
                            <SheetContent side="left">
                                <SheetTitle className="font-text text-xs pb-2">Course Content:</SheetTitle>
                                <div className="flex flex-col gap-2">
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
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="flex flex-col items-start justify-start">
                        <p className="text-unactive font-text text-xs">Current Content Title:</p>
                        <p className="font-header text-primary text-sm">{stepsMeta[active]?.title}</p>
                    </div>
                    <div className="flex flex-row gap-x-1">
                        <div className={`h-10 w-10  flex items-center justify-center text-primary border-2 rounded-md border-primary transition-all ease-in-out shadow-md ${active === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer"}`}
                            onClick={() => setActive((prev) => Math.max(prev - 1, 0))}>
                            <FontAwesomeIcon icon={faChevronCircleLeft}/>
                        </div>
                        <div className={`h-10 w-10  flex items-center justify-center text-primary border-2 rounded-md border-primary transition-all ease-in-out shadow-md ${active >= steps.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:text-white hover:bg-primaryhover hover:border-primaryhover  hover:cursor-pointer"}`}
                            onClick={() => setActive((prev) => Math.min(prev + 1, steps.length-1))}>
                            <FontAwesomeIcon icon={faChevronCircleRight}/>
                        </div>
                    </div>
                </div>
                </>
                :
                <>
                {/* Learner */}
                <div className="grid-rows-[min-content_1fr] grid-cols-4 h-full lg:grid hidden">
                    {/* Header */}
                    <div className="border-b border-divider col-span-3 flex flex-row items-center justify-between py-2 pr-4">
                        <div className={`w-10 h-10 text-lg border-2 border-primary rounded-md flex justify-center items-center text-primary  transition-all ease-in-out shadow-md ${isLoading ? "opacity-50 cursor-not-allowed":""} ${active === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer"}`}
                            onClick={() => {
                                if(isLoading) return
                                setActive((prev) => Math.max(prev - 1, 0))
                            }}
                            disabled={active === 0}>
                            <FontAwesomeIcon icon={faChevronCircleLeft}/>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            {
                                isLoading ?
                                    <div className="flex flex-row gap-x-2 text-sm font-text text-unactive items-center justify-center">
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-unactive"/>
                                        <p>Loading...</p>
                                    </div>
                                :<>
                                    <p className="text-unactive font-text text-xs">Current Module:</p>
                                    <p className="font-header text-primary text-lg">{stepsMeta[active]?.title}</p>
                                </>
                            }
                        </div>
                        <div className={`w-10 h-10 text-lg border-2 border-primary rounded-md flex justify-center items-center text-primary  transition-all ease-in-out  shadow-md ${isLoading ? "opacity-50 cursor-not-allowed":""}  ${active >= steps.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:text-white hover:bg-primaryhover hover:border-primaryhover  hover:cursor-pointer"}`}
                            onClick={() => {
                                if(isLoading) return
                                setActive((prev) => Math.min(prev + 1, steps.length-1))
                            }}
                            disabled={active >= steps.length - 1}>
                            <FontAwesomeIcon icon={faChevronCircleRight}/>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="py-2 pl-4 mr-3 flex flex-row gap-2 items-center border-divider border-b border-l">
                        {
                            isLoading ?
                            <div className="flex flex-row gap-2 animate-pulse">
                                <RingProgress
                                    size={35} // Diameter of the ring
                                    roundCaps
                                    thickness={4} // Thickness of the progress bar
                                    sections={[{ value: 0, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                    rootColor="hsl(210, 14%, 83%)" // Darker blue track
                                />
                                <div className="flex flex-col gap-1">
                                    <div className="w-10 h-3 text-sm bg-gray-300 rounded-full"/>
                                    <div className="w-40 h-3 text-sm bg-gray-300 rounded-full"/>
                                </div>
                            </div>
                            : <>
                                <RingProgress
                                    size={35} // Diameter of the ring
                                    roundCaps
                                    thickness={4} // Thickness of the progress bar
                                    sections={[{ value: completionPercent, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                    rootColor="hsl(210, 14%, 83%)" // Darker blue track
                                />
                                <div>
                                    <p className='font-header'>{completionPercent}%</p>
                                    <p className='font-text text-xs'>Completion Progress</p>
                                </div>
                            </>
                        }
                    </div>

                    <div className="col-start-4 pl-4 mr-3 border-l border-divider">
                        <ScrollArea className="h-[calc(100vh-12.30rem)] ">
                            <div className="py-2 flex flex-col gap-y-1 transition-all ease-in-out">
                            {
                                isLoading ?
                                Array.from({length: 5}).map((i, _ ) => (
                                    <div key={i} className="min-h-20 w-100 border-unactive border bg-white animate-pulse rounded-md shadow-md"/>
                                ))
                                :
                                steps.map((step, index) => {
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
                        </ScrollArea>
                    </div>

                    {/* StepContent */}
                    <div className="col-span-3 row-start-2">
                        <ScrollArea className="h-[calc(100vh-12.30rem)]">
                        {
                            isLoading ?
                            <div className="flex flex-row gap-x-2 text-sm font-text text-unactive items-center justify-center h-[calc(100vh-12.30rem)]">
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-unactive"/>
                                <p>Loading Content...</p>
                            </div>
                            :
                            <div>
                                {isCompleted ? completedStep : steps[active]}
                            </div>
                        }
                        </ScrollArea>
                    </div>
                </div>

                {/* Learner Mobile */}
                <div className="flex flex-col lg:hidden">
                    <div className="flex flex-row justify-between gap-2 border-b h-full w-full sticky md:top-0 top-[3.5rem] z-10 px-3 py-2 bg-background">
                        <div className="flex flex-row items-center gap-2">
                            <Sheet>
                                <SheetTrigger disabled={steps.length <= 1 || steps.length === 0 || isLoading}>
                                    <div className={`flex items-center justify-center w-10 h-10 text-lg border-2 border-primary rounded-md text-primary transition-all ease-in-out shadow-md ${isLoading ? "opacity-50 cursor-not-allowed":"hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer"}`}>
                                        <FontAwesomeIcon icon={faList} />
                                    </div>
                                </SheetTrigger>
                                <SheetOverlay className="bg-gray-500/75 backdrop-blur-sm transition-all" />
                                <SheetContent side="left">
                                    <SheetTitle className="font-text text-xs pb-2">Course Content:</SheetTitle>
                                    <div className="flex flex-col gap-2">
                                        <ScrollArea className="h-[calc(100vh-12.25rem)] ">
                                            <div className="py-2 flex flex-col gap-y-1 transition-all ease-in-out">
                                            {
                                                isLoading ?
                                                Array.from({length: 5}).map((i, _ ) => (
                                                    <div key={i} className="min-h-20 w-100 border-unactive border bg-white animate-pulse rounded-md shadow-md"/>
                                                ))
                                                :
                                                steps.map((step, index) => {
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
                                        </ScrollArea>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <div>
                                {
                                    isLoading ?
                                    <div className="flex flex-row gap-x-2 text-sm font-text text-unactive items-center justify-center">
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-unactive"/>
                                        <p>Loading Content...</p>
                                    </div>
                                    : <>
                                        <p className="text-unactive font-text text-xs">Current Content Title:</p>
                                        <p className="font-header text-primary text-sm">{stepsMeta[active]?.title}</p>
                                    </>
                                }

                            </div>
                        </div>
                        <div className="flex flex-row gap-x-2 items-center">
                            {
                            isLoading ?
                            <div className="flex flex-row gap-2 animate-pulse">
                                <div className="flex flex-col gap-1 items-end">
                                    <div className="w-10 h-3 text-sm bg-gray-300 rounded-full"/>
                                    <div className="w-40 h-3 text-sm bg-gray-300 rounded-full"/>
                                </div>
                                <RingProgress
                                    size={35} // Diameter of the ring
                                    roundCaps
                                    thickness={4} // Thickness of the progress bar
                                    sections={[{ value: 0, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                    rootColor="hsl(210, 14%, 83%)" // Darker blue track
                                />
                            </div>
                            : <>
                                <div className="flex flex-col items-end">
                                    <p className='font-header'>{completionPercent}%</p>
                                    <p className='font-text text-xs'>Completion Progress</p>
                                </div>
                                <RingProgress
                                    size={35} // Diameter of the ring
                                    roundCaps
                                    thickness={4} // Thickness of the progress bar
                                    sections={[{ value: completionPercent, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                    rootColor="hsl(210, 14%, 83%)" // Darker blue track
                                />
                            </>
                        }
                        </div>
                    </div>
                    <div className="px-3 pb-10">
                        {
                            isLoading ?
                            <>
                                <div className="flex items-center justify-center min-h-[300px] w-full gap-4 text-unactive">
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin"/>
                                    <p className="font-text text-xs">Loading Module Content...</p>
                                </div>
                            </>:
                            isCompleted ? completedStep : steps[active]
                        }
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 py-2 border-t border-divider px-4 flex flex-row justify-between items-center gap-4 lg:hidden bg-background">
                    <div className={`w-32 h-10 text-lg border-2 border-primary rounded-md flex justify-center items-center text-primary  transition-all ease-in-out shadow-md gap-2 ${isLoading ? "opacity-50 cursor-not-allowed":""} ${active === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-white hover:bg-primaryhover hover:border-primaryhover hover:cursor-pointer"}`}
                        onClick={() => {
                            if(isLoading) return
                            setActive((prev) => Math.max(prev - 1, 0))
                        }}
                        disabled={active === 0}>
                        <FontAwesomeIcon icon={faChevronCircleLeft}/>
                        <p className="text-sm font-header">Previous</p>
                    </div>
                    <div className={`w-32 h-10 text-lg border-2 border-primary rounded-md flex justify-center items-center text-primary  transition-all ease-in-out shadow-md gap-2 ${isLoading ? "opacity-50 cursor-not-allowed":""}  ${active >= steps.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:text-white hover:bg-primaryhover hover:border-primaryhover  hover:cursor-pointer"}`}
                        onClick={() => {
                            if(isLoading) return
                            setActive((prev) => Math.min(prev + 1, steps.length-1))
                        }}
                        disabled={active >= steps.length - 1}>
                        <p className="text-sm font-header">Next</p>
                        <FontAwesomeIcon icon={faChevronCircleRight}/>
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

