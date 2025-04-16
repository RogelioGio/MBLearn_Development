import { faUserClock, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useOption } from "MBLearn/src/contexts/AddUserOptionProvider"
import { useStateContext } from "MBLearn/src/contexts/ContextProvider"
import { useUser } from "MBLearn/src/contexts/selecteduserContext"
import { useEffect, useState } from "react"
import dayjs from "dayjs";

const ReactivationAccountModal = ({open, close, id}) => {
    const [loading, setLoading] = useState(false)
    const {cities,departments,location,titles,roles,permission} = useOption();
    const {user} = useStateContext()
    const {selectedUser, selectUser, isFetching} = useUser();

    useEffect(() => {
            if (open && id) {
                if (selectedUser?.id === id) {
                    setLoading(false);
                } else {
                    setLoading(true);
                    selectUser(id);
                }
            }
        }, [id, selectedUser, open]);
        useEffect(() => {
            if (selectedUser && !isFetching) {
                setLoading(false);
            }
        }, [selectedUser, isFetching]);

    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching]);

    useEffect(() => {
        console.log(id);
    }, [id]);



    return(
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-20"/>
                <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                            <div className='bg-white rounded-md h-full w-[60vw] p-5 flex flex-col'>
                                {/* Header */}
                                <div className='py-4 mx-4 border-b border-divider flex flex-row justify-between item-center gap-4'>
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Account Reactivation</h1>
                                        <p className="text-unactive font-text text-sm">Reactivate deactivated user accounts, restoring their access and system permissions with a single confirmation</p>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="w-full aspect-square bg-primarybg rounded-full flex flex-col justify-center">
                                            <FontAwesomeIcon icon={faUserClock} className="p-5 text-primary text-lg"/>
                                        </div>
                                    </div>

                                </div>
                                <div className='mx-4 flex flex-row py-5 items-center justify-center'>
                                    {
                                        loading ?
                                        (<p className="px-40 py-32 self-center font-text text-unactive">Loading User Information....</p>) :

                                        (<div className="grid grid-rows-4 grid-cols-3 w-full h-full">
                                            {/* User Name */}
                                            <div className="flex flex-row gap-4 items-center py-2 px-4 border-b border-r border-divider col-span-2">
                                                <div>
                                                    <div className="w-[3rem] aspect-square bg-primarybg rounded-full flex flex-col justify-center">
                                                        <img src={selectedUser?.profile_image} alt="" className="rounded-full" />
                                                    </div>
                                                </div>
                                                <div>
                                                <p className="text-xs text-unactive font-header">Name:</p>
                                                <p className="font-text text-base">{selectedUser?.first_name} {selectedUser?.middle_name} {selectedUser?.last_name} {selectedUser?.name_suffix}</p>
                                                <p className="text-xs text-unactive font-text">Employee ID: {selectedUser?.employeeID}</p>
                                                </div>
                                            </div>
                                            {/* Last Login Stamp */}
                                            <div className="flex flex-col py-2 px-4 border-b border-divider">
                                                <p className="text-xs text-unactive font-header">Last Login Timestamp:</p>
                                                <div className="flex flex-col justify-center h-full">
                                                    <p className="text-base font-text">00/00/0000 - 00:00:00</p>
                                                </div>
                                            </div>
                                            {/* Division&Department&Section */}
                                            <div className="flex flex-col py-2 px-4 border-b border-r border-divider">
                                                <p className="text-xs text-unactive font-header">Division:</p>
                                                <div className="flex flex-col justify-center h-full">
                                                    <p className="text-base font-text">Sample Division</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col py-2 px-4 border-b border-r border-divider">
                                                <p className="text-xs text-unactive font-header">Department:</p>
                                                <div className="flex flex-col justify-center h-full">
                                                    <p className="text-base font-text">{selectedUser?.department?.department_name}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col py-2 px-4 border-b border-divider">
                                                <p className="text-xs text-unactive font-header">Section:</p>
                                                <div className="flex flex-col justify-center h-full">
                                                    <p className="text-base font-text">Sample Section</p>
                                                </div>
                                            </div>
                                            {/* City&Branch&AccountRole */}
                                            <div className="flex flex-col py-2 px-4 border-b border-r border-divider">
                                                <p className="text-xs text-unactive font-header">City:</p>
                                                <div className="flex flex-col justify-center h-full">
                                                    <p className="text-base font-text">{selectedUser?.city?.city_name}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col py-2 px-4 border-b border-r border-divider">
                                                <p className="text-xs text-unactive font-header">Branch:</p>
                                                <div className="flex flex-col justify-center h-full">
                                                    <p className="text-base font-text">{selectedUser?.branch?.branch_name}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col py-2 px-4 border-b border-divider">
                                                <p className="text-xs text-unactive font-header">Account Role:</p>
                                                <div className="flex flex-col justify-center h-full">
                                                    <p className="text-base font-text">{selectedUser?.roles[0].role_name}</p>
                                                </div>
                                            </div>
                                            {/* MBEmail & UserAdded & DayArchived */}
                                            <div className="flex flex-col py-2 px-4 border-r border-divider">
                                                <p className="text-xs text-unactive font-header">Metrobank Working Email:</p>
                                                <div className="flex flex-col justify-center h-full">
                                                    <p className="text-base font-text">{selectedUser?.user_credentials.MBemail}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col py-2 px-4 border-r border-divider">
                                                <p className="text-xs text-unactive font-header">Date Added:</p>
                                                <div className="flex flex-col justify-center h-full">
                                                    <p className="text-base font-text">{dayjs(selectedUser?.created_at).format('MMMM D, YYYY - HH:mm:ss')}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col py-2 px-4 border-divider">
                                                <p className="text-xs text-unactive font-header">Date Deleted:</p>
                                                <div className="flex flex-col justify-center h-full">
                                                    <p className="text-base font-text">MMMM/DD/YYYY</p>
                                                </div>
                                            </div>

                                        </div>)
                                    }
                                </div>
                                {/* Buttons */}
                                <div className="pb-4 mx-4 flex flex-row gap-2">
                                    <div className="w-full inline-flex flex-col items-center gap-2 p-4 rounded-md font-header uppercase text-primary border-2 border-primary text-xs hover:text-white hover:cursor-pointer hover:bg-primaryhover transition-all ease-in-out" onClick={close}>
                                        Cancel
                                    </div>
                                    <div className="w-full inline-flex flex-col items-center gap-2 bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover transition-all ease-in-out" onClick={close}>
                                        Re-Activate
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
    )
}
export default ReactivationAccountModal
