const AssignedCourseEnrollmentCard = ({name, id, coursetype, coursecategory, duration, trainingmode, trainingtype, course, selected, onclick,numberOfEnrollees, AssignedCourse }) => {
    //const enrollees = numberOfEnrollees(id)
    return(
        <div className={`flex flex-col p-4 gap-2 border border-divider rounded-md font-text shadow-md hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out ${course === AssignedCourse?.name ? 'bg-primary text-white' : 'bg-white text-primary'}`}
            onClick={onclick}>
            {/* Badge */}
            <div>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                    {AssignedCourse.training_type}
                </span>
            </div>
            {/* Course Header */}
            <div className="col-span-2">
                <h1 className="text-sm font-header leading-tight">{AssignedCourse?.name}</h1>
                <p className="text-xs">Course ID: {AssignedCourse?.CourseID}</p>
            </div>

            {/* <div className="flex items-center justify-between col-span-2 pt-1">
                {
                    enrollees > 0 && <>

                        <p className={`${course === name ? 'text-white' : 'text-unactive'} text-xs`}>Number of Enrollees: </p>
                        <div className=" bg-[#1664C0] rounded-full text-white flex items-center justify-center aspect-square">
                            {/* <p className="text-xs px-3">{enrollees}</p>
                        </div>
                    </>
                }
                </div> */}
        </div>
    )
}
export default AssignedCourseEnrollmentCard;
