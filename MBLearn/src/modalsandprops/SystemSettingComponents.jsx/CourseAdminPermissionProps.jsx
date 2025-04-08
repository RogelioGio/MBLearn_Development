import { Switch } from "MBLearn/src/components/ui/switch"
const CourseAdminPermissionProps = ({isChecked,permissionswitch}) => {
    return(
        <>
            {/* Course Management Permission */}
        <div>
            <p className="font-text text-unactive text-sm py-2">Course Management Permission</p>
            <div className="flex flex-col gap-2 border border-primary rounded-md p-5 bg-white shadow-md">
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="AddCourse">
                        <h1 className="font-header text-primary text-base">Add Course</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to add courses in the system</p>
                    </label>
                    <Switch id="AddCourse" checked={isChecked("AddCourse")} onCheckedChange={(checked) => permissionswitch("AddCourse",checked)}/>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="EditCourseDetails">
                        <h1 className="font-header text-primary text-base">Edit Course Details</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to edit course in the system</p>
                    </label>
                    <Switch id="EditCourseDetails" checked={isChecked("EditCourseDetails")} onCheckedChange={(checked) => permissionswitch("EditCourseDetails",checked)}/>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <label htmlFor="DeleteCourse">
                        <h1 className="font-header text-primary text-base">Delete Course</h1>
                        <p className="font-text text-unactive text-sm">The user have the permission to remove or archived courses in the system</p>
                    </label>
                    <Switch id="DeleteCourse" checked={isChecked("DeleteCourse")} onCheckedChange={(checked) => permissionswitch("DeleteCourse",checked)}/>
                </div>
            </div>
        </div>
        </>
    )
}
export default CourseAdminPermissionProps
