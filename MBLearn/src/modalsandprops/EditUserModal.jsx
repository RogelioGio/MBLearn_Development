import { faTruckMonster, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { Formik, useFormik } from "formik"
import { use, useEffect, useState } from "react"
import * as Yup from "yup"
import axiosClient from "../axios-client"
import { useOption } from "../contexts/AddUserOptionProvider"
import { useUser } from "../contexts/selecteduserContext"
import AddUserErrorModal from "./AdduserErrorModal"
import EditUserCredsModal from "./EditUserCredsModal"
import EdituserErrorModal from "./EdituserErrorModal"

const EditUserModal = ({open, close, classname, ID, close_confirmation}) =>{
    const { roles = [], departments = [], titles = [], location = [], cities = [], } = useOption() || {};
    const {selectedUser, selectUser, isFetching} = useUser();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [selectedBranches, setSelectedBranches] = useState([])
    const [editing, setEditing] = useState(false)
    const [updating, setUpdating] = useState(false)

    const handleBranchesOptions = (e) =>{
        const city = e.target.value;
        formik.setFieldValue('city', city)
        formik.setFieldValue('branch', '')

        //Filtering
        const filteredBranches = location.filter((branch) => branch.city_id.toString() === city)
        setSelectedBranches(filteredBranches)
    }

    useEffect(() => {
            if (open && ID) {
                if (selectedUser?.id === ID) {
                    setLoading(false);
                } else {
                    setLoading(true);
                    selectUser(ID);
                }
            }
        }, [ID, selectedUser, open]);
        useEffect(() => {
            if (selectedUser && !isFetching) {
                setLoading(false);
            }
        }, [selectedUser, isFetching]);

    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching]);

    //payload and validation schema
    const formik = useFormik({
        //references
        enableReinitialize: true,
        initialValues: loading
            ? {
                employeeID: 'Loading...',
                first_name: 'Loading...',
                middle_name: 'Loading...',
                last_name: 'Loading...',
                department_id: 'Loading...',
                title_id: 'Loading...',
                branch_id: 'Loading...',
                city: 'Loading...',
                status: 'Active',
            }
            : {
                employeeID: selectedUser?.employeeID || '',
                first_name: selectedUser?.first_name || '',
                middle_name: selectedUser?.middle_name || '',
                last_name: selectedUser?.last_name || '',
                department_id: selectedUser?.department_id || '',
                title_id: selectedUser?.title_id || '',
                branch_id: selectedUser?.branch_id || '',
                city: selectedUser?.city?.id || '',
                status: 'Active',
            },
        //validation
        validationSchema: Yup.object({
            employeeID: Yup.string().required('required *').length(11, 'Employee ID must be exactly 11 characters'),
            first_name: Yup.string().required('required *'),
            last_name: Yup.string().required('required *'),
            title_id: Yup.string().required('required *'),
            branch_id: Yup.string().required('required *'),
            city: Yup.string().required('required *'),
        }),
        onSubmit: (values) => {
            console.log(values)
            setUpdating(true)
            axiosClient.put(`/update-user-info/${ID}`,values)
            .then((response) => {console.log(response)
                setUpdating(false)
                close_confirmation()
                close()
            })
            .catch((err) => {
                setErrorMessage({
                    message: err.response.data.message,
                    errors: err.response.data.errors
                })
                setError(true)
                setLoading(false);
            })

        }
    })

    //Update Error
    const [OpenError, setError] = useState(false)
    const reset = () => {
        close();
        formik.resetForm();
    }
    //Data
        const [errorMessage, setErrorMessage] = useState({
            message: '',
            errors: {}
        })


    return (
        <>
        <Dialog open={open} onClose={()=>{}} className={classname}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30" />
                <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
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
                                    <div className="mx-4 flex flex-row gap-5 items-center justify-center">
                                        {
                                            loading ? (
                                                <p className="px-40 py-32 self-center font-text text-unactive">Loading User Information....</p>
                                            ) :
                                            (
                                                <form onSubmit={formik.handleSubmit} className="grid grid-cols-3 gap-y-2 py-4 w-full">
                                            {/* Name */}
                                            <div className="gap-2 row-start-2 col-span-3 pr-2 grid grid-cols-[auto_auto_auto_min-content] grid-row-1">
                                                <div className="inline-flex flex-col justify-between">
                                                    <label htmlFor="first_name" className="font-text text-xs flex flex-row justify-between">
                                                        <p>First Name: </p>
                                                    </label>
                                                    <input type="text" name="first_name"
                                                            value={formik.values.first_name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={loading}
                                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    <div className="h-4">
                                                        {formik.touched.first_name && formik.errors.first_name ? (<div className="text-red-500 text-xs font-text">{formik.errors.first_name}</div>):null}
                                                    </div>
                                                </div>
                                                <div className="inline-flex flex-col justify-between">
                                                    <label htmlFor="middle_name" className="font-text text-xs flex flex-row justify-between">
                                                        <p>Middle Name: </p>
                                                    </label>
                                                    <input type="text" name="middle_name"
                                                            value={formik.values.middle_name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={loading}
                                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    <div className="h-4"></div>
                                                </div>
                                                <div className="inline-flex flex-col justify-between">
                                                    <label htmlFor="last_name" className="font-text text-xs flex flex-row justify-between">
                                                        <p>Last Name: </p>
                                                    </label>
                                                    <input type="text" name="last_name"
                                                            value={formik.values.last_name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={loading}
                                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    <div className="h-4">
                                                        {formik.touched.last_name && formik.errors.last_name ? (<div className="text-red-500 text-xs font-text">{formik.errors.last_name}</div>):null}
                                                    </div>
                                                </div>
                                                <div className="inline-flex flex-col justify-between">
                                                    <label htmlFor="suffix" className="font-text text-xs flex flex-row justify-between">
                                                        <p>Suffix: </p>
                                                    </label>
                                                    <input type="text" name="suffix"
                                                            value={formik.values.suffix}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={loading}
                                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    <div className="h-4"></div>
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
                                                <div className="h-4">
                                                    {formik.touched.employeeID && formik.errors.employeeID ? (<div className="text-red-500 text-xs font-text">{formik.errors.employeeID}</div>):null}
                                                </div>
                                            </div>


                                            {/* Department */}
                                            <div className="inline-flex flex-col gap-2 row-start-3 col-span-1 pr-2">
                                                {/* Must be dropdown */}
                                                <label htmlFor="department" className="font-text text-xs flex">Deparment:</label>
                                                <div className="grid grid-cols-1">
                                                            <select id="department_id" name="department_id" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                                value={formik.values.department_id}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                disabled={loading}>
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
                                                <div className="h-4">
                                                    {formik.touched.department_id && formik.errors.department_id ? (<div className="text-red-500 text-xs font-text">{formik.errors.department_id}</div>):null}
                                                </div>
                                            </div>

                                            {/* Job Title */}
                                            <div className="inline-flex flex-col gap-2 row-start-3 col-span-1">
                                                {/* Must be dropdown */}
                                                <label htmlFor="title" className="font-text text-xs">Title:</label>
                                                <div className="grid grid-cols-1">
                                                            <select id="title_id" name="title_id" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                                value={formik.values.title_id}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                disabled={loading}>
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
                                                <div className="h-4">
                                                    {formik.touched.title_id && formik.errors.title_id ? (<div className="text-red-500 text-xs font-text">{formik.errors.title_id}</div>):null}
                                                </div>
                                            </div>


                                            {/* City Location */}
                                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-1 pr-2">
                                                <label htmlFor="city" className="font-text text-xs flex flex-row justify-between">
                                                    <p>City:</p>
                                                    {formik.touched.city && formik.errors.city ? (<div className="text-red-500 text-xs font-text">{formik.errors.city}</div>):null}
                                                </label>
                                                <div className="grid grid-cols-1">
                                                            <select id="city" name="city" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                            value={formik.values.city}
                                                            onChange={handleBranchesOptions}
                                                            onBlur={formik.handleBlur}
                                                            disabled={loading}>
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
                                                <div className="h-4">
                                                    {formik.touched.city && formik.errors.city ? (<div className="text-red-500 text-xs font-text">{formik.errors.city}</div>):null}
                                                </div>
                                            </div>

                                            {/* Branch Location */}
                                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-2 pr-2">
                                                <label htmlFor="branch" className="font-text text-xs">Branch Location:</label>
                                                <div className="grid grid-cols-1">
                                                                <select id="branch_id" name="branch_id" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                                    value={formik.values.branch_id}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    disabled={loading}>
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
                                                <div className="h-4">
                                                    {formik.touched.branch_id && formik.errors.branch_id ? (<div className="text-red-500 text-xs font-text">{formik.errors.branch_id}</div>):null}
                                                </div>
                                            </div>
                                            {/* Submit */}
                                            <div className="row-start-5 col-span-3 py-2 flex flex-row gap-2">
                                                <button type="button" className="w-full inline-flex flex-col items-center gap-2 p-4 rounded-md font-header uppercase text-primary border-2 border-primary text-xs hover:text-white hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out"
                                                    onClick={close}>
                                                    <p>Cancel</p>
                                                </button>
                                                <button type="submit" className="w-full inline-flex flex-col items-center gap-2 bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out">
                                                    <p>{updating ? "Updating..." : "Submit"}</p>
                                                </button>
                                            </div>
                                        </form>
                                            )
                                        }
                                    </div>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
        <EdituserErrorModal error={OpenError} close={()=>setError(false)} message={errorMessage.message} desc={errorMessage.errors}/>
        </>
    )
}

export default EditUserModal
