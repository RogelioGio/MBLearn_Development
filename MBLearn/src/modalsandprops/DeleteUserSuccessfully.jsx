import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import axiosClient from "../axios-client"
import { useEffect, useState } from "react"

const DeleteUserSuccessfully = ({open,close,classname}) => {
    return (
        <Dialog open={open} onClose={close} className={classname}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                            <div className='bg-white rounded-md h-full w-fit p-5 flex flex-col'>
                            {/* Header */}
                                <div className="py-4 mx-4 border-b border-divider flex flex-row justify-between item-center gap-6">
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Remove na sya</h1>
                                        <p className="text-unactive font-text text-md">Confirms the permanent deletion of the selected information from the system.</p>
                                    </div>
                                    <div className="bg-primarybg p-5 rounded-full">
                                        <div className="w-fit h-fit aspect-square flex items-center justify-center p-1">
                                            <FontAwesomeIcon icon={faTrash} className="text-primary text-lg"/>
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
export default DeleteUserSuccessfully