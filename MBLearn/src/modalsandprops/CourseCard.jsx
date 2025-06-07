import { faBookBookmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CourseCard = ({ course, type, }) => {
    return (
        <div className="bg-white w-full h-full rounded-md shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out grid grid-rows-[1fr_min-content]">
            <div className={`bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-t-md flex flex-row justify-end gap-2 ${type === 'general' ? '!rounded-md': ''}`}>
                <div className={`bg-gradient-to-t from-black via-black/80 to-transparent w-full p-4 flex flex-col justify-between ${type === 'general' ? 'rounded-md' : ''}`}>
                    <div className="flex flex-row justify-between items-start">
                        <div className={`${type === 'courseAdmin' ? '' : 'flex gap-1'}`}>
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
                    ) : type === 'courseAdminCourseManager' ? (
                        <div className="grid grid-cols-[1fr_min-content_1fr] gap-1">
                            <div className="flex flex-row items-center justify-between">
                                <p className="text-xs font-text text-unactive">On-going</p>
                                <p className="text-sm font-header text-primary">{course.ongoing}</p>
                            </div>
                            <div className="w-[1px] h-full bg-divider mx-2"/>
                            <div className="flex flex-row items-center justify-between">
                                <p className="text-xs font-text text-unactive">Due-soon</p>
                                <p className="text-sm font-header text-primary">{course.due_soon}</p>
                            </div>
                        </div>
                    ) :
                    null
                }
            </div>
        </div>
    )
}
export default CourseCard;
