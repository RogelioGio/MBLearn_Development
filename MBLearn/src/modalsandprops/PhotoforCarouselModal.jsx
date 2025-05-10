import { faAdd, faBullhorn, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import * as React from "react";
import UploadPhotoModal from "./UploadPhotoModal";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../axios-client";


const PhotoforCarouselModal = ({open, close}) => {
    const [openUpload, setOpenUpload] = useState(false)

    useEffect(() => {
        axiosClient.get('/carousels')
        .then((response) => {
            console.log("Response", response);
        }).catch((error) => {
            console.log("Error", error);
        })
    },[openUpload])
    return(
        <>
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40" />
                <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40'>
                            <div className='bg-white rounded-md h-full p-5 grid grid-row-4 grid-cols-3 w-[50vw]'>
                                {/* Header */}
                                <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row gap-4 col-span-3 justify-between">
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Cutstomize Announcment Panels</h1>
                                        <p className="text-unactive font-text text-xs">Upload and manage announcement panel to be used in the system</p>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="h-fit bg-primarybg p-5 rounded-full flex items-center justify-center">
                                            <div className="h-full w-fit aspect-square flex items-center justify-center">
                                                <FontAwesomeIcon icon={faBullhorn} className="text-primary text-lg"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Set Order */}
                                <div className="py-3 mr-4 col-start-3">
                                    <div className="flex flex-row justify-center items-center bg-white p-2 border-2 border-primary rounded-md shadow-md font-header text-primary gap-2 hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out"
                                        onClick={() => setOpenUpload(true)}>
                                        <FontAwesomeIcon icon={faAdd}/>
                                        <p> Add Panel </p>
                                    </div>
                                </div>
                                {/* Table for Announcement Panel */}


                                <div className="col-span-3 grid grid-cols-2 mx-5 gap-x-2">
                                    <button
                                        onClick={close}
                                        className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:text-white hover:border-primaryhover transition-all ease-in-out w-full
                                        `}>
                                        Cancel</button>
                                    <button
                                        //onClick={()=>enroll()}
                                        className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover transition-all ease-in-out w-full
                                        `}>
                                        Set Duration
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
        <UploadPhotoModal open={openUpload} close={() => setOpenUpload(false)}/>
        </>
    )
}
export default PhotoforCarouselModal;
