import { faClock, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect } from "react";

const NotificationModal = ({open, close, notifications}) => {
    useEffect(() => {
        console.log('Notifications:', notifications);
    },[notifications])
    return (
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40" />
                <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40'>
                            <div className='bg-white rounded-md h-full p-5 grid grid-row-5 grid-cols-2 w-[50vw]'>
                                {/* Header */}
                                <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row gap-4 col-span-2">
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Notifications</h1>
                                        <p className="text-unactive font-text text-xs">Displays real-time system alerts, user actions, or important updates, ensuring users are promptly informed</p>
                                    </div>
                                    <div className="flex items-start justify-center">
                                        <div className="rounded-full w-8 h-8 border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all ease-in-out cursor-pointer" onClick={close}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </div>
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="pt-2 pb-4 mx-4 col-span-2 flex flex-col gap-2">
                                    {/* Unread */}
                                    <div className="border border-primary rounded-md shadow-md p-4 flex flex-row gap-4 hover:cursor-pointer hover:bg-primarybg transition-all ease-in-out">
                                        <div>
                                            <div className="h-10 w-10 bg-primarybg rounded-full"></div>
                                        </div>
                                        <div className="text-primary">
                                            <p className="font-header">Unread Notification</p>
                                            <p className="text-xs font-text">The unread notifcation body</p>
                                        </div>
                                    </div>
                                    {/* read */}
                                    <div className="border border-transparent rounded-md shadow-md p-4 flex flex-row gap-4 hover:border hover:border-primary hover:cursor-pointer hover:bg-primarybg transition-all ease-in-out">
                                        <div>
                                            <div className="h-10 w-10 bg-primarybg rounded-full"></div>
                                        </div>
                                        <div className="text-primary">
                                            <p className="font-header">Read Notification</p>
                                            <p className="text-xs font-text">The unread notifcation body</p>
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

export default NotificationModal;
