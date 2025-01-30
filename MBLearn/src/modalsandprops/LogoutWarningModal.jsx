import { faTriangleCircleSquare, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";


const LogoutWarningmModal = ({open,close,handleLogout}) => {
    const [countdown, setCountdown] = useState(10);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if(open){
            const interval = setInterval(() => {
                setCountdown(prev => {
                    if(prev === 1){
                        handleLogout();
                        clearInterval(interval);
                        return 0
                    }
                    return prev - 1;
                });
            },1000);

            setTimer(interval);

            return () => {
                clearInterval(interval);
            }
        }
    },[open,handleLogout])

    return (
        <Dialog open={open} onClose={close}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel className='bg-white rounded-lg shadow-lg p-4 max-w'>
                            <div className='flex flex-col items-center p-5 gap-4'>
                                {/* Warning Icon */}
                                <div>
                                    <div className="flex items-center justify-center w-20 aspect-square rounded-full bg-primarybg">
                                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-4xl text-primary"/>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <h1 className="font-header text-2xl text-primary uppercase">Warning</h1>
                                    <p className="font-text text-center text-unactive">You are about to be logged out due to inactivity</p>
                                </div>
                                <div className="w-full">
                                    <button onClick={close} className="bg-primary font-header text-m uppercase text-white py-4 w-full rounded-md hover:scale-105 hover:bg-primaryhover transition-all">Confirm</button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
    )
}
export default LogoutWarningmModal;
