
const Learner = ({profile_image, name, employeeID, department, title, branch, city, selectedUser, handleCheckbox}) => {
    const selected = selectedUser.includes(employeeID)
    return(
        <tr className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer ${selected ? '!bg-gray-200':''}`} onClick={()=>handleCheckbox(employeeID)}>

                {/* Employee Name */}
                <td className={`font-header p-4 flex flex-row items-center gap-4 border-l-2 border-transparent ${selected ? '!border-primary':''} transition-all ease-in-out`}>

                    {/* Checkbox */}
                    <div className="group grid size-4 grid-cols-1">
                        <input type="checkbox"
                            className="col-start-1 row-start-1 appearance-none border border-divider rounded checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                            name={employeeID}
                            id={employeeID}
                            checked={selectedUser.includes(employeeID)}
                            onChange={() => handleCheckbox(employeeID)}/>
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
                    <h1 className={`text-unactive ${selected ? '!text-primary' : ''}`}>{name}</h1>
                    <p className="font-text text-unactive text-xs">ID: {employeeID}</p>
                    </div>
                </td>

                {/* Department */}
                <td className="p-4 font-text text-unactive">
                    <p> {department} </p>
                    <p className="text-xs"> {title} </p>
                </td>

                {/* Branch */}
                <td className="p-4 font-text text-unactive">
                    <p>{branch}</p>
                    <p className="text-xs">{city} </p>
                </td>
            </tr>

    )
}

export default  Learner
