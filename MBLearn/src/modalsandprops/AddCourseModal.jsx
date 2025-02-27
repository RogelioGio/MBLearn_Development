import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import { faCircleXmark as solidXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark as regularXmark } from "@fortawesome/free-regular-svg-icons";
import { useState } from 'react';

const AddCourseModal = ({open,onClose}) => {
    const [hover, setHover] = useState(false);

    return(
        <>
        <Dialog open={open} onClose={onClose}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                    <DialogPanel transition className='w-[50rem] p-5 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>

                        <div className='grid grid-cols-[auto_auto_min-content] grid-rows-[min-content] mx-5 py-5 border-b border-divider gap-y-4'>
                            {/* Header */}
                            <div className='col-span-2'>
                                <h1 className='text-primary font-header text-3xl'>Add Course</h1>
                                <p className='text-unactive font-text text-md'>Please input the designated Course ID that will be added in the system</p>
                            </div>
                            {/* Close Button */}
                            <div className='flex justify-end text-2xl'>
                                <FontAwesomeIcon icon={hover ? solidXmark:regularXmark} className='text-primary transition-all ease-in-out transform hover:scale-110 cursor-pointer' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClose}/>
                            </div>
                        </div>
                            {/* Form */}
                            <form onSubmit={(e)=>e.preventDefault()} className='grid grid-cols-2 grid-rows-[auto] mx-5 py-5 gap-y-4'>
                                {/* Course ID */}
                                <div className='col-span-1 col-start-1 row-start-1  pb-5 border-b border-divider flex flex-col justify-center'>
                                    <h1 className='text-primary font-header'>Step 1:</h1>
                                    <p className='text-unactive font-text'>Please input an Course ID </p>
                                </div>
                                <div className="inline-flex flex-col justify-center gap-2 row-start-1 pb-5 col-span-1 border-b border-divider">
                                    <label htmlFor="name" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Course ID:</p>
                                        {/* Validation */}
                                        {/* Must Be Seperated */}
                                    </label>
                                    <input type="text" name="name"
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                {/* Section 2 */}
                                <div className='col-span-2 col-start-1 row-start-2 '>
                                    <h1 className='text-primary font-header'>Step 2:</h1>
                                    <p className='text-unactive font-text'>Change neccessary information within the given fields below </p>
                                </div>
                                {/* Course Name */}
                                <div className="inline-flex flex-col gap-2 row-start-3 col-span-2 pr-2">
                                    <label htmlFor="name" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Course Name:</p>
                                    </label>
                                    <input type="text" name="name"
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary" disabled/>
                                </div>
                                {/* Course Type */}
                                <div className="inline-flex flex-col gap-2 row-start-4 col-span-1 pr-2">
                                    <label htmlFor="name" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Course Type:</p>
                                    </label>
                                    <input type="text" name="name"
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary" disabled/>
                                </div>
                                {/* Course Category */}
                                <div className="inline-flex flex-col gap-2 row-start-4 col-span-1 pr-2">
                                    <label htmlFor="name" className="font-header text-xs flex flex-row justify-between">
                                        <p className="uppercase">Course Category:</p>
                                    </label>
                                    <input type="text" name="name"
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary" disabled/>
                                </div>
                                {/* Short Description */}
                                <div className="inline-flex flex-col gap-2 row-start-5 col-span-2 pr-2">
                                    <label htmlFor="desc" className="font-header text-xs flex flex-row justify-between uppercase">Short Description:</label>
                                    <textarea name="shortDescription" id="" className='h-32 font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary resize-none' disabled></textarea>
                                </div>
                                {/* Submit & cancel*/}
                                <div className='col-span-3 flex justify-center gap-4 py-1'>
                                    {/* Cancel */}
                                    <button className='bg-white b p-4 outline outline-2 outline-primary outline-offset-[-2px] rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:outline-primaryhover transition-all ease-in-out w-full' onClick={onClose}>
                                        <p>Cancel</p>
                                    </button>
                                    {/* Submit */}
                                    <input type="submit"
                                            value="Add Course"
                                            className="bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full"/>
                                </div>
                            </form>
                    </DialogPanel>
                    </div>
                </div>
        </Dialog>
        </>
    )
};
export default AddCourseModal;
