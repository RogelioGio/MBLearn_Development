const AssignedCourseEnrollmentCard = ({selected, onclick, AssignedCourse, numberOfEnrollees }) => {
    //const enrollees = numberOfEnrollees(id)
    return(
        <div className={`group flex flex-col p-4 gap-2 border border-primary rounded-md font-text shadow-md hover:cursor-pointer hover:bg-primaryhover hover:text-white transition-all ease-in-out ${selected.name === AssignedCourse?.name ? 'bg-primary text-white' : 'bg-white text-primary'}`}
            onClick={onclick}>
            {/* Badge */}
            <div className="flex justify-between items-center">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                    {AssignedCourse.training_type }
                </span>
                {
                    numberOfEnrollees ?
                    <div className={`flex items-center justify-center font-header text-sm w-8 h-8 rounded-full transition-all ease-in-out ${selected.name === AssignedCourse?.name ? 'bg-white text-primary' : 'bg-primary text-white group-hover:bg-white group-hover:text-primary'}`}>
                        {numberOfEnrollees }
                    </div>
                    : <div className="w-8 h-8"/>
                }
            </div>
            {/* Course Header */}
            <div className="col-span-2">
                <h1 className="text-sm font-header leading-tight">{AssignedCourse?.name}</h1>
                <p className="text-xs">Course ID: {AssignedCourse?.CourseID}</p>
            </div>
        </div>
    )
}
export default AssignedCourseEnrollmentCard;
