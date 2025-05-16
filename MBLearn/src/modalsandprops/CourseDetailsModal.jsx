import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faSearch, faArrowDownWideShort, faPlus, faMinus, faChevronUp, faChevronDown, faPenToSquare, faTrash, faChevronLeft, faChevronRight, faLaptopFile, faChalkboardTeacher, faCheck, faCircleLeft, faPencil,} from '@fortawesome/free-solid-svg-icons'
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
                                <DialogPanel transition className='w-[50rem] p-2 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                                        <div className='bg-white w-full p-5 grid grid-cols-3 grid-rows-[min-content] gap-2'>
                                            {/* Course Header */}
                                            <div className='grid grid-cols-3 grid-rows-[min-content] col-span-3'>
                                                <div className='col-start-1 col-span-2 row-start-1'>
                                                        <p className='text-xs font-text text-unactive'>Name:</p>
                                                        <h2 className='font-header text-primary text-2xl'>{selectedCourse?.name}</h2>
                                                        <p className='text-xs font-text text-unactive'>Course ID: {selectedCourse?.CourseID}</p>
                                                        <span className="inline-flex items-center rounded-md bg-secondaryprimary px-2 py-1 text-xs font-medium text-primary font-text ring-1 ring-primary gap-1 my-1">
                                                            {selectedCourse?.training_type}
                                                        </span>
                                                </div>
                                                {/* Close Button */}
                                                <div className='col-start-3 col-span-1 row-start-1 flex justify-end text-2xl'>
                                                    <FontAwesomeIcon icon={hover ? solidXmark:regularXmark} className='text-primary transition-all ease-in-out transform hover:scale-110 cursor-pointer' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={close}/>
                                                </div>
                                            </div>
                                            {/* Course Details */}
                                            <div className='flex flex-col justify-center py-2'>
                                                <p className='font-text text-xs text-unactive'>Type:</p>
                                                <p className='font-header text-lg text-primary'>{selectedCourse?.types?.[0]?.type_name}</p>
                                            </div>
                                            <div className='flex flex-col justify-center py-2'>
                                                <p className='font-text text-xs text-unactive'>Category:</p>
                                                <p className='font-header text-lg text-primary'>{selectedCourse?.categories?.[0]?.category_name}</p>
                                            </div>
                                            <div className='flex flex-col justify-center py-2'>
                                                <p className='font-text text-xs text-unactive'>Date Added:</p>
                                                <p className='font-header text-lg text-primary'>{dayjs(selectedCourse?.create_at).format("MMMM DD, YYYY")}</p>
                                            </div>

                                            {/* Course Short Desciption */}
                                            <div className='flex flex-col justify-center py-2 col-span-3'>
                                                <p className='font-text text-xs text-unactive'>Description:</p>
                                                <p className='font-text'>{selectedCourse?.description}</p>
                                            </div>

                                            {/* Person-contributer */}
                                            {/* Main Course Admin toh */}
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
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
    )
}

export default CourseDetailsModal
