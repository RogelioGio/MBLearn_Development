import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faSearch, faArrowDownWideShort, faPlus, faMinus, faChevronUp, faChevronDown, faPenToSquare, faTrash, faChevronLeft, faChevronRight, faLaptopFile, faChalkboardTeacher, faCheck, faCircleLeft, faPencil, faXmark,} from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark as solidXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark as regularXmark } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from 'react';
import dayjs from "dayjs";
import React from 'react';

const CourseDetailsModal = ({open,close,classname,selectedCourse}) => {
    const [hover, setHover] = useState();

    useEffect(() => {
        setHover(false);
    },[])


    return(
        <Dialog open={open} onClose={()=>{}} className={classname}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40"/>
            <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text center'>
                    <DialogPanel transition className='w-[50rem] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                            <div className='bg-white rounded-md h-fit flex flex-col'>
                                {/* Thumbnail */}
                                <div className='bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-t-md'>
                                    <div className="flex flex-col bg-gradient-to-b from-transparent to-black rounded-t-md gap-4">
                                        <div className='p-4 flex flex-col gap-y-4'>
                                            <div className='flex items-center justify-end'>
                                                <div className='border-2 border-white rounded-full text-white flex items-center justify-center hover:bg-white hover:text-primary hover:cursor-pointer transition-all ease-in-out
                                                    w-5 h-5 text-xs
                                                    md:w-8 md:h-8 md:text-base'
                                                    onClick={close}>
                                                    <FontAwesomeIcon icon={faXmark}/>
                                                </div>
                                            </div>
                                            <div className='px-4'>
                                                <h2 className='font-header text-white text-base md:text-2xl'>{selectedCourse?.name}</h2>
                                                <p className='text-xs text-white font-text'>Course ID: {selectedCourse?.CourseID}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='px-8 pt-4 pb-2 flex flex-col md:flex-row md:gap-10'>
                                    <div className='flex flex-col justify-center py-1 font-text'>
                                        <p className='font-text text-xs text-unactive'>Type:</p>
                                        <p className='md:text-base text-xs'>{selectedCourse?.types?.[0]?.type_name}</p>
                                    </div>
                                    <div className='flex flex-col justify-center py-1 font-text'>
                                        <p className='font-text text-xs text-unactive'>Category:</p>
                                        <p className='md:text-base text-xs'>{selectedCourse?.categories?.[0]?.category_name}</p>
                                    </div>
                                    <div className='flex flex-col justify-center py-1 font-text'>
                                        <p className='font-text text-xs text-unactive'>Date Added:</p>
                                        <p className='md:text-base text-xs'>{dayjs(selectedCourse?.create_at).format("MMMM DD, YYYY")}</p>
                                    </div>
                                </div>
                                <div className='px-8 py-2'>
                                    <p className='font-text text-xs text-unactive'>Description:</p>
                                    <p className='font-text md:text-base text-xs'>{selectedCourse?.description}</p>
                                </div>
                                <div className='px-8 pt-2 pb-5 flex md:flex-row md:gap-10 flex-col gap-y-4'>
                                    <div className='col-span-1 flex flex-col items-start justify-center gap-y-2'>
                                        <p className='font-text text-xs text-unactive'>Course Contributor:</p>
                                        <div className='flex-row flex gap-x-2'>
                                            <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                <img src={selectedCourse?.adder?.profile_image} alt="" className='rounded-full' />
                                            </div>
                                            <div>
                                                <p className='font-text'>{selectedCourse?.adder?.first_name} {selectedCourse?.adder?.middle_name} {selectedCourse?.adder?.last_name} {selectedCourse?.adder?.name_suffix}</p>
                                                <p className='text-unactive text-xs font-text'>ID: {selectedCourse?.adder?.employeeID}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-span-1 flex flex-col items-start justify-center gap-y-2'>
                                        <p className='font-text text-xs text-unactive'>Course Author:</p>
                                        <div className='flex-row flex gap-x-2'>
                                            <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                <img src="" alt="" className='rounded-full' />
                                            </div>
                                            <div>
                                                <p className='font-text'>Author's Name</p>
                                                <p className='text-unactive text-xs font-text'>ID: 11110110291</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default CourseDetailsModal
