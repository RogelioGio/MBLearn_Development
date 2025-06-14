import { faClock, faGraduationCap, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axiosClient from "MBLearn/src/axios-client"
import AnnouncmentCarousel from "MBLearn/src/modalsandprops/dashboardComponents/AnnouncementCarousel"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as React from "react"
import { format } from "date-fns"
import { Progress } from "MBLearn/src/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import Calendar from "MBLearn/src/modalsandprops/dashboardComponents/Calendar"
import CourseCard from "MBLearn/src/modalsandprops/CourseCard"
import { useCourse_Context } from "MBLearn/src/contexts/Course_Context"


const LearnerDashboard = ({name,user}) => {
    const [enrolled, setEnrolled] = useState([])
    const [Loading, setLoading] = useState(true)
    const [count, setCount] = useState({})
    const {setCourse} = useCourse_Context();
    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true)
        axiosClient.get(`/select-user-courses/${user.user_infos.id}`
            ,{
                params: {
                    page: 1,
                    // pageState.currentPage,
                    perPage: 4
                    // pageState.perPage,
                }
            }
        )
        .then(({data}) => {
            console.log(data.data)
            setEnrolled(data.data)

        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        });

        axiosClient.get(`/enrollment-status-count/${user.user_infos.id}`)
        .then((res) => {
            setCount(res.data)
            console.log(res.data)
            setLoading(false)
        }).catch((e)=> {
            console.log(e)
        })
    }, [user])

    // useEffect(() => {
    //     console.log(enrolled)
    // },[setEnrolled,enrolled])


    return(
        <div className="grid grid-cols-4 grid-rows-[6.25rem__calc((100vh-6.25rem)/2)__calc((100vh-6.25rem)/2)] h-full w-full">
        <div className="flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider">
            <h1 className="text-primary text-4xl font-header">Good Day! {name}</h1>
            <p className='font-text text-sm text-unactive'>Your learning hub! Track progress, access courses, and level up your skills!</p>
        </div>
        <div className='border-b border-divider mr-5 flex flex-row justify-end items-center'>
            <div className='p-6 aspect-square bg-secondaryprimary rounded-full flex justify-center items-center'>
                <FontAwesomeIcon icon={faGraduationCap} className='text-primary text-2xl'/>
            </div>
        </div>

        {/* Announcement */}
        <div className='col-span-3 row-span-1 px-5 py-2'>
            <AnnouncmentCarousel/>
        </div>

        {/* Calender */}
        <div className='col-span-1 row-span-1 pr-5 py-2 grid grid-cols-1 grid-rows-[min-content_1fr]'>
            <div className='flex flex-row justify-between items-center'>
                <div className="pb-3">
                    <p className="font-text text-unactive text-xs">Current Date:</p>
                    <p className="font-header text-primary text-base">{format(new Date(), "MMMM d yyy")}</p>
                </div>
                <div className='flex flex-row gap-2'>
                    <div>
                        <div className='w-9 h-9 border-2 rounded-md text-primary border-primary flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faCalendar} className='text-sm'/>
                        </div>
                    </div>
                    <div>
                        <div className='w-9 h-9 border-2 rounded-md text-primary border-primary flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <ArrowLeft className="h-4 w-4" />
                        </div>
                    </div>
                    <div>
                        <div className='w-9 h-9 border-2 rounded-md text-primary border-primary flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'>
                        <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full rounded-md shadow-md border-2 border-primary overflow-hidden">
                <Calendar/>
            </div>
        </div>

        {/* Enrolled */}
        <div className='col-span-3 row-start-3 ml-5 pr-5 pt-2 pb-3'>
            <div className="flex flex-col w-full h-full gap-2">
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Enrolled Courses</h1>
                        <p className="font-text text-unactive text-xs">View all your enrolled courses in one place and stay on top of your learning journey.</p>
                    </div>
                    <div className="flex flex-row gap-x-2">
                        <div className="text-primary border-2 border-primary hover:bg-primary hover:text-white flex items-center justify-center h-9 w-9 rounded-md hover:cursor-pointer transition-all ease-in-out">
                            <ArrowLeft className="h-4 w-4"/>
                        </div>
                        <div className="text-primary border-2 border-primary hover:bg-primary hover:text-white flex items-center justify-center h-9 w-9 rounded-md hover:cursor-pointer transition-all ease-in-out">
                            <ArrowRight className="h-4 w-4"/>
                        </div>
                    </div>
                </div>
                {
                    Loading ? (
                        <div className="h-full grid grid-cols-4 grid-rows-1 gap-2 animate-pulse">
                            {
                                Array.from({length: 4}).map((_, entry)=>(
                                    <div key={entry.id} className="bg-white rounded-md shadow-md"/>
                                ))
                            }
                        </div>
                    ) : enrolled.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center gap-2">
                            <p className="text-unactive font-text">No Courses Enrolled Yet</p>
                        </div>
                    ) : (
                        <div className="w-full h-full grid grid-cols-4 grid-rows-1 gap-3">
                            {/* filter(item => item.progress !== 100) */}
                            {
                                enrolled.map((course) => {
                                    return (
                                        // <div className="bg-white w-full h-full shadow-md rounded-md grid grid-cols-1 grid-rows-[min-content_1fr_1fr_min-content_min-content] hover:cursor-pointer hover:scale-105 transition-all ease-in-out" onClick={}>
                                        //     <div className="bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] w-full h-14 rounded-t-md p-3">
                                        //         <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">
                                        //             {course.training_type}
                                        //         </span>
                                        //     </div>
                                        //     <div className="flex flex-col justify-center row-span-2 px-3">
                                        //         <p className="font-header text-sm text-primary">{course.name}</p>
                                        //         <p className="font-text text-unactive text-xs">Course ID: {course?.CourseID}</p>
                                        //     </div>
                                        //     <div className="flex flex-col justify-center px-3">
                                        //         <p className="font-text text-unactive text-xs">Deadline: {format(new Date(course.deadline), 'MMMM d, yyyy')}</p>
                                        //     </div>
                                        //     <div className="flex flex-col justify-center p-3">
                                        //         <div className="flex flex-row justify-between items-end font-text text-unactive text-xs py-2">
                                        //             <p>Progress: </p>
                                        //             <p className="text-xl">{course.progress}%</p>
                                        //         </div>
                                        //         <Progress value={course.progress}/>
                                        //     </div>
                                        // </div>
                                        <CourseCard course={course} type='learner' click={() => {navigate(`/learner/course/${course.id}`); setCourse(course)}}/>
                                        //navigate(`/learner/course/${course.id}`)
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>

        {/* Activities */}
        <div className='col-span-3 row-start-3 mr-5 pt-2 pb-3'>
            <div className="flex flex-col w-full h-full gap-2">
                <div>
                    <h1 className="font-header text-primary text-base">Activities</h1>
                    <p className="font-text text-unactive text-xs">Tracks and displays your recent learning activities.</p>
                </div>

                <div className="w-full h-full grid grid-col-1 grid-rows-3 gap-2 ">
                    {Loading ? (
                        Array.from({length: 3}).map((index)=>(
                            <div className="animate-pulse w-full h-full bg-white rounded-md shadow-md px-3 py-1 flex flex-row  justify-start items-center gap-3 hover:cursor-pointer hover:bg-primary group transition-all ease-in-out" />
                        ))
                    ) : (
                        <>
                            {count?.Enrolled > 0 && (
                                <div className="w-full h-full bg-white border-2 border-primary rounded-md shadow-md px-3 py-1 flex flex-row  justify-start items-center gap-3 hover:cursor-pointer hover:bg-primary group transition-all ease-in-out"
                                    onClick={() => navigate('/learner/learnercoursemanager/enrolled')}>
                                    {/* icon */}
                                    <div className="group-hover:text-white group-hover:bg-gray-50 group-hover:bg-opacity-20  text-primary flex flex-col item-center justify-center bg-primarybg p-2 aspect-square rounded-full">
                                        <FontAwesomeIcon icon={faGraduationCap} className="text-base"/>
                                    </div>
                                    {/* desc */}
                                    <div className="flex flex-col justify-center items-start">
                                        <p className="group-hover:text-white font-header text-sm text-primary">Enrolled</p>
                                        <p className="group-hover:text-white font-text text-unactive text-xs">You're just enrolled to {count?.Enrolled} courses</p>
                                    </div>
                                </div>
                            )}
                            {count?.Ongoing > 0 && (
                                <div className="w-full h-full bg-white border-2 border-primary rounded-md shadow-md px-3 py-1 flex flex-row  justify-start items-center gap-3 hover:cursor-pointer hover:bg-primary group transition-all ease-in-out"
                                    onClick={() => navigate('/learner/learnercoursemanager/ongoing')}>
                                    {/* icon */}
                                    <div className="group-hover:text-white group-hover:bg-gray-50 group-hover:bg-opacity-20  text-primary flex flex-col item-center justify-center bg-primarybg p-2 aspect-square rounded-full">
                                        <FontAwesomeIcon icon={faClock} className="text-base"/>
                                    </div>
                                    {/* desc */}
                                    <div className="flex flex-col justify-center items-start">
                                        <p className="group-hover:text-white font-header text-sm text-primary">On-going</p>
                                        <p className="group-hover:text-white font-text text-unactive text-xs">You have {count?.Ongoing} courses on-going</p>
                                    </div>
                                </div>
                            )}
                            {count?.DueSoon > 0 && (
                                <div className="w-full h-full bg-white border-2 border-primary rounded-md shadow-md px-3 py-1 flex flex-row  justify-start items-center gap-3 hover:cursor-pointer hover:bg-primary group transition-all ease-in-out"
                                    onClick={() => navigate('/learner/learnercoursemanager/ongoing')}>
                                    {/* icon */}
                                    <div className="group-hover:text-white group-hover:bg-gray-50 group-hover:bg-opacity-20  text-primary flex flex-col item-center justify-center bg-primarybg p-2 aspect-square rounded-full">
                                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-base"/>
                                    </div>
                                    {/* desc */}
                                    <div className="flex flex-col justify-center items-start">
                                        <p className="group-hover:text-white font-header text-sm text-primary">Due soon</p>
                                        <p className="group-hover:text-white font-text text-unactive text-xs">You have {count?.DueSoon} courses due soon</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default LearnerDashboard
