import { faGraduationCap, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
const CourseEnrollmentSuccesfully = ({open, close, result}) => {
    return(
        <Dialog open={open} onClose={close}>
            <DialogBackdrop transition className="backdrop-blur-sm fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40"/>
            <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
                                                        w-[100vw]
                                                        md:w-[80vw]'>
                        <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                            {/* Header */}
                            <div className="pb-2 mx-4 border-b border-divider flex flex-row justify-between item-center">
                                <div>
                                    <h1 className="text-primary font-header
                                                text-base
                                                md:text-2xl">Enrollment Successfully</h1>
                                    <p className="text-unactive font-text
                                                text-xs
                                                md:text-sm">All selected user are successfully enrolled to the given selected assigned courses</p>
                                </div>
                                <div className="">
                                    <div className="border-2 border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out
                                                    w-5 h-5 text-xs
                                                    md:w-8 md:h-8 md:text-base"
                                        onClick={()=>{
                                            close()
                                        }}>
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </div>
                                </div>

                            </div>
                            {/* Table */}
                            <div className="p-4">
                                    <div className="className='w-full border-primary border rounded-md overflow-hidden shadow-md'">
                                        <table className='text-left w-full overflow-y-scroll'>
                                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                                    <tr>
                                                        <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                                        <th className='py-4 px-4 lg:table-cell hidden'>DIVSION</th>
                                                        <th className='py-4 px-4 lg:table-cell hidden'>DEPARTMENT</th>
                                                        <th className='py-4 px-4 lg:table-cell hidden'>SECTION</th>
                                                    </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-divider'>
                                                {
                                                    result?.map((enrollee) => (
                                                            <tr key={enrollee.id} className='font-text text-sm hover:bg-gray-200 hover:cursor-pointer'>
                                                                <td className='text-sm py-3 px-4'>
                                                                    <div className="lg:flex hidden items-center gap-4">
                                                                        <div className='bg-blue-500 min-h-10 min-w-10 rounded-full'>
                                                                        <img src={enrollee.profile_image} alt="" className='w-10 h-10 object-cover rounded-full overflow-hidden'/>
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <p className='font-text'>{enrollee.first_name} {enrollee.middle_name} {enrollee.last_name} {enrollee.name_suffix}</p>
                                                                            <p className='text-unactive text-xs'>ID: {enrollee.employeeID}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="lg:hidden grid grid-rows-[min-content_auto] grid-cols-3 gap-2">
                                                                        <div className="col-span-3 flex flex-row gap-4 items-center">
                                                                            <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                                                <img src={enrollee.profile_image} alt="" className='w-full h-full object-cover rounded-full'/>
                                                                            </div>
                                                                            <div>
                                                                                <p className='font-text'>{enrollee.first_name} {enrollee.middle_name} {enrollee.last_name} {enrollee.name_suffix}</p>
                                                                                <p className='text-unactive text-xs'>ID: {enrollee.employeeID}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-1 flex flex-col justify-start">
                                                                            <p>{enrollee.division.division_name}</p>
                                                                            <p className='text-xs font-text text-unactive'>Division</p>
                                                                        </div>
                                                                        <div className="col-span-1 flex flex-col justify-start">
                                                                            <p>{enrollee.department.department_name}</p>
                                                                            <p className='text-xs font-text text-unactive'>Department</p>
                                                                        </div>
                                                                        <div className="col-span-1 flex flex-col justify-start">
                                                                            <p>{enrollee.section.section_name}</p>
                                                                            <p className='text-xs font-text text-unactive'>Section</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='py-3 px-4 lg:table-cell hidden'>
                                                                    <p className='text-unactive'>{enrollee.division.division_name}</p>
                                                                </td>
                                                                <td className='py-3 px-4 lg:table-cell hidden'>
                                                                    <div className='flex flex-col'>
                                                                        {/* Department */}
                                                                        <p className='text-unactive'>{enrollee.department.department_name}</p>
                                                                        {/* Title */}
                                                                        <p className='text-unactive text-xs'>{enrollee.title.title_name}</p>
                                                                    </div>
                                                                </td>
                                                                <td className='py-3 px-4 lg:table-cell hidden'>
                                                                    <p className='text-unactive'>{enrollee.section.section_name}</p>
                                                                </td>
                                                            </tr>
                                                        ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            {/* Confirm */}
                            <div className="px-4 pb-2 flex flex-row w-full">
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
