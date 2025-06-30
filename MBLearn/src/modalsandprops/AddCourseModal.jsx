import { useFormik } from "formik"
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import { faBook, faBookBookmark, faBookOpen, faClipboard, faMagnifyingGlass, faSearch, faSpinner, faXmark, faCircleXmark as solidXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as faCircleCheckRegular, faCircleXmark as regularXmark } from "@fortawesome/free-regular-svg-icons";
import { Stepper } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import axiosClient from "../axios-client";
import { useCourseContext } from "../contexts/CourseListProvider";
import Course from "../views/Course";
import CompeLearn from "./Compe-E-Learn.svg"
import { useNavigate } from "react-router-dom";
import compELearnAxios from "../comp-e-learn-axios";
import axios from "axios";
import { toast } from 'sonner';
import { AddCourse, Step, StepperCompleted } from "../components/ui/addCourseStepper";

function normalizationDuration(values, setField) {
    let months = parseInt(values.months) || 0;
    let weeks = parseInt(values.weeks) || 0;
    let days = parseInt(values.days) || 0;

    if (weeks >= 4) {
        const addMonths = Math.floor(weeks / 4);
        months += addMonths;
        weeks = weeks % 4;
    }

    if (days >= 7) {
        const addWeeks = Math.floor(days / 7);
        weeks += addWeeks;
        days = days % 7;
    }

    if (weeks >= 4) {
        const addMonths = Math.floor(weeks / 4);
        months += addMonths;
        weeks = weeks % 4;
    }

    setField('months', months > 0 ? months : '');
    setField('weeks', weeks > 0 ? weeks : '');
    setField('days', days > 0 ? days : '');
}

const AddCourseModal = ({open,onClose,tab,refresh}) => {
    const {coursetypes, coursecategories, traingmodes} = useCourseContext();
    const [adding, setAdding] = useState(false);
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    const [courseLesson, setCourseLesson] = useState([]) //kapit to
    const [fetchedCourse, setFetchedCourse] = useState({})
    const [exist, setExist] = useState(false);
    const stepperRef = useRef(null);
    const [formCompleted, setFormCompleted] = useState([]);
    //Final na toh
    // const fetchedCourse = {
    //     id: 1,
    //     Status: "false",
    //     //CourseID:, {wla pa sila nito}
    //     CourseName: "Course Name",
    //     CourseDescription: "Course Description",
    //     CourseObjective: "Course Description", {wla pa sila nito}
    //     CourseOutcome: "Course Description", {wla pa sila nito}
    //     ImagePath:"",
    //     created_at: "2023-10-01",
    //     updated_at: "2023-10-01",
    //     //CategoryID: 1, {unecessary}
    //     category: {
    //         id: 1,
    //         CategoryName: "Category Name", // this is necessary
    //         created_at: "2023-10-01",
    //         updated_at: "2023-10-01"
    //     },
    //     CourseType: "Course Type", // this is necessary {Wla pa sila nito}
    //     TrainingType: "Training Type", //Mandatory or Unmandatory {Wala pa sila nito}
    //     lessons:[]
    // }

    //Test Case
    const testfetchedCourse = {
        id: 1,
        Status: "false",
        CourseID: 8,
        CourseName: "Course Name",
        CourseDescription: "This course empowers participants with the skills to perform complex financial analyses using Microsoft Excel. Learners will master advanced formulas, pivot tables, data visualization, and financial modeling techniques. Ideal for finance professionals seeking to enhance decision-making and reporting efficiency.",
        CourseObjective: "Course Description",
        CourseOutcome: "Course Description",
        ImagePath:"",
        created_at: "2023-10-01",
        updated_at: "2023-10-01",
        CategoryID: 1,
        category: {
            id: 1,
            CategoryName: "Business Course", // this is necessary
            created_at: "2023-10-01",
            updated_at: "2023-10-01"
        },
        CourseType: "Business Type", // this is necessary {Wla pa sila nito}
        TrainingType: "Unmandatory", //Mandatory or Unmandatory {Wala pa sila nito}
        lessons:[]
    }

    // useEffect(() => {
    //     if (!open) {
    //         formik.resetForm();
    //         formik.resetForm();
    //         formik2.resetForm();
    //         formik3.resetForm();

    //         toggleState("steps", 0)
    //     }
    // }, [open]);

    //formik
    const formik = useFormik({
        //references
        initialValues:{
            courseID: '',
        },
        // validation
        validationSchema: Yup.object({
            courseID: Yup.string()
                .required('Input valid Course ID')
                //.length(11, 'Course ID must be exactly 11 characters')
        }),
        //submission
        onSubmit: (values, {setFieldError}) => {
            setFetching(true)

            //Test Case
            if(parseInt(values.courseID, 10) === testfetchedCourse.CourseID){
                // axiosClient.get(`exists/${values.courseID}`)
                // .then((res) =>
                //     {
                //         //setFetching(false);
                //         setTimeout(()=>{
                //                 setFetching(false)
                //                 toast.success("Course exist in the Comp-Elearn database", {
                //                     description: "You can now proceed to the next step",})
                //                 setExist(true);
                //             },2000)
                //         setFetchedCourse(testfetchedCourse);
                //         //toggleState("steps", (current) => current + 1)
                //     }
                // ).catch((err) => {
                //     setFetching(false);
                //     setFieldError("courseID", "The course is already in the system")

                // })
                setTimeout(()=>{
                                setFetching(false)
                                toast.success("Course exist in the Comp-Elearn database", {
                                    description: "You can now proceed to the next step",})
                                setExist(true);
                            },2000)
                return
            } else {
                setFetching(false)
            }


            // axiosClient.get(`compECourses/${values.courseID}`)
            // .then((response) => {
            //     console.log("Response: ", response.data);
            //     axiosClient.get(`exists/${values.courseID}`)
            //         .then((res) =>
            //             {
            //                 setFetching(false);
            //                 setFetchedCourse(response.data);
            //                 setCourseLesson(response.data.lessons)
            //                 toggleState("steps", (current) => current + 1)
            //             }
            //         ).catch((err) => {
            //             setFetching(false);
            //             setFieldError("courseID", "The course is already in the system")

            //         })
            // })
            // .catch((err) => {
            //     setFetching(false);
            //     setFieldError("courseID", "Invalid Course ID. Please enter the correct Course ID.")
            // })
        }
    })

    const formik2 = useFormik({
        enableReinitialize: true,
        //reference
        initialValues:{
            course_id: formik.values.courseID,
            course_name: fetchedCourse?.CourseName || '',
            course_type: fetchedCourse?.CourseType || '',
            course_category: fetchedCourse?.category?.CategoryName || '',
            training_type: fetchedCourse?.TrainingType || '',
            months:'',
            weeks:'',
            days:'',
        },
        //validation
        validationSchema: Yup.object({
            course_id: Yup.string()
                .required('Input CourseID first'), // Check if course ID is empty
                //.min(11, 'CourseID must be 11 characters'), // Check if course ID is less than 11 characters
            course_name: Yup.string()
                .required('Course name shouldnt be empty') // Check if course name is empty
                .max(50, 'Course name shouldnt exceed 50 characters') // Check if course name exceeds 50 characters
                .matches(/^[A-Za-z ]*$/, 'Only letters and spaces allowed'), // Check if course name exceeds 50 characters
            course_category: Yup.string()
                .required('Course category shouldnt be empty'), // Check if course name is empty
            course_type: Yup.string()
                .required('Course type shouldnt be empty'), // Check if course name is empty
            months: Yup.number()
                .typeError('Invalid Input')
                .positive('Must be a positive number')
                .integer('Must be a whole number'),
            weeks: Yup.number()
                .typeError('Invalid Input')
                .positive('Must be a positive number')
                .integer('Must be a whole number'),
            days: Yup.number()
                .typeError('Invalid Input')
                .positive('Must be a positive number')
                .integer('Must be a whole number'),
        }),
        //on-submit
        onSubmit: (values) => {
            toggleState("steps", (current) => current + 1);
        }
    })

    const formik3 = useFormik({
        enableReinitialize: true,
        initialValues: {
            course_description: fetchedCourse?.CourseDescription || '',
            course_objectives: fetchedCourse?.CourseObjective || '',
            course_outcomes: fetchedCourse?.CourseOutcomes || '',
        },
        validationSchema: Yup.object({
            course_description: Yup.string()
                .required('Course description should not be empty'),
            course_objectives: Yup.string()
                .required('Course objectives should not be empty'),
            course_outcomes: Yup.string()
                .required('Course outcomes should not be empty'),
        }),
        onSubmit: (values) => {
            toggleState("steps", (current) => current + 1);
        },
    });

    const courseFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            course_id: formik.values.courseID,
            course_name: fetchedCourse?.CourseName || '',
            course_type: fetchedCourse?.CourseType || '',
            course_category: fetchedCourse?.category?.CategoryName || '',
            training_type: fetchedCourse?.TrainingType || '',
            months:'',
            weeks:'',
            days:'',
            course_description: fetchedCourse?.CourseDescription || '',
            course_objectives: fetchedCourse?.CourseObjective || '',
            course_outcomes: fetchedCourse?.CourseOutcomes || '',
        },
        validationSchema: Yup.object({
            course_id: Yup.string()
                .required('Input CourseID first'), // Check if course ID is empty
                //.min(11, 'CourseID must be 11 characters'), // Check if course ID is less than 11 characters
            course_name: Yup.string()
                .required('Course name shouldnt be empty') // Check if course name is empty
                .max(50, 'Course name shouldnt exceed 50 characters') // Check if course name exceeds 50 characters
                .matches(/^[A-Za-z ]*$/, 'Only letters and spaces allowed'), // Check if course name exceeds 50 characters
            course_category: Yup.string()
                .required('Course category shouldnt be empty'), // Check if course name is empty
            course_type: Yup.string()
                .required('Course type shouldnt be empty'), // Check if course name is empty
            months: Yup.number()
                .typeError('Invalid Input')
                .positive('Must be a positive number')
                .integer('Must be a whole number'),
            weeks: Yup.number()
                .typeError('Invalid Input')
                .positive('Must be a positive number')
                .integer('Must be a whole number'),
            days: Yup.number()
                .typeError('Invalid Input')
                .positive('Must be a positive number')
                .integer('Must be a whole number'),
            course_description: Yup.string()
                .required('Course description should not be empty'),
            course_objectives: Yup.string()
                .required('Course objectives should not be empty'),
            course_outcomes: Yup.string()
                .required('Course outcomes should not be empty'),
        }),
        onSubmit: (values) => {
            console.log("Final Values: ", values);
            setCourseLesson(fetchedCourse.lessons)
            submitCourse();
        }
    })

    const navigateForm = (direction) => {
        if(!direction) return;

        const currentStepIndex = stepperRef.current?.activeStep;
        const {stepMeta} = stepperRef.current || {};
        const isCompleted = stepperRef.current?.isCompleted;

        if(direction === "next"){
            stepperRef.current?.next();
            const stepId = stepMeta?.[currentStepIndex]?.stepID;
            setFormCompleted((prev)=>{if(!stepId || prev.includes(stepId)) return prev; return [...prev, stepId]});
        }else if(direction === "back"){
            const stepId = stepMeta?.[currentStepIndex]?.stepID;
            if(isCompleted) return;
            if(stepId === formCompleted[0]){
                setTimeout(()=>{
                    setFormCompleted([]);formik.resetForm();
                },500)
                //onClose();
            }
            stepperRef.current?.back()
        }
    }

    //UseState
    const [state, setState] = useState({
        steps: 0,
        trainingType: [],
        courseType: "",
        courseCategory:"",
        isLoading:false
    })
    const toggleState = (key, value) => {
        setState((prev) => ({
            ...prev,
            [key]: typeof value === "function" ? value(prev[key]) : value, // Support function-based updates
        }));
    };

    const payload = {
        name: formik2.values.course_name,
        CourseID: formik.values.courseID,
        description: formik3.values.course_description,
        course_objectives: formik3.values.course_objectives,
        course_outcomes: formik3.values.course_outcomes,
        type_name: formik2.values.course_type,
        category_name: formik2.values.course_category,
        training_type: formik2.values.training_type,
        months: formik2.values.months,
        weeks: formik2.values.weeks,
        days: formik2.values.days,
        archived: "active",
        assignedCourseAdminId:"",
        lessons:courseLesson,
    }

    const submitCourse = () => {
        setAdding(true)
        //console.log("Final Values: ", payload);
        // axiosClient.post("/courses", payload)
        // .then((res) => {
        //     setAdding(false)
        //     console.log(res.data);
        //     refresh();
        //     onClose();
        // })
        // .catch((err) => {
        //     setAdding(false)
        //     console.log(err);
        // })
        setTimeout(()=>{
            setAdding(false)
            navigateForm("next");
        },2000)
    }

    return(
        <>
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-50 backdrop-blur-sm"/>
                <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
                                                        w-[100vw]
                                                        lg:w-[65vw]'>
                        <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                            {/* Header */}
                            <div className="pb-2 mx-4 border-b border-divider flex flex-row justify-between item-center">
                                <div>
                                    <h1 className='text-primary font-header
                                                text-base
                                                md:text-2xl'>Add Course</h1>
                                    <p className="text-unactive font-text
                                                text-xs
                                                md:text-sm">Add your desired course using its course ID and completing its details</p>
                                </div>
                                <div className="">
                                    <div className="border-2 border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out
                                                    w-5 h-5 text-xs
                                                    md:w-8 md:h-8 md:text-base"
                                        onClick={()=>{
                                            setTimeout(()=>{formik.resetForm();setFormCompleted([])},1000)
                                            onClose()
                                        }}>
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </div>
                                </div>
                            </div>
                            {/* Content*/}
                            <div className="mx-4 py-2">
                                {
                                    exist ? (
                                        <form onSubmit={courseFormik.handleSubmit}>
                                            <AddCourse ref={stepperRef} initialStep={0} eneableStepClick={true} formProgress={formCompleted}>
                                                <Step stepTitle="Basic Course Information" stepDesc="Input course basic informations" icon={faBookOpen} stepID={1}>Hello</Step>
                                                <Step stepTitle="Additional Course Details" stepDesc="Input additional course details" icon={faBookBookmark} stepID={2}>Hello</Step>
                                                <Step stepTitle="Review Details" stepDesc="Review the given informations before submitting" icon={faClipboard} stepID={3}>Hello</Step>
                                                <StepperCompleted stepTitle="Course Added" stepDesc="The course has been successfully added to the system" icon={faCircleCheckRegular} stepID={4}>
                                                    <div className="flex flex-col gap-2 items-center pt-4 p-2">
                                                        <div className="w-20 h-20 flex flex-col items-center justify-center bg-primarybg rounded-full">
                                                            <FontAwesomeIcon icon={faCircleCheckRegular} className="text-5xl text-primary"/>
                                                        </div>
                                                        <p className="font-header text-xl text-primary">Course Added!</p>
                                                        <p className="text-center font-text text-sm text-unactive">The course has been successfully added to the system. <br /> You can now view it in the course list.</p>
                                                    </div>
                                                </StepperCompleted>
                                            </AddCourse>
                                        </form>
                                    ) : (
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className='row-start-2 py-2 col-span-2'>
                                            <label htmlFor="courseID" className="font-header text-xs flex flex-row justify-between pb-2">
                                            <p className="font-text">Course ID:</p>
                                            </label>
                                            <input type="text" name="courseID"
                                                value={formik.values.courseID}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                maxLength={11}
                                                className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {/* Validation Errors */}
                                                {formik.touched.courseID && formik.errors.courseID ? (<div className="text-red-500 text-xs font-text pt-1">{formik.errors.courseID}</div>):null}
                                            </div>
                                        </form>
                                    )
                                }
                            </div>
                            {/* Action Buttons */}
                            <div>
                                {
                                    //exist ?
                                    exist ? (
                                        <div className="flex flex-row justify-between items-center gap-2  mx-4 pb-2 font-header">
                                            {
                                                formCompleted.length !== 3 ?
                                                <>
                                                <div className="border-2 border-primary rounded-md py-3 w-full flex flex-row justify-center shadow-md text-primary hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out"
                                                    onClick={()=>{
                                                        navigateForm("back");
                                                    }}>
                                                    Cancel
                                                </div>
                                                <div className={`border-2 border-primary rounded-md py-3 w-full flex flex-row justify-center shadow-md bg-primary text-white  transition-all ease-in-out ${adding ? "opacity-50 hover:cursor-not-allowed" : "hover:cursor-pointer hover:bg-primaryhover hover:border-primaryhover"}`}
                                                    onClick={()=>{
                                                        if(adding) return
                                                        formCompleted.length === 2 ?
                                                        //courseFormik.handleSubmit() :
                                                        submitCourse() :
                                                        navigateForm("next");
                                                    }}>
                                                    {/* {adding ? "":formCompleted.length === 2 ? "Submit" : "Next"} */}
                                                    {adding ?
                                                    <div className="flex-row flex gap-2 items-center">
                                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-white text-lg"/>
                                                        <p>Submitting...</p>
                                                    </div>
                                                    : formCompleted.length === 2 ? "Submit" : "Next"}
                                                </div>
                                                </> :
                                                <div className={`border-2 border-primary rounded-md py-3 w-full flex flex-row justify-center shadow-md bg-primary text-white hover:cursor-pointer hover:bg-primaryhover hover:border-primaryhover transition-all ease-in-out`}
                                                    onClick={()=>{
                                                        setTimeout(()=>{formik.resetForm();setFormCompleted([])},1000)
                                                        onClose()
                                                    }}>
                                                    Confirm
                                                </div>
                                            }
                                        </div>
                                    ) : (
                                        <div className="flex flex-row justify-between items-center gap-2  mx-4 pb-2 font-header">
                                            <div className={`border-2 border-primary rounded-md py-3 w-full flex flex-row justify-center items-center gap-2 shadow-md bg-primary text-white transition-all ease-in-out ${fetching ? "opacity-50 hover:cursor-not-allowed" : "hover:cursor-pointer hover:bg-primaryhover hover:border-primaryhover"}`}
                                                onClick={()=>{if(!fetching) formik.handleSubmit()}}>
                                                {
                                                    fetching ? (
                                                        <>
                                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-white text-lg"/>
                                                            <p>Checking...</p>
                                                        </>
                                                    ) : (
                                                        <p>Check Course</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </DialogPanel>
                    </div>
                </div>
        </Dialog>
        </>
    )
};
export default AddCourseModal;
