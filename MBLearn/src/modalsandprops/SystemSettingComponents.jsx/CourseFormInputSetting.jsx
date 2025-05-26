const CourseFormInputSetting = ({}) => {
    return(
        <>
        <div className="mx-2 px-3 py-5 row-span-2 col-span-3 grid grid-cols-2 grid-rows-[min-content_auto] gap-8 overflow-y-auto max-h-full">
             {/* Header */}
            <div className="row-span-1 col-span-2 flex flex-row justify-between items-center pb-2">
                <div>
                    <h1 className="font-header text-primary text-xl">Course Form Inputs</h1>
                    <p className="font-text text-unactive text-xs">Defines the fields and input options required when creating or editing a course, such as course title, description, training type, schedule, requirements, and other metadata essential for course setup and management.</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default CourseFormInputSetting;
