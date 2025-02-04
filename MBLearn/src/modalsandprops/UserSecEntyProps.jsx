import { faTrashCan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserSecEntyProps = ({name,employeeID,MBEmail,role,image}) => {
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
                                    <p className='font-header'>{name}</p>
                                </div>
                            </div>
                        </td>
                        <td className='py-3 px-4'>
                            <div className='flex flex-col'>
                                {/* Employee ID */}
                                <p className='text-unactive'>ID: {employeeID}</p>
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
                            <button onClick={(e) => edit(e,userID,employeeID)}
                                    className='flex flex-row items-center justify-center gap-2 px-5 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all ease-in-out'>
                                <FontAwesomeIcon icon={faUserPen}/>
                                <p>Edit</p>
                            </button>
                            <button onClick={(e) => _delete(e,employeeID)}
                                    className='flex flex-row items-center justify-center gap-2 px-5 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all ease-in-out'>
                                <FontAwesomeIcon icon={faTrashCan}/>
                                <p>Remove</p>
                            </button>
                            </div>
                        </td>

                </tr>
    );
}
export default UserSecEntyProps;
