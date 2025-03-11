import { faTrashCan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOption } from "../contexts/AddUserOptionProvider";
import { useEffect } from "react";

const UserSecEntyProps = ({user,name,employeeID,MBEmail,city,branch,department,title,role,image,edit}) => {
    const {departments,cities,location,titles} = useOption();
    return (
        <tr className='font-text text-sm hover:bg-gray-200'>
                        <td className='text-sm py-3 px-4'>
                            <div className='flex items-center gap-2'>
                                {/* User Image */}
                                <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                    <img alt="" src={image} className='rounded-full'/>
                                </div>
                                {/* Name */}
                                <div>
                                    <p className='font-text'>{name}</p>
                                    <p className='text-unactive'>ID: {employeeID}</p>
                                </div>
                            </div>
                        </td>
                        <td className='py-3 px-4'>
                            <div className='flex flex-col'>
                                {/* City-Branch */}
                                <p>
                                    {cities?.find(c => c.id === city).city_name} - {location?.find(b=>b.id === branch).branch_name}
                                </p>
                                {/* Department-Title */}
                                <p className="text-unactive">
                                    {departments?.find(d=>d.id === department).department_name} - {titles?.find(t => t.id === title).title_name}
                                </p>

                            </div>
                        </td>
                        <td className='py-3 px-4'>
                            <div className='flex flex-col'>
                            {/* Metrobank Working Email */}
                            <p className='text-unactive'>{MBEmail}</p>
                            </div>
                        </td>
                        <td className='py-3 px-4'>
                            <p className='text-unactive'>{role}</p>
                        </td>

                        {/* Action */}
                        <td className='py-3 px-4'>
                            <div className='flex gap-1 justify-end'>
                            <button
                                    className='flex flex-row items-center justify-center gap-2 px-5 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all ease-in-out'
                                    >
                                <FontAwesomeIcon icon={faUserPen}/>
                                <p>Edit</p>
                            </button>
                            </div>
                        </td>

                </tr>
    );
}
export default UserSecEntyProps;
