import { Switch } from "MBLearn/src/components/ui/switch"
const SystemAdminPermissionProps = ({isChecked,permissionswitch}) => {
    return(
        <>
        {/* User Management Permssion */}
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
                    <Switch id="editUser" checked={isChecked("EditUserInfo")} onCheckedChange={(checked) => permissionswitch("EditUserInfo",checked)}/>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="deleteUser">
                        <h1 className="font-header text-primary text-base">Delete User</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to remove or archived another user in the system</p>
                    </label>
                    <Switch id="deleteUser" checked={isChecked("DeleteUserInfo")} onCheckedChange={(checked) => permissionswitch("DeleteUserInfo",checked)}/>
                </div>
            </div>
        </div>
        {/* System Access Permissions */}
        <div>
            <p className="font-text text-unactive text-sm py-2">System Access Permissions</p>
            <div className="flex flex-col gap-2 border border-primary rounded-md p-5 bg-white shadow-md">
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="editUserCreds">
                        <h1 className="font-header text-primary text-base">Edit User Login Credentials</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to edit another user's login credentials in the system</p>
                    </label>
                    <Switch id="editUserCreds" checked={isChecked("EditUserCredentials")} onCheckedChange={(checked) => permissionswitch("EditUserCredentials",checked)}/>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="editUserRole">
                        <h1 className="font-header text-primary text-base">Edit User Role</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to edit another user's role in the system</p>
                    </label>
                    <Switch id="editUserRole" checked={isChecked("EditUserRoles")} onCheckedChange={(checked) => permissionswitch("EditUserRoles",checked)}/>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="accountReactivation">
                        <h1 className="font-header text-primary text-base">Account Reactivation</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to have the ability to reactivate user in the system</p>
                    </label>
                    <Switch id="accountReactivation" checked={isChecked("AccountReactivation")} onCheckedChange={(checked) => permissionswitch("AccountReactivation",checked)}/>
                </div>
            </div>
        </div>
        {/* Form Input */}
        <div>
            <p className="font-text text-unactive text-sm py-2">System Configuration Permissions</p>
            <div className="flex flex-col gap-2 border border-primary rounded-md p-5 bg-white shadow-md">
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="addFormInputs">
                        <h1 className="font-header text-primary text-base">Add Form Inputs</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to add form input in the system</p>
                    </label>
                    <Switch id="addFormInputs" checked={isChecked("AddFormInput")} onCheckedChange={(checked) => permissionswitch("AddFormInput",checked)}/>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="editFormInputs">
                        <h1 className="font-header text-primary text-base">Edit Form Inputs</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to edit form input in the system</p>
                    </label>
                    <Switch id="editFormInputs" checked={isChecked("EditFormInput")} onCheckedChange={(checked) => permissionswitch("EditFormInput",checked)}/>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="deleteFormInputs">
                        <h1 className="font-header text-primary text-base">Delete Form Inputs</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to remove or archived form input in the system</p>
                    </label>
                    <Switch id="deleteFormInputs" checked={isChecked("DeleteFormInput")} onCheckedChange={(checked) => permissionswitch("DeleteFormInput",checked)}/>
                </div>
            </div>
        </div>
        {/* Report Management Permissions */}
        <div>
            <p className="font-text text-unactive text-sm py-2">Report Management Permissions</p>
            <div className="flex flex-col gap-2 border border-primary rounded-md p-5 bg-white shadow-md">
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="readReports">
                        <h1 className="font-header text-primary text-base">Read Reports</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to read reports in the system</p>
                    </label>
                    <Switch id="readReports" checked={isChecked("ReadReports")} onCheckedChange={(checked) => permissionswitch("ReadReports",checked)}/>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="exportReport">
                        <h1 className="font-header text-primary text-base">Export Report</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to export reports from the system</p>
                    </label>
                    <Switch id="exportReport" checked={isChecked("ExportReports")} onCheckedChange={(checked) => permissionswitch("ExportReports",checked)}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default SystemAdminPermissionProps
