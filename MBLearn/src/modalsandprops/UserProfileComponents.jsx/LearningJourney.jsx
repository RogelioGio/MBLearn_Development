import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "MBLearn/src/axios-client";
import { Progress } from "MBLearn/src/components/ui/progress";
import { useEffect, useState } from "react";

const LearningJourney = ({ user }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [duration, setDuration] = useState("enrolled");
    // ?enrollment_status[eq]=${duration}
    const fetchCourses = () => {
        setLoading(true)
        axiosClient.get(`/select-user-courses/${user.user_infos?.id}`,
            // {
            //     params: {
            //         page: pageState.currentPage,
            //         perPage: pageState.perPage,
            //     }
            // }
        )
        .then(({data}) => {
            console.log(data.data)
            setCourses(data.data)
            //pageChangeState("totalCourses", data.total)
            //pageChangeState("lastPage", data.lastPage)
            setLoading(false)
        }).catch((err)=> {
            console.log(err)
        })

    }


    useEffect(()=>{
        fetchCourses();
    }, [user]);


    const [pageState, setPagination] = useState({
        currentPage: 1,
        perPage: 8,
        totalCourses: 0,
        lastPage:1,
        startNumber: 0,
        endNumber: 0,
        currentPerPage:0
    });

    const Pages = [];
    for(let p = 1; p <= pageState.lastPage; p++){
        Pages.push(p)
    }


    // Fetch the learning journey data for the user
    return(
        <div className="w-full h-full grid grid-cols-3 grid-rows-[min-content_1fr_min-content] gap-2">
            {/* Content Header */}
            <div class="grid grid-cols-1">
                        <select id="duration" name="duration" class="border-2 text-primary font-header col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary border-primary"
                            //value={duration}
                            //onChange={handleDurationState}
                            // onBlur={formik2.handleBlur}
                        >
                        <option value="enrolled">Enrolled</option>
                        <option value="ongoing">On-going</option>
                        <option value="finished">Finished</option>
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-primary sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
            </div>
            <div className="col-start-3 flex flex-col justify-center items-end">
                <p className="text-unactive font-text text-xs">{courses.length} {duration} courses</p>
            </div>

            {/* Courses */}
            <div className="grid grid-rows-2 grid-cols-4 gap-2 col-span-3">
                {courses.map((course, index) => (
                    <div key={index} className='bg-white text-white h-full rounded-md shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out grid grid-rows-[min-content_1fr_1fr_min-content]'>
                        {/* Course Thumbnail */}
                        <div className="flex flex-row justify-end bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-t-md p-4 gap-2">
                            {/* <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">Published</span> */}
                            <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">{course.training_type}</span>
                        </div>
                        <div className='px-4 py-2 flex flex-col justify-center row-span-2'>
                        <h1 className='font-header text-sm text-primary'>{course.name}</h1>
                            <p className='font-text text-primary text-xs'>{course?.types[0]?.type_name} - {course?.categories[0]?.category_name}</p>
                            <p className='font-text text-xs text-unactive'>Course ID: {course.CourseID}</p>
                        </div>
                            {/* Progress */}
                        <div className="px-4 pb-5">
                            <div className="flex flex-row justify-between font-text text-unactive text-xs py-2">
                                <p>Progress</p>
                                <p>{course.progress} %</p>
                            </div>
                            <Progress value={course.progress}/>
                        </div>
                    </div>
                ))}
            </div>

            <div className="col-span-3 flex flex-row justify-between items-center px-5">
                {/* Total number of entries and only be shown */}
                <div>
                    {
                        loading ? <p className='text-sm font-text text-unactive'>Loading courses...</p>
                        :
                        <p className='text-sm font-text text-unactive'>
                            Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalCourses}</span> <span className='text-primary'>results</span>
                        </p>
                    }

                </div>
                {/* Paganation */}
                <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                            {/* Previous */}
                            <a
                                //onClick={back}
                                className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </a>

                            {/* Current Page & Dynamic Paging */}
                            {
                                loading ? (
                                    <a className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset text-primary`}>...</a>
                                ) : (
                                    Pages.map((page)=>(
                                        <a
                                            key={page}
                                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                                ${
                                                    page === pageState.currentPage
                                                    ? 'bg-primary text-white'
                                                    : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                                } transition-all ease-in-out`}
                                                onClick={() => pageChange(page)}>
                                            {page}</a>
                                    ))
                                )
                            }
                            <a
                                //onClick={next}
                                className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </a>
                        </nav>

                </div>

            </div>
        </div>
    )
}
export default LearningJourney;
