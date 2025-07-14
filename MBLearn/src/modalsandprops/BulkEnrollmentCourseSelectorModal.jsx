import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons"
import AssignedCourseEnrollmentCard from "./AssignedCourseEnrollmentCard"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../components/ui/select';

const BulkEnrollmentCourseSelectorModal = ({ open, close, courselist, currentCourse, setCurrentCourse, courseType, setCourseType, resetPagination,loading, numberOfEnrollees}) => {
    return (
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="backdrop-blur-sm fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30"/>
            <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
                                                        w-[100vw]
                                                        md:w-[60vw]'>
                        <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                            {/* Header */}
                            <div className="pb-2 mx-4 border-b border-divider flex flex-row justify-between item-center">
                                <div>
                                    <h1 className="text-primary font-header
                                                text-base
                                                md:text-2xl">Select Course</h1>
                                    <p className="text-unactive font-text
                                                text-xs
                                                md:text-sm">Select any assigned or inputted courses to enroll a learner</p>
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

                            <div className="grid grid-cols-4 py-2 px-3">
                                <div className="col-span-1 flex items-center justify-center">
                                    <Select value={courseType} onValueChange={(value) => setCourseType.setFieldValue("filter", value)} className="w-full h-full" disabled={loading}>
                                        <SelectTrigger className="focus:outline-2 focus:-outline-offset-2 focus:outline-primary border-primary border-2 font-header text-primary w-full">
                                            <SelectValue placeholder="Learner Type" />
                                        </SelectTrigger>
                                        <SelectContent className="font-text text-xs text-primary hover:cursor-pointer">
                                            <SelectItem value="myCourses">My Courses</SelectItem>
                                            <SelectItem value="Assigned">Assigned Courses</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2 col-start-3 flex flex-col justify-end">
                                    <form>
                                        <div className="border-primary inline-flex flex-row place-content-between border-2 font-text rounded-md shadow-md w-full">
                                            <input type="text" className='focus:outline-none text-sm px-4 rounded-md bg-white w-full' placeholder='Search...'
                                                name='search'
                                                //value={searchFormik.values.search}
                                                //onChange={searchFormik.handleChange}
                                                // onKeyDown={(e) => {
                                                //     if (e.key === 'Enter') {
                                                //         e.preventDefault();
                                                //         searchFormik.handleSubmit();
                                                //     }
                                                // }}
                                                />
                                            <div className="min-h-10 min-w-10 bg-primary text-white flex items-center justify-center">
                                                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="grid-rows-2 grid-cols-3 grid gap-2 px-3 py-2">
                                {
                                    loading ? (
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <div className="border-2 border-divider rounded-md p-4 shadow-md h-36 w-full animate-pulse ng-white" key={index}/>
                                        ))
                                    ) : courselist.length === 0 ?
                                        <div className="col-span-3 row-span-2 p-10 font-text text-unactive text-center flex flex-col items-center justify-center gap-2">
                                            {
                                                courseType === "myCourses" ?
                                                    <>
                                                        <div>
                                                            <div className="w-14 h-14 rounded-full bg-primarybg text-primary text-2xl flex items-center justify-center">
                                                                <FontAwesomeIcon icon={faXmark}/>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm">You have no inputted courses yet</p>
                                                    </>
                                                : courseType === "Assigned" ?
                                                    <>
                                                        <div>
                                                            <div className="w-14 h-14 rounded-full bg-primarybg text-primary text-2xl flex items-center justify-center">
                                                                <FontAwesomeIcon icon={faXmark}/>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm">You have no assigned courses yet</p>
                                                    </>
                                                : <p className="text-sm">No courses found</p>
                                            }
                                        </div>
                                    :
                                    courselist.map((course, index) => (
                                        <AssignedCourseEnrollmentCard key={index} AssignedCourse={course} selected={currentCourse} onclick={()=>{setCurrentCourse(course), resetPagination() ,setTimeout(()=>{close()},100)}} numberOfEnrollees={numberOfEnrollees(course)}/>))
                                }
                            </div>

                            {/* Pagination */}
                            <div className="pt-4 px-4 col-span-4 flex flex-row justify-between items-center">
                                <div>
                                    <p className='text-sm font-text text-unactive'>
                                        Showing <span className='font-header text-primary'>1</span> to <span className='font-header text-primary'>1</span> of <span className='font-header text-primary'>1</span> <span className='text-primary'>results</span>
                                    </p>
                                </div>
                                <div>
                                     {/* ${isLoading || learnerLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} */}
                                    <nav className={`isolate inline-flex -space-x-px round-md shadow-xs`}>
                                        {/* Previous */}
                                        <a href="#"
                                            //onClick={back}
                                            // ${isLoading || learnerLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary hover:text-white"}
                                            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset transition-all ease-in-out `}>
                                            <FontAwesomeIcon icon={faChevronLeft}/>
                                        </a>

                                        {/* Current Page & Dynamic Paging */}
                                        {/* {Pages.map((page)=>(
                                            <a href="#"
                                                key={page}
                                                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                                    ${
                                                        isLoading || learnerLoading ? "opacity-50 cursor-not-allowed" :
                                                        page === ((pageState.currentPage - 1)* chunkPerPage + currentChunk)
                                                        ? 'bg-primary text-white'
                                                        : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                                    } transition-all ease-in-out`}
                                                    onClick={() => pageChange(page)}>
                                                {page}</a>
                                        ))}
                                        */}
                                        {/* Next */}
                                        <a href="#"
                                           // onClick={next}
                                            className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset transition-all ease-in-out`}>
                                            <FontAwesomeIcon icon={faChevronRight}/>
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
export default BulkEnrollmentCourseSelectorModal
