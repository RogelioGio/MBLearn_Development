import { faBookBookmark, faClock, faPen, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import * as React from "react";

const CoursePublishingModal = ({open, close}) => {
    return(
        <>
            <Dialog open={open} onClose={close}>
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40" />
                <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40'>
                            <div className='bg-white rounded-md h-full p-5 grid grid-row-5 grid-cols-2 w-[50vw] gap-y-2'>
                                {/* Header */}
                                <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row justify-between col-span-2">
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Publish Course</h1>
                                        <p className="text-unactive font-text text-xs"> Finalize and publish a course, making it available for learners to access and enroll.</p>
                                    </div>
                                    <div>
                                        <div className="w-8 text-primary flex justify-center items-center aspect-square rounded-full border-2 border-primary hover:text-white hover:bg-primary transition-all ease-in-out hover:cursor-pointer" onClick={close}>
                                            <FontAwesomeIcon icon={faXmark}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 col-span-2 mx-4 gap-x-2 pt-2">
                                    <div className=" group border-2 border-primary grid-rows-3 grid grid-cols-1 rounded-md shadow-md p-4  hover:cursor-pointer hover:bg-primary transition-all ease-in-out">
                                        <div className="flex justify-end">
                                            <div className="group-hover:bg-white w-10 aspect-square bg-primarybg rounded-full text-primary flex justify-center items-center">
                                                <FontAwesomeIcon icon={faPen}/>
                                            </div>
                                        </div>
                                        <div className="row-span-2 flex justify-start items-end">
                                            <div>
                                                <p className="group-hover:text-white font-header text-primary">Unpublish Course</p>
                                                <p className="group-hover:text-white font-text text-unactive text-xs">Allowing you to make updates and changes.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" group border-2 border-primary grid-rows-3 grid grid-cols-1 rounded-md shadow-md p-4 hover:cursor-pointer hover:bg-primary transition-all ease-in-out">
                                        <div className="flex justify-end">
                                            <div className="group-hover:bg-white w-10 aspect-square bg-primarybg rounded-full text-primary flex justify-center items-center">
                                                <FontAwesomeIcon icon={faBookBookmark}/>
                                            </div>
                                        </div>
                                        <div className="row-span-2 flex justify-start items-end">
                                            <div>
                                                <p className="group-hover:text-white font-header text-primary">Publish Course</p>
                                                <p className="group-hover:text-white font-text text-unactive text-xs">Publishing a course makes available for learners to view</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" group border-2 border-primary grid-rows-3 grid grid-cols-1 rounded-md shadow-md p-4 hover:cursor-pointer hover:bg-primary transition-all ease-in-out">
                                        <div className="flex justify-end">
                                            <div className="group-hover:bg-white w-10 aspect-square bg-primarybg rounded-full text-primary flex justify-center items-center">
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </div>
                                        </div>
                                        <div className="row-span-2 flex justify-start items-end">
                                            <div>
                                                <p className="group-hover:text-white font-header text-primary">Archive Course</p>
                                                <p className="group-hover:text-white font-text text-unactive text-xs">Removes the course from active listings.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default CoursePublishingModal
