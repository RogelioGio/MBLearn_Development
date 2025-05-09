import { faArrowLeft, faArrowRight, faBook, faBookBookmark, faBookOpenReader, faClock, faGraduationCap, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Axios } from "axios";
import axiosClient from "MBLearn/src/axios-client";
import AnnouncmentCarousel from "MBLearn/src/modalsandprops/dashboardComponents/AnnouncementCarousel";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const CourseAdminDashboard = ({name, user}) => {
    const [tab, setTab] = useState("myCourses")
    const [loading, setLoading] = useState(false)
    const [assignedCourse, setAssignedCourse] = useState([])
    const navigate = useNavigate()

    const [pageState, setPagination] = useState({
            currentPage: 1,
            perPage: 4,
            totalCourses: 0,
            lastPage:1,
            startNumber: 0,
            endNumber: 0,
            currentPerPage:0
        });

        const pageChangeState = (key, value) => {
            setPagination ((prev) => ({
                ...prev,
                [key]: value
            }))
        }


    useEffect(() => {
        fetchCourses(tab)
    },[tab])
    const fetchCourses = (typeOfCourse) => {
        setLoading(true)
        if(typeOfCourse === "myCourses"){
            setAssignedCourse([])
            axiosClient.get(`/select-user-added-courses/${user.user_infos.id}`,{
                params: {
                    page: pageState.currentPage,
                    perPage: pageState.perPage,
                }
            })
            .then(({ data }) => {
                setAssignedCourse(data.data)
                pageChangeState("totalCourses", data.total)
                pageChangeState("lastPage", data.lastPage)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
        } else if(typeOfCourse ==="assignedCourses"){
            setAssignedCourse([])
            axiosClient.get(`/select-user-assigned-courses/${user.user_infos.id}`,{
                    params: {
                        page: 1,
                        //pageState.currentPage,
                        perPage: 4
                        //pageState.perPage,
                    }
                })
                .then(({ data }) => {
                    setAssignedCourse(data.data)
                    // pageChangeState("totalCourses", data.total)
                    // pageChangeState("lastPage", data.lastPage)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            return null
        }
    }

    useEffect(()=>{
        fetchCourses(tab)
    },[pageState.currentPage, pageState.perPage])

    const back = () => {
        if (loading) return;
        if (pageState.currentPage > 1){
            pageChangeState("currentPage", pageState.currentPage - 1)
            pageChangeState("startNumber", pageState.perPage - 4)
        }
    }
    const next = () => {
        if (loading) return;
        if (pageState.currentPage < pageState.lastPage){
            pageChangeState("currentPage", pageState.currentPage + 1)
        }
    }

    return(
        <div className="grid grid-cols-4 grid-rows-[6.25rem_1fr_1fr] h-full w-full">
            <div className="flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider">
                    <h1 className="text-primary text-4xl font-header">Good Day! {name}</h1>
                    <p className='font-text text-sm text-unactive'>Course Admin Dashboard, A centralized hub for Course administrators to manage Learners, monitor learners progress.</p>
            </div>
            <div className='border-b border-divider mr-5 flex flex-row justify-end items-center'>
                <div className='p-6 aspect-square bg-secondaryprimary rounded-full flex justify-center items-center'>
                    <FontAwesomeIcon icon={faBookOpenReader} className='text-primary text-2xl'/>
                </div>
            </div>
            <div className='col-span-3 row-span-1 px-5 py-2'>
                <AnnouncmentCarousel/>
            </div>
            <div className='col-span-1 row-span-1 pr-5 py-2 grid grid-cols-1 grid-rows-[min-content_1fr]'>
            <div className="pb-3">
                <p className="font-header text-primary text-base">Calendar</p>
                <p className="font-text text-unactive text-xs">Stay organized by tracking schedule and activities</p>
            </div>
            <div className="bg-white w-full h-full rounded-md shadow-md border-2 border-primary">

            </div>
        </div>
        {/* Courses Carosel */}
        <div className='row-start-3 col-span-3 px-5 pt-2 p-2 flex flex-col'>
            {/* Header */}
            <div className="grid grid-cols-[auto] grid-rows-1 gap-10">
                <div className="grid grid-cols-[1fr_1fr] gap-2 pb-2">
                    <div className={`group flex flex-row items-center justify-between py-2 px-4 border-2 border-primary rounded-md bg-white shadow-md hover:cursor-pointer hover:bg-primary ease-in-out transition-all ${tab === "myCourses" ? "!bg-primary !text-white":"text-primary"}`} onClick={()=>setTab("myCourses")}>
                        <p className="font-header text-base group-hover:text-white"><span><FontAwesomeIcon icon={faBookBookmark}/></span> My Courses</p>
                        <p className="font-text text-xs group-hover:text-white">View all your inputted courses in one place</p>
                    </div>
                    <div className={`group flex flex-row items-center justify-between py-2 px-4 border-2 border-primary rounded-md bg-white shadow-md hover:cursor-pointer hover:bg-primary ease-in-out transition-all ${tab === "assignedCourses" ? "!bg-primary !text-white":"text-primary"}`} onClick={()=>setTab("assignedCourses")}>
                        <p className="font-header text-base group-hover:text-white"><span><FontAwesomeIcon icon={faBook}/></span> Assigned Courses</p>
                        <p className="font-text text-xs group-hover:text-white">View all your assigned courses in one place</p>
                    </div>
                </div>
                {/* <div className="col-start-2 flex flex-row gap-2 items-center pb-2">
                    <div className="border-2 border-primary p-1 px-2 aspect-square rounded-md shadow-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className="font-header text-primary">{pageState.currentPage}/{pageState.lastPage}</div>
                    <div className="border-2 border-primary p-1 px-2 aspect-square rounded-md shadow-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white">
                        <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                </div> */}
            </div>
            {/* Content */}
            <div className="w-full h-full grid grid-cols-4 grid-rows-1 gap-2">
            {
                    loading ? (
                        Array.from({length: 4}).map((_,i) =>(
                            <div className="animate-pulse w-full h-full grid grid-cols-1 grid-rows-[min-content_1fr_1fr_min-content] bg-white shadow-lg rounded-md">
                                <div className="bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] w-full h-14 rounded-t-md p-3">
                                    <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text w-20 h-5">
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center row-span-2 gap-2 px-3">
                                    <div className="h-5 w-40 bg-slate-500 rounded-full"></div>
                                    <div className="h-5 w-20 bg-slate-500 rounded-full"></div>
                                </div>
                            </div>
                        ))
                    ):(
                        assignedCourse.map((course)=>(
                            <div className="bg-white w-full h-full shadow-md rounded-md grid grid-cols-1 grid-rows-[min-content_1fr_1fr_min-content] hover:cursor-pointer hover:scale-105 transition-all ease-in-out" onClick={() => navigate(`/courseadmin/course/${course.id}`)}>
                                <div className="bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] w-full h-14 rounded-t-md p-3">
                                    <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">
                                        {course.training_type}
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center row-span-2 px-3">
                                    <p className="font-header text-sm text-primary">{course.name}</p>
                                    <p className="font-text text-unactive text-xs">Course ID: {course.CourseID}</p>
                                </div>
                                <div className="grid grid-cols-[1fr_min-content_1fr] gap-1 p-3">
                                    <div className="flex flex-row items-center font-text justify-between">
                                        <p className="text-xs text-unactive">On-going Learner</p>
                                        <p className="font-header text-primary">10</p>
                                    </div>
                                    <div className="w-[1px] h-full bg-divider"/>
                                    <div className="flex flex-row items-center font-text justify-between">
                                        <p className="font-header text-primary">10</p>
                                        <p className="text-xs text-right text-unactive">Enrolled Learner</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>

            <div className="flex flex-row justify-between pt-2">
                <div className="border-2 border-primary p-1 px-2 aspect-square rounded-md shadow-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white"
                onClick={back}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>

                <div className="flex flex-row items-center gap-2">
                    {
                        Array.from({length: pageState.lastPage}).map((_,i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i+1 === pageState.currentPage ? 'bg-primary': 'bg-unactive'}`}/>
                        ))
                    }
                </div>

                <div className="border-2 border-primary p-1 px-2 aspect-square rounded-md shadow-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white"
                onClick={next}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        </div>

        {/* Activities */}
        <div className='col-span-3 row-start-3 mr-5 pt-2 pb-5'>
            <div className="flex flex-col w-full h-full gap-2">
                <div>
                    <h1 className="font-header text-primary text-base">Activities</h1>
                    <p className="font-text text-unactive text-xs">Tracks your learners concerns and activities.</p>
                </div>

                {
                    <div className="w-full h-full flex flex-col gap-2">
                        <div className="w-full h-fit bg-white border-2 border-primary rounded-md shadow-md p-4 flex flex-row  justify-start items-center gap-3 hover:cursor-pointer hover:bg-primary group transition-all ease-in-out"
                            //onClick={() => navigate('/learner/learnercoursemanager/enrolled')}
                            >
                            {/* icon */}
                            <div className="group-hover:text-white group-hover:bg-gray-50 group-hover:bg-opacity-20  text-primary flex flex-col item-center justify-center bg-primarybg p-2 aspect-square rounded-full">
                                <FontAwesomeIcon icon={faGraduationCap} className="text-base"/>
                            </div>
                            {/* desc */}
                            <div className="flex flex-col justify-center items-start">
                                <p className="group-hover:text-white font-header text-sm text-primary">Self Enrollment Request</p>
                                <p className="group-hover:text-white font-text text-unactive text-xs">3 Learner's Request to Self-Enroll</p>

                            </div>
                        </div>
                        {/* <div className="w-full h-full bg-white border-2 border-primary rounded-md shadow-md px-3 py-1 flex flex-row  justify-start items-center gap-3 hover:cursor-pointer hover:bg-primary group transition-all ease-in-out"
                            onClick={() => navigate('/learner/learnercoursemanager/ongoing')}>
                             icon
                            <div className="group-hover:text-white group-hover:bg-gray-50 group-hover:bg-opacity-20  text-primary flex flex-col item-center justify-center bg-primarybg p-2 aspect-square rounded-full">
                                <FontAwesomeIcon icon={faClock} className="text-base"/>
                            </div>
                            desc
                            <div className="flex flex-col justify-center items-start">
                                <p className="group-hover:text-white font-header text-sm text-primary">On-going</p>
                                <p className="group-hover:text-white font-text text-unactive text-xs">You have 5 courses on-going</p>

                            </div>
                        </div> */}
                        <div className="w-full h-fit bg-white border-2 border-primary rounded-md shadow-md p-4 flex flex-row  justify-start items-center gap-3 hover:cursor-pointer hover:bg-primary group transition-all ease-in-out"
                            //onClick={() => navigate('/learner/learnercoursemanager/duesoon')}
                            >
                             {/* icon */}
                            <div className="group-hover:text-white group-hover:bg-gray-50 group-hover:bg-opacity-20  text-primary flex flex-col item-center justify-center bg-primarybg p-2 aspect-square rounded-full">
                                <FontAwesomeIcon icon={faTriangleExclamation} className="text-base"/>
                            </div>
                            {/* desc */}
                            <div className="flex flex-col justify-center items-start">
                                <p className="group-hover:text-white font-header text-sm text-primary">Due soon</p>
                                <p className="group-hover:text-white font-text text-unactive text-xs">3 Learners are not done to thier course</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        </div>
    )
}
export default CourseAdminDashboard;
