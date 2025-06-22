import SystemAdminPermissionProps from "./SystemSettingComponents.jsx/SystemAdminPermssionProps";

const EditAccountPermProps = ({selectedRole,referencePermission,roleWithPermission,currentPermission}) => {
    const permissions = (roleId) => {
        return roleWithPermission?.find((r)=>r.id === parseInt(roleId))?.permissions
    }
    const isChecked = (permName) => {
        const currentPerms = permissions(selectedRole);
        return currentPerms.some(p => p.permission_name === permName) ?? false
    }

    console.log(currentPermission)


    return (
        <>
            {/* <ul>
                {
                    permissions(selectedRole)?.map((i)=>(
                        <p>{i.permission_name} is {isChecked(i.permission_name) ?  '✔️ checked' : '❌ not checked'}</p>
                    ))
                }
            </ul> */}
            <ul>
                {
                    currentPermission.map((i)=>(<p>{i.permission_name}</p>))
                }
            </ul>

            {/* <SystemAdminPermissionProps isChecked={isChecked} permissionswitch={permissionswitch} permissionRef={referencePermission}/> */}
        </>
    )
}
export default EditAccountPermProps;
