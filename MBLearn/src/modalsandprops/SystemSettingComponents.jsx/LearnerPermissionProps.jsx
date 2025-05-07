const LearnerPermissionProps = ({isChecked,permissionswitch,permissionRef}) => {
    return(
        <>
            {/* Learners Permission */}
        <div>
            <p className="font-text text-unactive text-sm py-2">Learning Permission</p>
            <div className="flex flex-col gap-2 border border-primary rounded-md p-5 bg-white shadow-md">
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="AddCourse">
                        <h1 className="font-header text-primary text-base">Upload Certificate</h1>
                        <p className="font-text text-unactive text-sm">Allows users to upload external certificates as part of their learning records.</p>
                    </label>
                    {/* <Switch id="AddCourse" checked={isChecked("AddCourse")} onCheckedChange={(checked) => permissionswitch(permissionRef.find(p => p.permission_name === "AddCourse").id,"AddCourse",checked)}/> */}
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="EditCourseDetails">
                        <h1 className="font-header text-primary text-base">Delete Certificate</h1>
                        <p className="font-text text-unactive text-sm">Grants the ability to remove previously uploaded certificates from the system.</p>
                    </label>
                    {/* <Switch id="EditCourseDetails" checked={isChecked("EditCourseDetails")} onCheckedChange={(checked) => permissionswitch(permissionRef.find(p => p.permission_name === "EditCourseDetails").id,"EditCourseDetails",checked)}/> */}
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="DeleteCourse">
                        <h1 className="font-header text-primary text-base">Self Enroll</h1>
                        <p className="font-text text-unactive text-sm">Allows users to enroll in available courses on their own without admin approval.</p>
                    </label>
                    {/* <Switch id="DeleteCourse" checked={isChecked("DeleteCourse")} onCheckedChange={(checked) => permissionswitch(permissionRef.find(p => p.permission_name === "DeleteCourse").id,"DeleteCourse",checked)}/> */}
                </div>
            </div>
        </div>
        </>
    )
}
export default LearnerPermissionProps
