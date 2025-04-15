import { faUserClock, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"

const ReactivationAccountModal = ({open, close}) => {
    return(
        <Dialog open={open} onClose={close}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-20"/>
                <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                            <div className='bg-white rounded-md h-full w-[60vw] p-5 flex flex-row'>
                                {/* Header */}
                                <div className='py-4 mx-4 border-b border-divider flex flex-row justify-between item-center gap-4'>
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Account Reactivation</h1>
                                        <p className="text-unactive font-text text-md">Reactivate deactivated user accounts, restoring their access and system permissions with a single confirmation</p>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="w-full h-full aspect-square bg-primarybg rounded-full flex flex-col justify-center">
                                            <FontAwesomeIcon icon={faUserClock} className="p-5 text-primary text-lg"/>
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
    )
}
export default ReactivationAccountModal
