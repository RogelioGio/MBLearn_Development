import { faFileArrowUp, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useRef, useState } from "react"
import axiosClient from "../axios-client"
import * as Yup from 'yup';
import { useFormik } from "formik"
import axios from "axios"
import UserAddedSuccessfullyModal from "./UserAddedSuccessfullyModal"
import AddUserErrorModal from "./AdduserErrorModal"


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



    return(
        <>
        <Dialog open={open} onClose={close}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='bg-white rounded-md h-full w-fit p-5 flex flex-col'>
                            {/* Header */}
                            <div className="py-4 mx-4 border-b border-divider flex flex-row justify-between item-center">
                                <div>
                                    <h1 className="text-primary font-header text-3xl">Add User</h1>
                                    <p className="text-unactive font-text text-md">Create and register new users with defined roles and permissions.</p>
                                </div>
                                <div className="bg-primarybg p-5 rounded-full">
                                    <div className="h-full w-fit aspect-square flex items-center justify-center">
                                        <FontAwesomeIcon icon={faUserPlus} className="text-primary text-lg"/>
                                    </div>
                                </div>
                            </div>


                            {/* Add User by Form */}
                            <div className="mx-4 flex flex-row gap-5">
                                <form onSubmit={formik.handleSubmit} className="grid grid-cols-3 gap-y-2 pb-4">

                                {/* User information Header*/}
                                <div className="py-2 col-span-3">
                                    <p className="font-header uppercase">Employee Information</p>
                                    <p className="font-text text-unactive text-xs"> Input all basic information of the employee to be added in the system.</p>
                                </div>

                                {/* Name */}
                                <div className="inline-flex flex-col gap-2 row-start-2 col-span-2 pr-2">
                                    <label htmlFor="name" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Name</p>
                                        {formik.touched.name && formik.errors.name ? (<div className="text-red-500 text-xs font-text">{formik.errors.name}</div>):null}
                                    </label>
                                    <input type="text" name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>

                                {/* EmployeeID */}
                                <div className="inline-flex flex-col gap-2 row-start-2 col-start-3 pr-2">
                                    <label htmlFor="employeeID" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Employee ID</p>
                                        {formik.touched.employeeID && formik.errors.employeeID ? (<div className="text-red-500 text-xs font-text">{formik.errors.employeeID}</div>):null}
                                    </label>
                                    <input type="text" name="employeeID"
                                            value={formik.values.employeeID}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>

                                {/* Role */}
                                <div className="inline-flex flex-col gap-2 row-start-3 col-span-1 pr-2">
                                    <label htmlFor="role" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">System Role</p>
                                        {formik.touched.role && formik.errors.role ? (<div className="text-red-500 text-xs font-text">{formik.errors.role}</div>):null}
                                    </label>
                                    <input type="text" name="role"
                                            value={formik.values.role}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>

                                {/*Department*/}
                                <div className="inline-flex flex-col gap-2 row-start-3 col-span-1 pr-2">
                                    {/* Must be dropdown */}
                                    <label htmlFor="department" className="font-header text-xs flex uppercase">Deparment:</label>
                                    <input type="text" name="department"
                                            value={formik.values.department}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>

                                {/* Job Title */}
                                <div className="inline-flex flex-col gap-2 row-start-3 col-span-1">
                                    {/* Must be dropdown */}
                                    <label htmlFor="title" className="font-header text-xs uppercase ">Title:</label>
                                    <input type="text" name="title"
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>

                                {/* Branch Location */}
                                <div className="inline-flex flex-col gap-2 row-start-4 col-span-2 pr-2">
                                    <label htmlFor="branch" className="font-header text-xs uppercase ">Branch Location:</label>
                                    <input type="text" name="branch"
                                            value={formik.values.branch}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>

                                {/* City Location */}
                                <div className="inline-flex flex-col gap-2 row-start-4 col-span-1 pb-4">
                                    <label htmlFor="city" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">City:</p>
                                        {formik.touched.city && formik.errors.city ? (<div className="text-red-500 text-xs font-text">{formik.errors.city}</div>):null}
                                    </label>
                                    <input type="text" name="city"
                                            value={formik.values.city}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>

                                {/* Account credentials Header*/}
                                <div className="py-2 col-span-3 border-t border-divider">
                                    <p className="font-header uppercase">Employee Account Credentials</p>
                                    <p className="font-text text-unactive text-xs">Input all employee's account crendentials to be added in the system.</p>
                                </div>

                                {/* MBemail */}
                                <div className="inline-flex flex-col gap-2 row-start-6 col-span-2 pr-2">
                                    <label htmlFor="MBemail" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Metrobank Working Email</p>
                                        {formik.touched.MBemail && formik.errors.MBemail ? (<div className="text-red-500 text-xs font-text">{formik.errors.MBemail}</div>):null}
                                    </label>
                                    <input type="text" name="MBemail"
                                            value={formik.values.MBemail}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>

                                {/* Account Password */}
                                <div className="inline-flex flex-col gap-2 row-start-6 col-span-2 pb-4">
                                    <label htmlFor="password" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Password</p>
                                        {formik.touched.password && formik.errors.password ? (<div className="text-red-500 text-xs font-text">{formik.errors.password}</div>):null}
                                    </label>
                                    <input type="text" name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>

                                {/* Submit Button */}
                                <input type="submit"
                                        value={loading ? 'Submitting...' : 'Submit'}
                                        disabled={loading}
                                        className="inline-flex flex-col gap-2 row-start-7 col-span-3 bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out" />

                                </form>

                                {/* divider */}
                                <div className="flex flex-col justify-center items-center">
                                    <div className="border-l border-divider h-2/6"></div>
                                    <p className="font-text text-unactive">or</p>
                                    <div className="border-l border-divider h-2/6"></div>
                                </div>

                                {/* Add user by Import file */}
                                <div className="py-3">
                                    <div className="flex flex-col gap-3 justify-center items-center rounded-lg border-2 border-dashed border-unactive px-6 py-10 h-full w-[30vw]">
                                        <FontAwesomeIcon icon={faFileArrowUp} className="text-4xl text-unactive"/>
                                        <p className="font-text text-center text-xs text-unactive">Upload .csv file to add multiple user in the system</p>
                                    </div>
                                </div>
                            </div>
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
