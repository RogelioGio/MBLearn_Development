import { faGraduationCap, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"


const EnrolledSuccessfullyModal = ({ isOpen, onClose }) => {
    return(
        <Dialog open={isOpen} onClose={() => {}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30"/>
                <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='w-2/3 relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                            <div className='bg-white rounded-md h-full p-5 flex flex-col justify-center'>
                                {/* Header */}
                                <div className="py-4 mx-4 border-b border-divider flex flex-row justify-between item-center gap-4">
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Enrollment Successfully</h1>
                                        <p className="text-unactive font-text text-md">All selected user are successfully enrolled to the given selected assigned courses</p>
                                    </div>
                                    <div className="bg-primarybg p-5 rounded-full">
                                        <div className="h-full w-fit aspect-square flex items-center justify-center">
                                            <FontAwesomeIcon icon={faGraduationCap} className="text-primary text-lg"/>
                                        </div>
                                    </div>
                                </div>

                                {/* Selected Courses */}
                                <div className="mx-4 py-2">
                                    <p className="text-xs text-unactive font-text pb-2">Selected Courses:</p>
                                    {/* Must put slider or pagination next time */}
                                    <div className="grid grid-cols-3 gap-2 grid-row-1">
                                        {/* Sample */}
                                        {/* ${course === name ? 'bg-primary text-white' : 'bg-white text-primary'} */}
                                        <div className={`w-full p-3 grid grid-cols-[auto_3.75rem] border border-divider rounded-md font-text shadow-md hover:cursor-pointer hover:scale-105 transition-all ease-in-out `}>
                                            <div className="pb-2">
                                                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                                                    Training Type
                                                </span>
                                            </div>
                                            <div className="col-span-2">
                                                <h1 className="text-sm font-header">Sample Course Name</h1>
                                                <p className="text-xs">Course Type - Course Category</p>
                                            </div>
                                        </div>
                                        <div className={`w-full p-3 grid grid-cols-[auto_3.75rem] border border-divider rounded-md font-text shadow-md hover:cursor-pointer hover:scale-105 transition-all ease-in-out `}>
                                            <div className="pb-2">
                                                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                                                    Training Type
                                                </span>
                                            </div>
                                            <div className="col-span-2">
                                                <h1 className="text-sm font-header">Sample Course Name</h1>
                                                <p className="text-xs">Course Type - Course Category</p>
                                            </div>
                                        </div>
                                        <div className={`w-full p-3 grid grid-cols-[auto_3.75rem] border border-divider rounded-md font-text shadow-md hover:cursor-pointer hover:scale-105 transition-all ease-in-out `}>
                                            <div className="pb-2">
                                                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                                                    Training Type
                                                </span>
                                            </div>
                                            <div className="col-span-2">
                                                <h1 className="text-sm font-header">Sample Course Name</h1>
                                                <p className="text-xs">Course Type - Course Category</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Enrolled User Table */}
                                <div className="mx-4 py-2">
                                    <p className="text-xs text-unactive font-text pb-2">Enrolled Employees:</p>
                                    <div className="className='w-full border-primary border rounded-md overflow-hidden shadow-md'">
                                        <table className='text-left w-full overflow-y-scroll'>
                                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                                    <tr>
                                                        <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                                        <th className='py-4 px-4'>DEPARTMENT</th>
                                                        <th className='py-4 px-4'>BRANCH</th>
                                                    </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-divider'>
                                                <tr className='font-text text-sm hover:bg-gray-200 hover:cursor-pointer'>
                                                    <td className='text-sm py-3 px-4'>
                                                        <div className="flex items-center gap-4">
                                                            <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                            {/* //<img src={profile_url} alt="" className='rounded-full'/> */}
                                                            </div>
                                                            <div>
                                                                <p className='font-text'>Sample Employee Name</p>
                                                                <p className='text-unactive text-xs'>ID: Sample Employee ID</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-3 px-4'>
                                                        <div className='flex flex-col'>
                                                            {/* Department */}
                                                            <p className='text-unactive'>Sample Department</p>
                                                            {/* Title */}
                                                            <p className='text-unactive text-xs'>Sample Title</p>
                                                        </div>
                                                    </td>
                                                    <td className='py-3 px-4'>
                                                        <div className='flex flex-col'>
                                                        {/* Branch Location */}
                                                        <p className='text-unactive'>Sample Branch</p>
                                                        {/* City Location */}
                                                        <p className='text-unactive text-xs'>Sample City</p>
                                                        </div>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Confirm Button */}
                                <div className="mx-4 py-2 font-header">
                                    <button className="w-full bg-primary text-white rounded-md p-2 hover:scale-105 transition-all ease-in-out" onClick={onClose}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
    )
}

export default EnrolledSuccessfullyModal
