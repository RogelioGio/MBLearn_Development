import { useFormik } from "formik"
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import { faBook, faBookOpen, faCircleXmark as solidXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as faCircleCheckRegular, faCircleXmark as regularXmark } from "@fortawesome/free-regular-svg-icons";
import { Stepper } from '@mantine/core';
import { useEffect, useState } from 'react';


const AddCourseModal = ({open,onClose}) => {
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (!open) {
            formik.resetForm();
            toggleState("steps", 0)
        }
    }, [open]);

    //formik
    const formik = useFormik({
        //references
        initialValues:{
            courseID: '',
        },
        // validation
        validationSchema: Yup.object({
            courseID: Yup.string()
                .required('Input CourseID first')
                .min(11, 'CourseID must be 11 characters')
        }),
        //submission
        onSubmit: (values, {setFieldError}) => {
            const validCourseID = "12345678abc";


        // Check if input is valid before allowing step progression
        if (formik.isValid && formik.values.courseID.length >= 11) {
                 // Validate course ID
                if (values.courseID === validCourseID) {
                    console.log("Course ID is valid. Proceeding with submission...");
                } else {
                    console.log("Invalid Course ID.");
                    setFieldError("courseID", "Invalid Course ID. Please enter the correct Course ID.");
                }
            toggleState("steps", (current) => current + 1);
        } else {
            formik.setTouched({ courseID: true }); // Show validation error
            return; // Prevent further execution
        }

        }
    })

    //UseState
    const [state, setState] = useState({
        steps: 0,
    })
    const toggleState = (key, value) => {
        setState((prev) => ({
            ...prev,
            [key]: typeof value === "function" ? value(prev[key]) : value, // Support function-based updates
        }));
    };


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
                        <div className='mx-5 py-5'>
                            {/* Form */}
                            <Stepper active={state.steps}
                                    onStepClick={(step) => toggleState("steps", step)}
                                    classNames={{
                                        step: "transition-all duration-300 !py-2",
                                        stepIcon: "!border-primary",
                                        stepCompletedIcon: "!bg-primary !rounded-full !border-primary !border-2",
                                        content: "!pt-0",
                                        separator: "!border-primary border !mx-0"
                                    }}
                                    completedIcon={<FontAwesomeIcon icon={faCircleCheckRegular} className="!text-white"/>}>
                                <Stepper.Step icon={<FontAwesomeIcon icon={faBook} className="!text-primary"/>}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className='grid grid-cols-[auto_min-content] grid-rows-[min-content_auto] gap-x-2 gap-y-2'>
                                            {/* Header */}
                                            <div className='col-span-2 border-b border-divider pb-2'>
                                                <h1 className='text-primary font-header'>Step 1</h1>
                                                <p className='text-unactive font-text'>Please input an valid Course ID to be added in the course catalog of MBLearn</p>
                                            </div>
                                            {/* Input */}
                                            <div className='row-start-2'>
                                            <label htmlFor="name" className="font-header text-xs flex flex-row justify-between pb-2">
                                            <p className="uppercase">Course ID:</p>
                                            </label>
                                            <input type="text" name="courseID"
                                                value={formik.values.courseID}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {/* Validation Errors */}
                                            </div>
                                            {formik.touched.courseID && formik.errors.courseID ? (<div className="text-red-500 text-xs font-text">{formik.errors.courseID}</div>):null}
                                            <div className='row-start-2 flex flex-col justify-end'>
                                            <button
                                                type="submit"
                                                disabled={formik.values.courseID.length < 11}
                                                className={`h-fit border-2 border-primary rounded-md shadow-md text-center bg-primary text-white flex items-center py-2 px-20 font-header transition-all ease-in-out ${
                                                    formik.values.courseID.length < 11
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'hover:scale-105 hover:bg-primaryhover hover:text-white hover:border-primaryhover cursor-pointer'
                                                }`}
                                            >
                                                Confirm
                                            </button>
                                            </div>
                                        </div>
                                    </form>
                                </Stepper.Step>
                                <Stepper.Step  icon={<FontAwesomeIcon icon={faBookOpen} className="!text-primary"/>}>
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

                                </Stepper.Step>
                            </Stepper>
                        </div>
                    </DialogPanel>
                    </div>
                </div>
        </Dialog>
        </>
    )
};
export default AddCourseModal;
