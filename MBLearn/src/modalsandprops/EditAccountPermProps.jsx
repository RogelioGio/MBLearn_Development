import { useEffect } from "react";
import SystemAdminPermissionProps from "./SystemSettingComponents.jsx/SystemAdminPermssionProps";

const EditAccountPermProps = ({selectedRole,referencePermission,roleWithPermission,currentPermission,setCurrentPermission}) => {
    const permissions = (roleId) => {
        return roleWithPermission?.find((r)=>r.id === parseInt(roleId))?.permissions
    }
    const isChecked = (permName) => {
        return currentPermission.some(p => p.permission_name === permName) ?? false
    }

    //currentPermission is the current permission the user have
    //referencePermission is the all the available permissions
    //isCheck is just a function that is thrown to know if user have the permssio or nah
    //permission is all the permission in the given role, default permissions
    useEffect(()=>{
        console.log(currentPermission)
    },[currentPermission])

    const permissionSwitch = (perm_id,perm_name,checked) => {
        const name = referencePermission.find(p => p.permission_name === perm_name).permission_name;
        const ids = referencePermission.find(p => p.id === perm_id).id;

        setCurrentPermission(prev =>{
            const exist = prev.some(p => p.permission_name === perm_name);

            if(!exist) {
                return [...prev, {id: ids, permission_name: name}];
            }else if(exist){
                return prev.filter(p => p.permission_name !== name);
            }
        })
    }

    return (
        <>
            {/* <ul>
                {
                    permissions(selectedRole)?.map((i)=>(
                        <p>{i.permission_name} is {isChecked(i.permission_name) ?  '✔️ checked' : '❌ not checked'}</p>
                    ))
                }
            </ul> */}
            {/* <ul>
                {
                    currentPermission.map((i)=>(<p>{i.permission_name}</p>))
                }
            </ul> */}

            <SystemAdminPermissionProps isChecked={isChecked} permissionswitch={permissionSwitch} permissionRef={referencePermission}/>
        </>
    )
}
export default EditAccountPermProps;
