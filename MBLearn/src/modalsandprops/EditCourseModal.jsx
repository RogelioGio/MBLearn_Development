import { faCircleXmark as regularXmark } from "@fortawesome/free-regular-svg-icons"
import { faBookBookmark, faBookOpen, faUserGroup, faUserLock, faCircleXmark as solidXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { useFormik } from "formik"
import { useCourseContext } from "../contexts/CourseListProvider"


const EditCourseModal = ({open, close, id, course}) => {
    const [hover, setHover] = useState(false);
    const [loading, setLoading] = useState(false)
    // const {selectedCourse = [] , selectCourse, isFetching, Course} = useCourse()
    const {coursetypes, coursecategories, trainingmodes} = useCourseContext();
    const [tab, setTab] = useState(1);

    // useEffect(() => {
    //     if (open && id) {
    //         formik.resetForm();
    //         if (selectedCourse?.id === id) {
    //             setLoading(false);
    //             } else {
    //                 setLoading(true);
    //                 selectCourse(id);
    //             }
    //         }
    //     return;
    //     }, [id, selectedCourse, open]);
    //     useEffect(() => {
    //         if (selectedCourse && !isFetching) {
    //             setLoading(false);
    //         }
    //     }, [selectedCourse, isFetching]);


        const formik = useFormik({
            enableReinitialize: true,
            initialValues: loading ? {
                courseName: "Loading...",
                courseType: "Loading...",
                courseCategories: "Loading...",
                training_type: "Loading...",
                training_mode: "Loading...",
                months: "Loading...",
                weeks: "Loading...",
                days: "Loading...",
                shortDescription: "Loading...",
                course_objectives: "Loading...",
                course_outcome: "Loading...",
            }:{
                courseName: course?.name || "",
                courseType: course?.types?.[0].id|| "",
                courseCategories: course?.categories?.[0]?.id || "",
                training_type: course?.training_type || "",
                training_mode: course?.training_modes?.[0]?.id || "",
                shortDescription: course?.description || "",
                months: course?.months || "0",
                weeks: course?.weeks || "0",
                days: course?.days || "0",
                course_objectives: course?.course_objectives || "",
                course_outcome: course?.course_outcomes || "",
            },
            onSubmit: (values) => {
                console.log(values)
            }
        })
        return(
        <Dialog open={open} onClose={()=>{}} className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30"/>
                <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative w-[50rem] overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                            <div className="bg-white rounded-md shadow-md p-5">
                                {/* Header */}
                                <div className="mx-5 py-5 border-b border-divider gap-y-4 grid grid-cols-[auto_min-content]">
                                    <div className="col-start-1">
                                        <h1 className="font-header text-primary text-3xl">Edit Course Detail</h1>
                                        <p className="font-text text-xs text-unactive">Modify course details to keep content accurate, updated, and engaging.</p>
                                    </div>
                                    {/* Close Button */}
                                    <div className='flex justify-end text-2xl col-start-2'>
                                        <FontAwesomeIcon icon={hover ? solidXmark:regularXmark} className='text-primary transition-all ease-in-out transform hover:scale-110 cursor-pointer' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={close}/>
                                    </div>
                                </div>
                                {/* Update Form */}
                                <form onSubmit={formik.handleSubmit} className='grid grid-cols-3 grid-rows-[auto] mx-5 py-5 gap-y-4'>

                                <div className="w-full flex flex-row rounded-md shadow-md hover:cursor-pointer col-span-3">
                                    <span className={`w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-l-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === 1 ? 'bg-primary text-white' : ''}`} onClick={() =>{setTab(1)}}>
                                        <FontAwesomeIcon icon={faBookOpen}/>
                                        Basic Course Information
                                    </span>
                                    <span className={` w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-r-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${tab === 2 ? 'bg-primary text-white' : ''}`} onClick={() =>{setTab(2)}}>
                                        <FontAwesomeIcon icon={faBookBookmark}/>
                                        Additional Course Information
                                    </span>
                                </div>
                                {
                                    tab === 1 ? (
                                    <>
                                        {/* Course Name */}
                                    <div className="inline-flex flex-col gap-2 row-start-2 col-span-3 pr-2">
                                        <label htmlFor="courseName" className="font-text text-xs flex flex-row justify-between">
                                            <p className="text-unactive">Course Name</p>
                                        </label>
                                        <input type="text" name="courseName"
                                                className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                value={formik.values.courseName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={loading}/>
                                    </div>
                                    {/* Course Type */}
                                    <div className="inline-flex flex-col gap-2 row-start-3 col-span-1 pr-2">
                                        <label htmlFor="courseType" className="font-text text-xs flex flex-row justify-between">
                                            <p className="text-unactive">Course Type:</p>
                                        </label>
                                        <div className="grid grid-cols-1">
                                            <select id="courseType" name="courseType" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                value={formik.values.courseType}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={loading}>
                                                <option value="">Select Type</option>
                                                {
                                                    coursetypes.map((coursetype) => (
                                                        <option key={coursetype.id} value={coursetype.id}>{coursetype.type_name}</option>
                                                    ))
                                                }
                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Course Category */}
                                    <div className="inline-flex flex-col gap-2 row-start-3 col-span-1 pr-2">
                                        <label htmlFor="courseCategory" className="font-text text-xs flex flex-row justify-between">
                                            <p className="text-unactive">Course Category:</p>
                                        </label>
                                        <div className="grid grid-cols-1">
                                            <select id="courseCategory" name="courseCategory" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                value={formik.values.courseCategories}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={loading}>
                                                <option value="">Select Category</option>
                                                {
                                                    coursecategories.map((category) => (
                                                        <option key={category.id} value={category.id}>{category.category_name}</option>
                                                    ))
                                                }
                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>

                                    </div>
                                    <div className="inline-flex flex-col gap-2 row-start-3 col-span-1 pr-2">
                                        <label htmlFor="training_type" className="font-text text-xs flex flex-row justify-between">
                                            <p className="text-unactive">Training Type:</p>
                                        </label>
                                        <div className="grid grid-cols-1">
                                            <select id="training_type" name="training_type" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                value={formik.values.training_type}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={loading}>
                                                <option value="">Select Training Type</option>
                                                <option value="Mandatory">Mandatory</option>
                                                <option value="Non-Mandatory">Non-Mandatory</option>

                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>

                                    </div>
                                    <div className="inline-flex flex-col gap-2 row-start-4 pr-2">
                                        <label htmlFor="months" className="font-text text-xs flex flex-row justify-between">
                                            <p className="text-unactive">Months:</p>
                                        </label>
                                        <input type="text" name="months"
                                                className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                value={formik.values.months}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={loading}/>
                                    </div>
                                    <div className="inline-flex flex-col gap-2 row-start-4 pr-2">
                                    <label htmlFor="weeks" className="font-text text-xs flex flex-row justify-between">
                                        <p className="text-unactive">Weeks:</p>
                                    </label>
                                    <input type="text" name="weeks"
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                            value={formik.values.weeks}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={loading}/>
                                    </div>
                                        <div className="inline-flex flex-col gap-2 row-start-4 pr-2">
                                        <label htmlFor="days" className="font-text text-xs flex flex-row justify-between">
                                            <p className="text-unactive">Day:</p>
                                        </label>
                                        <input type="text" name="days"
                                                className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                value={formik.values.days}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={loading}/>
                                    </div>
                                    </>
                                    ) : tab === 2 ? (
                                        <>
                                         {/* Short Description */}
                                        <div className="inline-flex flex-col gap-2 row-start-2 col-span-3 pr-2">
                                            <label htmlFor="description" className="font-text text-xs text-unactive flex flex-row justify-between ">Short Description:</label>
                                            <textarea name="shortDescription" id="shortDescription" className='h-32 font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary resize-none'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.shortDescription}
                                            disabled={loading}></textarea>
                                        </div>
                                        <div className="grid grid-row-2 grid-cols-2 gap-2 col-span-3 ">
                                            <div className="inline-flex flex-col gap-2 row-start-2 col-span-1 pr-2">
                                            <label htmlFor="description" className="font-text text-unactive text-xs flex flex-row justify-between ">Course Objective:</label>
                                            <textarea name="course_objective" id="course_objective" className='h-32 font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary resize-none'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.course_objectives}
                                            disabled={loading}></textarea>
                                            </div>
                                            <div className="inline-flex flex-col gap-2 row-start-2 col-span-1 pr-2">
                                                <label htmlFor="description" className="font-text text-unactive text-xs flex flex-row justify-between ">Course Outcome:</label>
                                                <textarea name="course_outcome" id="course_outcome" className='h-32 font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary resize-none'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.course_outcome}
                                                disabled={loading}></textarea>
                                            </div>
                                        </div>
                                        </>
                                    ) : null
                                }
                                        {/* Submit & cancel*/}
                                        <div className='col-span-3 flex justify-center gap-4 py-1'>
                                            {/* Cancel */}
                                            <button className='bg-white b p-4 outline outline-2 outline-primary outline-offset-[-2px] rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:outline-primaryhover transition-all ease-in-out w-full' onClick={close}>
                                                <p>Cancel</p>
                                            </button>
                                            {/* Submit */}
                                            <input type="submit"
                                                    value="Update Course"
                                                    className="bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full"/>
                                        </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
    )
}
export default EditCourseModal
