import { faChevronLeft, faChevronRight, faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React from 'react'

const User = ({re_move,click,userID,name,department,title,branch,city,profile_url,employeeID,role,edit,_delete}) => {
    return(
        <tr className='font-text text-sm hover:bg-gray-200' onClick={() => click(userID)}>
                <td className='text-sm  py-3 px-4'>
                    <div className='flex items-center gap-2'>
                        {/* User Image */}
                        <div className='bg-blue-500 h-10 w-10 rounded-full'>
                            <img src={profile_url} alt="" className='rounded-full'/>
                        </div>
                        {/* Name and employee-id*/}
                        <div>
                            <p className='font-text'>{name}</p>
                            <p className='text-unactive text-xs'>ID: {employeeID}</p>
                        </div>
                    </div>
                </td>
                <td className='py-3 px-4'>
                    <div className='flex flex-col'>
                        {/* Department */}
                        <p className='text-unactive'>{department}</p>
                        {/* Title */}
                        <p className='text-unactive text-xs'>{title}</p>
                    </div>
                </td>
                <td className='py-3 px-4'>
                    <div className='flex flex-col'>
                    {/* Branch Location */}
                    <p className='text-unactive'>{branch}</p>
                    {/* City Location */}
                    <p className='text-unactive text-xs'>{city}</p>
                    </div>
                </td>
                <td className='py-3 px-4'>
                    <p className='text-unactive'>{role}</p>
                </td>

                {/* Action */}
                <td className='py-3 px-4'>
                    <div className='flex gap-1 justify-end'>
                    <button onClick={(e) => edit(e,userID)}
                            className='flex flex-row items-center justify-center gap-2 px-5 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all ease-in-out'>
                        <FontAwesomeIcon icon={faUserPen}/>
                        <p>Edit</p>
                    </button>
                    <button onClick={(e) => _delete(e,userID)}
                            className='flex flex-row items-center justify-center gap-2 px-5 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all ease-in-out'>
                        <FontAwesomeIcon icon={faTrashCan}/>
                        <p>Remove</p>
                    </button>
                    </div>
                </td>

        </tr>
    )
}

export default User
