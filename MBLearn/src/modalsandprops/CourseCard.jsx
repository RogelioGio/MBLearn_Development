import { faBookBookmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../components/ui/hover-card";
import { useNavigate } from "react-router";
import { Progress } from "../components/ui/progress";
import { useEffect, useRef, useState } from "react";



const CourseCard = ({ course, type, click}) => {
    const [pos, setPos] = useState({x: 0, y: 0});
    const cardRef = useRef(null);
    // useEffect(() => {
    //         const handleMouseMove = (e) => {
    //             setPos({
    //                 x: e.clientX,
    //                 y: e.clientY
    //             })
    //         }

    //         window.addEventListener('mousemove', handleMouseMove);
    //         return () => {
    //             window.removeEventListener('mousemove', handleMouseMove);
    //         };
    // }, []);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    }

    const handleMouseLeave = () => {
        setPos(null)
    }

    const navigate = useNavigate();

    return (
        <HoverCard>
            <HoverCardTrigger>
                <div className="group relative bg-white w-full h-full rounded-md shadow-md hover:cursor-pointer transition-all ease-in-out grid grid-rows-[1fr_min-content]" onClick={click}
                    onMouseMove={handleMouseMove}

                    ref={cardRef}>
                    <div className={`bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] md:rounded-t-md rounded-md flex flex-row justify-end gap-2 ${type === 'general' ? '!rounded-md': ''}`}>
                        <div className={`bg-gradient-to-t from-black via-black/80 to-transparent w-full p-4 flex flex-col justify-between rounded-md md:rounded-none  ${type === 'general' ? 'rounded-md' : ''}`}>
                            <div className="flex flex-row justify-between items-start">
                                <div className={`flex flex-row gap-1
                                                xl:flex-col`}>
                                    <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text w-fit">{course.training_type}</span>
                                </div>
                                {
                                    type === 'courseAdmin' || type === 'courseAdminCourseManager' || type === 'general'? (
                                        <div>
                                            <span className="inline-flex justify-center items-center rounded-md border-2 text-sm text-white font-text w-8 h-8">
                                                <FontAwesomeIcon icon={course.published === true ? faBookBookmark : faPen} />
                                            </span>
                                        </div>
                                    ) : null
                                }
                            </div>
                            <div>
                                <h1 className='font-header text-sm text-white'>{course.name}</h1>
                                <p className='font-text text-xs text-white'>Course ID: {course.CourseID}</p>
                            </div>
                            <div className="absolute md:hidden group-hover:scale-100 scale-0 border border-primary rounded-md font-text p-2 w-fit text-xs transition-all ease-in-out bg-white shadow-md flex flex-col justify-between gap-1 z-10"
                                        style={{
                                            left: pos?.x + 15,
                                            top: pos?.y,
                                        }}>
                                <div className="w-full flex flex-row justify-between gap-2 whitespace-nowrap">
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="rounded-sm h-3 w-3 bg-primary"/>
                                            <p className="text-unactive">Enrolled:</p>
                                        </div>
                                        <p>{course.enrolled}</p>
                                    </div>
                                    <div className="w-full flex flex-row justify-between gap-2 whitespace-nowrap">
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="rounded-sm h-3 w-3 bg-primary"/>
                                            <p className="text-unactive">On-going:</p>
                                        </div>
                                        <p>{course.ongoing}</p>
                                    </div>
                                    <div className="w-full flex flex-row justify-between gap-2 whitespace-nowrap">
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="rounded-sm h-3 w-3 bg-primary"/>
                                            <p className="text-unactive">Due-soon:</p>
                                        </div>
                                        <p>{course.due_soon}</p>
                                    </div>4
                            </div>
                        </div>
                    </div>
                    <div className={`${type === 'courseAdmin' ? 'p-4' : type === 'courseAdminCourseManager' ? 'md:px-4 md:py-3' : ''} relative`}>
                        {
                            type === 'courseAdmin' ? (
                                <div className="flex flex-row justify-between items-center">
                                    <p className="text-xs font-text text-unactive">On-going</p>
                                    <p className="test-xs font-text text-xs text-unactive"><span className="text-primary font-text text-xs">{course.ongoing}</span> Learners</p>
                                </div>
                            ) :
                            type === 'courseAdminCourseManager' ? (
                                <>
                                <div className="grid-cols-[1fr_min-content_1fr_min-content_1fr] gap-2 md:grid hidden">
                                    <div className="flex flex-row items-center justify-between">
                                        <p className="text-xs font-text text-unactive">Enrolled</p>
                                        <p className="text-sm font-header text-primary">{course.enrolled}</p>
                                    </div>
                                    <div className="w-[1px] h-full bg-divider"/>
                                    <div className="flex flex-row items-center justify-between">
                                        <p className="text-xs font-text text-unactive">On-going</p>
                                        <p className="text-sm font-header text-primary">{course.ongoing}</p>
                                    </div>
                                    <div className="w-[1px] h-full bg-divider"/>
                                    <div className="flex flex-row items-center justify-between">
                                        <p className="text-xs font-text text-unactive">Due-soon</p>
                                        <p className="text-sm font-header text-primary">{course.due_soon}</p>
                                    </div>
                                </div>
                                {/* <div className="absolute group-hover:scale-100 scale-100 border border-primary rounded-md font-text p-2 w-full text-xs transition-all ease-in-out bg-white shadow-md flex flex-col justify-between gap-1
                                                md:hidden"
                                        style={{
                                                left: `${pos.x}px`,
                                                top: `${pos.y}px`,
                                                //transform: "translate(-50%, -50%)",
                                            }}
                                        >

                                    <div className="w-full flex flex-row justify-between">
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="rounded-sm h-3 w-3 bg-primary"/>
                                            <p className="text-unactive">Enrolled:</p>
                                        </div>
                                        <p>{course.enrolled}</p>
                                    </div>
                                    <div className="w-full flex flex-row justify-between">
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="rounded-sm h-3 w-3 bg-primary"/>
                                            <p className="text-unactive">On-going:</p>
                                        </div>
                                        <p>{course.ongoing}</p>
                                    </div>
                                    <div className="w-full flex flex-row justify-between">
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="rounded-sm h-3 w-3 bg-primary"/>
                                            <p className="text-unactive">Due-soon:</p>
                                        </div>
                                        <p>{course.due_soon}</p>
                                    </div>
                                </div> */}
                                </>
                            ) : type === 'learner' || type === 'learnerCourseManager' ? (
                                <div className="flex flex-col justify-between h-full py-3 px-4">
                                    <div className="flex flex-row justify-between font-text text-unactive text-xs pb-2">
                                        <p>Progress</p>
                                        <p>{Math.round(course.progress)} %</p>
                                    </div>
                                    <Progress value={course.progress}/>
                                </div>

                            ) :
                            null
                        }
                    </div>
                </div>
            </HoverCardTrigger>
            {
                type === 'general' ? (
                    <HoverCardContent>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <p className="text-xs text-unactive font-text">Course Contributor:</p>
                                <div className="flex flex-row items-center gap-2">
                                    <div className="w-8 h-8 rounded-full">
                                        <img src={course.adder?.profile_image} alt="" className="rounded-full" />
                                    </div>
                                    <div>
                                        <p className='text-xs font-text text-primary'>{course.adder?.first_name} course.{course.adder?.middle_name}  {course.adder?.last_name} {course.adder?.name_suffix} </p>
                                        <p className='text-xs font-text text-unactive'> ID: {course.adder?.employeeID} </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-xs text-unactive font-text">Course Author:</p>
                                <div className="flex flex-row items-center gap-2">
                                    <div className="w-8 h-8 rounded-full">
                                        <img src={course.adder?.profile_image} alt="" className="rounded-full" />
                                    </div>
                                    <div>
                                        <p className='text-xs font-text text-primary'>Author's Name </p>
                                        <p className='text-xs font-text text-unactive'> ID: 1023123 </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </HoverCardContent>
                ) : null
            }
        </HoverCard>
    )
}
export default CourseCard;
