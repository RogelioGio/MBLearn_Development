import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import axiosClient from "../axios-client"
import { useEffect, useState } from "react"
import { useOption } from "../contexts/AddUserOptionProvider"
import { useUser } from "../contexts/selecteduserContext"

const DeleteUserModal = ({open,close,classname,EmployeeID,close_confirmation, selectedUser,}) => {
    const {departments,titles,location,cities,division,section} = useOption()||{};
    //const {selectUser, selectedUser, isFetching} = useUser()
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(()=>{
        console.log(selectedUser)
    },[])

    // useEffect(() => {
    //     if (open && EmployeeID) {
    //         console.log("Modal opened with EmployeeID:", EmployeeID);
    //         if (selectedUser?.id === EmployeeID) {
    //             setLoading(false);
    //             console.log("Selected user already fetched:", selectedUser);
    //         } else {
    //             setLoading(true);
    //             console.log("Fetching user with EmployeeID:", EmployeeID);
    //             selectUser(EmployeeID);
    //         }
    //     }
    // }, [EmployeeID, selectedUser, open]);

    // useEffect(() => {
    //     if (selectedUser && !isFetching) {
    //         setLoading(false);
    //         console.log("Selected user fetched:", selectedUser);
    //     }
    // }, [selectedUser, isFetching]);

    // useEffect(() => {
    //     setLoading(isFetching);
    //     console.log("Fetching status changed:", isFetching);
    // }, [isFetching]);

    const DeleteUser = () => {
        setDeleting(true)
        if(!selectedUser) return;
        axiosClient.delete(`/delete-user/${selectedUser.id}`, )
        .then((res) => {
            setDeleting(false)
            close_confirmation()
            close()
        }).catch((err) => {
            console.log(err)
        })
    }

    return(
        <Dialog open={open} onClose={close} className={classname}>
                    <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30" />
                        <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                            <div className='flex min-h-full items-center justify-center p-4 text center'>
                                <DialogPanel transition className=' w-1/2 relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                                    <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                                    {/* Header */}
                                        <div className="py-4 mx-4 flex flex-row justify-between item-center gap-6 border-b border-divider">
                                            <div>
                                                <h1 className="text-primary font-header text-3xl">Remove User?</h1>
                                                <p className="text-unactive font-text text-md">Confirms the archival of the selected user.</p>
                                            </div>
                                            <div className="bg-primarybg p-5 rounded-full">
                                                <div className="w-fit h-fit aspect-square flex items-center justify-center p-1">
                                                    <FontAwesomeIcon icon={faTrash} className="text-primary text-lg"/>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                        loading ? (
                                            <div className="flex items-center justify-center p-32 text-unactive">
                                                Fetching data...
                                            </div>
                                        ):(
                                            <div className="p-5">
                                                <div className="grid grid-cols-3 pb-4 gap-4">

                                                    {/* Name */}
                                                    <div className="row-start-2 col-span-3">
                                                        <p className="font-text text-xs text-unactive">Employee's Full Name</p>
                                                        <p className="font-text text-base">{selectedUser?.first_name || "Not Available"} {selectedUser?.middle_name || ""} {selectedUser?.last_name || ""} {selectedUser?.suffix || ""}</p>
                                                    </div>

                                                    {/* EmployeeID */}
                                                    <div className="row-start-3 col-span-1">
                                                        <p className="font-text text-xs text-unactive">Employee ID</p>
                                                        <p className="font-text text-base">{selectedUser?.employeeID}</p>
                                                    </div>

                                                    {/* System Role */}
                                                    <div className="row-start-3 col-span-1">
                                                        <p className="font-text text-xs text-unactive">Account Role</p>
                                                        <p className="font-text text-base">{selectedUser?.roles?.[0]?.role_name || "N/a"}</p>
                                                    </div>

                                                    {/* Job Title*/}
                                                    <div className="row-start-3 col-start-3">
                                                        <p className="font-text text-xs text-unactive">Title</p>
                                                        <p className="font-text text-base">{selectedUser?.title?.title_name || "No Title"}</p>
                                                    </div>

                                                     {/* Department */}
                                                    <div className="row-start-4 col-start-1">
                                                        <p className="font-text text-xs text-unactive">Division</p>
                                                        <p className="font-text text-base">{selectedUser?.division?.division_name || "No Division"}</p>
                                                    </div>

                                                    {/* Department */}
                                                    <div className="row-start-4 col-start-2">
                                                        <p className="font-text text-xs text-unactive">Department</p>
                                                        <p className="font-text text-base">{selectedUser?.department?.department_name || "No department"}</p>
                                                    </div>

                                                    {/* Department */}
                                                    <div className="row-start-4 col-start-3">
                                                        <p className="font-text text-xs text-unactive">Section</p>
                                                        <p className="font-text text-base">{selectedUser?.section?.section_name || "No Section"}</p>
                                                    </div>

                                                    {/* City */}
                                                    <div className="row-start-5 col-start-1">
                                                        <p className="font-text text-xs text-unactive">City</p>
                                                        <p className="font-text text-base">{selectedUser?.city?.city_name || "No city"}</p>
                                                    </div>
                                                    {/* Branch*/}
                                                    <div className="row-start-5 col-span-2">
                                                        <p className="font-text text-xs text-unactive">Branch</p>
                                                        <p className="font-text text-base">{selectedUser?.branch?.branch_name || "No Branch"}</p>
                                                    </div>
                                                </div>

                                                <div className="row-start-7 col-span-3 py-2 flex flex-row gap-2">
                                                    <button className="w-full inline-flex flex-col items-center gap-2 row-start-7 col-span-3 p-4 rounded-md font-header uppercase text-primary border-2 border-primary text-xs hover:text-white hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out"
                                                        onClick={close}>
                                                        <p>Cancel</p>
                                                    </button>
                                                    <button className="w-full inline-flex flex-col items-center gap-2 row-start-7 col-span-3 bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out"
                                                        onClick={() => DeleteUser()}>
                                                        <p>{deleting ? "Deleting..." : "Remove User"}</p>
                                                    </button>
                                                </div>

                                            </div>
                                        )
                                    }

                                    </div>

                                </DialogPanel>
                            </div>
                        </div>
                </Dialog>
    )
}
export default DeleteUserModal
