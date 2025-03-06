import { faChevronDown, faTrashCan, faUserPen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import AddAssignCourseAdmin from "./AddAssignCourseAdmin";




const AssignCourseAdmin = ({courseID ,open, close}) => {
    const [isLoading, setLoading] = useState(true);
    const [course, setCourse] = useState();

    const [state, setState] = useState({
        departments:[],
        cities:[],
        branches:[]
    })
    const toggleState = (key, value) => {
        setState((prev) => ({
            ...prev,
            [key]: typeof value === "function" ? value(prev[key]) : value, // Support function-based updates
        }));
    };

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
    const fetchFilter = async () => {
        try{
            const [department, city, location] = await Promise.all([
                axiosClient.get('/departments'),
                axiosClient.get('/cities'),
                axiosClient.get('/branches')
            ]);

            toggleState("departments", department.data.data)
            toggleState("cities", city.data.data)
            toggleState("branches", location.data.data)


        } catch (error) {
            console.error("Error: ", error )
        }
    }

    useEffect(()=>{
        fetchCourse();
        fetchFilter()
    },[courseID])

    useEffect(()=>{
        setCourse("")
    },[close])


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
                                <div className={`text-primary border-2 border-primary h-full py-2 px-4 rounded-md shadow-md flex flex-row gap-2 items-center self-center transition-all ease-in-out ${isLoading ? 'cursor-progress':'cursor-pointer'}`} onClick={()=>{isLoading ? null : setIsOpen(true);}}>
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
                            <div className="grid mx-4 pb-4 space-y-2">
                                {/* Fiter Category */}
                                <div className="grid grid-cols-[auto_min-content] gap-x-10">
                                    {/* Header */}
                                    <p className="row-start-1 col-span-2 font-text text-unactive text-sm">Course Admin Filter:</p>
                                    <div className="row-start-2 flex flex-row gap-2">
                                        {/* Department */}
                                        <div class="grid grid-cols-1 w-full">
                                            <select id="department" name="department" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                // value={formik2.values.course_type}
                                                // onChange={formik2.handleChange}
                                                // onBlur={formik2.handleBlur}
                                            >
                                            <option value="">Select a Department</option>
                                            {state.departments.map((department) => (
                                                <option key={department.id} value={department.id}>{department.department_name}</option>
                                            ))}
                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        {/* City */}
                                        <div class="grid grid-cols-1 w-full">
                                            <select id="course_type" name="course_type" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                // value={formik2.values.course_type}
                                                // onChange={formik2.handleChange}
                                                // onBlur={formik2.handleBlur}
                                            >
                                            <option value="">Select a Branch City</option>
                                                    {state.cities.map((city) => (
                                                        <option key={city.id} value={city.id}>{city.city_name}</option>
                                                    ))}
                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        {/* Location */}
                                        <div class="grid grid-cols-1 w-full">
                                            <select id="course_type" name="course_type" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                // value={formik2.values.course_type}
                                                // onChange={formik2.handleChange}
                                                // onBlur={formik2.handleBlur}
                                            >
                                            <option value="">Select a Branch Location</option>
                                                    {state.branches.map((branch) => (
                                                        <option key={branch.id} value={branch.id}>{branch.branch_name}</option>
                                                    ))}
                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="w-full font-header text-center text-white border-2 border-primary py-2 px-14 rounded-md shadow-md bg-primary hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">Filter</div>
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
