import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";

const DeletePanelModal = ({open, close, referesh, refereshPanel}) => {

    const [deleting, setDeleting] = useState()

    const handleDelete = () => {
        referesh()
        refereshPanel()
        close()
    }


    return(
        <>
            <Dialog open={open} onClose={()=>{}}>
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40" />
                    <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text center'>
                            <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40'>
                                <div className='bg-white rounded-md h-full p-5 grid grid-row-4 grid-cols-3 w-[35vw]'>
                                    {/* Header */}
                                    <div className="flex flex-row gap-4 items-center col-span-3 p-5">
                                        <div className="bg-primarybg w-16 aspect-square rounded-full flex items-center justify-center text-primary text-xl">
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </div>
                                        <div>
                                            <p className="font-header text-2xl text-primary">Delete Panel?</p>
                                            <p className="font-text text-sm text-unactive">Please confirm to delete the selected panel</p>
                                        </div>
                                    </div>
                                    {/* Action */}
                                    <div className="px-5 pb-5 grid grid-cols-2 col-span-3 gap-2">
                                        <div className="font-header p-2 text-primary border-2 border-primary rounded-md flex items-center justify-center hover:cursor-pointer hover:bg-primaryhover hover:text-white transition-all ease-in-out"
                                            onClick={close}>
                                            Cancel
                                        </div>
                                        <div className="font-header bg-primary text-white p-2 border-2 border-primary rounded-md flex items-center justify-center hover:cursor-pointer hover:bg-primaryhover transition-all ease-in-out"
                                            onClick={()=> handleDelete()}>
                                            Delete
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
export default DeletePanelModal
