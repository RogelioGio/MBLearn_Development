import { faChevronDown, faFileArrowUp, faSuitcase, faUser, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser as faUserRegular, faCircleCheck as faCircleCheckRegular, faAddressCard as faAddressCardRegular,  faBuilding as faBuildingRegular, faIdBadge as faIdBadgeRegular}  from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client"
import * as Yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import UserAddedSuccessfullyModal from "./UserAddedSuccessfullyModal"
import AddUserErrorModal from "./AdduserErrorModal"
import { Stepper } from '@mantine/core';
import { useOption } from "../contexts/AddUserOptionProvider"
import AddMultipleUserProps from "./AddMultipleUserProps"
import AccountPermissionProps from "./AccountPermissionsProps"
import { ScrollArea } from "../components/ui/scroll-area"


const AddUserModal = ({open, close, updateTable}) => {
    //Option Context
    const {cities,departments,location,titles,roles,permission} = useOption();
    const [selectedBranches, setSelectedBranches] = useState([])
    const [generatedEmail, setGeneratedEmail] = useState('')
    const [generatedPassword, setGeneratedPassword] = useState('')
    const [role, setRoles] = useState([])

    const handleBranchesOptions = (e) =>{
        const city = e.target.value;
        formik.setFieldValue('city', city)
        formik.setFieldValue('branch', '')

        //Filtering
        const filteredBranches = location.filter((branch) => branch.city_id.toString() === city)
        setSelectedBranches(filteredBranches)
    }


    // Modals state(subject to change)
    const [OpenError, setError] = useState(false)
    const reset = () => {
        close();
        formik.resetForm();
        toggleState("steps",0);
    }

    //Data
    const [errorMessage, setErrorMessage] = useState({
        message: '',
        errors: {}
    })


    //Loading
    const [loading, setLoading] = useState(false);

    //payload and validation schema
    const formik = useFormik({
        //references
        initialValues: {
            employeeID: '',
            lastname:'',
            firstname:'',
            middlename:'',
            suffix:'',
            department: '',
            title: '',
            branch: '',
            city: '',
            role: '',
            status: 'Active',
        },
        //validation
        validationSchema: Yup.object({

            employeeID: Yup.string().required('required *').length(11, 'Employee ID must be exactly 11 characters'),
            lastname: Yup.string().required('required *'),
            firstname: Yup.string().required('required *'),
            department: Yup.string().required('required *'),
            title: Yup.string().required('required *'),
            city: Yup.string().required('required *'),
            //branch: Yup.string().required('required *'),
            role: Yup.string().required('required *'),
        }),
        //submission
        onSubmit:(values) => {
            setLoading(true)
            const payload = {
                employeeID: values.employeeID,
                first_name: values.firstname,
                last_name: values.lastname,
                middle_name: values.middlename,
                name_suffix: values.suffix,
                department_id: values.department,
                title_id: values.title,
                branch_id: values.branch,
                city_id: values.city,
                role_id: values.role,
                status: "Active",
                MBemail: `${values.firstname.replace(/\s+/g, '').trim()}.${values.lastname.replace(/\s+/g, '').trim()}@mbtc.com`.toLowerCase(),
                password: `${values.firstname.replace(/\s+/g, '').trim()}_${values.employeeID}`
            }
            axiosClient.post('/add-user',payload).
            then((res) => {
                console.log(res)
                setLoading(false);
                nextStep();
            })
            .catch((err)=>{
                setErrorMessage({
                    message: err.response.data.message,
                    errors: err.response.data.errors
                })
                setError(true)
                setLoading(false);
            })
        }

    })

    //Field Checker per step
    const stepFieldsMap = {
        0: ["lastname", "firstname",],
        1: ["employeeID", "department","title","city",'location'],
        2: ["role"]
    }


    //UseState
    const [state, setState] = useState({
        tab: "single",
        steps: 0,
    })
    const toggleState = (key,value) => {
        setState((prev => ({
            ...prev,
            [key]:value,
        })));
    }

    //Form Navigation
    //const nextStep = () => )
    const nextStep = async () => {
        const stepFields = stepFieldsMap[state.steps] || [];
        const errors = await formik.validateForm();
        const stepErrors = stepFields.some((field) => errors[field]);

        if (!stepErrors) {
            toggleState("steps",Math.min(state.steps + 1, 4))
        } else {
            console.log("Validation errors found:", errors);
        formik.setTouched(
            stepFields.reduce((acc, key) => ({ ...acc, [key]: true }), {})
        );
        }
    }
    const prevStep = () => toggleState("steps",Math.max(state.steps - 1, 0))

    //closing and reseting function
    const Closing = () => {
        toggleState("steps",0);
        close();
    }

    //Permission Helper
    const fetchRoles = () => {
        axiosClient.get('/roles')
        .then(({data}) => {
            setRoles(data.roles)
        })
        .catch(error => console.error(error));
    }
    useEffect(() => {
        fetchRoles()
    },[])



    return(
        <>
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30"/>
            <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md w-2/4 bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                            {/* Header */}
                            <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row justify-between item-center">
                                <div>
                                    <h1 className="text-primary font-header text-3xl">Add User</h1>
                                    <p className="text-unactive font-text text-md">Create and register new users with defined roles</p>
                                </div>
                                <div className="bg-primarybg p-5 rounded-full">
                                    <div className="h-full w-fit aspect-square flex items-center justify-center">
                                        <FontAwesomeIcon icon={faUserPlus} className="text-primary text-lg"/>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs to add user by import or form */}
                            <div className="mx-4 py-4">
                                <div className="w-full flex flex-row rounded-md shadow-md hover:cursor-pointer">
                                    <span className={`w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-l-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${state.tab === "single" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={()=> toggleState("tab", "single")}>
                                        <FontAwesomeIcon icon={faUser}/>
                                        Add Single User
                                    </span>
                                    <span className={` w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-r-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${state.tab === "multiple" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={()=> toggleState("tab", "multiple")}>
                                        <FontAwesomeIcon icon={faUserGroup}/>
                                        Add Multiple Users
                                    </span>
                                </div>
                            </div>


                            {/* Add User by Form */}
                            {
                                state.tab === "single" ? (
                                    <>
                                    <form onSubmit={formik.handleSubmit} className="gap-y-5 gap-x-2 pb-4">

                                    <div className="mx-4 flex flex-col gap-5">
                                        <Stepper
                                            active={state.steps}
                                            style={{
                                            "--Primary-Color": "hsl(218,97%,26%)",
                                            "--Active-Step-Bg-Color": "hsl(218,97%,36%)" // Custom background color for active step
                                            }}
                                            styles={{
                                            step: { transition: "all 0.3s", paddingTop: "8px", paddingBottom: "8px" },
                                            stepCompletedIcon: {
                                                backgroundColor: "var(--Primary-Color)",
                                                borderRadius: "50%",
                                                border: "2px solid var(--Primary-Color)",
                                            },
                                            stepBody: { backgroundColor: "var(--Primary-Color)", color: "#fff" },
                                            stepActive: { backgroundColor: "var(--Active-Step-Bg-Color)" }, // Apply custom background color to active step
                                            separator: { border: "1px solid var(--Primary-Color)", margin: "0" },
                                            }}
                                            completedIcon={<FontAwesomeIcon icon={faCircleCheckRegular} className="!text-white"/>}>
                                            <Stepper.Step icon={<FontAwesomeIcon icon={faUserRegular} className="!text-primary"/>}>
                                                {/* Employee Information */}
                                                <div className="grid grid-cols-3 grid-rows-[1fr_auto] gap-2">
                                                    {/* Header */}
                                                    <div className="col-span-3 flex flex-col gap-1 py-2 border-b border-b-divider">
                                                        <span className="font-header uppercase text-primary">Employee Information</span>
                                                        <span className="font-text text-xs text-unactive">Enter the employee's name accurately to ensure proper identification and record management.</span>
                                                    </div>
                                                {/* Last Name */}
                                                <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                                <label htmlFor="name" className="font-text text-xs flex flex-row justify-between">
                                                    <p>Last Name <span className="text-red-500">*</span></p>
                                                </label>
                                                <input type="text" name="lastname"
                                                        value={formik.values.lastname}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {formik.touched.lastname && formik.errors.lastname ? (<div className="text-red-500 text-xs font-text">{formik.errors.lastname}</div>):null}
                                                </div>
                                                {/* First Name */}
                                                <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                                <label htmlFor="name" className="font-text  text-xs flex flex-row justify-between">
                                                    <p>First Name <span className="text-red-500">*</span></p>
                                                </label>
                                                <input type="text" name="firstname"
                                                        value={formik.values.firstname}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {formik.touched.firstname && formik.errors.firstname ? (<div className="text-red-500 text-xs font-text">{formik.errors.firstname}</div>):null}
                                                </div>
                                            {/* Middle Name & Suffix */}
                                            <div className="inline-flex flex-row gap-2 row-start-2 col-span-1 w-full py-2">
                                                <div className="w-3/4 gap-1 inline-flex flex-col">
                                                <label htmlFor="name" className="font-text  text-xs flex flex-row justify-between">
                                                <p>Middle Name</p>
                                                </label>
                                                <input type="text" name="middlename"
                                                    value={formik.values.middlename}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                </div>
                                                <div className="w-1/4 gap-1 inline-flex flex-col">
                                                <label htmlFor="name" className="font-text  text-xs flex flex-row justify-between">
                                                <p>Suffix</p>
                                                </label>
                                                <input type="text" name="suffix"
                                                    value={formik.values.suffix}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary w-full"/>
                                                </div>
                                            </div>
                                                </div>
                                            </Stepper.Step>
                                            <Stepper.Step icon={<FontAwesomeIcon icon={faBuildingRegular} className="!text-primary"/>}>
                                                {/* Employee Status and Location */}
                                                <div className="grid grid-cols-3 grid-rows-[1fr_auto] gap-2">
                                                    {/* Header */}
                                                    <div className="col-span-3 flex flex-col gap-1 py-2 border-b border-b-divider">
                                                        <span className="font-header uppercase text-primary">Employee's Department and Branch</span>
                                                        <span className="font-text text-xs text-unactive">Specify the employee's department and branch location for accurate assignment and tracking.</span>
                                                    </div>
                                                    {/* EmployeeID */}
                                                    <div className="inline-flex flex-col gap-1 row-start-2 col-start-1 py-2">
                                                        <label htmlFor="employeeID" className="font-text text-xs flex flex-row justify-between">
                                                            <p>Employee ID Number <span className="text-red-500">*</span></p>
                                                        </label>
                                                        <input type="text" name="employeeID"
                                                                value={formik.values.employeeID}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                maxLength={11}
                                                                className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                        {formik.touched.employeeID && formik.errors.employeeID ? (<div className="text-red-500 text-xs font-text">{formik.errors.employeeID}</div>):null}
                                                    </div>
                                                    {/*Department*/}
                                                    <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                                        {/* Must be dropdown */}
                                                        <label htmlFor="department" className="font-text text-xs flex">Deparment <span className="text-red-500">*</span></label>
                                                        <div className="grid grid-cols-1">
                                                            <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                                value={formik.values.department}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}>
                                                                <option value="">Select Department</option>
                                                                {
                                                                    departments.map((department) => (
                                                                        <option key={department.id} value={department.id}>{department.department_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                            </svg>
                                                        </div>
                                                            {formik.touched.department && formik.errors.department ? (<div className="text-red-500 text-xs font-text">{formik.errors.department}</div>):null}
                                                    </div>
                                                    {/* Employee Posistion */}
                                                    <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                                    <label htmlFor="title" className="font-text text-xs">Position <span className="text-red-500">*</span></label>
                                                    <div className="grid grid-cols-1">
                                                            <select id="title" name="title" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                                value={formik.values.title}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}>
                                                            <option value="">Select Posistion</option>
                                                                {
                                                                    titles.map((title) => (
                                                                        <option key={title.id} value={title.id}>{title.title_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                            </svg>
                                                    </div>
                                                        {formik.touched.title && formik.errors.title ? (<div className="text-red-500 text-xs font-text">{formik.errors.title}</div>):null}
                                                    </div>
                                                    {/* Branch City Location */}
                                                    <div className="inline-flex flex-col gap-1 row-start-3 col-span-1 py-2">
                                                    <label htmlFor="city" className="font-text text-xs flex flex-row justify-between">City <span className="text-red-500">*</span></label>
                                                    <div className="grid grid-cols-1">
                                                            <select id="city" name="city" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                            value={formik.values.city}
                                                            onChange={handleBranchesOptions}
                                                            onBlur={formik.handleBlur}>
                                                                <option value="">Select City</option>
                                                                {
                                                                    cities.map((city) => (
                                                                        <option key={city.id} value={city.id}>{city.city_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                            </svg>
                                                    </div>
                                                    {formik.touched.city && formik.errors.city ? (<div className="text-red-500 text-xs font-text">{formik.errors.city}</div>):null}
                                                    </div>
                                                     {/* Branch Location */}
                                                    <div className="inline-flex flex-col gap-1 row-start-3 col-span-2 py-2">
                                                        <label htmlFor="branch" className="font-text text-xs">Location <span className="text-red-500">*</span></label>
                                                        <div className="grid grid-cols-1">
                                                                <select id="branch" name="branch" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                                    value={formik.values.branch}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}>
                                                                    <option value="">Select Location</option>
                                                                    {
                                                                    selectedBranches.map((location) => (
                                                                        <option key={location.id} value={location.id}>{location.branch_name}</option>
                                                                    ))
                                                                    }
                                                                </select>
                                                                <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                                </svg>
                                                        </div>
                                                        {formik.touched.location && formik.errors.location ? (<div className="text-red-500 text-xs font-text">{formik.errors.location}</div>):null}
                                                    </div>
                                                </div>
                                            </Stepper.Step>
                                            <Stepper.Step icon={<FontAwesomeIcon icon={faAddressCardRegular} className="!text-primary"/>}>
                                                {/* Employee Account Status and Role */}
                                                <div className="grid grid-cols-3 grid-rows-[1fr_auto] gap-2">
                                                    <div className="col-span-3 flex flex-col gap-1 py-2 border-b border-b-divider">
                                                        <span className="font-header uppercase text-primary">Account Role & Permission</span>
                                                        <span className="font-text text-xs text-unactive">Assign the appropriate system role to define user access and permissions.</span>
                                                    </div>
                                                    {/* Role */}
                                                    <div className="inline-flex flex-col gap-1 row-start-2 col-span-3 py-2">
                                                        <label htmlFor="role" className="font-header text-xs flex flex-row justify-between">
                                                            <p className="text-xs font-text">Account Role <span className="text-red-500">*</span></p>
                                                        </label>
                                                        <div className="grid grid-cols-1">
                                                            <select id="role" name="role" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                                value={formik.values.role}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}>
                                                                <option value=''>Select Role</option>
                                                                {
                                                                    roles.map((role) => (
                                                                        <option key={role.id} value={role.id}>{role.role_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        {formik.touched.role && formik.errors.role ? (<div className="text-red-500 text-xs font-text">{formik.errors.role}</div>):null}
                                                    </div>
                                                    {
                                                        formik.values.role ? (<div className="col-span-3">
                                                            <AccountPermissionProps refPermissions={permission} selectedRole={formik.values.role} role={role}/>
                                                        </div>):(null)
                                                    }


                                                </div>
                                            </Stepper.Step>
                                            <Stepper.Step icon={<FontAwesomeIcon icon={faIdBadgeRegular} className="!text-primary"/>}>
                                                {/* Review before Adding */}
                                                <div className="flex flex-col gap-1 py-2 border-b border-b-divider">
                                                    <span className="font-header uppercase text-primary">Review</span>
                                                    <span className="font-text text-xs text-unactive">Review all entered information carefully to ensure accuracy before submission.</span>
                                                </div>

                                                <div className="grid grid-cols-3 gap-x-2 gap-y-4 p-2">
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-text text-xs text-unactive">Last Name:</p>
                                                        <p className="font-text">{formik.values.lastname}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-text text-xs text-unactive">First Name:</p>
                                                        <p className="font-text">{formik.values.firstname}</p>
                                                    </div>
                                                    <div className="inline-flex flex-row">
                                                        <div className="flex flex-col gap-1 w-3/4">
                                                            <p className="font-text text-xs text-unactive">Middle Name:</p>
                                                            <p className="font-text">{formik.values.middlename}</p>
                                                        </div>
                                                        <div className="flex flex-col gap-1 w-1/4">
                                                            <p className="font-text text-xs text-unactive">Suffix:</p>
                                                            <p className="font-text">{formik.values.suffix}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-text text-xs text-unactive">Employee ID Number:</p>
                                                        <p className="font-text">{formik.values.employeeID}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-text text-xs text-unactive">Department:</p>
                                                        <p className="font-text">{departments.find(department => department.id === Number(formik.values.department))?.department_name || "Not selected"}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-text text-xs text-unactive">Posistion:</p>
                                                        <p className="font-text">{titles.find(title => title.id === Number(formik.values.title))?.title_name || "Not selected"}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-text text-xs text-unactive">City:</p>
                                                        <p className="font-text">{cities.find(city => city.id === Number(formik.values.city))?.city_name || "Not selected"}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1 col-span-2">
                                                        <p className="font-text text-xs text-unactive">Location:</p>
                                                        <p className="font-text">{location.find(location => location.id === Number(formik.values.branch))?.branch_name || "Not selected"}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1 col-span-3">
                                                        <p className="font-text text-xs text-unactive">Account Role:</p>
                                                        <p className="font-text">{roles.find(role => role.id === Number(formik.values.role))?.role_name || "Not selected"}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1 col-span-2">
                                                        <p className="font-text text-xs text-unactive">Email:</p>
                                                        <p className="font-text"> {`${formik.values.firstname.replace(/\s+/g, '').trim()}.${formik.values.lastname.replace(/\s+/g, '').trim()}@mbtc.com`.toLowerCase()}</p>

                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-text text-xs text-unactive">Initial Password:</p>
                                                        <p className="font-text">{`${formik.values.firstname.replace(/\s+/g, '').trim()}_${formik.values.employeeID}`}</p>
                                                    </div>
                                                </div>
                                            </Stepper.Step>
                                            <Stepper.Completed>
                                            <div className="flex flex-col gap-1 py-2 text-center">
                                                    <span className="font-header uppercase text-primary">User Added!</span>
                                                    <span className="font-text text-xs text-unactive">The employee is successfuly Added in the system</span>
                                                </div>
                                            </Stepper.Completed>
                                        </Stepper>
                                    </div>
                                    </form>
                                    {/* Action Buttons */}
                                    <div className="flex flex-row gap-2 mx-4 pb-2">
                                        {
                                            state.steps === 4 ? (
                                                <div
                                                className="font-header text-center text-primary border-2 border-primary w-full py-2 rounded-md shadow-md  hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white hover:border-primaryhover"
                                                onClick={reset}>
                                                    Confirm
                                                </div>) : (
                                                    <>
                                                        <div
                                                        className="font-header text-center text-primary border-2 border-primary w-1/2 py-2 rounded-md shadow-md  hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white hover:border-primaryhover"
                                                        onClick={state.steps === 0 ? (close): (prevStep) }>
                                                            {
                                                                state.steps === 0 ? "Cancel": "Back"
                                                            }
                                                        </div>
                                                        <div
                                                        className="font-header text-center text-white border-2 border-primary w-1/2 py-2 rounded-md shadow-md bg-primary hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white hover:border-primaryhover"
                                                        onClick={state.steps === 3 && !loading ? (formik.handleSubmit):(nextStep)}
                                                        >
                                                            {
                                                                state.steps === 3 && !loading ? "Submit" : state.steps === 3 && loading ? "Loading" : "Next"
                                                            }
                                                        </div>
                                                    </>)
                                        }

                                    </div>
                                    </>
                                ) : state.tab === "multiple" ? (
                                    // <div>
                                    //     {/* Add user by Import file */}
                                    //     <div className="py-3 mx-4">
                                    //         <div className="flex flex-col gap-3 justify-center items-center rounded-lg border-2 border-dashed border-unactive px-6 py-10 h-full w-full">
                                    //             <FontAwesomeIcon icon={faFileArrowUp} className="text-4xl text-unactive"/>
                                    //             <p className="font-text text-center text-xs text-unactive">Upload .csv file to add multiple user in the system</p>
                                    //         </div>
                                    //     </div>
                                    //      {/* Action Buttons */}
                                    //     <div className="flex flex-row gap-2 mx-4 py-3">
                                    //         <div
                                    //         className="font-header text-center text-primary border-2 border-primary w-1/2 py-2 rounded-md shadow-md  hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">Cancel</div>
                                    //         <div className="font-header text-center text-white border-2 border-primary w-1/2 py-2 rounded-md shadow-md bg-primary hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">Next</div>
                                    //     </div>
                                    // </div>
                                    <AddMultipleUserProps onClose={close}/>
                                ) : null
                            }

                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>

        {/* Error Message*/}
        <AddUserErrorModal error={OpenError} close={()=>setError(false)} message={errorMessage.message} desc={errorMessage.errors}/>
        </>
    )
}

export default AddUserModal
