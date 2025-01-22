import { faTruckMonster, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { Formik, useFormik } from "formik"
import { use, useEffect, useState } from "react"
import * as Yup from "yup"
import axiosClient from "../axios-client"

const EditUserModal = ({open, close, classname, ID, EmployeeID}) =>{
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [user, setUser] = useState();

    useEffect (()=>{
        setSelectedUser(null)
        if(ID) {
            // Check if ID is an object
            if (typeof ID === "object" && ID.userID) {
                setUser(ID.userID); // Extract the userID from the object and set it
            } else if (typeof ID === "number") {
                setUser(ID); // Use ID as-is if it's already a number
            }

            console.log(user)
            axiosClient.get(`/select-user/${user}`)
            .then(response => {
                setSelectedUser(response.data.data)
            }).catch(err => console.log(err))
            .finally(()=>{
                setLoading(false)
            })
        }
    },[ID])



    //payload and validation schema
    const formik = useFormik({
        //references
        enableReinitialize: true,
        initialValues: {
            employeeID: selectedUser?.employeeID || 'Loading...',
            name: selectedUser?.name || 'Loading...',
            department: selectedUser?.department || 'Loading...',
            title: selectedUser?.title||'Loading...',
            branch: selectedUser?.branch||'Loading...',
            city: selectedUser?.city||'Loading...',
            role: selectedUser?.role||'Loading...',
            status: 'Active',
        },
        //validation
        validationSchema: Yup.object({
            //userInfo
            employeeID: Yup.string().required('required *').min(11, 'Employee ID must have 11 characters'),
            name: Yup.string().required('required *'),
            city: Yup.string().required('required *'),
            role: Yup.string().required('required *'),
        }),
        onSubmit: (values) => {
            console.log(values)

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
            };

            //Update API Calls
            axiosClient.put(`/update-user-info/${EmployeeID}`, userInfo_payload)
            .then(response => {
                console.log(response.data.message || 'User Information Updated Successfully')
            }).catch(err => console.log(err))

            axiosClient.put(`/update-user-creds/${EmployeeID}`, userCredentials_payload)
            .then(response => {
                console.log(response.data.message || 'User Credentials Updated Successfully')
            }).catch(err => console.log(err))
        }
    })

    return (
        <Dialog open={open} onClose={close} className={classname}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                            <div className='bg-white rounded-md h-full w-fit p-5 flex flex-col'>
                            {/* Header */}
                                <div className="py-4 mx-4 border-b border-divider flex flex-row justify-between item-center gap-4">
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Edit User Infomation</h1>
                                        <p className="text-unactive font-text text-md">Enables administrators to update and modify user information and account details.</p>
                                    </div>
                                    <div className="bg-primarybg p-5 rounded-full">
                                        <div className="h-full w-fit aspect-square flex items-center justify-center">
                                            <FontAwesomeIcon icon={faUserPen} className="text-primary text-lg"/>
                                        </div>
                                    </div>
                                </div>
                                    <div className="mx-4 flex flex-row gap-5">
                                        <form onSubmit={formik.handleSubmit} className="grid grid-cols-3 gap-y-2 pb-4 w-full">
                                            <div className="py-2 col-span-3">
                                                <p className="font-header uppercase">Employee Information</p>
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
                                                        disabled={loading}
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
                                                        disabled={loading}
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
                                                        disabled={loading}
                                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                            </div>

                                            {/* Department */}
                                            <div className="inline-flex flex-col gap-2 row-start-3 col-span-1 pr-2">
                                                {/* Must be dropdown */}
                                                <label htmlFor="department" className="font-header text-xs flex uppercase">Deparment:</label>
                                                <input type="text" name="department"
                                                        value={formik.values.department}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        disabled={loading}
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
                                                        disabled={loading}
                                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                            </div>

                                            {/* Branch Location */}
                                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-2 pr-2">
                                                <label htmlFor="branch" className="font-header text-xs uppercase ">Branch Location:</label>
                                                <input type="text" name="branch"
                                                        value={formik.values.branch}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        disabled={loading}
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
                                                        disabled={loading}
                                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                            </div>

                                            {/* Submit */}
                                            <input type="submit"
                                            value='Submit'
                                            className="inline-flex flex-col gap-2 row-start-7 col-span-3 bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out" />
                                        </form>
                                    </div>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
    )
}

export default EditUserModal
