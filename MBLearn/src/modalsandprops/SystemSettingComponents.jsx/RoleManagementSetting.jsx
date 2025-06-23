import { faBookOpenReader, faFileSignature, faGraduationCap, faSave, faSwatchbook, faUserClock, faUserLock, faUsers, faUserShield, faUsersLine } from "@fortawesome/free-solid-svg-icons"
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
import { ScrollArea } from "MBLearn/src/components/ui/scroll-area" // Ensure styles are imported
import LearnerPermissionProps from "./LearnerPermissionProps"

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
    const permissionswitch = (perm_id,permission_name ,checked) => {
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
        //console.log(refPermission)
        // console.log(saved)
        //console.log(saving)
    },[refPermission,permissionswitch])

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
                <div className="row-span-1 col-span-2 flex-row justify-between items-center pb-2 hidden
                                md:flex">
                    <div>
                        <h1 className="font-header text-primary text-xl">Role Management</h1>
                        <p className="font-text text-unactive text-xs">Create and manage roles function and permission in the system</p>
                    </div>
                </div>
                {/* Available Role*/}
                <div className="row-span-1 col-span-2 grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[min-content_auto] gap-2">
                    <div className="col-span-4">
                        <p className="text-unactive font-text text-xs">Avaliable Roles:</p>
                    </div>
                    <div className={`hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out border-2 border-primary rounded-md shadow-md p-4 text-primary flex flex-row justify-center items-center gap-x-2 ${selectedRole === 4 ? "bg-primary text-white":null}`} onClick={()=> changeRoles(4)}>
                        <div>
                            <p className="font-header">SME</p>
                            <p className="font-text text-xs">Personnels that create courses</p>
                        </div>
                        <FontAwesomeIcon icon={faSwatchbook} className="text-4xl"/>

                    </div>
                    <div className={`hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out border-2 border-primary rounded-md shadow-md p-4 text-primary flex flex-row justify-center items-center gap-x-2 ${selectedRole === 1 ? "!bg-primary text-white":null}`} onClick={()=>changeRoles(1)}>
                        <div>
                            <p className="font-header">System Admin</p>
                            <p className="font-text text-xs">Personnels that mange users</p>
                        </div>
                        <FontAwesomeIcon icon={faUserShield} className="text-4xl"/>
                    </div>
                    <div className={`hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out border-2 border-primary rounded-md shadow-md p-4 text-primary flex flex-row justify-center items-center gap-x-2 ${selectedRole === 2 ? "!bg-primary text-white":null}`} onClick={()=>changeRoles(2)}>
                        <div>
                            <p className="font-header">Course Admin</p>
                            <p className="font-text text-xs">Personnels that manage enrollments</p>
                        </div>
                        <FontAwesomeIcon icon={faBookOpenReader} className="text-4xl"/>
                    </div>
                    <div className={`hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out border-2 border-primary rounded-md shadow-md p-4 text-primary flex flex-row justify-center items-center gap-x-2 ${selectedRole === 3 ? "!bg-primary text-white":null}`} onClick={()=>changeRoles(3)}>
                        <div>
                            <p className="font-header">Learners</p>
                            <p className="font-text text-xs">Personnels that take the courses</p>
                        </div>
                        <FontAwesomeIcon icon={faGraduationCap} className="text-4xl"/>
                    </div>
                </div>

                {/* Permision Settings */}
                <div className="row-span-1 col-span-2 flex flex-col gap-2">
                    <div className="row-span-1 col-span-2 flex flex-row justify-between items-center py-2">
                        <div>
                            <h1 className="font-header text-primary text-base">
                                {
                                    selectedRole === 1 ? "System Admin "
                                    : selectedRole === 2 ? "Course Admin "
                                    : selectedRole === 3 ? "Learner "
                                    : selectedRole === 4 ? "Subject Matter Experts "
                                    : null
                                }
                                Default Role Permission</h1>
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
                                                    permissionRef={refPermission}
                                                />
                                            );
                                        case 2:
                                            return (
                                                <CourseAdminPermissionProps
                                                    isChecked={isChecked}
                                                    permissionswitch={permissionswitch}
                                                    permissionRef={refPermission}
                                                />
                                            );
                                        case 3:
                                            return (
                                                <LearnerPermissionProps
                                                    isChecked={isChecked}
                                                    permissionswitch={permissionswitch}
                                                    permissionRef={refPermission}
                                                />
                                            );
                                        default:
                                            return (
                                                <>
                                                <SystemAdminPermissionProps
                                                    isChecked={isChecked}
                                                    permissionswitch={permissionswitch}
                                                    permissionRef={refPermission}
                                                    />
                                                <CourseAdminPermissionProps
                                                    isChecked={isChecked}
                                                    permissionswitch={permissionswitch}
                                                    permissionRef={refPermission}
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
