import { faTrashCan, faUserPen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React from "react";




const AssignCourseAdmin = ({open, close}) => {
    return (
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
                                <div className="text-primary border-2 border-primary h-full py-2 px-4 rounded-md shadow-md flex flex-row gap-2 items-center self-center hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out">
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    <p className="font-header">Assign Course Admin</p>
                                </div>
                            </div>
                            {/* Selected Course */}
                            <div className="mx-4 py-2">
                                <p className="font-text text-unactive">Selected Course</p>
                                <p className="font-header text-primary text-xl">Course Name here</p>
                            </div>
                            {/* Content */}
                            <div className="grid mx-4 pb-4">
                                {/* Assigned Course Admin */}
                                <div>
                                    {/* Header */}
                                    <div className="py-1">
                                        <h1 className="font-header text-primary">Currently Assigned Course Admins</h1>
                                        <p className="font-text text-unactive">List of the current assigned course admin for the selected course</p>
                                    </div>
                                    {/* Fiter Category */}
                                    <div className="flex flex-row gap-2 py-1">
                                        <div className="text-primary border-2 border-primary h-full py-2 px-4 rounded-md shadow-md flex flex-row gap-2 items-center self-center hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out">
                                            <p className="font-header">Department</p>
                                        </div>
                                        <div className="text-primary border-2 border-primary h-full py-2 px-4 rounded-md shadow-md flex flex-row gap-2 items-center self-center hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out">
                                            <p className="font-header">Branch City</p>
                                        </div>
                                        <div className="text-primary border-2 border-primary h-full py-2 px-4 rounded-md shadow-md flex flex-row gap-2 items-center self-center hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out">
                                            <p className="font-header">Branch Location</p>
                                        </div>
                                    </div>

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
    );
}
export default AssignCourseAdmin;
