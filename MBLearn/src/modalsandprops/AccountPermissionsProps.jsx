import { useEffect, useState } from "react";
import CourseAdminPermissionProps from "./SystemSettingComponents.jsx/CourseAdminPermissionProps";
import SystemAdminPermissionProps from "./SystemSettingComponents.jsx/SystemAdminPermssionProps";
import axiosClient from "../axios-client";

const AccountPermissionProps = ({refPermissions, selectedRole, role, setAccountPerm}) => {
    useEffect(() => {
        //console.log("Selected Role:", selectedRole);
        availablePermission();
    }, [selectedRole]);

    const [accountPerm, _setAccountPerm] = useState()


    const [permission, setPermissions] = useState([]);
    const availablePermission = () => {
        const selected = role.find((r) => r.id === parseInt(selectedRole));
        console.log("Selected Role Object:", selected);
        if (selected) {
            setPermissions(selected?.permissions)
            _setAccountPerm((selected?.permissions || []).map(p => ({
                permission_Id: p.id
            })))
        } else {
            setPermissions([]);
            console.log("No permissions found for the selected role.");
        }
    };

    useEffect(()=>{
        // console.log(refPermissions)
        // console.log(rolePermission)
        if(setAccountPerm){
            setAccountPerm(accountPerm)
        }
        console.log(permission)
    },[permission])

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
                    permission_id: perm?.id,}];
            } else if (!checked && exists) {
                //setSaved(false)
                return prev.filter(p=>p.permission_name !== permission_name)
            }
            return prev;
        })
    }

    return (
        <>
        {
            (() => {
                switch(selectedRole) {
                    case "1":
                        return <SystemAdminPermissionProps isChecked={isChecked} permissionswitch={permissionswitch}/>;
                    case "2":
                        return <CourseAdminPermissionProps isChecked={isChecked} permissionswitch={permissionswitch}/>;
                    default:
                        return null;
                }
            })()
        }
        </>
    );
}

export default AccountPermissionProps;
