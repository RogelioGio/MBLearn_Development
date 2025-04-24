import { faTrashCan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOption } from "../contexts/AddUserOptionProvider";
import { useEffect } from "react";

const UserSecEntyProps = ({user,name,employeeID,MBEmail,city,branch,division,section,department,role,image,status,edit}) => {

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
                                    <p className='text-unactive'>{MBEmail}</p>
                                </div>
                            </div>
                        </td>
                        {/* Divison */}
                        <td className='py-3 px-4'>
                            {division}
                        </td>
                        <td className='py-3 px-4'>
                            {department}
                        </td>
                        <td className='py-3 px-4'>
                            {section}
                        </td>

                        <td className='py-3 px-4'>
                            {role}
                        </td>

                        {/* Last Login */}
                        <td>
                        </td>

                        {/* Action */}
                        <td className='py-3 px-4'>
                            <div className='flex gap-1 justify-end'>
                            <button
                                    className='flex justify-center items-center aspect-square p-2 w-fit bg-white shadow-md border border-primary rounded-md text-primary hover:bg-primary cursor-pointer transition-all ease-in-out hover:text-white'
                                    onClick={(e) => edit(e,user)}>
                                <FontAwesomeIcon icon={faUserPen}/>
                            </button>
                            </div>
                        </td>

                </tr>
    );
}
export default UserSecEntyProps;
