import { faCircleXmark as regularXmark } from "@fortawesome/free-regular-svg-icons"
import { faCircleXmark as solidXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useState } from "react"

const EditCourseModal = ({open, close}) => {
    const [hover, setHover] = useState(false);
    return(
        <Dialog open={open} onClose={close} className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative w-[50rem] overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                            <div className="bg-white rounded-md shadow-md p-5">
                                {/* Header */}
                                <div className="mx-5 py-5 border-b border-divider gap-y-4 grid grid-cols-[auto_min-content]">
                                    <div className="col-start-1">
                                        <h1 className="font-header text-primary text-3xl">Edit Course Detail</h1>
                                        <p>Modify course details to keep content accurate, updated, and engaging."</p>
                                    </div>
                                    {/* Close Button */}
                                    <div className='flex justify-end text-2xl col-start-2'>
                                        <FontAwesomeIcon icon={hover ? solidXmark:regularXmark} className='text-primary transition-all ease-in-out transform hover:scale-110 cursor-pointer' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={close}/>
                                    </div>
                                </div>
                                {/* Update Form */}
                                <form onSubmit={(e)=>e.preventDefault()} className='grid grid-cols-2 grid-rows-[auto] mx-5 py-5 gap-y-4'>
                                {/* Course Name */}
                                <div className="inline-flex flex-col gap-2 row-start-1 col-span-2 pr-2">
                                    <label htmlFor="name" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Course Name:</p>
                                    </label>
                                    <input type="text" name="name"
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary" disabled/>
                                </div>
                                {/* Course Type */}
                                <div className="inline-flex flex-col gap-2 row-start-2 col-span-1 pr-2">
                                    <label htmlFor="name" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Course Type:</p>
                                    </label>
                                    <input type="text" name="name"
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary" disabled/>
                                </div>
                                {/* Course Category */}
                                <div className="inline-flex flex-col gap-2 row-start-2 col-span-1 pr-2">
                                    <label htmlFor="name" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Course Category:</p>
                                    </label>
                                    <input type="text" name="name"
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary" disabled/>
                                </div>
                                {/* Short Description */}
                                <div className="inline-flex flex-col gap-2 row-start-3 col-span-2 pr-2">
                                    <label htmlFor="desc" className="font-header text-xs flex flex-row justify-between uppercase">Short Description:</label>
                                    <textarea name="shortDescription" id="" className='h-32 font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary resize-none' disabled></textarea>
                                </div>
                                {/* Submit & cancel*/}
                                <div className='row-start-4 col-span-3 flex justify-center gap-4 py-1'>
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
