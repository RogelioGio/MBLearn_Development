import { faBook, faBookBookmark, faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnnouncmentCarousel from "MBLearn/src/modalsandprops/dashboardComponents/AnnouncementCarousel";
import { useEffect, useState } from "react";

const CourseAdminDashboard = ({name, user}) => {
    const [tab, setTab] = useState()
    useEffect(()=>{
        setTab(1)
    },[])

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
            <div className='row-start-3 col-span-3 px-5 pt-2 pb-5 flex flex-col'>
                {/* Header */}
                <div className="grid grid-cols-[1fr_1fr] gap-4">
                    <div className={`group flex flex-col justify-center py-2 px-4 border-2 border-primary rounded-md bg-white shadow-md hover:cursor-pointer hover:bg-primary ease-in-out transition-all ${tab === 1 ? "!bg-primary !text-white":"text-primary"}`} onClick={()=>setTab(1)}>
                        <p className="font-header text-base group-hover:text-white"><span><FontAwesomeIcon icon={faBookBookmark}/></span> My Courses</p>
                        <p className="font-text text-xs group-hover:text-white">View all your inputted courses in one place</p>
                    </div>
                    <div className={`group flex flex-col justify-center py-2 px-4 border-2 border-primary rounded-md bg-white shadow-md hover:cursor-pointer hover:bg-primary ease-in-out transition-all ${tab === 2 ? "!bg-primary !text-white":"text-primary"}`} onClick={()=>setTab(2)}>
                        <p className="font-header text-base group-hover:text-white"><span><FontAwesomeIcon icon={faBook}/></span> Assigned Courses</p>
                        <p className="font-text text-xs group-hover:text-white">View all your assigned courses in one place</p>
                    </div>
                </div>
                {/* Content */}
                <div className="mt-4 w-full h-full grid grid-cols-4 grid-rows-1 gap-2">
                    {
                        Array.from({ length: 4 }, (_, index) => (
                            <div className="border-2 border-red-500">

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default CourseAdminDashboard;
