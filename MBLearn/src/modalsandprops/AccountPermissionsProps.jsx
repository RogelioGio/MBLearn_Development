import { useEffect, useState } from "react";
import CourseAdminPermissionProps from "./SystemSettingComponents.jsx/CourseAdminPermissionProps";
import SystemAdminPermissionProps from "./SystemSettingComponents.jsx/SystemAdminPermssionProps";
import axiosClient from "../axios-client";

const AccountPermissionProps = ({refPermissions, selectedRole, role}) => {
    useEffect(() => {
        // console.log("Selected Role:", selectedRole);
        // console.log("Role Permissions:", role);
        availablePermission();
    }, [selectedRole]);


    const [permission, setPermissions] = useState([]);
    const availablePermission = () => {
        const selected = role.find((r) => r.id === parseInt(selectedRole));
        console.log("Selected Role Object:", selected);
        if (selected) {
            setPermissions(selected?.permissions)
            console.log("Permissions:", selected?.permissions);
        } else {
            setPermissions([]);
            console.log("No permissions found for the selected role.");
        }
    };

    // useEffect(()=>{
    //     console.log(refPermissions)
    //     console.log(rolePermission)
    //     console.log(permission)
    // },[permission])

    const isChecked = (permName) => {
        return permission.some(p => p.permission_name === permName);
    };
    const permissionswitch = (permission_name ,checked) => {
            const perm = refPermissions.find(p => p.permission_name === permission_name);
        setPermissions(prev => {
            const exists = prev.some(p => p.permission_name === permission_name);

            if(checked && !exists) {
                //setSaved(false)
                return [...prev, {
                    id: perm?.id,
                    permission_name:perm?.permission_name}];
            } else if (!checked && exists) {
                //setSaved(false)
                return prev.filter(p=>p.permission_name !== permission_name)
            }
            return prev;
        })
    }

    return (
        <>
        <SystemAdminPermissionProps isChecked={isChecked} permissionswitch={permissionswitch}/>
        <CourseAdminPermissionProps isChecked={isChecked} permissionswitch={permissionswitch}/>
        </>
    );
}

export default AccountPermissionProps;
