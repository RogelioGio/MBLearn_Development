import { faArrowLeft, faArrowRight, faBook, faBookBookmark, faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Axios } from "axios";
import axiosClient from "MBLearn/src/axios-client";
import AnnouncmentCarousel from "MBLearn/src/modalsandprops/dashboardComponents/AnnouncementCarousel";
import { useEffect, useState } from "react";
const CourseAdminDashboard = ({name, user}) => {
    const [tab, setTab] = useState("myCourses")
    const [loading, setLoading] = useState(false)
    const [assignedCourse, setAssignedCourse] = useState([])

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
                    page: 1,
                    //pageState.currentPage,
                    perPage: 4
                    //pageState.perPage,
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
            <div className='row-start-3 col-span-3 px-5 pt-2 p-2 flex flex-col'>
                {/* Header */}
                <div className="grid grid-cols-[auto_min-content] grid-rows-1 gap-10">
                    <div className="grid grid-cols-[1fr_1fr] gap-2 pb-2">
                        <div className={`group flex flex-col justify-center py-2 px-4 border-2 border-primary rounded-md bg-white shadow-md hover:cursor-pointer hover:bg-primary ease-in-out transition-all ${tab === "myCourses" ? "!bg-primary !text-white":"text-primary"}`} onClick={()=>setTab("myCourses")}>
                            <p className="font-header text-base group-hover:text-white"><span><FontAwesomeIcon icon={faBookBookmark}/></span> My Courses</p>
                            {/* <p className="font-text text-xs group-hover:text-white">View all your inputted courses in one place</p> */}
                        </div>
                        <div className={`group flex flex-col justify-center py-2 px-4 border-2 border-primary rounded-md bg-white shadow-md hover:cursor-pointer hover:bg-primary ease-in-out transition-all ${tab === "assignedCourses" ? "!bg-primary !text-white":"text-primary"}`} onClick={()=>setTab("assignedCourses")}>
                            <p className="font-header text-base group-hover:text-white"><span><FontAwesomeIcon icon={faBook}/></span> Assigned Courses</p>
                            {/* <p className="font-text text-xs group-hover:text-white">View all your assigned courses in one place</p> */}
                        </div>
                    </div>
                    <div className="col-start-2 flex flex-row gap-2 items-center pb-2">
                        <div className="border-2 border-primary p-1 px-2 aspect-square rounded-md shadow-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                        <div className="font-header text-primary">{pageState.currentPage}/{pageState.lastPage}</div>
                        <div className="border-2 border-primary p-1 px-2 aspect-square rounded-md shadow-md text-primary hover:bg-primary hover:cursor-pointer hover:text-white">
                            <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                    </div>
                </div>
                {/* Content */}
                <div className="w-full h-full grid grid-cols-4 grid-rows-1 gap-2">
                    {
                        loading ? (
                            Array.from({length: 4}).map((_, entry)=>(
                                <div key={entry.id} className="bg-white rounded-md shadow-md animate-pulse">
                                    <div className="flex justify-start bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] w-full h-2/5 rounded-t-md p-2">
                                    {/* Thumbnail */}
                                    </div>
                                    <div className="border w-full h-full p-3 grid grid-cols-1 grid-rows-[min-content_1fr_1fr]">
                                        <div className="flex flex-col justify-center gap-y-1">
                                            <div className="h-5 w-4/5 bg-gray-400 rounded-full"></div>
                                            <div className="h-4 w-2/5 bg-gray-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ): assignedCourse.length === 0 ?(
                            <div className="col-span-4 flex justify-center items-center h-full">
                                <p className="font-text text-unactive">No Courses Found</p>
                            </div>
                        ):(
                            assignedCourse.map((course) => (
                                <div key={course.id} className="bg-white border border-divider w-full h-full shadow-md rounded-md hover:scale-105 hover:cursor-pointer flex flex-col transition-all ease-in-out" onClick={() => navigate(`/learner/course/${course.id}`)}>
                                    <div className="flex justify-start bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] w-full h-2/5 rounded-t-md p-2">
                                        {/* Thumbnail */}
                                        <div>
                                    {
                                        course.training_type ? (<span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-primary font-text">
                                            {course.training_type}
                                        </span>)
                                        :(null)
                                    }
                                        </div>
                                    </div>
                                    <div className="border w-full h-full p-3 grid grid-cols-1 grid-rows-[min-content_1fr_1fr]">
                                        <div className="flex flex-col justify-center">
                                            <p className="font-header text-sm text-primary">{course.name}</p>
                                            <p className="font-text text-unactive text-xs">{course.types[0]?.type_name} - {course.categories[0]?.category_name}</p>
                                        </div>
                                        {/* <div className="flex flex-col justify-center">
                                            <p className="font-text text-unactive text-xs">Deadline: MMMM/DD/YYYY </p>
                                        </div> */}
                                        {/* Prgress */}
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default CourseAdminDashboard;
