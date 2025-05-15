import { useFormik } from "formik"
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import { faBook, faBookBookmark, faBookOpen, faMagnifyingGlass, faSearch, faCircleXmark as solidXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as faCircleCheckRegular, faCircleXmark as regularXmark } from "@fortawesome/free-regular-svg-icons";
import { Stepper } from '@mantine/core';
import { useEffect, useState } from 'react';
import axiosClient from "../axios-client";
import { useCourseContext } from "../contexts/CourseListProvider";
import Course from "../views/Course";
import CompeLearn from "./Compe-E-Learn.svg"
import { useNavigate } from "react-router-dom";
import compELearnAxios from "../comp-e-learn-axios";
import axios from "axios";

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
    const [hover, setHover] = useState(false);
    const [adding, setAdding] = useState(false);
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    const [courseLesson, setCourseLesson] = useState([]) //kapit to
    const [fetchedCourse, setFetchedCourse] = useState({})

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

    useEffect(() => {
        if (!open) {
            formik.resetForm();
            formik.resetForm();
            formik2.resetForm();
            formik3.resetForm();

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
                //.length(11, 'Course ID must be exactly 11 characters')
        }),
        //submission
        onSubmit: (values, {setFieldError}) => {
            setFetching(true)

            //Test Case
            // if(parseInt(values.courseID, 10) === testfetchedCourse.CourseID){
            //     axiosClient.get(`exists/${values.courseID}`)
            //     .then((res) =>
            //         {
            //             setFetching(false);
            //             setFetchedCourse(testfetchedCourse);
            //             toggleState("steps", (current) => current + 1)
            //         }
            //     ).catch((err) => {
            //         setFetching(false);
            //         setFieldError("courseID", "The course is already in the system")

            //     })
            //     return
            // } else {
            //     setFetching(false)
            // }


            compELearnAxios.get(`courses/${values.courseID}`)
            .then((response) => {
                console.log("Response: ", response.data);
                axiosClient.get(`exists/${values.courseID}`)
                    .then((res) =>
                        {
                            setFetching(false);
                            setFetchedCourse(response.data);
                            setCourseLesson(response.data.lessons)
                            toggleState("steps", (current) => current + 1)
                        }
                    ).catch((err) => {
                        setFetching(false);
                        setFieldError("courseID", "The course is already in the system")

                    })
            })
            .catch((err) => {
                setFetching(false);
                setFieldError("courseID", "Invalid Course ID. Please enter the correct Course ID.")
            })
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
        console.log("Final Values: ", payload);
        axiosClient.post("/courses", payload)
        .then((res) => {
            setAdding(false)
            console.log(res.data);
            refresh();
            onClose();
        })
        .catch((err) => {
            setAdding(false)
            console.log(err);
        })
    }

    return(
        <>
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-50 backdrop-blur-sm"/>
                <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                    <DialogPanel transition className='w-[75vw] p-5 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>

                        <div className='grid grid-cols-[1fr_1fr_1fr] grid-rows-[min-content] mx-5 py-5 border-b border-divider gap-y-4'>
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
                                    classNames={{
                                        step: "transition-all duration-300 !py-2",
                                        stepIcon: "!border-primary",
                                        stepCompletedIcon: "!bg-primary !rounded-full !border-primary !border-2",
                                        content: "!pt-0",
                                        separator: "!border-primary border !mx-0"
                                    }}
                                    completedIcon={<FontAwesomeIcon icon={faCircleCheckRegular} className="!text-white"/>}>
                                <Stepper.Step icon={<FontAwesomeIcon icon={faSearch} className="!text-primary"/>}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className='grid grid-cols-[1fr_min-content_1fr] grid-rows-[min-content_min-content_auto] gap-x-2 gap-y-2'>
                                            {/* Header */}
                                            <div className='col-span-3 border-b border-divider pb-2'>
                                                <h1 className='text-primary font-header'>Step 1</h1>
                                                <p className='text-unactive font-text'>Please input an valid Course ID to be added in the course catalog of MBLearn or Create an Course from Comp-E-Learn</p>
                                            </div>
                                            {/* Input */}
                                            <div className='row-start-2 py-2'>
                                            <label htmlFor="name" className="font-header text-xs flex flex-row justify-between pb-2">
                                            <p className="font-text">Course ID:</p>
                                            </label>
                                            <input type="text" name="courseID"
                                                value={formik.values.courseID}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                maxLength={11}
                                                className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {/* Validation Errors */}
                                                {formik.touched.courseID && formik.errors.courseID ? (<div className="text-red-500 text-xs font-text">{formik.errors.courseID}</div>):null}
                                            </div>
                                            <div className='row-start-3 w-full flex'>
                                            <button
                                                type="submit"
                                                className={`h-fit border-2 w-full border-primary rounded-md shadow-md bg-primary text-white justify-center flex items-center py-2 px-20 font-header transition-all ease-in-out focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary`}
                                            >
                                                <p>{fetching ? "Checking..." : "Check Avaliable Course"}</p>
                                            </button>
                                            </div>
                                            <div className="grid grid-rows-[1fr_min-content_1fr] mx-2 col-start-2 row-start-2 row-span-2 items-center place-items-center">
                                                <div className="h-full w-[1px] bg-divider"/>
                                                <p className="font-text text-unactive">or</p>
                                                <div className="h-full w-[1px] bg-divider"/>
                                            </div>
                                            <div className="col-start-3 row-start-2 flex flex-row items-center justify-center">
                                                <div className="py-2 flex flex-row items-center justify-center gap-2">
                                                    <img src={CompeLearn} alt="" className="w-12"/>
                                                    <div>
                                                        <p className="font-text text-primary text-2xl"><span className="font-header">Comp-E-Learn</span> Extension</p>
                                                        <p className="font-text text-unactive text-xs">Create an course using Comp-E-Learn Extension </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`row-start-3 h-fit border-2 w-full border-primary rounded-md shadow-md bg-primary text-white justify-center flex items-center py-2 px-20 font-header transition-all ease-in-out focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary hover:cursor-pointer hover:bg-primaryhover`}
                                                onClick={()=>navigate("/comp_e_learn")}
                                            >
                                                <p>Create a Course</p>
                                            </div>
                                        </div>
                                    </form>
                                </Stepper.Step>
                                <Stepper.Step  icon={<FontAwesomeIcon icon={faBookOpen} className="!text-primary"/>}>
                                <form onSubmit={formik2.handleSubmit}>
                                        <div className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[min-content_auto] gap-x-3 gap-y-2">
                                            {/* Header */}
                                            <div className='col-span-3 border-b border-divider pb-2'>
                                                <h1 className='text-primary font-header'>Step 2</h1>
                                                <p className='text-unactive font-text'>Change neccessary information within the given fields below </p>
                                            </div>
                                            {/* Inputed course ID */}
                                            <div className="col-span-3 flex flex-row items-center justify-between">
                                                <h1 className="py-2 font-header text-primary">Course ID:</h1>
                                                <p className="font-text">{formik.values.courseID}</p>
                                            </div>
                                            {/* Course Name */}
                                            <div className="inline-flex flex-col gap-2 row-start-3 col-span-3">
                                                <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                                                    <p className="font-text text-unactive">Course Name:</p>
                                                </label>
                                                <input type="text" name="course_name"
                                                    value={formik2.values.course_name}
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    disabled = {fetchedCourse?.CourseName}
                                                    className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {formik2.touched.course_name && formik2.errors.course_name ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_name}</div>):null}
                                            </div>
                                            {/* Course Category */}
                                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                                <label htmlFor="course_category" className="font-header text-xs flex flex-row justify-between">
                                                    <p className="font-text text-unactive">Course Category:</p>
                                                </label>
                                                <div class="grid grid-cols-1">
                                                    <select id="course_category" name="course_category" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                        value={formik2.values.course_category}
                                                        onChange={formik2.handleChange}
                                                        onBlur={formik2.handleBlur}
                                                        disabled = {fetchedCourse?.category?.CategoryName}
                                                    >
                                                    <option value={fetchedCourse?.category?.CategoryName || ""}>{fetchedCourse?.category?.CategoryName || "Select an option"}</option>
                                                    {coursecategories.map((category) => (
                                                        <option key={category.id} value={category.category_name}>{category.category_name}</option>
                                                    ))}
                                                    </select>
                                                    <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                                {formik2.touched.course_category && formik2.errors.course_category ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_category}</div>):null}
                                            </div>
                                            {/* Course Type */}
                                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                                <label htmlFor="course_type" className="font-header text-xs flex flex-row justify-between">
                                                    <p className="font-text text-unactive">Course Type:</p>
                                                </label>
                                                <div class="grid grid-cols-1">
                                                    <select id="course_type" name="course_type" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                        value={formik2.values.course_type}
                                                        onChange={formik2.handleChange}
                                                        onBlur={formik2.handleBlur}
                                                        disabled = {fetchedCourse?.CourseType}
                                                    >
                                                    <option value={fetchedCourse?.CourseType||""}>{fetchedCourse?.CourseType || "Select an Option"}</option>
                                                    {coursetypes.map((type) => (
                                                        <option key={type.id} value={type.type_name}>{type.type_name}</option>
                                                    ))}
                                                    </select>
                                                    <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                                    {formik2.touched.course_type && formik2.errors.course_type ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_type}</div>):null}
                                            </div>
                                            {/* Training Type */}
                                            <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                                <label htmlFor="course_type" className="font-header text-xs flex flex-row justify-between">
                                                    <p className="font-text text-unactive">Training Type:</p>
                                                </label>
                                                <div class="grid grid-cols-1">
                                                    <select id="training_type" name="training_type" class="col-start-1 row-start-1 w-full appearance-none rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary font-text border border-divider"
                                                        value={formik2.values.training_type}
                                                        onChange={formik2.handleChange}
                                                        onBlur={formik2.handleBlur}
                                                        disabled = {fetchedCourse?.TrainingType}
                                                    >
                                                    <option value={fetchedCourse.TrainingType||""}>{fetchedCourse?.TrainingType|| "Select Option"}</option>
                                                    <option value="Mandatory">Mandatory</option>
                                                    <option value="Unmandatory">Non-mandatory</option>

                                                </select>
                                                <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                                {formik2.touched.course_type && formik2.errors.course_type ? (<div className="text-red-500 text-xs font-text">{formik2.errors.course_type}</div>):null}
                                        </div>
                                        {/* Course Duration */}
                                        <div className="col-span-3 text-xs row-start-5">
                                            <p className="font-text text-unactive">Default Course Duration:</p>
                                        </div>
                                            {/* Months */}
                                            <div className="inline-flex flex-col row-start-6">
                                            <input type="text" name="months"
                                                value={formik2.values.months}
                                                onChange={formik2.handleChange}
                                                onBlur={(e) => {
                                                    formik2.handleBlur(e);
                                                    normalizationDuration({
                                                        ...formik2.values,
                                                        months: e.target.value,
                                                    }, formik2.setFieldValue);
                                                }}
                                                className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                                                <p className="font-text text-unactive pb-2">Months</p>
                                                </label>
                                                {formik2.touched.months && formik2.errors.months ? (<div className="text-red-500 text-xs font-text">{formik2.errors.months}</div>):null}
                                            </div>
                                            {/* Weeks */}
                                            <div className="inline-flex flex-col row-start-6">
                                            <input type="text" name="weeks"
                                                value={formik2.values.weeks}
                                                onChange={formik2.handleChange}
                                                onBlur={(e) => {
                                                    formik2.handleBlur(e);
                                                    normalizationDuration({
                                                        ...formik2.values,
                                                        weeks: e.target.value,
                                                    }, formik2.setFieldValue);
                                                }}
                                                className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                                                <p className="font-text text-unactive pb-2">Weeks</p>
                                                </label>
                                                {formik2.touched.weeks && formik2.errors.weeks ? (<div className="text-red-500 text-xs font-text">{formik2.errors.weeks}</div>):null}
                                            </div>
                                            {/* Days */}
                                            <div className="inline-flex flex-col row-start-6">
                                            <input type="text" name="days"
                                                value={formik2.values.days}
                                                onChange={formik2.handleChange}
                                                onBlur={(e) => {
                                                    formik2.handleBlur(e);
                                                    normalizationDuration({
                                                        ...formik2.values,
                                                        days: e.target.value,
                                                    }, formik2.setFieldValue);
                                                }}
                                                className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between pb-2">
                                                <p className="font-text text-unactive">Days</p>
                                                </label>
                                                {formik2.touched.days && formik2.errors.days ? (<div className="text-red-500 text-xs font-text">{formik2.errors.days}</div>):null}
                                            </div>
                                            <div className="col-span-3 flex flex-row gap-2">
                                                <button
                                                onClick={()=>toggleState("steps", (current) => current - 1)}
                                                className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full
                                                `}>
                                                Back</button>
                                                <input type="submit"
                                                    value="Continue"
                                                    onClick={console.log(formik2.values)}
                                                    className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                                    `}/>
                                                </div>
                                        </div>
                                </form>
                                </Stepper.Step>
                                <Stepper.Step icon={<FontAwesomeIcon icon={faBookBookmark} className="!text-primary"/>}>
                                    <form onSubmit={formik3.handleSubmit}>
                                        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[min-content_auto] gap-x-3 gap-y-2">
                                            {/* Header */}
                                            <div className='col-span-4 border-b border-divider pb-2'>
                                                <h1 className='text-primary font-header'>Step 3</h1>
                                                <p className='text-unactive font-text'>Please complete the following field for additional information about the course</p>
                                            </div>
                                            {/* Short Description */}
                                            <div className="inline-flex flex-col gap-2 row-start-2 col-span-4">
                                                <label htmlFor="course_description" className="font-text text-unactive text-xs flex flex-row justify-between">Short Description:</label>
                                                <textarea
                                                    name="course_description"
                                                    id="course_description"
                                                    value={formik3.values.course_description}
                                                    onChange={formik3.handleChange}
                                                    onBlur={formik3.handleBlur}
                                                    disabled = {fetchedCourse?.CourseDescription}
                                                    className='h-32 font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary resize-none'></textarea>
                                                    {formik3.touched.course_description && formik3.errors.course_description ? (<div className="text-red-500 text-xs font-text">{formik3.errors.course_description}</div>):null}
                                            </div>
                                            <div className="inline-flex flex-col gap-2 row-start-3 col-span-2">
                                                <label htmlFor="course_objectives" className="font-text text-unactive text-xs flex flex-row justify-between">Course Objective:</label>
                                                <textarea
                                                    name="course_objectives"
                                                    id="course_objectives"
                                                    value={formik3.values.course_objectives}
                                                    onChange={formik3.handleChange}
                                                    onBlur={formik3.handleBlur}
                                                    disabled = {fetchedCourse?.CourseObjective}
                                                    className='h-32 font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary resize-none'></textarea>
                                                    {formik3.touched.course_objectives && formik3.errors.course_objectives ? (<div className="text-red-500 text-xs font-text">{formik3.errors.course_objectives}</div>):null}
                                            </div>
                                            <div className="inline-flex flex-col gap-2 row-start-3 col-span-2">
                                                <label htmlFor="course_outcomes" className="font-text text-unactive text-xs flex flex-row justify-between">Course Outcome:</label>
                                                <textarea
                                                    name="course_outcomes"
                                                    id="course_outcomes"
                                                    value={formik3.values.course_outcomes}
                                                    onChange={formik3.handleChange}
                                                    onBlur={formik3.handleBlur}
                                                    disabled = {fetchedCourse?.CourseOutcome}
                                                    className='h-32 font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary resize-none'></textarea>
                                                    {formik3.touched.course_outcomes && formik3.errors.course_outcomes ? (<div className="text-red-500 text-xs font-text">{formik3.errors.course_outcomes}</div>):null}
                                            </div>
                                            <div className="row-start-4 col-span-4 flex flex-row gap-2">
                                                <button
                                                onClick={()=>toggleState("steps", (current) => current - 1)}
                                                className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full
                                                `}>
                                                Back</button>
                                                <input type="submit"
                                                    value="Continue"
                                                    className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                                    `}/>
                                            </div>
                                        </div>

                                    </form>
                                </Stepper.Step>
                                <Stepper.Step icon={<FontAwesomeIcon icon={faBook} className="!text-primary"/>}>
                                <div className="grid grid-cols-3 grid-rows-[min-content_auto] gap-x-3 gap-y-2">
                                    {/* Header */}
                                    <div className='col-span-3 border-b border-divider pb-2'>
                                        <h1 className='text-primary font-header'>Step 4</h1>
                                        <p className='text-unactive font-text'>Review the course information and details</p>
                                    </div>

                                    {
                                            state.isLoading ? (
                                                <p>Loading....</p>
                                            ):(
                                                <>
                                                    <div className=" col-start-1 col-span-3 flex flex-row items-center justify-between">
                                                        <h1 className="py-2 font-header text-primary">Course ID: {formik.values.courseID}</h1>
                                                    </div>
                                                    {/* Course Name */}
                                                    <div className="inline-flex flex-col gap-1 row-start-3 col-span-3 col-start-1">
                                                        <label htmlFor="course_name" className="font-text text-xs flex flex-row justify-between text-unactive">
                                                            <p>Course Name:</p>
                                                        </label>
                                                        <p className="font-text">{formik2.values.course_name}</p>
                                                    </div>
                                                    {/* Course Type */}
                                                    <div className="inline-flex flex-col gap-1 row-start-4 col-span-1">
                                                        <label htmlFor="course_type" className="font-text text-xs flex flex-row justify-between text-unactive">
                                                            <p>Course Type:</p>
                                                        </label>
                                                        <p className="font-text">{formik2.values.course_type || "Not selected"}</p>
                                                    </div>
                                                    {/* Course Category */}
                                                    <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                                        <label htmlFor="course_category" className="font-text text-unactive text-xs flex flex-row justify-between ">
                                                            <p>Course Category:</p>
                                                        </label>
                                                        <p className="font-text">{formik2.values.course_category || "Not selected"}</p>
                                                    </div>
                                                    {/* Training Type */}
                                                    <div className="inline-flex flex-col gap-2 row-start-4 col-span-1">
                                                        <label htmlFor="course_category" className="font-text text-unactive text-xs flex flex-row justify-between">
                                                            <p>Training Type:</p>
                                                        </label>
                                                        <p className="font-text">{formik2.values.training_type || "Not selected"}</p>
                                                    </div>
                                                    {/* Duration */}
                                                    <div  className="inline-flex flex-col gap-2 row-start-5 col-span-1">
                                                        <p className="font-text text-unactive text-xs">Duration:</p>
                                                    </div>
                                                    {/* Month*/}
                                                    <div className="inline-flex flex-col row-start-6 col-span-1">
                                                        <p className="font-text">{formik2.values.months || "0"} Month/s</p>
                                                        <label htmlFor="course_category" className="font-text text-unactive text-xs flex flex-row justify-between">
                                                            <p>Month</p>
                                                        </label>
                                                    </div>
                                                    {/* Month*/}
                                                    <div className="inline-flex flex-col row-start-6 col-span-1">
                                                        <p className="font-text">{formik2.values.weeks || "0"} Week/s</p>
                                                        <label htmlFor="course_category" className="font-text text-unactive text-xs flex flex-row justify-between">
                                                            <p>Week</p>
                                                        </label>
                                                    </div>
                                                    {/* Month*/}
                                                    <div className="inline-flex flex-col row-start-6 col-span-1">
                                                        <p className="font-text">{formik2.values.days || "0"} Day/s</p>
                                                        <label htmlFor="course_category" className="font-text text-unactive text-xs flex flex-row justify-between">
                                                            <p>Day</p>
                                                        </label>
                                                    </div>
                                                    {/* Short Description */}
                                                    <div className="inline-flex flex-col gap-2 row-start-7 col-span-3">
                                                        <label htmlFor="short_desc" className="font-text text-unactive text-xs flex flex-row justify-between">Short Description:</label>
                                                        <p className="font-text w-full whitespace-pre-wrap">{formik3.values.course_description || "No Course Description"}</p>
                                                    </div>

                                                    {/* Course Objective & Course Outcome */}
                                                    <div className="grid grid-cols-2 gap-2 row-start-8 col-span-3">
                                                        {/* Short Objectives */}
                                                        <div className="inline-flex flex-col gap-2">
                                                            <label htmlFor="short_desc" className="font-text text-unactive text-xs flex flex-row justify-between">Short Description:</label>
                                                            <p className="font-text w-full whitespace-pre-wrap">{formik3.values.course_objectives || "No Course Objectives"}</p>
                                                        </div>
                                                        {/* Short Outcome */}
                                                        <div className="inline-flex flex-col gap-2">
                                                            <label htmlFor="short_desc" className="font-text text-unactive text-xs flex flex-row justify-between">Short Description:</label>
                                                            <p className="font-text w-full whitespace-pre-wrap">{formik3.values.course_outcomes || "No Course Outcomes"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-3 flex flex-row gap-2 pt-3 row-start-9">
                                                    <button
                                                        onClick={()=>toggleState("steps", (current) => current - 1)}
                                                        className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full
                                                        `}>
                                                        Back</button>
                                                    <button
                                                        onClick={()=>submitCourse()}
                                                        className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                                        `}>
                                                        {adding ? "Adding course..." : "Add Course"}</button>
                                                    </div>
                                                </>
                                            )
                                        }


                                </div>
                                </Stepper.Step>
                                <Stepper.Completed>
                                            <div className="flex flex-col gap-4 py-2 text-center">
                                                <div className="flex flex-col">
                                                    <span className="font-header uppercase text-primary">You're All Set!</span>
                                                    <span className="font-text text-xs text-unactive">Complete the form and click sconfirm to successfully add the course to the system.</span>
                                                </div>
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
