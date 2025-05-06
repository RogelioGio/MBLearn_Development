const AssignedCourseEnrollmentCard = ({name, id, coursetype, coursecategory, duration, trainingmode, trainingtype, course, selected, onclick,numberOfEnrollees }) => {
    const enrollees = numberOfEnrollees(id)
    return(
        <div className={`snap-end group w-full p-3 grid grid-cols-[auto_3.75rem] border border-divider rounded-md font-text shadow-md hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out ${course === name ? 'bg-primary text-white' : 'bg-white text-primary'}`}
            onClick={onclick}>
            {/* Badge */}
            <div className="flex flex-row items-center justify-between pb-2 col-span-2">
                <div className="flex flex-row gap-2">
                    {
                        course === name ? (
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                                {trainingtype}
                            </span>) : (
                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                                {trainingtype}
                            </span>
                        )
                    }
                </div>


            </div>
            {/* Course Header */}
            <div className="col-span-2">
                <h1 className="text-sm font-header">{name}</h1>
                <p className="text-xs">{coursetype} - {coursecategory}</p>
            </div>

            <div className="flex items-center justify-between col-span-2 pt-1">
                {
                    enrollees > 0 && <>

                        <p className={`${course === name ? 'text-white' : 'text-unactive'} text-xs`}>Number of Enrollees: </p>
                        <div className=" bg-[#1664C0] rounded-full text-white flex items-center justify-center aspect-square">
                            <p className="text-xs px-3">{enrollees}</p>
                        </div>
                    </>
                }
                </div>
        </div>
    )
}
export default AssignedCourseEnrollmentCard;
