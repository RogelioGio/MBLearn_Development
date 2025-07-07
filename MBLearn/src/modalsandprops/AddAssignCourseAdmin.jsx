import { faChevronDown, faFilter, faSearch, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useCourseContext } from "../contexts/CourseListProvider";
import { useFormik } from "formik";
import Course from "../views/Course";
import CourseAssigningProps from "./CourseAssigingProps";
import * as Yup from 'yup';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    } from "../components/ui/drawer"
import AssignCourseAdminModalSuccessfully from "./AssignCourseAdminSuccessfullyModal";
import { useOption } from "../contexts/AddUserOptionProvider"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet";


const AddAssignCourseAdmin = ({courseID ,open, close,}) => {
    const {departments, cities, location, division ,section} = useOption()
    const [loading, setLoading] = useState(false)
    const [selectedBranches, setSelectedBranches] = useState([])
    const [filteredEmployee, setFilteredEmployee] = useState([])
    const [selectedCourseAdmin, setSelectedCourseAdmin] = useState([])
    const [assiging, setAssigning] = useState(false)
    const [assigned, setAssigned] = useState(false)
    const [number, setNumber] = useState(0)

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
            division: '',
            department: '',
            section: '',
            branch: '',
            city: '',
        },
        onSubmit: (values) => {
            setLoading(true)
            console.log(values)
            axiosClient.get(`/get-available-course-admins/${courseID}?department_id[eq]=${values.department}&branch_id[eq]=${values.branch}&division_id[eq]=${values.division}&section_id[eq]=${values.section}`)
            .then((response) => {
                console.log(response.data.data)
                setFilteredEmployee(response.data.data)
                setLoading(false)
                setIsFiltered(true)
            })


            // setTimeout(() => {
            //     formik.handleSubmit();
            // }, 0);
        }
    })
    //Must be filter first
    const[isfiltered, setIsFiltered] = useState(false);

    // useEffect(()=>{
    //     formik.resetForm()
    //     setIsFiltered(false)
    //     setFilteredEmployee([])
    //     setSelectedCourseAdmin([])
    //     setLoading(false)
    // },[close])

    const handleBranchesOptions = (e) =>{
        const city = e.target.value;
        formik.setFieldValue('city', city)
        formik.setFieldValue('branch', '')
        console.log(city)
        console.log(location.city_id)


        //Filtering
        setSelectedBranches(location?.filter((l) => String(l.city_id) === String(city)));
    }

    const handleSelectedCourseAdmin = (e, id) => {
         // If event came from a checkbox, don't let it bubble to <tr>
        e.stopPropagation();

        // We check manually if the item is already selected
        setSelectedCourseAdmin((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    }

    const handleAssigningCourseAdmin = () => {
        const formattedData = selectedCourseAdmin.map(id => ({ user_id: id }));
        setAssigning(true)
        axiosClient.post(`/assign-course-admin/${courseID}`, formattedData)
        .then((response) => {
            console.log(response.data)
            setAssigning(false)
            setAssigned(true)
            setNumber(selectedCourseAdmin.length)
        })
        .catch((error) => {console.log(error)})
        //assign-course-admin/{course}'
        console.log(formattedData);
    }

    const handleClose = () => {
        setSelectedCourseAdmin([])
        setFilteredEmployee([])
        setAssigned(false)
    }

    const content = () => {
        return(
                                        <div>
                                    {/* Course Admin Table */}
                                    <div className="py-1">
                                        <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                            <table className='text-left w-full overflow-y-scroll'>
                                                <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                                    <tr>
                                                        <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                                        <th className='py-4 px-4'>DIVISION</th>
                                                        <th className='py-4 px-4'>DEPARTMENT</th>
                                                        <th className='py-4 px-4'>SECTION</th>
                                                        <th className='py-4 px-4'>LOCATION</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='bg-white divide-y divide-divider'>
                                                    {loading ? (
                                                        <tr className="font-text text-sm hover:bg-gray-200">
                                                            <td colSpan={6} className="text-center py-3 px-4 font-text text-primary">
                                                                Loading Eligable Course Admins...
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
                                                                    name={`${employee.first_name} ${employee.middle_name || ""} ${employee.last_name} ${employee.name_suffix || ""}`.trim()}
                                                                    loading={loading}
                                                                    employeeID={employee.employeeID || "Not Available"}
                                                                    division={employee.division?.division_name || "Not Available"}
                                                                    department={employee.department?.department_name || "Not Available"}
                                                                    section={employee.section?.section_name || "Not Available"}
                                                                    title={employee.title?.title_name || "Not Available"}
                                                                    branch={employee.branch?.branch_name || "Not Available"}
                                                                    city={employee.city?.city_name || "Not Available"}
                                                                    profile_image={employee?.profile_image || "Not Available"}
                                                                    selectedCourseAdmin={selectedCourseAdmin.includes(employee.id)}
                                                                />
                                                            ))
                                                        ) : (
                                                            <tr className="font-text text-sm hover:bg-gray-200">
                                                                <td colSpan={6} className="text-center py-3 px-4 font-text text-primary">
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
        )
    }

    const content2 = () => {
        <div className="grid mx-4 py-4 space-y-2">
                                {/* Fiter Category */}
                                <div className="grid grid-rows-1 grid-cols-6 gap-2">
                                    {/* Header */}
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <button className="py-2 font-header text-primary flex flex-row gap-2 justify-center items-center border-2 border-primary p-2 rounded-md shadow-md hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">
                                                <FontAwesomeIcon icon={faFilter}/>
                                                <p>Filter</p>
                                            </button>
                                        </DrawerTrigger>
                                        <DrawerContent>
                                            <div className="mx-auto w-full p-5">
                                                <DrawerHeader className="pb-2">
                                                    <DrawerTitle>
                                                        <p className="font-header text-primary">
                                                            Course Admin Filter
                                                        </p>
                                                    </DrawerTitle>
                                                    <DrawerDescription>
                                                        <p className="text-xs font-text">
                                                            Select option to categorize and filter the given entries
                                                        </p>
                                                    </DrawerDescription>
                                                </DrawerHeader>
                                                <div>
                                                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }} className="row-start-2 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] gap-x-1">
                                                    {/* Division */}
                                                    <div class="grid grid-cols-1 w-full row-start-1">
                                                        <select id="division" name="division" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                            value={formik.values.division}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        >
                                                        <option value="">Select a Division</option>
                                                        {division?.map((division) => (
                                                            <option key={division.id} value={division.id}>{division.division_name}</option>
                                                        ))}
                                                        </select>
                                                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <label htmlFor="division" className="font-text text-unactive text-sm col-start-1 pb-4">Division</label>
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
                                                    <label htmlFor="department" className="font-text text-unactive text-sm col-start-2 pb-4">Department</label>
                                                    {/* Section */}
                                                    <div class="grid grid-cols-1 w-full row-start-1 ">
                                                        <select id="section" name="section" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                            value={formik.values.section}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        >
                                                        <option value="">Select a Section</option>
                                                        {section?.map((section) => (
                                                            <option key={section.id} value={section.id}>{section.section_name}</option>
                                                        ))}
                                                        </select>
                                                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <label htmlFor="department" className="font-text text-unactive text-sm col-start-3 pb-4">Section</label>
                                                    {/* City */}
                                                    <div class="grid grid-cols-1 w-full col-start-4 row-start-1 ">
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
                                                    <label htmlFor="department" className="font-text text-unactive text-sm col-start-4 row-start-2">Branch City</label>
                                                    {/* Location */}
                                                    <div class="grid grid-cols-1 w-full col-start-5 row-start-1">
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
                                                    <label htmlFor="department" className="font-text text-unactive text-sm col-start-5 row-start-2">Branch Location</label>
                                                    <button type="submit" className="aspect-square col-start-6 row-start-1  flex flex-row gap-2 justify-center items-center border-2 border-primary p-2 rounded-md shadow-md bg-primary hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">
                                                        <FontAwesomeIcon icon={faFilter} className="text-white"/>
                                                    </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>

                                    <div className="col-start-5 col-span-2">
                                        <div>
                                            <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                                                <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                                                <div className='bg-primary py-2 px-4 text-white'>
                                                    <FontAwesomeIcon icon={faSearch}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
    }

    return(
        <>
        <Dialog open={open} onClose={()=>{}}>
        <DialogBackdrop transition className="backdrop-blur-sm fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-20"/>
            <div className='fixed inset-0 z-20 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
                                                        w-[100vw]
                                                        md:w-[80vw]'>
                        <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                           {/* Header */}
                            <div className="pb-2 mx-4 border-b border-divider flex flex-row justify-between item-center">
                                <div>
                                    <h1 className="text-primary font-header
                                                text-base
                                                md:text-2xl">Add Assigned Course Admins</h1>
                                    <p className="text-unactive font-text
                                                text-xs
                                                md:text-sm">Manage all current assigned course and add selected course admin to the selected course</p>
                                </div>
                                <div>
                                    <div className="border-2 border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out
                                                    w-5 h-5 text-xs
                                                    md:w-8 md:h-8 md:text-base"
                                                    onClick={() => {
                                                        close();
                                                        setTimeout(() => {
                                                            formik.resetForm();
                                                            setFilteredEmployee([]);
                                                        },500)
                                                    }}>
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </div>
                                </div>
                            </div>

                            <div className="py-2 px-4 grid grid-cols-4 gap-2">
                                <div className="col-span-3
                                                md:col-span-2">
                                    <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                                        <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                                        <div className='bg-primary py-2 px-4 text-white'>
                                            <FontAwesomeIcon icon={faSearch}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-end md:col-start-4">
                                    <Sheet>
                                        <SheetTrigger className="h-full">
                                            <div className="group relative h-full">
                                                <div className={`w-10 h-10 border-2 border-primary rounded-md flex items-center justify-center hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer transition-all ease-in-out
                                                                md:w-fit md:h-full md:px-4 md:flex gap-2
                                                                ${filteredEmployee.length > 0 ? "bg-primary text-white" : "bg-white text-primary"}`}>
                                                    <FontAwesomeIcon icon={faFilter} className="text-lg" />
                                                    <p className="font-header text-base hidden md:block">Filter</p>
                                                </div>
                                                <div className="md:hidden scale-0 group-hover:scale-100 whitespace-nowrap font-text text-xs p-2 rounded bg-tertiary text-white absolute left-1/2 -translate-x-1/2 -bottom-9 shadow-md transition-all ease-in-out">
                                                    <p>Filter</p>
                                                </div>
                                            </div>
                                        </SheetTrigger>
                                        <SheetOverlay className="bg-gray-500/75 backdrop-blur-sm transition-all" />
                                        <SheetContent className="h-full flex-col flex">
                                            <SheetTitle className="text-primary font-header text-lg">Course Admin Filter</SheetTitle>
                                            <SheetDescription className="text-unactive font-text text-xs">Select option to categorize and filter the given entries</SheetDescription>

                                            <>
                                            <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }} className="flex flex-col gap-2">
                                                {/* Division */}
                                                <div>
                                                    <label htmlFor="division" className="font-text text-xs col-start-1">Division</label>
                                                    <div class="grid grid-cols-1 w-full row-start-1">
                                                        <select id="division" name="division" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                            value={formik.values.division}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        >
                                                        <option value="">Select a Division</option>
                                                        {division?.map((division) => (
                                                            <option key={division.id} value={division.id}>{division.division_name}</option>
                                                        ))}
                                                        </select>
                                                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="department" className="font-text text-xs">Department</label>
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
                                                </div>
                                                <div>
                                                    <label htmlFor="section" className="font-text text-xs">Section</label>
                                                    <div class="grid grid-cols-1 w-full row-start-1 ">
                                                        <select id="section" name="section" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                            value={formik.values.section}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        >
                                                        <option value="">Select a Section</option>
                                                        {section?.map((section) => (
                                                            <option key={section.id} value={section.id}>{section.section_name}</option>
                                                        ))}
                                                        </select>
                                                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="city" className="font-text text-xs">Branch City</label>
                                                    <div class="grid grid-cols-1 w-full col-start-4 row-start-1 ">
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
                                                </div>
                                                <div>
                                                    <label htmlFor="department" className="font-text text-xs">Branch Location</label>
                                                    <div class="grid grid-cols-1 w-full col-start-5 row-start-1">
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
                                                </div>
                                            </form>
                                            <div className="font-header bg-primary text-white border-2 border-primary rounded-md p-3 mt-4 flex flex-row gap-2 justify-center items-center hover:cursor-pointer hover:bg-primaryhover hover:border-primaryhover hover:text-white transition-all ease-in-out"
                                                onClick={() => {formik.handleSubmit()}}>
                                                <FontAwesomeIcon icon={faFilter} className="text-lg"/>
                                                <p>Filter</p>
                                            </div>
                                            </>

                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="px-4">
                                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                    <table className='text-left w-full overflow-y-scroll'>
                                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                            <tr>
                                                <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                                <th className='py-4 px-4 hidden lg:table-cell'>DIVISION</th>
                                                <th className='py-4 px-4 hidden lg:table-cell'>DEPARTMENT</th>
                                                <th className='py-4 px-4 hidden lg:table-cell'>SECTION</th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white divide-y divide-divider'>
                                            {
                                                loading ? (
                                                    <tr className="font-text text-sm hover:bg-gray-200">
                                                        <td colSpan={6} className="text-center py-3 px-4 font-text text-primary">
                                                            Loading Eligable Course Admins...
                                                        </td>
                                                    </tr>
                                                ) : filteredEmployee.length > 0 ?
                                                    filteredEmployee.map((employee) => (
                                                        <CourseAssigningProps
                                                                    key={employee.id}
                                                                    isfiltered={isfiltered}
                                                                    id = {employee.id}
                                                                    handleInput={handleSelectedCourseAdmin}
                                                                    name={`${employee.first_name} ${employee.middle_name || ""} ${employee.last_name} ${employee.name_suffix || ""}`.trim()}
                                                                    loading={loading}
                                                                    employeeID={employee.employeeID || "Not Available"}
                                                                    division={employee.division?.division_name || "Not Available"}
                                                                    department={employee.department?.department_name || "Not Available"}
                                                                    section={employee.section?.section_name || "Not Available"}
                                                                    title={employee.title?.title_name || "Not Available"}
                                                                    branch={employee.branch?.branch_name || "Not Available"}
                                                                    city={employee.city?.city_name || "Not Available"}
                                                                    profile_image={employee?.profile_image || "Not Available"}
                                                                    selectedCourseAdmin={selectedCourseAdmin.includes(employee.id)}
                                                                />
                                                    ))
                                                :
                                                <tr className="font-text text-xs md:text-sm hover:bg-gray-200">
                                                    <td colSpan={6} className="text-center md:py-3 md:px-4 font-text text-primary
                                                                                py-5">
                                                        Filter first the course admin you want to add for the course
                                                    </td>
                                                </tr>

                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Pagination */}
                            <div></div>

                            {/* Action */}
                            <div className="flex flex-row justify-between gap-2 mx-4 py-2">
                                <div className="font-header border-2 border-primary rounded-md py-3 w-full flex flex-row justify-center shadow-md text-primary hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out">
                                    <p>Cancel</p>
                                </div>
                                <div className={`font-header border-2 border-primary rounded-md py-3 w-full flex flex-row justify-center shadow-md bg-primary text-white hover:cursor-pointer hover:bg-primaryhover hover:border-primaryhover transition-all ease-in-out ${false ? "opacity-50 hover:cursor-not-allowed" : null}`}>
                                    <p>Assign</p>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
    </Dialog>
    <AssignCourseAdminModalSuccessfully open={assigned} close={handleClose} number={number}/>
    </>
    )
};

export default AddAssignCourseAdmin;
