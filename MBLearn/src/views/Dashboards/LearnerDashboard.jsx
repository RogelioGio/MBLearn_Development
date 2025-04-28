import { faGraduationCap } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axiosClient from "MBLearn/src/axios-client"
import AnnouncmentCarousel from "MBLearn/src/modalsandprops/dashboardComponents/AnnouncementCarousel"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const LearnerDashboard = ({name,user}) => {
    const [enrolled, setEnrolled] = useState([])
    useEffect(()=>{
        axiosClient.get(`/select-user-courses/${user.id}`)
    .then(({data}) => {
        console.log(data.data)
        setEnrolled(data.data)
    })
    .catch((err) => {console.log(err)});
    }, [])

    useEffect(() => {
        console.log(enrolled)
    },[setEnrolled,enrolled])

    const navigate = useNavigate();

    return(
        <div className="grid  grid-cols-4 grid-rows-[6.25rem_1fr_1fr] h-full w-full">
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
        <div className='col-span-1 row-span-1 pb-2 pt-5 mr-5 '>
            <div className='bg-white w-full h-full rounded-md shadow-md p-5'>

            </div>
        </div>
        <div className='col-span-3 row-start-3 ml-5 pr-2 pt-2 pb-5'>
            <div className="flex flex-col w-full h-full gap-2">
                <div>
                    <h1 className="font-header text-primary text-base">Enrolled Courses</h1>
                    <p className="font-text text-unactive text-xs">View all your enrolled courses in one place and stay on top of your learning journey.</p>
                </div>
                {
                    enrolled.length > 0 ? (
                        <div className="w-full h-full grid grid-cols-4 grid-rows-1 gap-2">
                            {
                                enrolled.map((course) => {
                                    return (
                                        <div className="bg-white border border-divider w-full h-full shadow-md rounded-md hover:scale-105 hover:cursor-pointer flex flex-col transition-all ease-in-out" onClick={() => navigate(`/learner/course/${course.id}`)}>
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
                                                <div className="flex flex-col justify-center">
                                                    <p className="font-text text-unactive text-xs">Deadline: MMMM/DD/YYYY </p>
                                                </div>
                                                {/* Prgress */}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center gap-2">
                            <p className="text-unactive font-text">No Courses Enrolled Yet</p>
                        </div>
                    )
                }
            </div>




        </div>
        {/*

        <div className='col-span-3 row-start-3 ml-5 pr-2 pt-2 pb-5'>
            <div className='bg-white w-full h-full rounded-md shadow-md'>
                <h1>Enrolled Courses</h1>

            </div>
        </div>
        <div className='col-span-1 row-start-3 mr-5 pt-2 pb-5 flex flex-col justify-between gap-4'>
            <div className='bg-white w-full h-full rounded-md shadow-md p-5'></div>
            <div className='bg-white w-full h-full rounded-md shadow-md p-5'></div>
            <div className='bg-white w-full h-full rounded-md shadow-md p-5'></div>
        </div>
 */}

    </div>
    )
}

export default LearnerDashboard
