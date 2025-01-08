import { faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React from 'react'

const UserEntryModal = ({open, close, classname}) =>{
    return(
    <Dialog open={open} onClose={close} className={classname}>
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text center'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='h-full w-fit bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] flex items-center'>
                            <div className='w-[25vw] h-40 flex items-center justify-center flex-col gap-2'>
                                <div className='w-[8vw] h-[8vw] bg-white rounded-full shadow-md flex items-center justify-center'>
                                    <div className='w-[7vw] h-[7vw] bg-primary rounded-full'></div>
                                </div>
                                <p className='text-white font-header'>ID: 02000304273</p>
                            </div>
                            <div className='grid grid-col-3 grid-row-3 bg-white w-full p-5'>
                                <div className='col-start-1 col-span-2 row-start-1 py-4 px-4 border-b border-divider'>
                                    {/* Name */}
                                    <p className='font-header text-sm text-unactive uppercase'>Name:</p>
                                    <h1 className='font-header text-4xl text-primary mb-0.5'>Rogelio Gio C. Talingdan</h1>
                                    <p className='font-text text-sm uppercase'>Front-end Developer </p>
                                </div>
                                <div className='col-start-3 border-b border-divider'>
                                    {/* Action button */}
                                    <div className='flex flex-row gap-2 justify-end'>
                                        <div className='relative border-2 border-primary h-10 w-10 rounded-full flex items-center justify-center text-primary text-sm hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out group shadow-md'>
                                            <FontAwesomeIcon icon={faUserPen}/>
                                            <p className='absolute w-auto top-10 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Edit</p>
                                        </div>
                                        <div className='relative border-2 border-primary h-10 w-10 rounded-full flex items-center justify-center text-primary text-sm hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out group shadow-md'>
                                            <FontAwesomeIcon icon={faTrash}/>
                                            <p className='absolute w-auto top-10 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Delete</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='row-start-2 col-start-1 py-4 px-4 border-b border-r border-divider'>
                                    {/* Department */}
                                    <p className='font-header text-sm text-unactive uppercase'>Department:</p>
                                    <p className='font-text text-lg'>Information Technology Support</p>
                                </div>
                                <div className='row-start-2 col-start-2 py-4 px-4 border-b border-r border-divider'>
                                    {/* Branch & City */}
                                    <p className='font-header text-sm text-unactive uppercase'>Branch:</p>
                                    <p className='font-text text-lg'>Novaliches Branch</p>
                                    <p className='font-text text-xs uppercase'>Quezon City</p>
                                </div>
                                <div className='row-start-2 col-start-3 py-4 px-4 border-b border-divider'>
                                    {/* System Admin */}
                                    <p className='font-header text-sm text-unactive uppercase'>Role:</p>
                                    <p className='font-text text-lg'>System Admin</p>
                                </div>
                                <div className='row-start-3 col-span-2 py-4 px-4 border-r border-divider'>
                                    <p className='font-header text-sm text-unactive uppercase'>User Status:</p>
                                    <p className='font-text text-lg'>Active</p>
                                </div>
                                <div className='row-start-3 col-span-1 py-4 px-4'>
                                    <p className='font-header text-sm text-unactive uppercase'>User Added:</p>
                                    <p className='font-text text-lg'>01-08-2024</p>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
    </Dialog>
    )
}

export default UserEntryModal
