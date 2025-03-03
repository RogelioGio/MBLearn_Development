import { useFormik } from "formik"
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import { faBook, faBookOpen, faMagnifyingGlass, faCircleXmark as solidXmark } from "@fortawesome/free-solid-svg-icons";
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

             // Validate course ID
            if (values.courseID === validCourseID) {
                console.log("Course ID is valid. Proceeding with submission...");
            } else {
                console.log("Invalid Course ID.");
                setFieldError("courseID", "Invalid Course ID. Please enter the correct Course ID.");
            }

        // Check if input is valid before allowing step progression
        if (formik.isValid && formik.values.courseID.length >= 11) {

            toggleState("steps", (current) => current + 1);
        } else {
            formik.setTouched({ courseID: true }); // Show validation error
            return; // Prevent further execution
        }

        }
    })

    const formik2 = useFormik({
        enableReinitialize: true,
        //reference
        initialValues:{
            course_id: formik.values.courseID,
            course_name:'',
            course_type:'',
            course_category:'',
            short_desc:'',
        },
        //validation
        validationSchema: Yup.object({
            course_id: Yup.string()
                .required('Input CourseID first') // Check if course ID is empty
                .min(11, 'CourseID must be 11 characters'), // Check if course ID is less than 11 characters
            course_name: Yup.string()
                .required('Course name shouldnt be empty') // Check if course name is empty
                .max(50, 'Course name shouldnt exceed 50 characters') // Check if course name exceeds 50 characters
                .matches(/^[A-Za-z ]*$/, 'Only letters and spaces allowed'), // Check if course name exceeds 50 characters
            course_category: Yup.string()
                .required('Course category shouldnt be empty'), // Check if course name is empty
            course_type: Yup.string()
                .required('Course type shouldnt be empty'), // Check if course name is empty
            short_desc: Yup.string()
                .required('Short description shouldnt be empty') // Check if course name is empty
                .max(500, 'Short description shouldnt exceed 500 characters') // Check if course name exceeds 50 characters
        }),
        //on-submit
        onSubmit: (values) => {
            // console.log("Form submitted successfully!");
            const finalValues = {
                ...values,
                course_id: formik.values.courseID, // Overrides the course_id field
            };


            console.log("Submitted Values:", finalValues);
            console.log("submitted")
            toggleState("steps", (current) => current + 1);
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
                                    <form onSubmit={formik2.handleSubmit}>
                                        <div className="grid grid-cols-[auto] grid-rows-[min-content_auto] gap-x-3 gap-y-2">
                                            {/* Header */}
                                            <div className='col-span-2 border-b border-divider pb-2'>
                                                <h1 className='text-primary font-header'>Step 2</h1>
                                                <p className='text-unactive font-text'>Change neccessary information within the given fields below </p>
                                            </div>
                                            {/* Inputed course ID */}
                                            <div className="col-span-2 flex flex-row items-center justify-between">
                                                <h1 className="py-2 font-header text-primary">Course ID:</h1>
                                                <p className="font-text">{formik.values.courseID}</p>
                                            </div>
                                            {/* Course Name */}
                                            <div className="inline-flex flex-col gap-2 row-start-3 col-span-2">
                                                <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                                                    <p className="uppercase">Course Name:</p>
                                                </label>
                                                <input type="text" name="course_name"
                                                    value={formik2.values.course_name}
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {formik2.touched.course_name && formik2.errors.course_name ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_name}</div>):null}
                                            </div>
                                            {/* Course Type */}
                                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                                <label htmlFor="course_type" className="font-header text-xs flex flex-row justify-between">
                                                    <p className="uppercase">Course Type:</p>
                                                </label>
                                                <input type="text" name="course_type"
                                                    value={formik2.values.course_type}
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {formik2.touched.course_type && formik2.errors.course_type ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_type}</div>):null}
                                            </div>
                                            {/* Course Category */}
                                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                                <label htmlFor="course_category" className="font-header text-xs flex flex-row justify-between">
                                                    <p className="uppercase">Course Category:</p>
                                                </label>
                                                <input type="text" name="course_category"
                                                    value={formik2.values.course_category}
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {formik2.touched.course_category && formik2.errors.course_category ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_category}</div>):null}
                                            </div>
                                            {/* Short Description */}
                                            <div className="inline-flex flex-col gap-2 row-start-5 col-span-2">
                                                <label htmlFor="short_desc" className="font-header text-xs flex flex-row justify-between uppercase">Short Description:</label>
                                                <textarea
                                                    name="short_desc"
                                                    id=""
                                                    value={formik2.values.short_desc}
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    className='h-32 font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary resize-none'></textarea>
                                                    {formik2.touched.short_desc && formik2.errors.short_desc ? (<div className="text-red-500 text-xs font-text">{formik2.errors.short_desc}</div>):null}
                                            </div>
                                            <input type="submit"
                                                value="Add Course"
                                                className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                                `}/>
                                        </div>
                                    </form>
                                </Stepper.Step>
                                <Stepper.Step icon={<FontAwesomeIcon icon={faMagnifyingGlass} className="!text-primary"/>}>
                                <div className="grid grid-cols-2 grid-rows-[min-content_auto] gap-x-3 gap-y-2">
                                    {/* Header */}
                                    <div className='col-span-2 border-b border-divider pb-2'>
                                        <h1 className='text-primary font-header'>Step 3</h1>
                                        <p className='text-unactive font-text'>Review the course information and details</p>
                                    </div>
                                    <div className="col-span-2 flex flex-row items-center justify-between">
                                        <h1 className="py-2 font-header text-primary">Course ID:</h1>
                                        <p className="font-text">{formik.values.courseID}</p>
                                    </div>
                                    {/* Course Name */}
                                    <div className="inline-flex flex-col gap-2 row-start-3 col-span-2">
                                        <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                                            <p className="uppercase">Course Name:</p>
                                        </label>
                                        <p className="font-text">{formik2.values.course_name}</p>
                                    </div>
                                    {/* Course Type */}
                                    <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                        <label htmlFor="course_type" className="font-header text-xs flex flex-row justify-between">
                                            <p className="uppercase">Course Type:</p>
                                        </label>
                                        <p className="font-text">{formik2.values.course_type}</p>
                                    </div>
                                    {/* Course Category */}
                                    <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                        <label htmlFor="course_category" className="font-header text-xs flex flex-row justify-between">
                                            <p className="uppercase">Course Category:</p>
                                        </label>
                                        <p className="font-text">{formik2.values.course_category}</p>
                                    </div>
                                    {/* Short Description */}
                                    <div className="inline-flex flex-col gap-2 row-start-5 col-span-2">
                                        <label htmlFor="short_desc" className="font-header text-xs flex flex-row justify-between uppercase">Short Description:</label>
                                        <p className="font-text w-full whitespace-pre-wrap">{formik2.values.short_desc}</p>
                                    </div>
                                    <button
                                        onClick={()=>toggleState("steps", (current) => current + 1)}
                                        className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                        `}>
                                        Confirm</button>
                                </div>
                                </Stepper.Step>
                                <Stepper.Completed>
                                            <div className="flex flex-col gap-1 py-2 border-b border-b-divider text-center">
                                                    <span className="font-header uppercase text-primary">You're All Set!</span>
                                                    <span className="font-text text-xs text-unactive">Complete the form and click submit to successfully add the user to the system.</span>
                                                    <button
                                                    onClick={onClose}
                                                    className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full`}>
                                        Confirm</button>
                                                </div>
                                            </Stepper.Completed>
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
