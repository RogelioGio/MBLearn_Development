const AssignedCourseEnrollmentCard = ({name, coursetype, coursecategory, duration, trainingmode, course, selected, onclick, numberOfEnrollees}) => {
    return(
        <div className={`w-full h-40 p-5 grid  grid-cols-[auto_3.75rem] border border-divider rounded-md font-text shadow-md hover:cursor-pointer hover:scale-105 transition-all ease-in-out ${course === name ? 'bg-primary text-white' : 'bg-white text-primary'}`}
            onClick={onclick}>
            {/* Course Header */}
            <div className="col-span-2">
                <h1 className="text-sm font-header mb-2">{name}</h1>
                <p className="text-xs">{coursetype} - {coursecategory}</p>
            </div>

            {/* Duration & Training Method */}
            <div className="flex flex-col gap-0.5 text-xs row-start-2 items-start justify-end">
                <p>{duration}</p>
                <p>{trainingmode}</p>
            </div>

            <div className="flex items-end justify-end">
                {
                    selected[name] && selected[name].length > 0 &&
                    <div className=" bg-[#1664C0] rounded-full text-white flex items-center justify-center aspect-square w-8">
                        <p className="text-s">{numberOfEnrollees(name)}</p>
                    </div>
                }
            </div>
        </div>
    )
}
export default AssignedCourseEnrollmentCard;
