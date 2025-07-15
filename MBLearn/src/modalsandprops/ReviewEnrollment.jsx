import { faChevronLeft, faChevronRight, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { format, set } from "date-fns"
import { useEffect, useState } from "react"

//Front end Pagination
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



const ReviewEnrollment = ({open, close, enrollment, enroll, enrolling, enrolled}) => {
    const [selected, setSelected] = useState({})
    const [current, setCurrent] = useState(0)
    const {currentPaginated,
        currentPage,
        totalPage,
        indexFirstItem,
        indexLastItem,
        totalitem,
        goto,
        next,
        back} = usePagination(selected?.enrollees,5)

        //
    useEffect(()=>{
        setSelected(enrollment[current])
    },[enrollment])

    const nextCourse = () => {
        if(current === enrollment.length - 1) return
        setCurrent(prev => prev + 1)
        goto(1)
    }
    const prevCourse = () => {
        if(current === 0) return
        setCurrent(prev => prev - 1)
        goto(1)
    }
    useEffect(()=>{
        // console.log("Current Course: ", current)
        // console.log("Course Lenght: ", enrollment.length -1)
        setSelected(enrollment[current])
    }, [current])
    useEffect(()=>{
        setCurrent(0)
    },[open])




    return (
        <>
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="backdrop-blur-sm fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30"/>
            <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
                                                                            w-[100vw]
                                                                            md:w-[90vw]'>
                        <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                            {/* Header */}
                            <div className="pb-2 mx-4 border-b border-divider flex flex-row justify-between item-center">
                                <div>
                                    <h1 className="text-primary font-header
                                                text-base
                                                md:text-2xl">
                                                    {
                                                        enrolled ? "Enrollment Complete" : "Review Enrollment"
                                                    }
                                                </h1>
                                    <p className="text-unactive font-text
                                                text-xs
                                                md:text-sm">
                                                    {
                                                        enrolled ? "You have successfully enrolled the selected learners to the course." : "Review the list of courses and learner to be enrolled with the given course duration"
                                                    }
                                                    </p>
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

                            {/* Course List */}
                            <div className="py-4 px-4 grid grid-cols-[min-content_1fr_1fr_min-content] justify-between items-center">
                                <div className="col-span-1 w-full whitespace-nowrap">
                                    <p className="font-text text-xs">Course Name:</p>
                                    <p className="font-header text-primary">{selected?.course?.name}</p>
                                    <p className="font-text text-xs text-unactive">Course ID: {selected?.course?.CourseID}</p>
                                </div>
                                <div className="flex flex-row gap-x-4 w-full col-span-2 pr-3">
                                    <div className="flex flex-col items-end w-full">
                                        <p className="font-text text-xs">Course Duration:</p>
                                        <p className="font-header text-primary">{
                                                <>
                                                    {selected?.duration?.months} <span className="font-text text-xs text-unactive">Month/s,</span> {selected?.duration?.weeks} <span className="font-text text-xs text-unactive">Weeks/s,</span> {selected?.duration?.days} <span className="font-text text-xs text-unactive">days/s,</span>
                                                </>
                                            }</p>
                                    </div>
                                    <div className="flex flex-col items-end w-fit whitespace-nowrap">
                                        <p className="font-text text-xs">Course Start Date:</p>
                                        <p className="font-header text-primary ">{selected?.end_date ? format(new Date(selected?.start_date), "MMMM dd yyyy"):null}</p>
                                    </div>
                                    <div className="flex flex-col items-end w-fit whitespace-nowrap">
                                        <p className="font-text text-xs">Course End Date:</p>
                                        <p className="font-header text-primary">{selected?.end_date ? format(new Date(selected?.end_date), "MMMM dd yyyy"):null}</p>
                                    </div>
                                </div>

                                {
                                    enrollment.length > 1 ?
                                    <div className="flex flex-row gap-x-1">
                                    <div className="group relative">
                                        <div onClick={()=>prevCourse()} className={`w-10 h-10 text-lg border-primary border-2 flex items-center justify-center rounded-md text-primary transition ease-in-out ${current === 0 ? "opacity-50 cursor-not-allowed":"hover:cursor-pointer hover:bg-primaryhover hover:text-white hover:border-primaryhover"}`}> <FontAwesomeIcon icon={faChevronLeft}/> </div>
                                        <div className={`absolute scale-0 top-11 left-1/2 -translate-x-1/2 group-hover:scale-100 bg-tertiary text-white font-text p-2 text-xs rounded-md shadow-lg whitespace-nowrap z-50 transition-all ease-in-out  ${current === 0 ? "hidden":"block"}`}>
                                            Previous Course
                                        </div>
                                    </div>
                                    <div className="group relative">
                                        <div onClick={()=>nextCourse()} className={`w-10 h-10 text-lg border-primary border-2 flex items-center justify-center rounded-md text-primary r transition ease-in-out ${current === enrollment.length-1 ? "opacity-50 cursor-not-allowed":"hover:cursor-pointer hover:bg-primaryhover hover:text-white hover:border-primaryhove"}`}> <FontAwesomeIcon icon={faChevronRight}/> </div>
                                        <div className={`absolute scale-0 top-11 left-1/2 -translate-x-1/2 group-hover:scale-100 bg-tertiary text-white font-text p-2 text-xs rounded-md shadow-lg whitespace-nowrap z-50 transition-all ease-in-out  ${current === enrollment.length-1 ? "hidden":"block"}`}>
                                            Next Course
                                        </div>
                                    </div>
                                </div> :null
                                }
                            </div>


                            {/* Course Enrollees */}
                            <div className="px-4">
                                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                    <table className='text-left min-w-full table-auto table-layout-fixed'>
                                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                            <tr>
                                                <th className='p-4 w-2/7'> EMPLOYEE NAME</th>
                                                <th className='p-4 w-1/7'>DIVISION</th>
                                                <th className='p-4 w-1/7'>DEPARTMENT</th>
                                                <th className='p-4 w-1/7'>SECTION</th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white divide-y divide-divider'>
                                            {
                                                currentPaginated?.map((enrollee) => (
                                                    <tr>
                                                        <td className="px-4 py-3 flex flex-row items-center gap-3">
                                                            <div className="min-w-8 min-h-8 rounded-full bg-blue-500 w-8">
                                                                <img src={enrollee?.profile_image} alt="" className="w-8 rounded-full"/>
                                                            </div>
                                                            <div>
                                                                <p className={`font-text text-xs`}>{enrollee?.first_name} {enrollee?.middle_name || ""} {enrollee?.last_name}</p>
                                                                <p className="font-text text-unactive text-xs">ID: {enrollee?.employeeID}</p>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 font-text text-unactive">
                                                            <p className="text-xs"> {enrollee?.division?.division_name}</p>
                                                        </td>
                                                        <td className="p-4 font-text text-unactive">
                                                            <p className="text-xs"> {enrollee?.department?.department_name}</p>
                                                        </td>
                                                        <td className="p-4 font-text text-unactive">
                                                            <p className="text-xs"> {enrollee?.section?.section_name}</p>
                                                        </td>

                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="py-2 px-4 col-span-4 flex flex-row justify-between items-center">
                                <div>
                                    <p className="font-text text-xs text-unactive">Showing {indexFirstItem+1} of {indexLastItem}  total entry</p>
                                </div>
                                <div>
                                    <nav className={`isolate inline-flex -space-x-px round-md shadow-xs`}>
                                        <a
                                            onClick={()=>back()}
                                            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset transition-all ease-in-out ${currentPage-1 === 0  ? 'opacity-50 cursor-not-allowed':'hover:cursor-pointer hover:bg-primaryhover hover:text-white'}`}>
                                            <FontAwesomeIcon icon={faChevronLeft}/>
                                        </a>
                                        {
                                            Array.from({ length: totalPage }, (_, i) => (
                                                <a
                                                    key={i}
                                                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset hover:cursor-pointer
                                                        ${
                                                            currentPage === i + 1
                                                            ? 'bg-primary text-white'
                                                            : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                                        } transition-all ease-in-out`}
                                                    onClick={() => goto(i + 1)}
                                                >
                                                    {i + 1}
                                                </a>))
                                        }
                                        <a
                                            onClick={()=>next()}
                                            className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset transition-all ease-in-out ${currentPage === totalPage ? 'opacity-50 cursor-not-allowed':'hover:cursor-pointer hover:bg-primaryhover hover:text-white'}`}>
                                            <FontAwesomeIcon icon={faChevronRight}/>
                                        </a>
                                    </nav>
                                </div>
                            </div>

                            {/* Enrollment Action */}
                            <div className="flex flex-row justify-between gap-2 mx-4 pb-2">
                                {
                                    enrolled ? <>
                                        <div className={`items-center border-2 border-primary rounded-md py-3 w-full flex flex-row gap-2 justify-center shadow-md bg-primary text-white  transition-all ease-in-out ${enrolling ? 'opacity-50 cursor-not-allowed':'hover:cursor-pointer hover:bg-primaryhover hover:border-primaryhover'}`}
                                            onClick={()=>(close())}
                                            >
                                                <p className="font-header">Confirm</p>
                                        </div>
                                    </>:
                                    <>
                                        <div className={`border-2 border-primary rounded-md py-3 w-full flex flex-row justify-center shadow-md text-primary transition-all ease-in-out ${enrolling ? 'opacity-50 cursor-not-allowed':'hover:cursor-pointer hover:bg-primaryhover hover:text-white'}`}
                                        onClick={()=>{
                                            if(enrolling) return
                                            close()
                                        }}>
                                            <p className="font-header">Back</p>
                                        </div>

                                        <div className={`items-center border-2 border-primary rounded-md py-3 w-full flex flex-row gap-2 justify-center shadow-md bg-primary text-white  transition-all ease-in-out ${enrolling ? 'opacity-50 cursor-not-allowed':'hover:cursor-pointer hover:bg-primaryhover hover:border-primaryhover'}`}
                                        onClick={()=>(enroll())}>
                                            {
                                                enrolling ?
                                                <>
                                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin"/>
                                                    <p className="font-header">Enrolling</p>
                                                </>:<>
                                                <p className="font-header">Enroll</p>
                                                </>
                                            }
                                        </div>
                                    </>
                                }

                                </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>

        </Dialog>
        </>
    )
}
export default ReviewEnrollment
