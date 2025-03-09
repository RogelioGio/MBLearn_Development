import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import axiosClient from "../axios-client"
import { useEffect, useState } from "react"
import { useOption } from "../contexts/AddUserOptionProvider"
import { useUser } from "../contexts/selecteduserContext"

const DeleteUserModal = ({open,close,classname,EmployeeID,close_confirmation,updateTable}) => {
    const {departments,titles,location,cities = []} = useOption()||{};
    const {selectUser, selectedUser} = useUser()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            if (EmployeeID) {
                selectUser(EmployeeID);
            }
            console.log(selectedUser)
        }, [EmployeeID]);
    useEffect(() => {
        if (selectedUser) {
            setLoading(false);
        }
    }, [selectedUser]);

    return(
        <Dialog open={open} onClose={close} className={classname}>
                    <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
                        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                            <div className='flex min-h-full items-center justify-center p-4 text center'>
                                <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                                    <div className='bg-white rounded-md h-full w-fit p-5 flex flex-col'>
                                    {/* Header */}
                                        <div className="py-4 mx-4 flex flex-row justify-between item-center gap-6 border-b border-divider">
                                            <div>
                                                <h1 className="text-primary font-header text-3xl">Remove User?</h1>
                                                <p className="text-unactive font-text text-md">Confirms the permanent deletion of the selected information from the system.</p>
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
                                                <div className="grid grid-cols-3 pb-4">

                                                    {/* Name */}
                                                    <div className="row-start-2 col-span-2 py-2">
                                                        <p className="font-text text-xs text-unactive">Name</p>
                                                        <p className="font-text text-base">{selectedUser?.first_name || "Not Available"} {selectedUser?.middle_name || ""} {selectedUser?.last_name || ""} {selectedUser?.suffix || ""}</p>
                                                    </div>

                                                    {/* EmployeeID */}
                                                    <div className="row-start-2 col-span-1 py-2 pl-4">
                                                        <p className="font-text text-xs text-unactive">Employee ID</p>
                                                        <p className="font-text text-base">{selectedUser.employeeID}</p>
                                                    </div>

                                                    {/* System Role */}
                                                    <div className="row-start-3 col-span-1 py-2">
                                                        <p className="font-text text-xs text-unactive">Employee's Account Role</p>
                                                        <p className="font-text text-base">{selectedUser.roles?.[0]?.role_name}</p>
                                                    </div>

                                                    {/* Department */}
                                                    <div className="row-start-3 col-start-2 py-2 pl-4">
                                                        <p className="font-text text-xs text-unactive">Department</p>
                                                        <p className="font-text text-base">{selectedUser?.department_id ? departments.find(dept => dept.id === selectedUser.department_id)?.department_name || "No department" : "No department"}</p>
                                                    </div>


                                                    {/* Job Title*/}
                                                    <div className="row-start-3 col-start-3 py-2 pl-4">
                                                        <p className="font-text text-xs text-unactive">Title</p>
                                                        <p className="font-text text-base">{selectedUser?.title_id ? titles.find(title => title.id === selectedUser.title_id)?.title_name || "No Title" : "No Title"}</p>
                                                    </div>

                                                    {/* City */}
                                                    <div className="row-start-4 col-start-1 py-2">
                                                        <p className="font-text text-xs text-unactive">City</p>
                                                        <p className="font-text text-base">{}</p>
                                                    </div>
                                                    {/* Branch*/}
                                                    <div className="row-start-4 col-span-2 py-2 pl-4">
                                                        <p className="font-text text-xs text-unactive">Branch</p>
                                                        <p className="font-text text-base">{selectedUser?.branch_id ? location.find(location => location.id === selectedUser.branch_id)?.branch_name || "No Branch" : "No Branch"}</p>
                                                    </div>
                                                </div>

                                                <div className="row-start-7 col-span-3 py-2 flex flex-row gap-2">
                                                    <button className="w-full inline-flex flex-col items-center gap-2 row-start-7 col-span-3 p-4 rounded-md font-header uppercase text-primary border-2 border-primary text-xs hover:text-white hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out"
                                                        onClick={close}>
                                                        <p>Cancel</p>
                                                    </button>
                                                    <button className="w-full inline-flex flex-col items-center gap-2 row-start-7 col-span-3 bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out">
                                                        <p>Remove User</p>
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
