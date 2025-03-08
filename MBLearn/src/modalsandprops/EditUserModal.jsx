import { faTruckMonster, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { Formik, useFormik } from "formik"
import { use, useEffect, useState } from "react"
import * as Yup from "yup"
import axiosClient from "../axios-client"
import { useOption } from "../contexts/AddUserOptionProvider"

const EditUserModal = ({open, close, classname, ID, EmployeeID}) =>{
    const { roles = [], departments = [], titles = [], location = [], cities = [], } = useOption() || {};;
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [user, setUser] = useState();


    useEffect (()=>{
        setSelectedUser(null)
        if(ID) {
            axiosClient.get(`/select-user/${ID}`)
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
            first_name: selectedUser?.first_name || 'Loading...',
            middle_name: selectedUser?.middle_name || 'Loading...',
            last_name: selectedUser?.last_name || 'Loading...',
            department: selectedUser?.department_id || 'Loading...',
            title: selectedUser?.title_id||'Loading...',
            branch: selectedUser?.branch_id||'Loading...',
            city: selectedUser?.city_id||'Loading...',
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
                                            {/* Name */}
                                            <div className="gap-2 row-start-2 col-span-3 pr-2 grid grid-cols-[auto_auto_auto_min-content] grid-row-1">
                                                <div className="inline-flex flex-col justify-between">
                                                    <label htmlFor="name" className="font-text text-xs flex flex-row justify-between">
                                                        <p>First Name: </p>
                                                    </label>
                                                    <input type="text" name="name"
                                                            value={formik.values.first_name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={loading}
                                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {formik.touched.name && formik.errors.name ? (<div className="text-red-500 text-xs font-text">{formik.errors.name}</div>):null}
                                                </div>
                                                <div className="inline-flex flex-col justify-between">
                                                    <label htmlFor="name" className="font-text text-xs flex flex-row justify-between">
                                                        <p>Middle Name: </p>

                                                    </label>
                                                    <input type="text" name="name"
                                                            value={formik.values.middle_name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={loading}
                                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                </div>
                                                <div className="inline-flex flex-col justify-between">
                                                    <label htmlFor="name" className="font-text text-xs flex flex-row justify-between">
                                                        <p>Last Name: </p>
                                                    </label>
                                                    <input type="text" name="name"
                                                            value={formik.values.last_name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={loading}
                                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                </div>
                                                <div className="inline-flex flex-col justify-between">
                                                    <label htmlFor="name" className="font-text text-xs flex flex-row justify-between">
                                                        <p>Suffix: </p>
                                                    </label>
                                                    <input type="text" name="name"
                                                            value={formik.values.last_name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={loading}
                                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                </div>
                                            </div>

                                            {/* EmployeeID */}
                                            <div className="inline-flex flex-col gap-2 row-start-3 col-start-1 pr-2">
                                                <label htmlFor="employeeID" className="font-text text-xs flex flex-row justify-between">
                                                    <p>Employee ID</p>
                                                </label>
                                                <input type="text" name="employeeID"
                                                        value={formik.values.employeeID}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        disabled={loading}
                                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {formik.touched.employeeID && formik.errors.employeeID ? (<div className="text-red-500 text-xs font-text">{formik.errors.employeeID}</div>):null}
                                            </div>


                                            {/* Department */}
                                            <div className="inline-flex flex-col gap-2 row-start-3 col-span-1 pr-2">
                                                {/* Must be dropdown */}
                                                <label htmlFor="department" className="font-text text-xs flex">Deparment:</label>
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
                                            </div>

                                            {/* Job Title */}
                                            <div className="inline-flex flex-col gap-2 row-start-3 col-span-1">
                                                {/* Must be dropdown */}
                                                <label htmlFor="title" className="font-text text-xs">Title:</label>
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
                                            </div>


                                            {/* City Location */}
                                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-1 pb-4 pr-2">
                                                <label htmlFor="city" className="font-text text-xs flex flex-row justify-between">
                                                    <p>City:</p>
                                                    {formik.touched.city && formik.errors.city ? (<div className="text-red-500 text-xs font-text">{formik.errors.city}</div>):null}
                                                </label>
                                                <div className="grid grid-cols-1">
                                                            <select id="city" name="city" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                            value={formik.values.city}
                                                            onChange={formik.handleChange}
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
                                            </div>

                                            {/* Branch Location */}
                                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-2 pr-2">
                                                <label htmlFor="branch" className="font-text text-xs">Branch Location:</label>
                                                <div className="grid grid-cols-1">
                                                                <select id="branch" name="branch" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                                    value={formik.values.branch}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}>
                                                                    <option value="">Select Location</option>
                                                                    {
                                                                    location.map((location) => (
                                                                        <option key={location.id} value={location.id}>{location.branch_name}</option>
                                                                    ))
                                                                    }
                                                                </select>
                                                                <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                                </svg>
                                                    </div>
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
