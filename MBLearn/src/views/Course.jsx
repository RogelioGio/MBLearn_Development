
import { faCircleLeft as faCircleLeftRegular } from "@fortawesome/free-regular-svg-icons"
import { faArrowDownShortWide, faArrowDownZA, faArrowUpAZ, faArrowUpWideShort, faCakeCandles, faSort } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Stepper } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"


export default function Course() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [course, setCourse] = useState([]);
    const [isLoading ,setLoading] = useState(true);


    //API Call for specific course
    const fetchCourses = () => {
        setLoading(true)
        axiosClient.get(`/courses/${id}`)
        .then(({data}) => {
            setCourse(data.data)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchCourses();

    },[])

    return(
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_1fr_min-content] h-full w-full overflow-hidden'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | {isLoading ? "Loading..." : course?.name || "No Course Found"}</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-row col-span-3 row-span-1 item-center pr-5 ml-5">
                <div className="text-primary flex flex-row justify-center items-center border-b border-divider">
                    <FontAwesomeIcon icon={faCircleLeftRegular} className="text-3xl" onClick={() => navigate(-1)}/>
                </div>
                <div className=' pl-5 flex flex-col justify-center border-b border-divider w-full'>
                    <h1 className='text-primary text-4xl font-header'> {course?.name || 'Loading...'}</h1>
                    <p className='font-text text-sm text-unactive'>{course?.category || 'Loading...'} - {course?.type || 'Loading...'}</p>
                </div>
            </div>

            {/* Tab Buttons */}
            <div className='row-start-2 col-span-3 w-auto grid grid-cols-5 ml-5 py-3 h-fit gap-3'>
                <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}>
                    <p>Modules</p>
                </div>
                <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}>
                    <p>Learners</p>
                </div>
                <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}>
                    <p>Enrollment</p>
                </div>
            </div>

            {/* Course status */}
            <div className="row-start-1 row-span-2 col-start-4 col-span-1 py-5 mr-5">
                <div className="flex flex-col h-full w-full border-primary border-2 rounded-md shadow-md">
                    {/* Header */}
                    <div className="w-auto py-2 px-4 bg-primary text-white font-header">
                        <p>Course Status:</p>
                    </div>
                    <div>
                        {/* Will be inputted Later on */}
                        Enrolled Employees
                    </div>
                </div>
            </div>

            {/* Course content */}
            <div className="row-start-3 col-span-3 ml-5 pr-5">
                {/* Sample content but needed to be changes as props to be dynamic */}
                <div className="w-auto h-auto grid grid-cols-2 grid-row-2">
                    {/* Course Desription */}
                    <div className="col-span-2 row-span-1 py-5">
                        <p className="font-header text-primary text-2xl">Course Description:</p>
                        <p className="font-text text-base">{course?.description}</p>
                    </div>
                    {/* Course Objective */}
                    <div className="col-span-1 row-span-1 py-5">
                        <p className="font-header text-primary text-2xl">Course Objective:</p>
                        <p className="font-text text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam necessitatibus at doloremque atque veritatis? Commodi nihil vero omnis corporis pariatur unde totam, laboriosam aperiam. Perferendis illo nisi molestiae voluptates asperiores!</p>
                    </div>
                    {/* Course Content */}
                    <div className="col-span-1 row-span-1 py-5">
                        <p className="font-header text-primary text-2xl">Course Outcome:</p>
                        <p className="font-text text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam necessitatibus at doloremque atque veritatis? Commodi nihil vero omnis corporis pariatur unde totam, laboriosam aperiam. Perferendis illo nisi molestiae voluptates asperiores!</p>
                    </div>
                </div>
            </div>

            {/* Course Sidebar */}
            <div className="row-start-3 col-start-4 my-2 border-l border-l-divider">
                {/* Header */}
                <div className="py-3 px-5">
                    <p className="font-header text-primary">Module conntent</p>
                </div>
                {/* Module List */}
                <div className="py-3 px-5">
                    <Stepper orientation="vertical">
                    <Stepper.Step label="Module 1" description="Module Description" />
                    <Stepper.Step label="Module 2" description="Module Description" />
                    <Stepper.Step label="Module 3" description="Module Description" />
                    </Stepper>
                </div>
            </div>

        </div>


    )
}
