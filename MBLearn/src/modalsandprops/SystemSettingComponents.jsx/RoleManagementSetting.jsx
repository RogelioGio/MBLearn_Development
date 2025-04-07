import { faFileSignature, faSave, faUserClock, faUserLock, faUsers, faUsersLine } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "@inertiajs/vue3"
import { useFormik } from "formik"
import axiosClient from "MBLearn/src/axios-client"
import { Switch } from "MBLearn/src/components/ui/switch"
import { act, useEffect, useMemo, useRef, useState } from "react"

const RoleManagementSetting = () => {
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedRoleName, setSelectedRoleName] = useState()
    const [permission, setPermissions] = useState([])

    // Fetch Roles
    const fetchRoles = () => {
        axiosClient.get('/roles')
        .then((Response) => {
            setRoles(Response.data.data)
            setLoading(false)
        })
        .catch(error => console.error(error));
    }
    useEffect(() => {
        fetchRoles()
    },[])

    //Formik
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {}
    })

    //permision handling
    useEffect(()=>{
        const selected = roles.find((role)=> role.role_name === selectedRoleName)
        if (selected) {
            setPermissions(selected?.permissions); // Set permissions for the selected role
        } else {
            setPermissions([]); // Reset permissions if no role found
        }
    },[selectedRoleName])
    const isChecked = (permName) => {
        return permission.some(p => p.permission_name === permName);
    };
    const permissionswitch = (permission_name, checked) => {
        setPermissions(prev => {
            const exists = prev.some(p => p.permission_name === permission_name);
            if(checked && !exists) {
                return [...prev, {permission_name: permission_name}];
            } else if (!checked && exists) {
                return prev.filter(p=>p.permission_name !== permission_name)
            }
            return prev;
        })
    }

    useEffect(()=>{
        console.log(permission)
    },[permission])



    return (
        <div className="mx-5 py-5 row-span-2 col-span-3 grid grid-cols-2 grid-rows-[min-content_auto] gap-2">
                {/* Header */}
                <div className="row-span-1 col-span-2 flex flex-row justify-between items-center pb-2">
                    <div>
                        <h1 className="font-header text-primary text-xl">Role Management</h1>
                        <p className="font-text text-unactive text-xs">Create and manage roles function and permission in the system</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}>
                            <FontAwesomeIcon icon={faUserLock}/>
                            <p>Add Role</p>
                        </div>
                    </div>
                </div>
                {/* Available Role*/}
                <div className="row-span-1 col-span-2 flex flex-col gap-5">
                    <div>
                        <h1 className="font-header text-primary text-base">Available Roles</h1>
                        <p className="font-text text-unactive text-xs">Available roles and user that has different roles</p>
                    </div>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Role Name</th>
                                <th className='py-4 px-4 uppercase'>Users</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    <tr className="font-text text-sm hover:bg-gray-200">
                                    <td colSpan={4} className="text-center py-3 px-4 font-text text-primary">
                                        Loading...
                                    </td>
                                    </tr>
                                ):(
                                    roles.map((role) =>(
                                        <tr key={role.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer ${selectedRoleName === role.role_name ? "bg-gray-200" : ""}`} onClick={() => setSelectedRoleName(role.role_name)}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out  ${selectedRoleName === role.role_name ? "border-l-primary" : ""}`}>{role.role_name}</td>
                                            <td className={`font-text p-4 gap-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <FontAwesomeIcon icon={faUsers}/>
                                                    <p>{role.users_count} Users</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                        </table>
                    </div>

                </div>

                {/* Permision Settings */}
                <div className="row-span-1 col-span-2 flex flex-col gap-2">
                    <div className="row-span-1 col-span-2 flex flex-row justify-between items-center py-2">
                        <div>
                            <h1 className="font-header text-primary text-base">Default Role Permission</h1>
                            <p className="font-text text-unactive text-xs">Cutomize the selected role's permission to the system funtionalities</p>
                        </div>
                        <div>
                            <div className="flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md">
                                <FontAwesomeIcon icon={faSave}/>
                                <p>Save Changes</p>
                            </div>
                        </div>
                    </div>

                    {/* User Management Permission  */}
                    <div>
                        <p className="font-text text-unactive text-sm py-2">User Managment Permissions</p>

                        <div className="flex flex-col gap-2 border border-primary rounded-md p-5 bg-white shadow-md">
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="addUser">
                                    <h1 className="font-header text-primary text-base">Add User</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to add another user in the system</p>
                                </label>
                                <Switch id="addUser" checked={isChecked("AddUserInfo")} onCheckedChange={(checked) => permissionswitch("AddUserInfo",checked)}/>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="editUser">
                                    <h1 className="font-header text-primary text-base">Edit User</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to edit another user's information in the system</p>
                                </label>
                                <Switch id="editUser"/>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="deleteUser">
                                    <h1 className="font-header text-primary text-base">Delete User</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to remove or archived another user in the system</p>
                                </label>
                                <Switch id="deleteUser"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="font-text text-unactive text-sm py-2">System Access Permissions</p>

                        <div className="flex flex-col gap-2 border border-primary rounded-md p-5 bg-white shadow-md">
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="editUserCreds">
                                    <h1 className="font-header text-primary text-base">Edit User Login Credentials</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to edit another user's login credentials in the system</p>
                                </label>
                                <Switch id="editUserCreds"/>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="editUserRole">
                                    <h1 className="font-header text-primary text-base">Edit User Role</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to edit another user's role in the system</p>
                                </label>
                                <Switch id="editUserRole"/>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="accountReactivation">
                                    <h1 className="font-header text-primary text-base">Account Reactivation</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to have the ability to reactivate user in the system</p>
                                </label>
                                <Switch id="accountReactivation"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="font-text text-unactive text-sm py-2">System Configuration Permissions</p>

                        <div className="flex flex-col gap-2 border border-primary rounded-md p-5 bg-white shadow-md">
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="addFormInputs">
                                    <h1 className="font-header text-primary text-base">Add Form Inputs</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to add form input in the system</p>
                                </label>
                                <Switch id="addFormInputs"/>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="editFormInputs">
                                    <h1 className="font-header text-primary text-base">Edit Form Inputs</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to edit form input in the system</p>
                                </label>
                                <Switch id="editFormInputs"/>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="deleteFormInputs">
                                    <h1 className="font-header text-primary text-base">Delete Form Inputs</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to remove or archived form input in the system</p>
                                </label>
                                <Switch id="deleteFormInputs"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="font-text text-unactive text-sm py-2">Report Management Permissions</p>

                        <div className="flex flex-col gap-2 border border-primary rounded-md p-5 bg-white shadow-md">
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="readReports">
                                    <h1 className="font-header text-primary text-base">Read Reports</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to read reports in the system</p>
                                </label>
                                <Switch id="readReports"/>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <label htmlFor="exportReport">
                                    <h1 className="font-header text-primary text-base">Export Report</h1>
                                    <p className="font-text text-unactive text-sm">The user have the permission to export reports from the system</p>
                                </label>
                                <Switch id="exportReport"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    );
}
export default RoleManagementSetting;
