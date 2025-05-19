import { faTrashCan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOption } from "../contexts/AddUserOptionProvider";
import { useEffect } from "react";

const UserSecEntyProps = ({user,name,employeeID,MBEmail,city,branch,division,section,department,role,image,status,lastLogin,edit,select}) => {

    return (
        <tr className='font-text text-sm hover:bg-gray-200 hover:cursor-pointer'
        onClick={(e) => edit(e,user,select)} >
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
                            <p className="text-unactive">{MBEmail}</p>
                        </td>

                        {/* Divison */}
                        {/* <td className='py-3 px-4'>
                            <p className="text-unactive">{division}</p>
                        </td>
                        <td className='py-3 px-4'>
                            <p className="text-unactive">{department}</p>
                        </td>
                        <td className='py-3 px-4'>
                            <p className="text-unactive">{section}</p>
                        </td> */}

                        <td className='py-3 px-4'>
                            <p className="text-unactive">{role}</p>
                        </td>

                        {/* Last Login */}
                        <td className="py-3 px-4">
                        <p className="text-unactive">{lastLogin != null ? lastLogin : "Not Logged Yet"}</p>
                        </td>

                        {/* Action */}
                        {/* <td className='py-3 px-4'>
                            <div className='flex gap-1 justify-end'>
                            <button
                                    className='flex justify-center items-center aspect-square p-2 w-fit bg-white shadow-md border border-primary rounded-md text-primary hover:bg-primary cursor-pointer transition-all ease-in-out hover:text-white'
                                    onClick={(e) => edit(e,user)}>
                                <FontAwesomeIcon icon={faUserPen}/>
                            </button>
                            </div>
                        </td> */}

                </tr>
    );
}
export default UserSecEntyProps;
