import { faAward, faBookOpen, faChevronLeft, faChevronRight, faFilter, faGraduationCap, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';

const CourseLearnerProps = ({course}) => {


    const stat = {
        progress: 50, // Progress in percentage
        color: "white", // Color of the progress ring
    };
    // Tab
    const [tab, setTab] = useState("enrolled");
    const [learners, setLearners] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLearners = (endpoint) => {
        axiosClient.get(`/select-course-users/${course.id}?enrollment_status[eq]=${endpoint}`)
        .then((res) => {
            setLearners(res.data.data.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        setLoading(true);
        fetchLearners(tab);
    },[tab]);
    useEffect(() => {
        console.log(learners)
    }), [learners]

    return(
        <div className="mr-5 grid grid-rows-[min-content_min-content_auto_min-content] grid-cols-4 h-full">
                {/* Header */}
                <div className='w-full grid grid-row-1 grid-cols-3 gap-2 col-span-4 pt-2'>
                    <div className= {`text-primary p-3 border-2 border-primary bg-white rounded-md hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out ${tab === "enrolled" ? "!bg-primary text-white":null}`} onClick={() => setTab("enrolled")}>
                        <div className='flex flex-row items-center gap-2'>
                            <FontAwesomeIcon icon={faGraduationCap}/>
                            <h1 className="font-header text-lg">Latest Learner </h1>
                        </div>
                        <p className="font-text text-xs">Latest batch of learner that is going to take this course</p>
                    </div>
                    <div className= {`text-primary p-3 border-2 border-primary bg-white rounded-md hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out ${tab === "ongoing" ? "!bg-primary text-white":null}`} onClick={() => setTab("ongoing")}>
                    <div className='flex flex-row items-center gap-2'>
                            <FontAwesomeIcon icon={faBookOpen}/>
                            <h1 className="font-header text-lg">On-going Learners</h1>
                        </div>
                        <p className="font-text text-xs">On-going batch that is currently taking the course</p>
                    </div>
                    <div className= {`text-primary p-3 border-2 border-primary bg-white rounded-md hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out ${tab === "finished" ? "!bg-primary text-white":null}`} onClick={() => setTab("finished")}>
                    <div className='flex flex-row items-center gap-2'>
                            <FontAwesomeIcon icon={faAward}/>
                            <h1 className="font-header text-lg">Completed Learners</h1>
                        </div>
                        <p className="font-text text-xs">Previous batch that is done taking the course</p>
                    </div>
                </div>

                {/* Filter & Search */}
                <div className='flex flex-col justify-center'>
                    <div className='flex flex-row items-center justify-center bg-white text-primary gap-2 border-2 border-primary w-fit h-fit py-2 px-4 rounded-md hover:text-white hover:bg-primary transition-all ease-in-out hover:cursor-pointer'>
                        <FontAwesomeIcon icon={faFilter}/>
                        <p className='font-header text-sm'>Filter</p>
                    </div>
                </div>
                <div className='pl-2 py-2 flex flex-row justify-center items-end col-start-4'>
                    <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                        <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                        <div className='bg-primary py-2 px-4 text-white'>
                            <FontAwesomeIcon icon={faSearch}/>
                        </div>
                    </div>
                </div>

                {/* Learners */}
                <div className='col-span-4 flex flex-col'>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 w-2/7'>EMPLOYEE NAME</th>
                                <th className='py-4 px-4 w-1/7'>COURSE PROGRESS</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    Array.from({ length: 5 }, (_, index) => (
                                        <tr className='font-text text-sm hover:bg-gray-200 animate-pulse' onClick={() => click(employeeID)}>
                                            <td className='text-sm  py-3 px-4'>
                                                <div className='flex items-center gap-2'>
                                                    {/* User Image */}
                                                    <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                        {/* //<img src={profile_url} alt="" className='rounded-full'/> */}
                                                    </div>
                                                    {/* Name and employee-id*/}
                                                    <div className='w-3/4 flex flex-col gap-2'>
                                                        <div className='h-4 w-full bg-gray-300 rounded-full'></div>
                                                        <div className='h-4 w-1/2 bg-gray-300 rounded-full'></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4 flex flex-col gap-2'>
                                                <div className='h-4 w-full bg-gray-300 rounded-full'></div>
                                                <div className='h-4 w-1/2 bg-gray-300 rounded-full'></div>
                                            </td>
                                            </tr>
                                    ))
                                ) : learners.length === 0 ? (
                                    <tr className='font-text text-sm hover:bg-gray-200'>
                                        <td colSpan={2} className='text-center text-unactive py-3 px-4'>
                                            No Enrollees
                                        </td>
                                    </tr>
                                ) : (
                                    learners?.map((learner) => (
                                        <tr key={learner.id} className='font-text text-sm hover:bg-gray-200'>
                                        <td className='text-sm  py-3 px-4'>
                                            <div className='flex items-center gap-2'>
                                                {/* User Image */}
                                                <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                    <img src={learner.enrolled_user.profile_image} alt="" className='rounded-full'/>
                                                </div>
                                                {/* Name and employee-id*/}
                                                <div>
                                                    <p className='font-text'>{learner.enrolled_user.first_name} {learner.enrolled_user.middle_name} {learner.enrolled_user.last_name} {learner.enrolled_user.suffix_name}</p>
                                                    <p className='text-unactive text-xs'>ID: {learner.enrolled_user.employeeID}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4 flex flex-row gap-2'>
                                            <RingProgress
                                                size={35} // Diameter of the ring
                                                roundCaps
                                                thickness={4} // Thickness of the progress bar
                                                sections={[{ value: learner.completed_percentage, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                                rootColor="hsl(210, 14%, 83%)" // Darker blue track
                                                />
                                            <div>
                                                <p className='font-header'>{learner.completed_percentage}%</p>
                                                <p className='font-text text-xs'>Employee Progress</p>
                                            </div>
                                        </td>
                                        </tr>
                                    ))
                                )
                            }

                        </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination */}
                <div className="col-span-4 h-full flex flex-row items-center justify-between py-3 border-t border-divider">
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>1</span> to <span className='font-header text-primary'>2</span> of <span className='font-header text-primary'>5</span> <span className='text-primary'>results</span>
                    </p>
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
                        {/* {Pages.map((page)=>(
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
                        ))} */}
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
export default CourseLearnerProps
