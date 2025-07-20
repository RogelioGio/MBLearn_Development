import { faAward, faBookOpen, faChevronLeft, faChevronRight, faFilter, faGraduationCap, faSearch, faSpider, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../components/ui/select';
import { format } from 'date-fns';


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
        setLoading(true);
        axiosClient.get(`/select-course-users/${course.id}?enrollment_status[eq]=${endpoint}`,
            {
            params: {
                page: pageState.currentPage,
                per_page: pageState.perPage,
            }
        }
        )
        .then((res) => {
            setLoading(false);
            setLearners(res.data.data.data);
            pageChangeState("totalUsers", res.data.total)
            pageChangeState("lastPage", res.data.lastPage)
        }).catch((err) => {
            console.log(err)
        })
    }


    const [pageState, setPagination] = useState({
        currentPage: 1,
        perPage: 5,
        totalUsers: 0,
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
        pageChangeState('startNumber', (pageState.currentPage - 1) * pageState.perPage + 1)
        pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.totalUsers))
    },[pageState.currentPage, pageState.perPage, pageState.totalUsers])

    useEffect(()=>{
        fetchLearners(tab);
    },[pageState.currentPage, pageState.perPage, tab])


    //Next and Previous
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

    //Current page change
    const pageChange = (page) => {
        if(loading) return;
        if(page > 0 && page <= pageState.lastPage){
            pageChangeState("currentPage", page)
        }
    }
    //Dynamic Pagging numbering
    const Pages = [];
    for(let p = 1; p <= pageState.lastPage; p++){
        Pages.push(p)
    }



    return(
        <div className='grid grid-rows-[min-content_1fr_min-content] grid-cols-4 h-full px-4
                        md:pr-2 md:px-0'>
            {/* Headers */}
            <div className='flex flex-col gap-1 py-2'>
                <p className='text-xs font-text text-unactive'>Learner Types:</p>
                <Select value={tab} onValueChange={setTab} disabled={loading}>
                    <SelectTrigger className="focus:outline-2 focus:-outline-offset-2 focus:outline-primary border-primary border-2 font-header text-primary w-full">
                        <SelectValue placeholder="Learner Type" />
                    </SelectTrigger>
                    <SelectContent className="font-text text-xs text-primary hover:cursor-pointer">
                        <SelectItem value="enrolled">Enrolled</SelectItem>
                        <SelectItem value="ongoing">On-Going</SelectItem>
                        <SelectItem value="pastdue">Past-Due</SelectItem>
                        <SelectItem value="finished">Finished</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='md:col-start-3 col-start-2 flex justify-end items-center py-2 '>
                <div className='w-10 h-10 bg-white border-2 border-primary rounded-md shadow-md flex items-center justify-center hover:cursor-pointer text-primary hover:bg-primary hover:text-white transition-all ease-in-out'>
                    <FontAwesomeIcon icon={faFilter} className='text-lg'/>
                </div>
            </div>
            <div className='flex flex-row justify-end items-center pl-2 col-span-2
                            md:col-span-1 md:col-start-4 '>
                <div className='w-full'>
                    <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className='col-span-4'>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                <th className={`py-4 px-4 ${tab === "pastdue" ? "md:table-cell hidden":""}`}>COURSE PROGRESS</th>
                                <th className={`${tab === "pastdue" ? "md:table-cell hidden":"hidden"}`}>CURRENT LEARNER STATUS</th>
                                <th className={`${tab === "pastdue" ? "md:table-cell hidden":"hidden"}`}>DUE-DATE</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    Array.from({ length: 5 }, (_, index) => (
                                        <tr key={index} className='font-text text-sm hover:bg-gray-200 animate-pulse' onClick={() => click(employeeID)}>
                                            <td className='text-sm  py-3 px-4'>
                                                <div className='flex items-center gap-2'>
                                                    {/* User Image */}
                                                    <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                        {/* //<img src={profile_url} alt="" className='rounded-full'/> */}
                                                    </div>
                                                    {/* Name and employee-id*/}
                                                    <div className='w-3/4 flex flex-col gap-2'>
                                                        <div className='h-4 w-10/12 bg-gray-300 rounded-full'></div>
                                                        <div className='h-4 w-1/ bg-gray-300 rounded-full'></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`py-3 px-4  flex-col gap-2 ${tab === "pastdue" ? "md:table-cell hidden":"flex"}`}>
                                                <div className='h-4 w-3/12 bg-gray-300 rounded-full'></div>
                                                <div className='h-4 w-1/2 bg-gray-300 rounded-full'></div>
                                            </td>
                                            <td className={`${tab === "pastdue" ? "md:table-cell hidden":"hidden"} `}>
                                                <div className='py-3 px-4 flex flex-col gap-2'>
                                                    <div className='h-4 w-3/12 bg-gray-300 rounded-full'></div>
                                                    <div className='h-4 w-1/2 bg-gray-300 rounded-full'></div>
                                                </div>
                                            </td>
                                            <td className={`${tab === "pastdue" ? "md:table-cell hidden":"hidden"}`}>
                                                <div className='py-3 px-4 flex flex-col gap-2'>
                                                    <div className='h-4 w-3/12 bg-gray-300 rounded-full'></div>
                                                    <div className='h-4 w-1/2 bg-gray-300 rounded-full'></div>
                                                </div>
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
                                            <div className={`items-center gap-2 ${tab === "pastdue" ? "md:flex hidden":"flex"}`}>
                                                {/* User Image */}
                                                <div className='bg-blue-500 min-h-10 min-w-10 w-10 h-10 rounded-full'>
                                                    <img src={learner.enrolled_user.profile_image} alt="" className='rounded-full'/>
                                                </div>
                                                {/* Name and employee-id*/}
                                                <div>
                                                    <p className='font-text'>{learner.enrolled_user.first_name} {learner.enrolled_user.middle_name} {learner.enrolled_user.last_name} {learner.enrolled_user.suffix_name}</p>
                                                    <p className='text-unactive text-xs'>ID: {learner.enrolled_user.employeeID}</p>
                                                </div>
                                            </div>
                                            <div className={`${tab === "pastdue" ? "md:hidden grid":"hidden"} grid-cols-[1fr_1fr_min-content] grid-row-[min-content_1fr] gap-1`}>
                                                <div className='row-span-2 flex flex-row gap-2 items-center'>
                                                    {/* User Image */}
                                                    <div className='bg-blue-500 min-h-10 min-w-10 w-10 h-10 rounded-full'>
                                                        <img src={learner.enrolled_user.profile_image} alt="" className='rounded-full'/>
                                                    </div>
                                                    {/* Name and employee-id*/}
                                                    <div>
                                                        <p className='font-text text-xs'>{learner.enrolled_user.first_name} {learner.enrolled_user.middle_name} {learner.enrolled_user.last_name} {learner.enrolled_user.suffix_name}</p>
                                                        <p className='text-unactive text-xs'>ID: {learner.enrolled_user.employeeID}</p>
                                                    </div>
                                                </div>
                                                <div className='col-start-3 flex flex-row items-end justify-end whitespace-nowrap'>
                                                    {
                                                        learner.enrollment_status  === "enrolled" ?
                                                        <>
                                                            <div className='bg-red-400 px-2 py-1 w-fit text-xs rounded-md border border-red-600 text-red-800'>
                                                                <p>Not-Started</p>
                                                            </div>
                                                        </> : learner.enrollment_status  === "ongoing" ?
                                                            <div className='bg-primarybg px-2 py-1 w-fit text-xs rounded-md border border-primary text-primary'>
                                                                <p>On-going</p>
                                                            </div> : null

                                                    }
                                                </div>
                                                <div className='row-start-1 row-span-2 col-start-2 flex flex-col justify-center'>
                                                    <div className='flex flex-row gap-2 items-center'>
                                                        <RingProgress
                                                        size={35} // Diameter of the ring
                                                        roundCaps
                                                        thickness={4} // Thickness of the progress bar
                                                        sections={[{ value: learner.completed_percentage, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                                        rootColor="hsl(210, 14%, 83%)" // Darker blue track
                                                        />
                                                        <p className='font-header'>{learner.completed_percentage}%</p>
                                                    </div>
                                                        <p className='font-text text-xs'>Employee Progress</p>
                                                </div>
                                                <div className='row-start-2 col-start-3 w-full whitespace-nowrap'>
                                                    <p>{format(new Date(learner.end_date), "MMMM dd yyyy")}</p>
                                                    <p className='text-xs text-unactive'>Due-Date</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`py-3 px-4 flex-row gap-2 ${tab === "pastdue" ? "md:flex  hidden":"flex"}`}>
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
                                        <td className={`${tab === "pastdue" ? "md:table-cell hidden":"hidden"}`}>
                                            {/* <p>{learner.enrollment_status}</p> */}
                                            {
                                                learner.enrollment_status  === "enrolled" ?
                                                <>
                                                    <div className='bg-red-400 px-2 py-1 w-fit text-xs rounded-md border border-red-600 text-red-800'>
                                                        <p>Not-Started</p>
                                                    </div>
                                                </> : learner.enrollment_status  === "ongoing" ?
                                                    <div className='bg-primarybg px-2 py-1 w-fit text-xs rounded-md border border-primary text-primary'>
                                                        <p>On-going</p>
                                                    </div> : null

                                            }
                                        </td>
                                        <td className={`${tab === "pastdue" ? "md:table-cell hidden":"hidden"}`}>
                                            <p>{format(new Date(learner.end_date), "MMMM dd yyyy")}</p>
                                        </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Paginate */}
            <div className='flex flex-row items-center justify-between col-span-4 md:pb-2 md:pt-0 py-2'>
                {
                    loading ?
                    <div className='text-unactive flex flex-row'>
                        <FontAwesomeIcon icon={faSpinner} className='animate-spin mr-2' />
                        <p className='font-text text-xs'>Loading Entries</p>
                    </div> :
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>{pageState.startNumber}</span> to <span className='font-header text-primary'>{pageState.endNumber}</span> of <span className='font-header text-primary'>{pageState.totalUsers}</span> <span className='text-primary'>results</span>
                    </p>
                }
                {/* Paganation */}
                <div>
                    <nav className={`isolate inline-flex -space-x-px round-md shadow-xs`}>
                        {/* Previous */}
                        <a
                            onClick={back}
                            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset transition-all ease-in-out ${loading ? "cursor-not-allowed opacity-50":"hover:bg-primary hover:text-white hover:cursor-pointer"}`}>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {Pages.map((page)=>(
                            <a
                                key={page}
                                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                    ${loading ? "cursor-not-allowed opacity-50" : "hover:bg-primary hover:text-white hover:cursor-pointer"}
                                    ${
                                        page === pageState.currentPage
                                        ? 'bg-primary text-white'
                                        : 'bg-secondarybackground text-primary '
                                    } transition-all ease-in-out`}
                                    onClick={() => pageChange(page)}>
                                {page}</a>
                        ))}
                        <a
                            onClick={next}
                            className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset transition-all ease-in-out ${loading ? "cursor-not-allowed opacity-50":"hover:bg-primary hover:text-white hover:cursor-pointer"}`}>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default CourseLearnerProps
