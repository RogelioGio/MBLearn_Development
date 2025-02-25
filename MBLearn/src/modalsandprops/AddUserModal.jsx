import { faChevronDown, faFileArrowUp, faSuitcase, faUser, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser as faUserRegular, faCircleCheck as faCircleCheckRegular, faAddressCard as faAddressCardRegular,  faBuilding as faBuildingRegular, faIdBadge as faIdBadgeRegular}  from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useRef, useState } from "react"
import axiosClient from "../axios-client"
import * as Yup from 'yup';
import { useFormik } from "formik"
import axios from "axios"
import UserAddedSuccessfullyModal from "./UserAddedSuccessfullyModal"
import AddUserErrorModal from "./AdduserErrorModal"
import { Stepper } from '@mantine/core';


const AddUserModal = ({open, close, updateTable}) => {
    // Modals state(subject to change)
    const [success, setSuccess] = useState(false)
    const [OpenError, setError] = useState(false)

    //Data
    const [addedUser, setaddedUser] = useState('')
    const [errorMessage, setErrorMessage] = useState({
        message: '',
        errors: {}
    })

    //setSuccess Function to automaticaly update the table
    const openSuccessModal = () =>{
        setSuccess(true)
        updateTable()
        close()
    }

    const closeSuccessModal = () =>{
        setSuccess(false)
        updateTable()
    }

    //Loading
    const [loading, setLoading] = useState(false);

    //payload and validation schema
    const formik = useFormik({
        //references
        initialValues: {
            employeeID: '',
            name: '',
            department: '',
            title: '',
            branch: '',
            city: '',
            role: '',
            status: 'Active',

            MBemail: '',
            password: '',
        },
        //validation
        validationSchema: Yup.object({
            //userInfo
            employeeID: Yup.string().required('required *').min(11, 'Employee ID must have 11 characters'),
            name: Yup.string().required('required *'),
            city: Yup.string().required('required *'),
            role: Yup.string().required('required *'),
            //userCredentials
            MBemail: Yup.string()
                        .required('required *')
                        .email('Invalid Working Email Format'),
            password: Yup.string()
                        .required("required *")
                        .min(8,'Password must be atleast 8 characters'),
        }),
        //submission
        onSubmit: async (values) => {
            console.log('Submitted Data', values);
            setLoading(true)

            setaddedUser(values)

            const userInfo_payload = {
                employeeID: values.employeeID,
                name: values.name,
                department: values.department,
                title: values.title,
                branch: values.branch,
                city: values.city,
                role: values.role,
                status: values.status
            };

            const userCredentials_payload = {
                employeeID: values.employeeID,
                name: values.name,
                MBemail: values.MBemail,
                password: values.password,
                role: values.role
            }

            //Adding into UserCredentials Table
            axiosClient.post('/addusercredentials', userCredentials_payload)
                .then((response) => {
                console.log('Response:', response);

                //Adding into UserInfo Table
                axiosClient.post('/add-user', userInfo_payload)
                .then((response) => {
                    console.log('Response:', response);
                    openSuccessModal()//success
                }).catch((error)=>{
                    console.log('Caught error:', error);

                    //Displaying the error message
                    if (error.response) {
                        const serverError = error.response.data;
                        setErrorMessage({
                            message: serverError.message,
                            errors: serverError.errors,
                        });
                    }else {
                    setErrorData({
                        message: 'Network Error',
                        errors: {},
                    });

                    }
                    setError(true);

                    //Deleting the user credentials entry if the user info is not added
                    axiosClient.delete(`/delete-user-creds/${values.employeeID}`)
                    .then((response)=>{console.log(response.data.data)})
                    .catch((error)=>{console.log(error)})
                })
            })
            .catch((error)=>{
                console.log('Caught error:', error); // Logs error if unsuccessful

                console.log(error.response.data)
                if (error.response) {
                    const serverError = error.response.data;
                    setErrorMessage({
                        message: serverError.message,
                        errors: serverError.errors,
                    });
                }else {
                setErrorData({
                    message: 'Network Error',
                    errors: {},
                });

                }
                setError(true);
            })
            .finally(() => {
                formik.resetForm();
                setLoading(false);
            });
        }
    })

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
        console.log(key, value)
    }

    //Form Navigation
    const nextStep = () => toggleState("steps",Math.min(state.steps + 1, 4))
    const prevStep = () => toggleState("steps",Math.max(state.steps - 1, 0))

    //closing and reseting function
    const Closing = () => {
        toggleState("steps",0);
        close();
    }



    return(
        <>
        <Dialog open={open} onClose={Closing}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
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
                                            onStepClick={(step) => toggleState("steps", step)}
                                            classNames={{
                                                step: "transition-all duration-300 !py-2",
                                                stepIcon: "!border-primary",
                                                stepCompletedIcon: "!bg-primary !rounded-full !border-primary !border-2",
                                                content: "!pt-0",
                                                separator: "!border-primary border !mx-0"
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
                                                    <p>Employee's Last Name</p>
                                                </label>
                                                <input type="text" name="name"
                                                        value={formik.values.name}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {formik.touched.name && formik.errors.name ? (<div className="text-red-500 text-xs font-text">{formik.errors.name}</div>):null}
                                                </div>
                                                {/* First Name */}
                                                <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                                <label htmlFor="name" className="font-text  text-xs flex flex-row justify-between">
                                                    <p>Employee's First Name</p>
                                                </label>
                                                <input type="text" name="name"
                                                        value={formik.values.name}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {formik.touched.name && formik.errors.name ? (<div className="text-red-500 text-xs font-text">{formik.errors.name}</div>):null}
                                                </div>
                                            {/* Middle Name & Suffix */}
                                            <div className="inline-flex flex-row gap-2 row-start-2 col-span-1 w-full py-2">
                                                <div className="w-3/4 gap-1 inline-flex flex-col">
                                                <label htmlFor="name" className="font-text  text-xs flex flex-row justify-between">
                                                <p>Employee's Middle Name</p>
                                                </label>
                                                <input type="text" name="name"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                </div>
                                                <div className="w-1/4 gap-1 inline-flex flex-col">
                                                <label htmlFor="name" className="font-text  text-xs flex flex-row justify-between">
                                                <p>Suffix</p>
                                                </label>
                                                <input type="text" name="name"
                                                    value={formik.values.name}
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
                                                            <p>Employee ID Number</p>
                                                        </label>
                                                        <input type="text" name="employeeID"
                                                                value={formik.values.employeeID}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                        {formik.touched.employeeID && formik.errors.employeeID ? (<div className="text-red-500 text-xs font-text">{formik.errors.employeeID}</div>):null}
                                                    </div>
                                                    {/*Department*/}
                                                    <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                                        {/* Must be dropdown */}
                                                        <label htmlFor="department" className="font-text text-xs flex">Employee Deparment</label>
                                                        <div className="grid grid-cols-1">
                                                            <select className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                                <option>Select an option</option>
                                                                <option>Option 1</option>
                                                                <option>Option 2</option>
                                                            </select>
                                                            <div className="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end">
                                                                <FontAwesomeIcon icon={faChevronDown} className=""/>
                                                            </div>

                                                        </div>
                                                        {/* <input type="text" name="department"
                                                                value={formik.values.department}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                /> */}
                                                    </div>
                                                    {/* Employee Posistion */}
                                                    <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                                    {/* Must be dropdown */}
                                                    <label htmlFor="title" className="font-text text-xs">Employee Position</label>
                                                    <div className="grid grid-cols-1">
                                                            <select className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                                <option>Select an option</option>
                                                                <option>Option 1</option>
                                                                <option>Option 2</option>
                                                            </select>
                                                            <div className="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end">
                                                                <FontAwesomeIcon icon={faChevronDown} className=""/>
                                                            </div>
                                                    </div>
                                                    {/* <input type="text" name="title"
                                                            value={formik.values.title}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/> */}
                                                    </div>
                                                    {/* Branch City Location */}
                                                    <div className="inline-flex flex-col gap-1 row-start-3 col-span-1 py-2">
                                                    <label htmlFor="city" className="font-text text-xs flex flex-row justify-between">
                                                    <p>Branch City</p>
                                                    </label>
                                                    <div className="grid grid-cols-1">
                                                            <select className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                                <option>Select an option</option>
                                                                <option>Option 1</option>
                                                                <option>Option 2</option>
                                                            </select>
                                                            <div className="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end">
                                                                <FontAwesomeIcon icon={faChevronDown} className=""/>
                                                            </div>
                                                    </div>
                                                    {formik.touched.city && formik.errors.city ? (<div className="text-red-500 text-xs font-text">{formik.errors.city}</div>):null}
                                                    {/* <input type="text" name="city"
                                                        value={formik.values.city}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/> */}
                                                    </div>
                                                     {/* Branch Location */}
                                                    <div className="inline-flex flex-col gap-1 row-start-3 col-span-2 py-2">
                                                    <label htmlFor="branch" className="font-text text-xs">Branch Location</label>
                                                    {/* <input type="text" name="branch"
                                                        value={formik.values.branch}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/> */}
                                                    <div className="grid grid-cols-1">
                                                            <select className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                                <option>Select an option</option>
                                                                <option>Option 1</option>
                                                                <option>Option 2</option>
                                                            </select>
                                                            <div className="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end">
                                                                <FontAwesomeIcon icon={faChevronDown} className=""/>
                                                            </div>
                                                    </div>
                                                    </div>


                                                </div>
                                            </Stepper.Step>
                                            <Stepper.Step icon={<FontAwesomeIcon icon={faAddressCardRegular} className="!text-primary"/>}>
                                                {/* Employee Account Status and Role */}
                                                <div className="grid grid-cols-3 grid-rows-[1fr_auto] gap-2">
                                                    <div className="col-span-3 flex flex-col gap-1 py-2 border-b border-b-divider">
                                                        <span className="font-header uppercase text-primary">Employee's Account Role</span>
                                                        <span className="font-text text-xs text-unactive">Assign the appropriate system role to define user access and permissions.</span>
                                                    </div>
                                                    {/* Role */}
                                                    <div className="inline-flex flex-col gap-1 row-start-2 col-span-3 py-2">
                                                        <label htmlFor="role" className="font-header text-xs flex flex-row justify-between">
                                                            <p className="text-xs font-text">Employee's Account Role</p>
                                                        </label>
                                                        <div className="grid grid-cols-1">
                                                            <select className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                                <option>Select an option</option>
                                                                <option>Option 1</option>
                                                                <option>Option 2</option>
                                                            </select>
                                                            <div className="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end">
                                                                <FontAwesomeIcon icon={faChevronDown} className=""/>
                                                            </div>

                                                        </div>
                                                        {/* <input type="text" name="role"
                                                                value={formik.values.role}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/> */}
                                                        {formik.touched.role && formik.errors.role ? (<div className="text-red-500 text-xs font-text">{formik.errors.role}</div>):null}
                                                    </div>

                                                </div>
                                            </Stepper.Step>
                                            <Stepper.Step icon={<FontAwesomeIcon icon={faIdBadgeRegular} className="!text-primary"/>}>
                                                {/* Review before Adding */}
                                                <div className="flex flex-col gap-1 py-2 border-b border-b-divider">
                                                    <span className="font-header uppercase text-primary">Review</span>
                                                    <span className="font-text text-xs text-unactive">Review all entered information carefully to ensure accuracy before submission.</span>
                                                </div>
                                            </Stepper.Step>
                                            <Stepper.Completed>
                                            <div className="flex flex-col gap-1 py-2 border-b border-b-divider text-center">
                                                    <span className="font-header uppercase text-primary">You're All Set!</span>
                                                    <span className="font-text text-xs text-unactive">Complete the form and click submit to successfully add the user to the system.</span>
                                                </div>
                                            </Stepper.Completed>
                                        </Stepper>
                                    </div>
                                    </form>
                                    {/* Action Buttons */}
                                    <div className="flex flex-row gap-2 mx-4 pb-2">
                                        <div
                                        className="font-header text-center text-primary border-2 border-primary w-1/2 py-2 rounded-md shadow-md  hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white hover:border-primaryhover"
                                        onClick={state.steps === 0 ? (close): (prevStep) }>
                                            {
                                                state.steps === 0 ? "Cancel": "Back"
                                            }
                                        </div>
                                        <div
                                        className="font-header text-center text-white border-2 border-primary w-1/2 py-2 rounded-md shadow-md bg-primary hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white hover:border-primaryhover"
                                        onClick={state.steps === 4 ? (formik.handleSubmit):(nextStep)}>
                                            {
                                                state.steps === 4 ? "Submit" : "Next"
                                            }
                                        </div>
                                    </div>
                                    </>
                                ) : state.tab === "multiple" ? (
                                    <div>
                                        {/* Add user by Import file */}
                                        <div className="py-3 mx-4">
                                            <div className="flex flex-col gap-3 justify-center items-center rounded-lg border-2 border-dashed border-unactive px-6 py-10 h-full w-full">
                                                <FontAwesomeIcon icon={faFileArrowUp} className="text-4xl text-unactive"/>
                                                <p className="font-text text-center text-xs text-unactive">Upload .csv file to add multiple user in the system</p>
                                            </div>
                                        </div>
                                         {/* Action Buttons */}
                                        <div className="flex flex-row gap-2 mx-4 py-3">
                                            <div
                                            className="font-header text-center text-primary border-2 border-primary w-1/2 py-2 rounded-md shadow-md  hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">Cancel</div>
                                            <div className="font-header text-center text-white border-2 border-primary w-1/2 py-2 rounded-md shadow-md bg-primary hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">Next</div>
                                        </div>
                                    </div>
                                ) : null
                            }

                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>

        {/* Successfully Added User  */}
        <UserAddedSuccessfullyModal success={success}  close={closeSuccessModal} userdata={addedUser}/>
        {/* Error Message*/}
        <AddUserErrorModal error={OpenError} close={()=>setError(false)} message={errorMessage.message} desc={errorMessage.errors}/>
        </>
    )
}

export default AddUserModal
