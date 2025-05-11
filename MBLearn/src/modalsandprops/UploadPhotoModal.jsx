import { faBullhorn, faFileArrowUp, faUpload, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../axios-client";

const UploadPhotoModal = ({open, close, refreshlist, refreshpanel}) => {

    const [filename, setFilename] = useState("");
    const [fileUploaded, setFileUploaded] = useState();
    const [uploading, setUploading] = useState()
    const [wrongFile, setWrongFile] = useState()
    const [photo, setPhoto] = useState();

    const handlePictureUpload = (e) => {
        const file = e.target.files[0];
        ImageProccessing(file)
    }

    const ImageProccessing = (img) => {
        if(!img) return
        setWrongFile(false)

        const fileType = img.name.split('.').pop().toLowerCase();
        const allowedImageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (!allowedImageTypes.includes(fileType)) {
            setWrongFile(true)
        }

        setFileUploaded(true)
        setFilename(img.name);
        setPhoto(img);
    }


    const uploadHandler = () => {
        const image = new FormData();
        image.append("image", photo);
        image.append("image_name", filename);
        setUploading(true)
        axiosClient.post('/carousels', image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log("Response", response);
            setUploading(false)
            refreshlist()
            refreshpanel()
            Close();
        }).catch((error) => {
            console.log("Error", error);
            setUploading(false)
        })
    }

    const Close = () => {
        setFileUploaded()
        setFilename()
        setPhoto()
        setWrongFile(false)
        close()
    }

    return(
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40" />
                <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40'>
                            <div className='bg-white rounded-md h-full p-5 grid grid-row-4 w-[50vw]'>
                                 {/* Header */}
                                <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row gap-4 justify-between">
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Upload</h1>
                                        <p className="text-unactive font-text text-xs">Upload a file or photo in the system</p>
                                    </div>
                                    <div className="flex justify-end items-start">
                                        <div className="border-primary border-2 rounded-full w-8 h-8 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out"
                                            onClick={Close}>
                                            <FontAwesomeIcon icon={faXmark}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2 mx-4">
                                    {
                                        !fileUploaded ? (
                                            <>
                                            <label htmlFor="import" className="w-full py-10 border-2 border-dashed border-unactive rounded-md flex flex-col items-center justify-center text-sm font-text gap-y-2 text-unactive">
                                            <FontAwesomeIcon icon={faFileArrowUp} className="text-2xl"/>
                                                <p>Upload File Here</p>
                                                <input type="file" accept="image/*" className="hidden" id="import" onChange={handlePictureUpload}/>
                                            </label>
                                            {
                                                wrongFile ?
                                                <div className="py-2 flex items-center justify-center font-text text-sm text-red-700">
                                                    <p>Please only upload image file for the announcement panel</p>
                                                </div> : null
                                            }
                                            </>
                                        ) : (
                                            <div className="py-3 mx-4">
                                                <p className="text-xs text-unactive">File Uploaded:</p>
                                                <p className="text-sm font-text text-primary">{filename}</p>
                                            </div>
                                        )
                                    }
                                    {/* Drag Import */}
                                </div>
                                {
                                    fileUploaded ?
                                    <div className="py-2 mx-4 grid grid-cols-2 gap-x-2">
                                        {/* Action Button */}
                                        <button type="button" className="w-full inline-flex flex-col items-center gap-2 p-3 rounded-md font-header uppercase text-primary border-2 border-primary text-xs hover:text-white hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out"
                                            onClick={Close}
                                            >
                                            <p>Cancel</p>
                                        </button>
                                        <button type="submit" className="w-full inline-flex flex-col items-center justify-center gap-2 bg-primary p-3 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out"
                                            onClick={uploadHandler}
                                            disabled={uploading}>
                                            <p>{uploading ? "Uploading..." : "Upload"}</p>
                                        </button>
                                    </div>
                                    :
                                    null
                                }

                            </div>
                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
    )
}
export default UploadPhotoModal
