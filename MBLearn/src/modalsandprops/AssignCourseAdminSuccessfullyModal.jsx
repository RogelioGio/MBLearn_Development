import { faBookOpenReader, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"



const AssignCourseAdminModalSuccessfully = ({number, open, close}) => {
    return(
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="backdrop-blur-sm fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30"/>
            <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='z-20 relative overflow-hidden transform rounded-md w-fit bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>

                        <div className='bg-white rounded-md h-full w-fit p-5 flex flex-col items-center justify-center'>
                            {/* Header */}
                                <div className="py-4 mx-4 border-divider flex flex-col items-center justify-center gap-2">
                                    <div className="w-fit aspect-square bg-secondaryprimary rounded-full text-center">
                                        <FontAwesomeIcon icon={faBookOpenReader} className="text-primary text-3xl p-6"/>
                                    </div>
                                    <div className="text-center flex-col flex gap-2">
                                        <h1 className="text-primary font-header text-3xl">Assigned Successfully</h1>
                                        <p className="text-unactive font-text text-sm">The selected {number} users is successfuly assigned to as course admin</p>
                                    </div>
                                </div>
                                <div className="text-center flex-col flex p-4 w-full bg-primary rounded-md shadow-md hover:cursor-pointer hover:bg-primaryhover ease-in-out transition-all"
                                    onClick={close}>
                                    <p className="font-header text-white">Confirm</p>
                                </div>
                            </div>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
export default AssignCourseAdminModalSuccessfully
