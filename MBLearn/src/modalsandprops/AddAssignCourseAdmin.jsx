import { faChevronDown, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useCourseContext } from "../contexts/CourseListProvider";
import { useFormik } from "formik";
import Course from "../views/Course";
import CourseAssigningProps from "./CourseAssigingProps";
import * as Yup from 'yup';

const AddAssignCourseAdmin = ({courseID ,open, close}) => {
    const {departments, cities, branches} = useCourseContext()
    const [loading, setLoading] = useState(false)
    const [selectedBranches, setSelectedBranches] = useState([])
    const [filteredEmployee, setFilteredEmployee] = useState([])
    const [selectedCourseAdmin, setSelectedCourseAdmin] = useState([])

    useEffect(()=>{
        setIsFiltered(false)
    },[])

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

    const formik = useFormik({
        initialValues: {
            department: '',
            branch: '',
            city: '',
        },
        validationSchema: Yup.object({
            department: Yup.string().required('Required'),
            branch: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values)
            axiosClient.get(`/index-user?department_id[eq]=${values.department}&branch_id[eq]=${values.branch}`)
            .then((response) => {
                console.log(response.data.data)
                setFilteredEmployee(response.data.data)
                setLoading(false)
            })
        }
    })
    //Must be filter first
    const[isfiltered, setIsFiltered] = useState(false);
    const SubmitFilter = () => {
        setLoading(true)
        setIsFiltered(true)
        setTimeout(() => {
            formik.handleSubmit();
        }, 0);
    }

    useEffect(()=>{
        formik.resetForm()
        setIsFiltered(false)
        setFilteredEmployee([])
        setSelectedCourseAdmin([])
        setLoading(false)
    },[close])

    const handleBranchesOptions = (e) =>{
        const city = e.target.value;
        formik.setFieldValue('city', city)
        formik.setFieldValue('branch', '')

        //Filtering
        const filteredBranches = branches.filter((branch) => branch.city_id.toString() === city)
        setSelectedBranches(filteredBranches)
    }

    const handleSelectedCourseAdmin = (e, id) => {
        if (e.target.checked) {
            setSelectedCourseAdmin((prev) => [...prev, id]);
        } else {
            setSelectedCourseAdmin((prev) => prev.filter((item) => item !== id));
        }
    }

    const handleAssigningCourseAdmin = () => {
        const formattedData = selectedCourseAdmin.map(id => ({ user_id: id }));
        axiosClient.post(`/assign-course-admin/${courseID}`, formattedData)
        .then((response) => {console.log(response.data)})
        .catch((error) => {console.log(error)})
        //assign-course-admin/{course}'
        console.log(formattedData);
    }

    return(
        <Dialog open={open} onClose={()=>{}}>
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-20"/>
            <div className='fixed inset-0 z-20 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='z-20 relative overflow-hidden transform rounded-md w-3/4 bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                           {/* Header */}
                            <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-col justify-between item-center">
                                    <h1 className="text-primary font-header text-3xl">Add Assigned Course Admins</h1>
                                    <p className="text-unactive font-text text-md">Manage all current assigned course and add selected course admin to the selected course</p>
                            </div>
                            {/* Content */}
                            <div className="grid mx-4 pt-4 gap-y-4">
                                {/* Fiter Category */}
                                <div className="grid grid-cols-[auto_min-content] gap-x-10">
                                    {/* Header */}
                                    <p className="row-start-1 col-span-2 font-text text-unactive text-sm">Course Admin Filter:</p>
                                    <div className="">
                                        <form onSubmit={formik.handleSubmit} className="row-start-2 grid  grid-cols-3 gap-x-3">
                                        {/* Department */}
                                        <div class="grid grid-cols-1 w-full row-start-1 ">
                                            <select id="department" name="department" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                value={formik.values.department}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            <option value="">Select a Department</option>
                                            {departments.map((department) => (
                                                <option key={department.id} value={department.id}>{department.department_name}</option>
                                            ))}
                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <label htmlFor="department" className="font-text text-unactive text-sm col-start-1">Department</label>
                                        {/* City */}
                                        <div class="grid grid-cols-1 w-full row-start-1 ">
                                            <select id="city" name="city" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                value={formik.values.city}
                                                onChange={handleBranchesOptions}
                                                onBlur={formik.handleBlur}
                                            >
                                            <option value="">Select a Branch City</option>
                                                    {cities.map((city) => (
                                                        <option key={city.id} value={city.id}>{city.city_name}</option>
                                                    ))}
                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <label htmlFor="department" className="font-text text-unactive text-sm col-start-2">Branch City</label>
                                         {/* Location */}
                                        <div class="grid grid-cols-1 w-full row-start-1 ">
                                            <select id="branch" name="branch" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                value={formik.values.branch}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            <option value="">Select a Branch Location</option>
                                                    {selectedBranches.map((branch) => (
                                                        <option key={branch.id} value={branch.id}>{branch.branch_name}</option>
                                                    ))}
                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <label htmlFor="department" className="font-text text-unactive text-sm col-start-3">Branch Location</label>
                                        </form>
                                    </div>
                                    <div className="w-full h-fit  border-2 border-primary py-2 px-14 rounded-md shadow-md bg-primary hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white" onClick={()=>SubmitFilter()}>
                                        <p className="font-header text-white">
                                            Filter
                                        </p>
                                    </div>
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
                                                    </tr>
                                                </thead>
                                                <tbody className='bg-white divide-y divide-divider'>
                                                    {loading ? (
                                                        <tr className="font-text text-sm hover:bg-gray-200">
                                                            <td colSpan={4} className="text-center py-3 px-4 font-text text-primary">
                                                                Loading...
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        filteredEmployee.length > 0 ? (
                                                            filteredEmployee.map((employee) => (
                                                                <CourseAssigningProps
                                                                    key={employee.id}
                                                                    isfiltered={isfiltered}
                                                                    id = {employee.id}
                                                                    handleInput={handleSelectedCourseAdmin}
                                                                    name={`${employee.first_name} ${employee.middle_name} ${employee.last_name} ${employee.name_suffix || ""}`.trim()}
                                                                    loading={loading}
                                                                    employeeID={employee.employeeID || "Not Available"}
                                                                    department={employee.department?.department_name || "Not Available"}
                                                                    title={employee.title?.title_name || "Not Available"}
                                                                    branch={employee.branch?.branch_name || "Not Available"}
                                                                    city={employee.city?.city_name || "Not Available"}
                                                                    selectedCourseAdmin={selectedCourseAdmin.includes(employee.id)}
                                                                />
                                                            ))
                                                        ) : (
                                                            <tr className="font-text text-sm hover:bg-gray-200">
                                                                <td colSpan={4} className="text-center py-3 px-4 font-text text-primary">
                                                                    Filter first the course admin you want to add for the course
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                    {/* Action Buttons */}
                                <div className="flex flex-row gap-4 py-4">
                                    <div className="flex flex-row justify-center items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md" onClick={close}>
                                        <p>Cancel</p>
                                    </div>
                                    <div className="flex flex-row justify-center items-center border-2 border-primary py-2 px-4 font-header bg-primary rounded-md text-white gap-2 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md"
                                        onClick={handleAssigningCourseAdmin}>
                                        <p>Add Course Admin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
    </Dialog>
    )
};

export default AddAssignCourseAdmin;
