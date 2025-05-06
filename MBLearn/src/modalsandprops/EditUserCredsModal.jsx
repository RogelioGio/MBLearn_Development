import { faEye, faEyeSlash, faUserGroup, faUserLock, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useUser } from "../contexts/selecteduserContext";
import { useEffect, useState } from "react";
import { useOption } from "../contexts/AddUserOptionProvider";
import { useFormik } from "formik";
import axiosClient from "../axios-client";
import EdituserErrorModal from "./EdituserErrorModal";
import AccountPermissionProps from "./AccountPermissionsProps"
import { DatabaseZap } from "lucide-react";
import { useStateContext } from "../contexts/ContextProvider";


const EditUserCredsModal = ({open, close, ID, editSuccess}) => {
    const {user} = useStateContext()
    const [isLoading, setLoading] = useState(true);
    const {cities=[], titles=[], location=[], roles=[], departments=[], permission=[]} = useOption();
    const [tab, setTab] = useState(1)
    const [updating, setUpdating] = useState(false)
    const [role, setRoles] = useState([])
    const [selectedUser, setSelectedUser] = useState()
    const [accountPerm, setAccountPerm] =useState([])

    //Permission Check
    const hasPermission = (user, perms = []) => {
        return user?.user_infos?.permissions?.some(permission =>
            perms.includes(permission.permission_name)
        );
    };

    useEffect(() => {
        setLoading(true)
        axiosClient.get(`/select-user-creds/${ID}`)
        .then(({data}) => {
            setSelectedUser(data)
            console.log(data)
            setLoading(false)
        })
        .catch(error => console.error(error));
    },[ID])
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

    //Must Seperate the formik from the modal

    const formik = useFormik({
        enableReinitialize: true,
        initialValues:
        tab === 1 ? {
            MBEmail: selectedUser?.MBemail || "Loading...",
            password: "",
        }:{
            role: selectedUser?.user_infos.roles?.[0].id || "Loading",
        },

        onSubmit: (values) => {
            console.log(values);

            setUpdating(true);

            if (tab === 1) {
                const payload = {
                MBemail: values.MBEmail,
                password: values.password,
                };

                axiosClient.put(`/update-user-creds/${ID}`, payload)
                .then((res) => {
                    editSuccess();
                    close();
                    setUpdating(false);
                    console.log(res);
                })
                .catch((err) => {
                    setErrorMessage({
                    message: err.response?.data?.message,
                    errors: err.response?.data?.errors,
                    });
                    setError(true);
                    setUpdating(false); // You had setLoading(false); instead
                });
            } else {
                const payload = {
                    ...(selectedUser.user_infos.roles?.[0].id !== values.role && { role: values }),
                    permissions: accountPerm
                }
                console.log("Tab 2 submitted:", payload);
                setUpdating(false)

                if(selectedUser.user_infos.roles?.[0].id !== values.role){
                    null
                } else {
                    axiosClient.put(`/updateUserPermission/${selectedUser.id}`, accountPerm)
                    .then((res) => {
                        editSuccess();
                        setTab(1)
                        close();
                        setUpdating(false);
                        console.log(res);
                    })
                }
            }
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
            setRoles(formik.values.role)
        },[])

    // useEffect(() => {
    //     if (formik.values.role) {
    //         console.log("Selected Role ID:", formik.values.role);
    //         console.log("Permissions:", permission);
    //     }
    // }, [formik.values.role, permission]);

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
                                                tab === 1 && hasPermission(user, ["EditUserCredentials"])? (
                                                    <>
                                                        {/* Employee Information */}
                                                        <div className="py-4">
                                                            <p className="font-text text-xs text-unactive">Employee's Full Name:</p>
                                                            <p className="font-text">{selectedUser?.user_infos.first_name} {selectedUser?.user_infos.middle_name} {selectedUser?.user_infos.last_name}</p>
                                                        </div>
                                                        <div className="py-4">
                                                            <p className="font-text text-xs text-unactive">Department & Branch:</p>
                                                            <p className="font-text">{selectedUser?.user_infos.department?.department_name}</p>
                                                            <p className="font-text text-xs">{selectedUser?.user_infos.title?.title_name}</p>
                                                        </div>
                                                        <div className="py-4">
                                                            <p className="font-text text-xs text-unactive">Metrobank Branch</p>
                                                            <p className="font-text">{selectedUser?.user_infos.branch.branch_name}</p>
                                                            <p className="font-text text-xs">{selectedUser?.user_infos.city?.city_name}</p>
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
                                                ) : tab === 1 ? (
                                                    <div className="inline-flex flex-col gap-1 row-start-1 row-span-4 col-span-3 py-2 items-center justify-center">
                                                        <p className="text-unactive font-text p-10">User is not unauthorized to this action</p>
                                                    </div>
                                                ) : tab === 2  && hasPermission(user, ["EditUserRoles"]) ? (
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
                                                    {
                                                        formik.values.role ? (<div className="col-span-3">
                                                            {/* Bug to fix: not reliant to the user but instead relies on the role.permission */}
                                                            <AccountPermissionProps refPermissions={permission} selectedRole={formik.values.role} role={role} setAccountPerm={setAccountPerm} currentPerm={selectedUser.user_infos.permissions}/>
                                                        </div>):(null)
                                                    }
                                                    </>
                                                ) : tab === 2 ? (
                                                    <div className="inline-flex flex-col gap-1 row-start-1 row-span-4 col-span-3 py-2 items-center justify-center">
                                                        <p className="text-unactive font-text p-10">User is not unauthorized to this action</p>
                                                    </div>
                                                ) : (null)
                                            }

                                                {/* Submit */}
                                            <div className="row-start-5 col-span-3 py-2 flex flex-row gap-2">
                                                <button type="button" className="w-full inline-flex flex-col items-center gap-2 p-4 rounded-md font-header uppercase text-primary border-2 border-primary text-xs hover:text-white hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out"
                                                    onClick={() => {
                                                        close();
                                                        setTab(1);
                                                    }}>
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
