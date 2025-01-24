const Learner = ({profile_image, name, employeeID, department, branch}) => {

    return(
        <tr className="font-text text-md text-primary hover:bg-gray-200">


            <td className="p-5">
                <input type="checkbox" name="" id=""/>
                </td>

            {/* Employee Name */}
            <td className="font-header p-4 flex flex-row items-center gap-4">
                <img src={profile_image} alt="" className="w-10 rounded-full"/>
                <div>
                <h1>{name}</h1>
                <p className="font-text text-unactive text-xs">ID: {employeeID}</p>
                </div>

            </td>

            {/* Department */}
            <td className="p-4 font-text text-unactive">{department}</td>

            {/* Branch */}
            <td className="p-4 font-text text-unactive">{branch}</td>
        </tr>
    )
}

export default  Learner
