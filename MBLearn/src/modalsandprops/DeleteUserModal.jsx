import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import axiosClient from "../axios-client"
import { useEffect, useState } from "react"

const DeleteUserModal = ({open,close,classname,EmployeeID,close_confirmation,updateTable}) => {

    const [loading, setLoading] = useState(false)
    const [employeeData, setEmployeeData] = useState([])
    const [employeecreds, setEmployeeCreds] = useState([])

    useEffect(() => {
        if(EmployeeID) {
            setLoading(true)
            axiosClient.get(`/select-employeeid/${EmployeeID}`)
            .then(response => {
                setEmployeeData(response.data.data)
                setLoading(false)
            }).catch(err => console.log(err))
            .finally(()=>{
                setLoading(false)
            })
        }
        console.log(employeeData)
    },[EmployeeID])

    const handleDelete = (e) => {
        e.preventDefault()
        close_confirmation()
        close()
        if(EmployeeID){
            axiosClient.delete(`/delete-user/${employeeData.id}`).then((response)=>console.log(response))
        }
    }
    return(
        <Dialog open={open} onClose={close} className={classname}>
                    <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
                        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                            <div className='flex min-h-full items-center justify-center p-4 text center'>
                                <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                                    <div className='bg-white rounded-md h-full w-fit p-5 flex flex-col'>
                                    {/* Header */}
                                        <div className="py-4 mx-4 flex flex-row justify-between item-center gap-6">
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
                                            <div className="flex items-center justify-center">
                                                fetching data...
                                            </div>
                                        ):(
                                            <div className="p-5">
                                                <div className="grid grid-cols-3 pb-4">
                                                    {/* Employee Info Header */}
                                                    <div className="col-span-3 py-4 border-b border-divider">
                                                        <p className="uppercase font-header text-sm">Employee Information</p>
                                                    </div>

                                                    {/* Name */}
                                                    <div className="row-start-2 col-span-2 py-2 border-b border-divider border-r">
                                                        <p className="font-header text-xs">Name</p>
                                                        <p className="font-text text-xs">{employeeData.first_name} {employeeData.middle_name} {employeeData.last_name}</p>
                                                    </div>

                                                    {/* EmployeeID */}
                                                    <div className="row-start-2 col-span-1 py-2 pl-4 border-b border-divider">
                                                        <p className="font-header text-xs">Employee ID</p>
                                                        <p className="font-text text-xs">{employeeData.employeeID}</p>
                                                    </div>

                                                    {/* System Role */}
                                                    <div className="row-start-3 col-span-1 py-2 border-b border-r border-divider">
                                                        <p className="font-header text-xs">System Role</p>
                                                        <p className="font-text text-xs">{employeeData.roles?.[0]?.role_name}</p>
                                                    </div>

                                                    {/* Department */}
                                                    <div className="row-start-3 col-start-2 py-2 pl-4 border-b border-r border-divider">
                                                        <p className="font-header text-xs">Department</p>
                                                        <p className="font-text text-xs">{employeeData.department}</p>
                                                    </div>


                                                    {/* Job Title*/}
                                                    <div className="row-start-3 col-start-3 py-2 pl-4 border-b border-divider">
                                                        <p className="font-header text-xs">Title</p>
                                                        <p className="font-text text-xs">{employeeData.title}</p>
                                                    </div>

                                                    {/* Branch*/}
                                                    <div className="row-start-4 col-span-2 py-2 border-r border-b border-divider">
                                                        <p className="font-header text-xs">Branch</p>
                                                        <p className="font-text text-xs">{employeeData.branch}</p>
                                                    </div>

                                                    {/* City */}
                                                    <div className="row-start-4 col-start-3 py-2 pl-4 border-b border-divider">
                                                        <p className="font-header text-xs">City</p>
                                                        <p className="font-text text-xs">{employeeData.city}</p>
                                                    </div>

                                                    {/* userinfo inputted */}
                                                    {/* Employee Credentials */}
                                                    <div className=" row-start-5 col-span-3 py-4 border-b border-divider">
                                                        <p className="uppercase font-header text-sm">Employee Credentials</p>
                                                    </div>

                                                    {/* Metrobank Emails */}
                                                    <div className="row-start-6 col-start-1 py-2">
                                                        <p className="font-header text-xs">Metrobank Working Email</p>
                                                        <p className="font-text text-xs">{employeecreds.MBemail}</p>
                                                    </div>
                                                </div>

                                                <div className="row-start-7 col-span-3 py-2">
                                                    <button className="w-full inline-flex flex-col items-center gap-2 row-start-7 col-span-3 bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out" onClick={handleDelete}>
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
