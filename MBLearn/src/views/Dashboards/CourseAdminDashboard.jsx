import { faArrowLeft, faArrowRight, faBook, faBookBookmark, faBookOpenReader, faClock, faGraduationCap, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Axios } from "axios";
import axiosClient from "MBLearn/src/axios-client";
import AnnouncmentCarousel from "MBLearn/src/modalsandprops/dashboardComponents/AnnouncementCarousel";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Calendar from "MBLearn/src/modalsandprops/dashboardComponents/Calendar";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CourseCard from "MBLearn/src/modalsandprops/CourseCard";
import { useCourse_Context } from "MBLearn/src/contexts/Course_Context";


const CourseAdminDashboard = ({name, user}) => {
    const [tab, setTab] = useState("myCourses")
    const [loading, setLoading] = useState(false)
    const [assignedCourse, setAssignedCourse] = useState([])
    const {setCourse} = useCourse_Context();
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
    },[pageState.currentPage, pageState.perPage, tab])

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
        {/* Courses Carosel */}
        <div className='row-start-3 col-span-3 px-5 pt-2 p-2 grid grid-rows-[min-content_1fr] grid-cols-4 gap-2'>
            {/* Header */}
            <div className="col-span-2 flex flex-row justify-between gap-2">
                    <div className={`w-full group flex flex-row items-center justify-between py-2 px-4 border-2 border-primary rounded-md bg-white shadow-md hover:cursor-pointer hover:bg-primary ease-in-out transition-all ${tab === "myCourses" ? "!bg-primary !text-white":"text-primary"}`} onClick={()=>setTab("myCourses")}>
                        <p className="font-header text-base group-hover:text-white"><span><FontAwesomeIcon icon={faBookBookmark}/></span> My Courses</p>
                    </div>
                    <div className={`w-full group flex flex-row items-center justify-between py-2 px-4 border-2 border-primary rounded-md bg-white shadow-md hover:cursor-pointer hover:bg-primary ease-in-out transition-all ${tab === "assignedCourses" ? "!bg-primary !text-white":"text-primary"}`} onClick={()=>setTab("assignedCourses")}>
                        <p className="font-header text-base group-hover:text-white"><span><FontAwesomeIcon icon={faBook}/></span> Assigned Courses</p>
                    </div>
            </div>
            {/* Content */}
            <div className="row-start-2 col-span-4 grid grid-cols-4 gap-2 h-full pb-2">
            {
                    loading ? (
                        Array.from({length: 4}).map((_,i) =>(
                            <div key={i} className="animate-pulse bg-white w-full h-full rounded-md shadow-md"/>
                        ))
                    ):(
                        assignedCourse.length > 0 ? (
                            assignedCourse.map((course)=>(
                            <CourseCard key={course.id} course={course} type='courseAdmin' click={()=>{navigate(`/courseadmin/course/${course.id}`); setCourse(course)}}/>
                        ))
                        ) : (
                            <div className="w-full flex flex-col justify-center items-center col-span-4">
                                <p className="font-text text-unactive">No Courses Available</p>
                            </div>
                        )
                    )
                }
            </div>
            <div className="col-start-4 row-start-1 flex flex-row gap-2 items-center justify-end">
                <div className="flex justify-center items-center border-2 border-primary w-10 h-10 rounded-md shadow-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white"
                onClick={back}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="flex justify-center items-center border-2 border-primary w-10 h-10 rounded-md shadow-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white"
                onClick={next}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        </div>

        {/* Activities */}
        <div className='row-start-3 mr-5 pt-2 pb-5'>
            <div className="flex flex-col w-full h-full gap-2">
                <div>
                    <h1 className="font-header text-primary text-base">Activities</h1>
                    <p className="font-text text-unactive text-xs">Tracks your learners concerns and activities.</p>
                </div>

                <div className="w-full h-full grid grid-col-1 grid-rows-3 gap-2 ">
                    {
                        loading ? (
                            Array.from({length: 3}).map((_, i) => (
                            <div className="animate-pulse bg-white w-full rounded-md shadow-md flex items-center justify-between" key={i}/>
                        ))
                        ) : (
                        Array.from({length: 3}).map((_, i) => (
                            <div className="border-primary border bg-white w-full rounded-md shadow-md flex items-center justify-between" key={i}/>
                        )))
                    }
                </div>
            </div>
        </div>
        </div>
    )
}
export default CourseAdminDashboard;
