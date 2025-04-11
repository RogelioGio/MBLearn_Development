import { faFileSignature, faSave, faUserClock, faUserLock, faUsers, faUsersLine } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "@inertiajs/vue3"
import { useFormik } from "formik"
import axiosClient from "MBLearn/src/axios-client"
import { Switch } from "MBLearn/src/components/ui/switch"
import { act, useEffect, useMemo, useRef, useState } from "react"
import UnsavedWarningModal from "./UnsavedWarningModal"
import { set } from "date-fns"
import { toast } from "sonner"
import SystemAdminPermissionProps from "./SystemAdminPermssionProps"
import CourseAdminPermissionProps from "./CourseAdminPermissionProps"
import CourseLoading from "../../assets/Course_Loading.svg";
const RoleManagementSetting = () => {
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedRole, setSelectedRole] = useState(1)
    const [_selectedRole, _setSelectedRole] = useState()
    const [permission, setPermissions] = useState([])
    const [refPermission, setRefPermission] = useState([])
    const [saved, setSaved] = useState(true);
    const [warning, setWarning] = useState(false);
    const [saving, setSaving] = useState(false);

    // Fetch Roles
    const fetchRoles = () => {
        axiosClient.get('/roles')
        .then(({data}) => {
            setRoles(data.roles)
            setRefPermission(data.permissions)
            setLoading(false)
        })
        .catch(error => console.error(error));
    }
    useEffect(() => {
        fetchRoles()
    },[])


    //permision handling
    const availablePermission = () => {
        const selected = roles.find((role) => role.id === selectedRole);
        if (selected) {
            setPermissions(selected.permissions);  // Set permissions if the role is found
        } else {
            setPermissions([]); // Reset permissions if no role found
        }
    }

    const changeRoles = (id) => {
        _setSelectedRole(id)
        if(!saved && selectedRole !== id){
            return setWarning(true)
        }
        setSelectedRole(id)
    }
    const isChecked = (permName) => {
        return permission.some(p => p.permission_name === permName);
    };
    const permissionswitch = (permission_name ,checked) => {
            const perm = refPermission.find(p => p.permission_name === permission_name);
        setPermissions(prev => {
            const exists = prev.some(p => p.permission_name === permission_name);

            if(checked && !exists) {
                setSaved(false)
                return [...prev, {
                    id: perm?.id,
                    permission_name:perm?.permission_name}];
            } else if (!checked && exists) {
                setSaved(false)
                return prev.filter(p=>p.permission_name !== permission_name)
            }
            return prev;
        })
    }

    // Continue Unsaved
    const continueUnsaved = () => {
        setSaved(true);        // Mark changes as saved
        setSelectedRole(_selectedRole); // Proceed with the role change
    };

    useEffect(()=>{
        // console.log(permission)
        // console.log(refPermission)
        // console.log(saved)
        console.log(saving)
    },[saving])

    // Save Changes
    const saveChanges = () => {
        const payload = permission.map(({id:permission_Id}) => ({
            permission_Id
        }));
        setSaving(true);
        // API
        axiosClient.post(`/updateRolePermission/${selectedRole}`, payload)
        .then(({data}) => {
            setPermissions(data.message.permissions);
            toast.success("Role Permission Updated", {
                description: "Changes are applied for the selected role"
            });
            setSaved(true);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setSaving(false);
        });
    };

    useEffect(() => {
        availablePermission(); // Ensure permissions are updated when selectedRole changes
    }, [selectedRole, roles]);


    return (
        <>

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
                                        <tr key={role.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer ${selectedRole === role.id ? "bg-gray-200" : ""}`} onClick={() => changeRoles(role.id)}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out  ${selectedRole === role.id ? "border-l-primary" : ""}`}>{role.role_name}</td>
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
                            {
                                !saved ? (
                                    <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full ${saving ? null : "hover:bg-primary hover:text-white hover:scale-105"} hover:cursor-pointer transition-all ease-in-out shadow-md`} onClick={!saving ? saveChanges : null}>
                                        {
                                            saving ? (
                                                <p>Saving Changes...</p>
                                            ) : (<>
                                                <FontAwesomeIcon icon={faSave}/>
                                                <p>Save Changes</p>
                                            </>)
                                        }

                                    </div>
                                ) : (null)
                            }
                        </div>
                    </div>

                    {
                        loading ? (
                            // Loading
                            <div className="flex flex-col justify-center items-center h-full p-10">
                                <img src={CourseLoading} alt="" className="w-80"/>
                                <p className="text-sm font-text text-primary">Hang tight! 🚀 Loading courses for — great things take a second!</p>
                            </div>
                        ) : (
                            <>
                            {
                                (() => {
                                    switch (selectedRole) {
                                        case 1:
                                            return (
                                                <SystemAdminPermissionProps
                                                    isChecked={isChecked}
                                                    permissionswitch={permissionswitch}
                                                />
                                            );
                                        case 2:
                                            return (
                                                <CourseAdminPermissionProps
                                                    isChecked={isChecked}
                                                    permissionswitch={permissionswitch}
                                                />
                                            );
                                        default:
                                            return (
                                                <>
                                                <SystemAdminPermissionProps
                                                    isChecked={isChecked}
                                                    permissionswitch={permissionswitch}
                                                    />
                                                <CourseAdminPermissionProps
                                                    isChecked={isChecked}
                                                    permissionswitch={permissionswitch}
                                                    />
                                                </>
                                            );
                                    }
                                })()
                            }
                            </>
                        )
                    }

                </div>
            </div>

            {/* UnsavedWarningModal */}
            <UnsavedWarningModal isOpen={warning} close={() => setWarning(false)} onContinue={continueUnsaved}/>
            </>
    );
}
export default RoleManagementSetting;
