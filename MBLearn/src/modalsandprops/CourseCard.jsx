import { faBookBookmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../components/ui/hover-card";
import { useNavigate } from "react-router";
import { Progress } from "../components/ui/progress";



const CourseCard = ({ course, type, click}) => {

    const navigate = useNavigate();
    return (
        <HoverCard>
            <HoverCardTrigger>
                <div className="bg-white w-full h-full rounded-md shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out grid grid-rows-[1fr_min-content]" onClick={click}>
                    <div className={`bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-t-md flex flex-row justify-end gap-2 ${type === 'general' ? '!rounded-md': ''}`}>
                        <div className={`bg-gradient-to-t from-black via-black/80 to-transparent w-full p-4 flex flex-col justify-between ${type === 'general' ? 'rounded-md' : ''}`}>
                            <div className="flex flex-row justify-between items-start">
                                <div className={`${type === 'courseAdmin' || type === 'learner' ? '' : 'flex gap-1'}`}>
                                    <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">{course.training_type}</span>
                                    <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">{course?.types[0]?.type_name}</span>
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
                                <p className='font-text text-white text-xs'>{course?.categories[0]?.category_name}</p>
                                <h1 className='font-header text-sm text-white'>{course.name}</h1>
                                <p className='font-text text-xs text-white'>Course ID: {course.CourseID}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${type === 'courseAdmin' ? 'p-4' : type === 'courseAdminCourseManager' ? 'px-4 py-3' : ''}`}>
                        {
                            type === 'courseAdmin' ? (
                                <div className="flex flex-row justify-between items-center">
                                    <p className="text-xs font-text text-unactive">On-going</p>
                                    <p className="test-xs font-text text-xs text-unactive"><span className="text-primary font-text text-xs">{course.ongoing}</span> Learners</p>
                                </div>
                            ) :
                            type === 'courseAdminCourseManager' ? (
                                <div className="grid grid-cols-[1fr_min-content_1fr_min-content_1fr] gap-2">
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
