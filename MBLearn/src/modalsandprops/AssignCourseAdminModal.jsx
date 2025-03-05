import { faChevronDown, faTrashCan, faUserPen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import AddAssignCourseAdmin from "./AddAssignCourseAdmin";




const AssignCourseAdmin = ({courseID ,open, close}) => {
    const [isLoading, setLoading] = useState(true);
    const [course, setCourse] = useState();

    //Add Course Admin
    const [isOpen, setIsOpen] = useState(false)

    const fetchCourse = () => {
        setLoading(true)
        axiosClient.get(`/courses/${courseID}`)
        .then(({data}) => {
            setCourse(data.data)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(()=>{
        fetchCourse();
    },[courseID])

    return (
        <>
        <Dialog open={open} onClose={close}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-10"/>
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md w-3/4 bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                            {/* Header */}
                            <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row justify-between item-center">
                                <div>
                                    <h1 className="text-primary font-header text-3xl">Assigned Course Admins</h1>
                                    <p className="text-unactive font-text text-md">Manage all current assigned course and add selected course admin to the selected course</p>
                                </div>
                                <div className={`text-primary border-2 border-primary h-full py-2 px-4 rounded-md shadow-md flex flex-row gap-2 items-center self-center transition-all ease-in-out ${
                                        isLoading
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer"
                                    }`} onClick={()=>setIsOpen(true)}>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    <p className="font-header">Assign Course Admin</p>
                                </div>
                            </div>
                            {/* Selected Course */}
                            <div className="mx-4 py-2">
                                <p className="font-text text-unactive text-sm">Selected Course:</p>
                                <p className="font-header text-primary text-xl">{course?.name || "Loading.."}</p>
                            </div>
                            {/* Content */}
                            <div className="grid mx-4 pb-4">
                                {/* Header */}
                                <p className="font-text text-unactive text-sm">Course Admin Filter:</p>
                                {/* Fiter Category */}
                                <div className="flex flex-row py-1 w-full justify-between">
                                    <div className="flex flex-row gap-2">
                                        <div className="flex flex-row gap-5 border-2 border-primary rounded-md">
                                            <select className="appearance-none font-text col-start-1 row-start-1 p-2 border-none focus:outline-none rounded-md">
                                                <option>Department</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                            <div className="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end">
                                                <FontAwesomeIcon icon={faChevronDown} className="text-primary"/>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-5 border-2 border-primary rounded-md">
                                            <select className="appearance-none font-text col-start-1 row-start-1 p-2 border-none focus:outline-none rounded-md">
                                                <option>Branch City</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                            <div className="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end">
                                                <FontAwesomeIcon icon={faChevronDown} className="text-primary"/>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-5 border-2 border-primary rounded-md">
                                            <select className="appearance-none font-text col-start-1 row-start-1 p-2 border-none focus:outline-none rounded-md">
                                                <option>Branch Location</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                            <div className="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end">
                                                <FontAwesomeIcon icon={faChevronDown} className="text-primary"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="font-header text-center text-white border-2 border-primary py-2 px-14 rounded-md shadow-md bg-primary hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">Filter</div>
                                </div>
                                <div>
                                    {/* Course Admin Table */}
                                    <div className="py-1">
                                        <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                            <table className='text-left w-full overflow-y-scroll'>
                                                <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                                    <tr>
                                                        <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                                        <th className='py-4 px-4'>DEPARTMENT</th>
                                                        <th className='py-4 px-4'>BRANCH</th>
                                                        <th className='py-4 px-4'></th>
                                                    </tr>
                                                </thead>
                                                <tbody className='bg-white divide-y divide-divider'>
                                                    <tr className='font-text text-sm hover:bg-gray-200' onClick={() => click(employeeID)}>
                                                            <td className='text-sm  py-3 px-4'>
                                                                <div className='flex items-center gap-2'>
                                                                    {/* User Image */}
                                                                    <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                                        {/* //<img src={profile_url} alt="" className='rounded-full'/> */}
                                                                    </div>
                                                                    {/* Name and employee-id*/}
                                                                    <div>
                                                                        <p className='font-text'>SampleName</p>
                                                                        <p className='text-unactive text-xs'>ID: 1234567789</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='py-3 px-4'>
                                                                <div className='flex flex-col'>
                                                                    {/* Department */}
                                                                    <p className='text-unactive'>IT</p>
                                                                    {/* Title */}
                                                                    <p className='text-unactive text-xs'>Developer</p>
                                                                </div>
                                                            </td>
                                                            <td className='py-3 px-4'>
                                                                <div className='flex flex-col'>
                                                                {/* Branch Location */}
                                                                <p className='text-unactive'>General Santos</p>
                                                                {/* City Location */}
                                                                <p className='text-unactive text-xs'>Novaliches</p>
                                                                </div>
                                                            </td>
                                                            {/* Action */}
                                                            <td className='py-3 px-4 flex justify-end'>
                                                                    <FontAwesomeIcon icon={faTrashCan} className="p-3 border border-primary rounded-md text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all ease-in-out hover:cursor-pointer"/>
                                                            </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
        <AddAssignCourseAdmin courseID={courseID} open={isOpen} close={()=> setIsOpen(false)}/>
        </>
    );
}
export default AssignCourseAdmin;
