import { faClock, faUserPen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import * as React from "react";

const BulkEnrollmentCourseDuration = ({open, close}) => {
    return (
        <Dialog open={open} onClose={close}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-50" />
                <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='w-[75vw] relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='bg-white rounded-md h-full w-full p-5 flex flex-col'>
                            {/* Header */}
                                <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row gap-4 justify-between">
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Training Duration</h1>
                                        <p className="text-unactive font-text text-xs">Set a customized training period for learners, helping them manage their course timelines effectively.</p>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="h-fit bg-primarybg p-5 rounded-full flex items-center justify-center">
                                            <div className="h-full w-fit aspect-square flex items-center justify-center">
                                                <FontAwesomeIcon icon={faClock} className="text-primary text-lg"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/*  */}
                                <div className="grid grid-rows-3 grid-cols-3 w-full h-full">
                                    <div>
                                        <p>Courses</p>
                                    </div>
                                    <div>
                                        Course Duration
                                    </div>
                                    <div>
                                        flexible course
                                    </div>
                                    <div>
                                        table
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>

                    </div>

                </div>

        </Dialog>
    )
}

export default BulkEnrollmentCourseDuration;
