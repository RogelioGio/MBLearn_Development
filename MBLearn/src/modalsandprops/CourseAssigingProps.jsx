const CourseAssigningProps = ({isfiltered, id, handleInput, loading, name, employeeID, division, department, section, title, branch, city, profile_image,selectedCourseAdmin}) => {
    return (
        <tr className='font-text text-sm hover:bg-gray-200 hover:cursor-pointer' onClick={(e) => handleInput(e,id)}>
            {
                loading ? (
                    // Show loading message while waiting for API response
                    <td colSpan={4} className="text-center py-3 px-4 font-text text-primary">
                        Loading Eligible Course Admins...
                    </td>
                ) :
                //need to be filtered first
                !isfiltered ? (
                    <td colSpan={4} className="text-center py-3 px-4 font-text text-primary">
                        Filter first the course admin you want to add for the course
                    </td>
                ):
                (
                    <>
                        <td className='text-sm  py-3 px-4'>
                            <div className='flex items-center gap-4'>
                                {/* Checkbox */}
                                <div className="group grid size-4 grid-cols-[1rem] w-4 h-4">
                                    <input type="checkbox"
                                        className="w-4 h-4 col-start-1 row-start-1 appearance-none border border-divider rounded checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                        name={employeeID}
                                        id={employeeID}
                                        checked={selectedCourseAdmin}
                                        onChange={(e) => handleInput(e,id)}
                                    />
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
                                <div className="flex flex-row gap-x-2 items-center">
                                    {/* User Image */}
                                        {
                                            profile_image ?
                                            <img src={profile_image} alt="" className='rounded-full h-10 w-10'/>
                                            : <div className="bg-blue-500 h-10 w-10"></div>
                                        }

                                    {/* Name and employee-id*/}
                                    <div>
                                        <p className='font-text'>{name}</p>
                                        <p className='text-unactive text-xs'>ID: {employeeID}</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className='py-3 px-4'>
                            <p className='text-unactive'>{division}</p>
                        </td>
                        <td className='py-3 px-4'>
                            <div className='flex flex-col'>
                                {/* Department */}
                                <p className='text-unactive'>{department}</p>
                                {/* Title */}
                                {/* <p className='text-unactive text-xs'>{title}</p> */}
                            </div>
                        </td>
                        <td className='py-3 px-4'>
                            <p className='text-unactive'>{section}</p>
                        </td>
                        <td className='py-3 px-4'>
                            <div className='flex flex-col'>
                            {/* Branch Location */}
                            <p className='text-unactive'>{branch}</p>
                            {/* City Location */}
                            <p className='text-unactive text-xs'>{city}</p>
                            </div>
                        </td>
                    </>
                )
            }
        </tr>
    )
}
export default CourseAssigningProps;
