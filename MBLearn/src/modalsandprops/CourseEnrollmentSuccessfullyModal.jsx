import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
const CourseEnrollmentSuccesfully = ({open, close, result}) => {
    return(
        <Dialog open={open} onClose={close}>
            <DialogBackdrop transition className="backdrop-blur-sm fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40"/>
            <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='w-[90vw] relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='bg-white rounded-md h-full w-full p-5 flex flex-col'>
                            {/* Header */}
                            <div className="w-full p-4 border-b border-divider flex flex-row justify-between item-center gap-4">
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
                            {/* Table */}
                            <div className="p-4">
                                    <p className="text-xs text-unactive font-text pb-2">Enrolled Employees:</p>
                                    <div className="className='w-full border-primary border rounded-md overflow-hidden shadow-md'">
                                        <table className='text-left w-full overflow-y-scroll'>
                                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                                    <tr>
                                                        <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                                        <th className='py-4 px-4'>DIVSION</th>
                                                        <th className='py-4 px-4'>DEPARTMENT</th>
                                                        <th className='py-4 px-4'>SECTION</th>
                                                        <th className='py-4 px-4'>LOCATION</th>
                                                    </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-divider'>
                                                {
                                                    result?.[0]?.enrollees?.map((enrollee) => (
                                                            <tr key={enrollee.id} className='font-text text-sm hover:bg-gray-200 hover:cursor-pointer'>
                                                                <td className='text-sm py-3 px-4'>
                                                                    <div className="flex items-center gap-4">
                                                                        <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                                        <img src={enrollee.profile_image} alt="" className='rounded-full'/>
                                                                        </div>
                                                                        <div>
                                                                            <p className='font-text'>{enrollee.first_name} {enrollee.middle_name} {enrollee.last_name} {enrollee.name_suffix}</p>
                                                                            <p className='text-unactive text-xs'>ID: {enrollee.employeeID}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='py-3 px-4'>
                                                                    <p className='text-unactive'>{enrollee.division.division_name}</p>
                                                                </td>
                                                                <td className='py-3 px-4'>
                                                                    <div className='flex flex-col'>
                                                                        {/* Department */}
                                                                        <p className='text-unactive'>{enrollee.department.department_name}</p>
                                                                        {/* Title */}
                                                                        <p className='text-unactive text-xs'>{enrollee.title.title_name}</p>
                                                                    </div>
                                                                </td>
                                                                <td className='py-3 px-4'>
                                                                    <p className='text-unactive'>{enrollee.section.section_name}</p>
                                                                </td>
                                                                <td className='py-3 px-4'>
                                                                    <div className='flex flex-col'>
                                                                    {/* Branch Location */}
                                                                    <p className='text-unactive'>{enrollee.branch.branch_name}</p>
                                                                    {/* City Location */}
                                                                    <p className='text-unactive text-xs'>{enrollee.city.city_name}</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            {/* Confirm */}
                            <div className="p-4 flex flex-row w-full">
                                <div className="bg-primary py-3 w-full font-header text-white flex flex-row justify-center rounded-md hover:cursor-pointer hover:bg-primaryhover transition-all ease-in-out"
                                    onClick={close}>
                                    <p>Confirm</p>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>

                </div>
            </div>
        </Dialog>
    )
}
export default CourseEnrollmentSuccesfully
