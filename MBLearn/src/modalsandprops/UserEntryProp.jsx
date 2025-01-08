import { faChevronLeft, faChevronRight, faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React from 'react'

const User = ({click}) => {
    return(
        <tr className='font-text text-sm hover:bg-gray-200' onClick={() => click()}>
                <td className='text-sm  py-3 px-4'>
                    <div className='flex items-center gap-2'>
                        {/* User Image */}
                        <div className='bg-blue-500 h-10 w-10 rounded-full'>
                            <img src="" alt="" className=''/>
                        </div>
                        {/* Name and employee-id*/}
                        <div>
                            <p className='font-header'>Rogelio Gio Talindan</p>
                            <p className='text-unactive text-xs'>ID: 02000304273</p>
                        </div>
                    </div>
                </td>
                <td className='py-3 px-4'>
                    <div className='flex flex-col'>
                        {/* Department */}
                        <p className='text-unactive'>Information Technology Support</p>
                        {/* Title */}
                        <p className='text-unactive text-xs'>Front-end Developer</p>
                    </div>
                </td>
                <td className='py-3 px-4'>
                    <div className='flex flex-col'>
                    {/* Branch Location */}
                    <p className='text-unactive'>Novaliches Branch</p>
                    {/* City Location */}
                    <p className='text-unactive text-xs'>Quezon City</p>
                    </div>
                </td>
                <td className='py-3 px-4'>
                    <p className='text-unactive'>System Admin</p>
                </td>

                {/* Action */}
                <td className='py-3 px-4'>
                    <div className='flex gap-1 justify-end'>
                    <button className='flex flex-row items-center justify-center gap-2 px-5 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all ease-in-out'>
                        <FontAwesomeIcon icon={faUserPen}/>
                        <p>Edit</p>
                    </button>
                    <button className='flex flex-row items-center justify-center gap-2 px-5 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all ease-in-out'>
                        <FontAwesomeIcon icon={faTrashCan}/>
                        <p>Remove</p>
                    </button>
                    </div>
                </td>

        </tr>
    )
}

export default User
