import { faCircleCheck as faCircleCheckRegular, faCircleLeft as faCircleLeftRegular } from "@fortawesome/free-regular-svg-icons"
import { faArrowDownShortWide, faArrowDownZA, faArrowLeft, faArrowUpAZ, faArrowUpWideShort, faBook, faBookBookmark, faBookOpenReader, faBookReader, faCakeCandles, faChalkboard, faChalkboardUser, faCircle, faCircleInfo, faClipboard, faClipboardUser, faFile, faFileContract, faGraduationCap, faPencil, faPenToSquare, faPieChart, faSort, faSpinner, faSquareCheck, faTrash, faUser, faUserCircle, faUserGraduate, faUserGroup, faUserPlus, faUserTie } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Stepper } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { ContextProvider, useStateContext } from "../contexts/ContextProvider"
import CourseOverview from "../modalsandprops/courseComponents/CourseOverview"
import CourseText from "../modalsandprops/courseComponents/courseText"
import CourseVideo from "../modalsandprops/courseComponents/courseVideo"
import CourseModuleProps from "../modalsandprops/CourseModuleProps"
import CourseLearenerProps from "../modalsandprops/CourseLearnerProps"
import CourseEnrollmentProps from "../modalsandprops/CourseEnrollmentProps"
import { use } from "react"
import EditCourseModal from "../modalsandprops/EditCourseModal"
import { set } from "date-fns"
import AssignCourseAdmin from "../modalsandprops/AssignCourseAdminModal"
import dayjs from "dayjs"
import CourseLoading from "../assets/Course_Loading.svg"
import CourseDetailsModal from "../modalsandprops/CourseDetailsModal"
import CourseCourseAdminAssignmentProps from "../modalsandprops/CourseCourseAdminAssigmentProps"
import AddAssignCourseAdmin from "../modalsandprops/AddAssignCourseAdmin"
import CoursePublishingModal from "../modalsandprops/CoursePublishingModal"
import { useCourse } from "../contexts/Course"



export default function Course() {
    const navigate = useNavigate();
    const {role, user} = useStateContext();
    const {id} = useParams();
    //const [course, setCourse] = useState([]);
    const [isLoading ,setLoading] = useState(false);
    const [tab, setTab] = useState("module");
    const [open, setOpen] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [openPublish, setOpenPublish] = useState(false);
    const [assign, setAssign] = useState(false);
    const {course, setCourse} = useCourse()
    const [learnerProgress, setLearnerProgress] = useState();


    // useEffect(() => {
    //     console.log('the corse is passed is:', course || "none");
    // },[course])

    useEffect(()=>{
        if(!course && role === "Course Admin") {
            setLoading(true)
            axiosClient.get(`/coursecontext/${id}`)
            .then((res) => {
                setLoading(false);
                setCourse(res.data)
            })
            .catch((e) => console.log(e))
        } else if(!course && role === "Learner") {
            setLoading(true)
            axiosClient.get(`/coursecontext/${id}/${user.user_infos.id}`)
            .then((res) => {
                setLearnerProgress(res.data.completed_lessons);
                setCourse(res.data);
                setLoading(false)
            }).catch((e) => console.log(e))
        }
    },[course])

    // useEffect(() => {
        //     console.log("Active Tab:", tab);
        // }, [tab]);

        const tabComponents = {
            module: <CourseModuleProps course={course}/>,
            learner: <CourseLearenerProps course={course}/>,
            courseAdmin: <CourseCourseAdminAssignmentProps courseID={course}/>,
            enrollment: <CourseEnrollmentProps course={course}/>,
        };

    return(
        <>
        <div className={`grid ${role === "Course Admin" ? "grid-cols-4 grid-rows-[min-content_min-content_auto]":"grid-cols-[1fr_20rem] grid-rows-[min-content_min-content_4rem_auto]"} grid-rows-[4rem_3rem_auto] h-full w-full overflow-hidden`}>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | {isLoading ? "Loading..." : course?.name || "No Course Found"}</title>
            </Helmet>


            {
                role === "Course Admin" ? (
                    <>
                        {/* Header */}
                        <div className="py-2 col-span-4 pr-2">
                            <div className="bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-xl shadow-md">
                                <div className="flex flex-col gap-4 bg-gradient-to-b from-transparent to-black rounded-xl">
                                    <div className="flex flex-row justify-end px-4 pt-4 gap-x-2">
                                        {/* <div className=" flex flex-row  items-center text-white justify-center border-2 border-white rounded-md px-4 py-2 gap-3 w-fit transition-all ease-in-out hover:cursor-pointer hover:bg-white hover:text-primary">
                                            <FontAwesomeIcon icon={faBookBookmark} />
                                            <p className="font-header">Publish</p>
                                        </div>
                                        <div className=" flex flex-row  items-center text-white justify-center border-2 border-white rounded-md px-4 py-2 gap-3 w-fit transition-all ease-in-out hover:cursor-pointer hover:bg-white hover:text-primary">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                            <p className="font-header">Edit</p>
                                        </div>
                                        <div className=" flex flex-row  items-center text-white justify-center border-2 border-white rounded-md px-4 py-2 gap-3 w-fit transition-all ease-in-out hover:cursor-pointer hover:bg-white hover:text-primary">
                                            <FontAwesomeIcon icon={faBookOpenReader} />
                                            <p className="font-header">Assign</p>
                                        </div>
                                        <div className=" flex flex-row  items-center text-white justify-center border-2 border-white rounded-md px-4 py-2 gap-3 w-fit transition-all ease-in-out hover:cursor-pointer hover:bg-white hover:text-primary">
                                            <FontAwesomeIcon icon={faCircleInfo} />
                                            <p className="font-header">Details</p>
                                        </div> */}
                                        <div className="group relative">
                                            <div className="border-2 bnorder-primary w-10 h-10 rounded-md flex items-center justify-center text-white hover:cursor-pointer hover:bg-white hover:text-primary transition-all ease-in-out">
                                                <FontAwesomeIcon icon={faBookBookmark} />
                                            </div>
                                            <p className="scale-0 group-hover:scale-100 font-text text-xs p-2 rounded bg-tertiary text-white absolute left-1/2 -translate-x-1/2 -bottom-10 shadow-md transition-all ease-in-out">
                                                Publish
                                            </p>
                                        </div>
                                        <div className="border-2 bnorder-primary w-10 h-10 rounded-md flex items-center justify-center text-white">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </div>
                                        <div className="border-2 bnorder-primary w-10 h-10 rounded-md flex items-center justify-center text-white">
                                            <FontAwesomeIcon icon={faBookReader} />
                                        </div>
                                        <div className="border-2 bnorder-primary w-10 h-10 rounded-md flex items-center justify-center text-white">
                                            <FontAwesomeIcon icon={faCircleInfo} />
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-3 pb-4 px-5">
                                        {
                                            !isLoading &&
                                            <div>
                                                <div className="w-8 h-8 group aspect-square rounded-full border-white border-2 flex flex-row justify-center items-center hover:bg-white transition-all ease-in-out" onClick={()=>navigate(-1)}>
                                                    <FontAwesomeIcon icon={faArrowLeft} className="text-white cursor-pointer group-hover:text-primary"/>
                                                </div>
                                            </div>
                                        }
                                        <div className={`${isLoading ? "flex flex-row gap-2 text-white text-2xl items-center":""}`}>
                                            {
                                                isLoading ?
                                                <>
                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin"/>
                                                <h1 className="font-header text-2xl text-white">Loading... </h1>
                                                </>
                                                :
                                                <>
                                                <h1 className="font-header text-2xl text-white">{course?.name} </h1>
                                                <p className="font-text text-xs text-white">Course ID: {course?.CourseID} </p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="col-span-4 flex flex-row gap-2">
                            <div className={`border-2 border-primary rounded-md shadow-md w-fit py-2 px-4 flex flex-row gap-4 items-center justify-center text-primary hover:cursor-pointer transition-all ease-in-out hover:bg-primaryhover hover:border-primaryhover hover:text-white ${tab === "module" ? "border-b-2 border-primary text-white bg-primary" : 'bg-white text-primary'}`} onClick={()=> setTab("module")}>
                                <FontAwesomeIcon icon={faFileContract}/>
                                <p className="font-header">Course Content</p>
                            </div>
                            <div className={`border-2 border-primary rounded-md shadow-md w-fit py-2 px-4 flex flex-row gap-4 items-center justify-center text-primary hover:cursor-pointer transition-all ease-in-out hover:bg-primaryhover hover:border-primaryhover hover:text-white ${tab === "learner" ? "border-b-2 border-primary text-white bg-primary" : 'bg-white text-primary'}`} onClick={()=> setTab("learner")}>
                                <FontAwesomeIcon icon={faUserGraduate}/>
                                <p className="font-header">Learners</p>
                            </div>
                            <div className={`border-2 border-primary rounded-md shadow-md w-fit py-2 px-4 flex flex-row gap-4 items-center justify-center text-primary hover:cursor-pointer transition-all ease-in-out hover:bg-primaryhover hover:border-primaryhover hover:text-white ${tab === "courseAdmin" ? "border-b-2 border-primary text-white bg-primary" : 'bg-white text-primary'}`} onClick={()=> setTab("courseAdmin")}>
                                <FontAwesomeIcon icon={faUserTie}/>
                                <p className="font-header">Course Admin</p>
                            </div>
                            <div className={`border-2 border-primary rounded-md shadow-md w-fit py-2 px-4 flex flex-row gap-4 items-center justify-center text-primary hover:cursor-pointer transition-all ease-in-out hover:bg-primaryhover hover:border-primaryhover hover:text-white ${tab === "enrollment" ? "border-b-2 border-primary text-white bg-primary" : 'bg-white text-primary'}`} onClick={()=> setTab("enrollment")}>
                                <FontAwesomeIcon icon={faUserPlus}/>
                                <p className="font-header">Enrollment</p>
                            </div>
                            <div className={`border-2 border-primary rounded-md shadow-md w-fit py-2 px-4 flex flex-row gap-4 items-center justify-center text-primary hover:cursor-pointer transition-all ease-in-out hover:bg-primaryhover hover:border-primaryhover hover:text-white ${tab === "report" ? "border-b-2 border-primary text-white bg-primary" : 'bg-white text-primary'}`} onClick={()=> setTab("report")}>
                                <FontAwesomeIcon icon={faPieChart}/>
                                <p className="font-header">Course Reports</p>
                            </div>
                        </div>
                        {/* Tabs */}
                        {/* <div className="border-b border-divider col-span-4 mx-5 flex flex-row">
                            <div className={`group flex justify-center items-center px-5 hover:border-b-2 hover:border-b-primary transition-all ease-in-out hover:cursor-pointer ${tab === "module" ? "border-b-2 border-primary text-primary" : 'text-unactive'}`} onClick={()=> setTab("module")}>
                                <p className="font-header group-hover:text-primary">Modules</p>
                            </div>
                            <div className= {`group flex justify-center items-center px-5 hover:border-b-2 hover:border-b-primary transition-all ease-in-out hover:cursor-pointer ${tab === "learner" ? "border-b-2 border-primary text-primary" : 'text-unactive'}`} onClick={()=> setTab("learner")}>
                                <p className="font-header group-hover:text-primary">Learners</p>
                            </div>
                            <div className= {`group flex justify-center items-center px-5 hover:border-b-2 hover:border-b-primary transition-all ease-in-out hover:cursor-pointer ${tab === "courseAdmin" ? "border-b-2 border-primary text-primary" : 'text-unactive'}`} onClick={()=> setTab("courseAdmin")}>
                                <p className="font-header group-hover:text-primary">Course Admins</p>
                            </div>
                            <div className= {`group flex justify-center items-center px-5 hover:border-b-2 hover:border-b-primary transition-all ease-in-out hover:cursor-pointer ${tab === "enrollment" ? "border-b-2 border-primary text-primary" : 'text-unactive'}`} onClick={()=> setTab("enrollment")}>
                                <p className="font-header group-hover:text-primary">Enroll Learner</p>
                            </div>
                            <div className= {`group flex justify-center items-center px-5 hover:border-b-2 hover:border-b-primary transition-all ease-in-out hover:cursor-pointer ${tab === "report" ? "border-b-2 border-primary text-primary" : 'text-unactive'}`} onClick={()=> setTab("report")}>
                                <p className="font-header group-hover:text-primary">Course-wide Reports</p>
                            </div>
                        </div> */}

                        {/* Course Content */}
                        {/* <div className="w-full h-full col-span-4 row-span-1 px-5">
                            {tabComponents[tab] || null}
                        </div> */}
                    </>
                ) : role === "Learner" ? (

                    <>
                        <CourseModuleProps headers={<>
                            <div className="flex flex-row col-span-4 items-center gap-4 pl-5">
                                {/* Back Button */}
                                    <div className="w-8 h-8 group aspect-square rounded-full border-white border-2 flex flex-row justify-center items-center hover:bg-white transition-all ease-in-out" onClick={()=>navigate(-1)}>
                                    <FontAwesomeIcon icon={faArrowLeft} className="text-white cursor-pointer group-hover:text-primary"/>
                                </div>
                                {/* Course Name */}
                                <div >
                                    {
                                        course && Object.keys(course).length > 0 ? <>
                                            <h1 className="font-header text-2xl text-white">{course?.name} </h1>
                                            <p className="font-text text-xs text-white">Course ID: {course?.CourseID} </p>
                                        </>:<>
                                            <h1 className="font-header text-3xl font-bold text-white">Loading...</h1>
                                        </>
                                    }
                                </div>
                                {/* Course Status */}
                                {/* <span className="inline-flex items-center rounded-md bg-secondaryprimary px-4 py-2 text-xs font-medium text-primary font-text ring-1 ring-primary gap-1">
                                    <FontAwesomeIcon icon={faPencil} className="text-primary text-xs mr-1"/>
                                    Unpublished
                                </span> */}
                            </div>
                            <div className="flex flex-row gap-1 pr-5">
                                {/* Action Button */}
                                {/* <div className={`text-white text-sm border-2 border-white h-full py-2 px-4 rounded-md shadow-md flex flex-row gap-2 items-center transition-all ease-in-out  ${Object.keys(course).length > 0 ? "hover:scale-105 hover:bg-white hover:text-primary hover:cursor-pointer" : "opacity-50"}`} onClick={()=>{if(Object.keys(course).length > 0){setOpenDetails(true)}else return}}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                    <p className="font-header">Detail</p>
                                </div> */}
                            </div>
                        </>} course={course} LearnerProgress={learnerProgress} setLearnerProgress={setLearnerProgress} fetchingLearnerProgress={isLoading}/>
                    </>
                ) :
                // isLoading && role === "Learner" ? (
                //     <div className="col-span-2 row-span-4 flex flex-col justify-center items-center">
                //         <img src={CourseLoading} alt="" className="w-80"/>
                //         <p className="text-4xl font-header text-primary">Loading...</p>
                //         <p className="text-sm font-text text-primary">Hang tight! 🚀 Loading courses for — great things take a second!</p>
                //     </div>
                // ) :
                (
                    <div className="col-span-4 row-span-3 flex flex-col justify-center items-center">
                        <img src={CourseLoading} alt="" className="w-80"/>
                        <p className="text-4xl font-header text-primary">Loading...</p>
                        <p className="text-sm font-text text-primary">Hang tight! 🚀 Loading courses for — great things take a second!</p>
                    </div>
                )
            }




        </div>
        {/* Edit */}
        <EditCourseModal open={open} close={()=>setOpen(false)} id={course?.id} course={course}/>
        {/* Assign Course Admin */}
        {/* <AssignCourseAdmin open={assign} close={()=>setAssign(false)} id={course?.id}/> */}
        <AddAssignCourseAdmin courseID={course?.id} open={assign}  close={()=>setAssign(false)} />
        {/* CourseDetail */}
        <CourseDetailsModal open={openDetails} close={()=>setOpenDetails(false)} selectedCourse={course}/>
        {/* Course Publishing */}
        <CoursePublishingModal open={openPublish} close={()=>setOpenPublish(false)} />
        </>

    )
}
