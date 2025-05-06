
const Learner = ({profile_image, id, name, employeeID, department, title, branch, city, enrolled, selectedCourse,division, section ,handleCheckbox}) => {

    const selectedEnrollee = enrolled?.some(
        (entry) => entry.userId == id.id && entry.courseId === selectedCourse.id
    )
    return(
        <tr className={`font-text text-sm text-primary hover:bg-gray-200 cursor-pointer ${selectedEnrollee ? 'bg-gray-200':''}`} onClick={()=>handleCheckbox(id, selectedCourse)}>

                {/* Employee Name */}
                <td className={`font-header p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out ${selectedEnrollee ? '!border-primary':''} h-full`}>

                    {/* Checkbox */}
                    <div className="group grid size-4 grid-cols-1">
                        <input type="checkbox"
                            className="col-start-1 row-start-1 appearance-none border border-divider rounded checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                            name={employeeID}
                            id={employeeID}
                            checked={selectedEnrollee}
                            onChange={() => handleCheckbox(id, selectedCourse)}/>
                        {/* Custom Checkbox styling */}
                        <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                            {/* Checked */}
                            <path
                                d="M3 8L6 11L11 3.5"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-[:checked]:opacity-100"
                            />
                            {/* Indeterminate */}
                            <path
                                d="M3 7H11"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                />
                        </svg>
                    </div>

                    <img src={profile_image} alt="" className="w-10 rounded-full"/>

                    <div>
                    <p className={`text-unactive ${selectedEnrollee ? '!text-primary':''} font-text text-sm`}>{name}</p>
                    <p className="font-text text-unactive text-xs">ID: {employeeID}</p>
                    </div>
                </td>

                {/* Division */}
                <td className="p-4 font-text text-unactive">
                    <p className="text-sm"> {division} </p>
                </td>

                {/* Department */}
                <td className="p-4 font-text text-unactive">
                    <p className="text-sm"> {department} </p>
                    <p className="text-xs"> {title} </p>
                </td>

                {/* Section*/}
                <td className="p-4 font-text text-unactive">
                    <p> {section} </p>
                </td>

                {/* Branch */}
                <td className="p-4 font-text text-unactive">
                    <p className="text-sm">{branch}</p>
                    <p className="text-xs">{city} </p>
                </td>
            </tr>

    )
}

export default  Learner
