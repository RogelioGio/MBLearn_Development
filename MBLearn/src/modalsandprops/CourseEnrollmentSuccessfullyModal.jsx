import { faChevronLeft, faChevronRight, faGraduationCap, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { format } from "date-fns";
import { useState } from "react";


const usePagination = (data, itemPerpage = 2) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexFirstItem = (currentPage - 1) * itemPerpage;
    const indexLastItem = Math.min(indexFirstItem + itemPerpage, data?.length);
    const currentPaginated = data?.slice(indexFirstItem, indexLastItem)
    const totalPage = Math.ceil(data?.length / itemPerpage)
    const totalitem = data?.length

    //Pagination Controll
    const goto = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPage) setCurrentPage(pageNum);
    }
    const next = () => {
        // setCurrentPage((prev) => Math.min(prev + 1, totalPage));
        if (currentPage < totalPage) setCurrentPage(currentPage + 1)
    };

    const back = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return {
        currentPaginated,
        currentPage,
        totalPage,
        indexFirstItem,
        indexLastItem,
        totalitem,
        goto,
        next,
        back
    }
}

const CourseEnrollmentSuccesfully = ({open, close, result, course, duration }) => {

    const {currentPaginated,
    currentPage,
    totalPage,
    indexFirstItem,
    indexLastItem,
    totalitem,
    goto,
    next,
    back} = usePagination(result,5)

    console.log(duration)
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

                            {/* Course Info */}
                            <div className="py-4 px-4 flex flex-col justify-between gap-y-2
                                lg:items-center lg:flex-row lg:py-3
                                ">
                                <div>
                                    <p className="font-text text-xs">Course:</p>
                                    <p className="font-header text-primary">{course.name}</p>
                                </div>
                                <div className="flex lg:justify-end flex-col lg:items-end">
                                    <p className="font-text text-xs">Course Duration:</p>
                                    <p className="font-header text-primary">{format(new Date(duration.from), "MMMM dd yyyy")} <span className="font-text text-black text-sm">to</span> {format(new Date(duration.to), "MMMM dd yyyy")}</p>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="px-4 pt-2">
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
                                                    currentPaginated?.map((enrollee) => (
                                                            <tr key={enrollee.id} className='font-text text-sm hover:bg-gray-200 hover:cursor-pointer'>
                                                                <td className='text-sm py-3 px-4'>
                                                                    <div className="lg:flex hidden items-center gap-4">
                                                                        <div className='bg-blue-500 min-h-8 min-w-8 rounded-full'>
                                                                        <img src={enrollee.profile_image} alt="" className='w-8 h-8 object-cover rounded-full overflow-hidden'/>
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <p className='font-text text-sm'>{enrollee.first_name} {enrollee.middle_name} {enrollee.last_name} {enrollee.name_suffix}</p>
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
                                                                    <p className='text-unactive text-xs'>{enrollee.division.division_name}</p>
                                                                </td>
                                                                <td className='py-3 px-4 lg:table-cell hidden'>
                                                                    <div className='flex flex-col'>
                                                                        {/* Department */}
                                                                        <p className='text-unactive text-xs'>{enrollee.department.department_name}</p>
                                                                    </div>
                                                                </td>
                                                                <td className='py-3 px-4 lg:table-cell hidden'>
                                                                    <p className='text-unactive text-xs'>{enrollee.section.section_name}</p>
                                                                </td>
                                                            </tr>
                                                        ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            {
                                result?.length > 5 &&
                                <div className="px-4 pt-2 flex flex-row justify-between items-center">
                                    <div className='flex flex-row items-center gap-2'>
                                        <p className='text-sm font-text text-unactive'>
                                            Showing <span className='font-header text-primary'>{indexFirstItem + 1}</span> to <span className='font-header text-primary'>{indexLastItem}</span> of <span className='font-header text-primary'>{totalitem}</span> <span className='text-primary'>results</span>
                                        </p>
                                    </div>
                                        <div>
                                            <nav className='isolate inline-flex -space-x-px round-md shadow-xs cursor-pointer'>
                                                {/* Previous */}
                                                <a
                                                    onClick={back}
                                                    className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                                </a>

                                                {/* Current Page & Dynamic Paging */}
                                                {
                                                    Array.from({length: totalPage}, (_, i) => (
                                                        <a key={i}
                                                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                                                ${
                                                                    currentPage === i+1
                                                                    ? 'bg-primary text-white'
                                                                    : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                                                } transition-all ease-in-out`}
                                                                onClick={() => goto(i+1)}>
                                                            {i+1}</a>
                                                    ))
                                                }


                                                <a
                                                    onClick={next}
                                                    className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                                    <FontAwesomeIcon icon={faChevronRight}/>
                                                </a>
                                            </nav>
                                        </div>
                                </div>
                            }

                            {/* Confirm */}
                            <div className="px-4 pt-2 pb-2 flex flex-row w-full">
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
