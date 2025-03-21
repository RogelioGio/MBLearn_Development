import { faUserGroup, faUserLock, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useUser } from "../contexts/selecteduserContext";
import { useEffect, useState } from "react";
import { useOption } from "../contexts/AddUserOptionProvider";
import { useFormik } from "formik";

const EditUserCredsModal = ({open, close,ID}) => {
    const {selectedUser, selectUser, isFetching} = useUser();
    const [isLoading, setLoading] = useState(true);
    const {cities=[], titles=[], location=[], roles=[], departments=[]} = useOption();
    const [tab, setTab] = useState(1)

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
        onsubmit: (values) => {
            console.log(values);
        }
    })

    return(
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
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
                                            <form className="grid grid-cols-3 gap-2  pb-4 w-full">
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
                                                            <input type="text" name="password"
                                                                    value={formik.values.password}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
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

                                                <div className="row-start-3 col-span-3 py-2 flex flex-row gap-2">
                                                    <button className="w-full inline-flex flex-col items-center gap-2 row-start-7 col-span-3 p-4 rounded-md font-header uppercase text-primary border-2 border-primary text-xs hover:text-white hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out"
                                                        onClick={(e)=>close(e)}>
                                                        <p>Cancel</p>
                                                    </button>
                                                    <input type="submit"
                                                    value='Submit'
                                                    className="w-full inline-flex flex-col items-center gap-2 row-start-7 col-span-3 bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out" />
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
    )
}
export default EditUserCredsModal
