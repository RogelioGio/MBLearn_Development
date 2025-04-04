import { faEye, faEyeSlash, faUserGroup, faUserLock, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useUser } from "../contexts/selecteduserContext";
import { useEffect, useState } from "react";
import { useOption } from "../contexts/AddUserOptionProvider";
import { useFormik } from "formik";
import axiosClient from "../axios-client";
import EdituserErrorModal from "./EdituserErrorModal";

const EditUserCredsModal = ({open, close,ID, editSuccess}) => {
    const {selectedUser, selectUser, isFetching} = useUser();
    const [isLoading, setLoading] = useState(true);
    const {cities=[], titles=[], location=[], roles=[], departments=[]} = useOption();
    const [tab, setTab] = useState(1)
    const [updating, setUpdating] = useState(false)

    //Handle Password
        const [showPassword, setShowPassword] = useState(false);
        const [password, setPassword] = useState('');

        const togglePassword = () =>{
            setShowPassword(!showPassword);
        };
        const handlePassword = (e) =>{
            const {value} = e.target;
            formik.setFieldValue('password', value);
            setPassword(value);
        }
    useEffect(() => {
        formik.resetForm();
        setUpdating(false)
    },[])
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
    }, [isFetching])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            MBEmail: selectedUser?.user_credentials?.MBemail || "Loading...",
            password: "",
            role: selectedUser?.roles?.[0].id || "Loading",
        },
        onSubmit: (values) => {
            console.log(values);

            const payload = {
                MBemail: values.MBEmail,
                password: values.password
            }

            setUpdating(true);
            axiosClient.put(`/update-user-creds/${ID}`, payload)
            .then((res) => {
                editSuccess()
                close()
                setUpdating(false)
                console.log(res)
            }).catch((err) => {
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

    return(
        <>
        <Dialog open={open} onClose={()=>{isLoading ? close : null}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30"/>
            <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text center'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='bg-white rounded-md h-full w-fit p-5 flex flex-col justify-center'>
                            {/* Header */}
                                <div className="py-4 mx-4 border-b border-divider flex flex-row justify-between item-center gap-4">
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Edit User Credentials & System Access</h1>
                                        <p className="text-unactive font-text text-md">Enables administrators to update and modify user credentials and account details.</p>
                                    </div>
                                    <div className="bg-primarybg p-5 rounded-full">
                                        <div className="h-full w-fit aspect-square flex items-center justify-center">
                                            <FontAwesomeIcon icon={faUserPen} className="text-primary text-lg"/>
                                        </div>
                                    </div>
                                </div>
                                {
                                    isLoading ? (
                                        <p className="px-40 py-32 self-center font-text text-unactive">Loading User Credentials....</p>
                                    ):(
                                        <>
                                         {/* Tab for Editing */}
                                            <div className='row-start-2 col-span-4 w-auto mx-5 py-3 gap-3'>
                                            <div className="w-full flex flex-row rounded-md shadow-md hover:cursor-pointer">
                                                <span className={`w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-l-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === 1 ? 'bg-primary text-white' : ''}`} onClick={() =>{setTab(1)}}>
                                                    <FontAwesomeIcon icon={faUserLock}/>
                                                    Account Credentials
                                                </span>
                                                <span className={` w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-r-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === 2 ? 'bg-primary text-white' : ''}`} onClick={() =>{setTab(2)}}>
                                                    <FontAwesomeIcon icon={faUserGroup}/>
                                                    Roles and Permission
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mx-4 flex flex-row gap-5">
                                            <form className="grid grid-cols-3 gap-2  pb-4 w-full" onSubmit={formik.handleSubmit}>
                                            {
                                                tab === 1 ? (
                                                    <>
                                                        {/* Employee Information */}
                                                        <div className="py-4">
                                                            <p className="font-text text-xs text-unactive">Employee's Full Name:</p>
                                                            <p className="font-text">{selectedUser?.first_name} {selectedUser?.middle_name} {selectedUser?.last_name}</p>
                                                        </div>
                                                        <div className="py-4">
                                                            <p className="font-text text-xs text-unactive">Department & Branch:</p>
                                                            <p className="font-text">{selectedUser?.department?.department_name}</p>
                                                            <p className="font-text text-xs">{selectedUser?.title?.title_name}</p>
                                                        </div>
                                                        <div className="py-4">
                                                            <p className="font-text text-xs text-unactive">Metrobank Branch</p>
                                                            <p className="font-text">{selectedUser?.branch.branch_name}</p>
                                                            <p className="font-text text-xs">{selectedUser?.city?.city_name}</p>
                                                        </div>
                                                    <div className="inline-flex flex-col gap-1 row-start-2 col-span-2 py-2">
                                                            <label htmlFor="MBEmail" className="font-text text-xs flex flex-row justify-between">
                                                                <p>Employee's Metrobank Email *</p>
                                                            </label>
                                                            <input type="text" name="MBEmail"
                                                                    value={formik.values.MBEmail}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    </div>
                                                    <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                                            <label htmlFor="name" className="font-text text-xs flex flex-row justify-between">
                                                                <p>Employee's Account Password *</p>
                                                            </label>
                                                            <div className="flex flex-row border border-divider rounded-md focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                            <input  type={showPassword ? "text" : "password"} name="password"
                                                                    value={formik.values.password}
                                                                    onChange={handlePassword}
                                                                    onBlur={formik.handleBlur}
                                                                    className="font-text p-2 rounded-md focus:outline-none"/>
                                                            <div className="flex flex-col justify-center items-center w-11  text-unactive">
                                                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='text-primary cursor-pointer' onClick={togglePassword}/>
                                                            </div>
                                                            </div>
                                                    </div>
                                                    </>
                                                ) : tab === 2 ? (
                                                    <>
                                                    <div className="inline-flex flex-col gap-1 row-start-1 col-span-3 py-2">
                                                        <label htmlFor="role" className="font-header text-xs flex flex-row justify-between">
                                                            <p className="text-xs font-text">Employee's Account Role <span className="text-red-500">*</span></p>
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
                                                    <div>
                                                        <label htmlFor="role" className="font-header text-xs flex flex-row justify-between">
                                                            <p className="text-xs font-text">Account Role Permissions<span className="text-red-500">*</span></p>
                                                        </label>
                                                    </div>
                                                    </>
                                                ) : (null)
                                            }

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
                                        </div>
                                        </>
                                    )
                                }

                        </div>
                    </DialogPanel>
                </div>
            </div>

        </Dialog>
        <EdituserErrorModal error={OpenError} close={()=>setError(false)} message={errorMessage.message} desc={errorMessage.errors}/>
        </>
    )
}
export default EditUserCredsModal
