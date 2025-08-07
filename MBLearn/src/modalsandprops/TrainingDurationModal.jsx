import { faCalendar, faClock, faSpinner, faUserPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import * as React from "react"
import { useState } from "react";
import { addDays, addMonths, addWeeks, differenceInDays, differenceInMonths, differenceInWeeks, format } from "date-fns"
import { useEffect } from "react";
import { useFormik } from "formik";
import { use } from "react";
import CancelEnrollmentModal from "./CancelEnrollmentModal";

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

const TraningDurationModal = ({ open, close, enroll, date, _setDate, course, enrolling, save}) => {
    const [duration, setDuration] = useState({
        months: course?.months || 0,
        weeks: course?.weeks || 0,
        days: course?.days ||  0,
    })

    const [cancelEnrollment, setCancelEnrollment] = useState(false);

    useEffect(() => {
        if (!course) return
        setDuration ((d) => ({
            months: course?.months,
            weeks: course?.weeks,
            days: course?.days,
        }))
    }, [course])



    const calculateDuration = (fromDate, duration) => {
        let result = fromDate;
        result = addMonths(result, duration.months)
        result = addWeeks(result, duration.weeks)
        result = addDays(result, duration.days)
        return result
    }

    const formik = useFormik({
        initialValues:{
            months: duration.months,
            weeks: duration.weeks,
            days: duration.days
        },
        onSubmit:(values) => {
            console.log(values)
        }
    })

    const handleDateChange = (newDate) => {

        _setDate(newDate);

        if (!newDate?.from || !newDate?.to) {
            setDuration({
                months: 0,
                weeks: 0,
                days: 0,
            });
        } else {

            const { from, to } = newDate;

            const months = differenceInMonths(to, from);
            const weeks = differenceInWeeks(to, addMonths(from, months));
            const days = differenceInDays(to, addMonths(addWeeks(from, weeks), months));

            setDuration({
                months,
                weeks,
                days,
            });

        };
    };

    useEffect(() => {
        if (!open) return;
        setDuration ((d) => ({
            months: course?.months,
            weeks: course?.weeks,
            days: course?.days,
        }))
        _setDate((d) => ({
            from: d?.from,
            to: calculateDuration(d?.from, duration),
        }));
        }, [open, course]);

    useEffect(() => {
        formik.setFieldValue('months', duration.months);
        formik.setFieldValue('weeks', duration.weeks);
        formik.setFieldValue('days', duration.days);
    }, [duration]);


    // useEffect(()=>{
    //     console.log("to",date?.to)
    //     console.log("from",date?.from)
    //     console.log(duration)
    // },[date])

    const [breakpoint, setBreakpoint] = useState(window.innerWidth >= 768);
    useEffect(()=>{
        const resize = () => {
            setBreakpoint(window.innerWidth >= 768);

        }
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    },[])


    return (
        <>
            <Dialog open={open} onClose={close}>
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40" />
                    <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text center'>
                            <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
                                                            w-[100vw]
                                                            md:w-[60vw]'>
                                <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                                    {/* Header */}
                                    <div className="pb-2 mx-4 border-b border-divider flex flex-row justify-between item-center">
                                        <div>
                                            <h1 className="text-primary font-header
                                                    text-base
                                                    md:text-2xl">Training Duration</h1>
                                            <p className="text-unactive font-text
                                                    text-xs
                                                    md:text-sm">Set a customized training period for learners, helping them manage their course timelines effectively.</p>
                                        </div>
                                        <div className="">
                                            <div className="border-2 border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out
                                                            w-5 h-5 text-xs
                                                            md:w-8 md:h-8 md:text-base"
                                                onClick={()=>{
                                                    if(!save){
                                                        setCancelEnrollment(true);
                                                    }
                                                }}>
                                                <FontAwesomeIcon icon={faXmark}/>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course Default Duration */}
                                    <form onSubmit={formik.handleSubmit} className="col-span-2">
                                    <div className="px-4 grid grid-cols-3 grid-rows-[min-content_auto] gap-2 py-2">
                                        <div  className="inline-flex flex-col gap-2 row-start-1 col-span-1">
                                            <p className="font-text text-xs"> Course Duration:</p>
                                        </div>
                                        {/* Months */}
                                        <div className="inline-flex flex-col row-start-2">
                                        <input type="text" name="months"
                                            value={formik.values.months}
                                            onChange={formik.handleChange}
                                            onBlur={(e) => {
                                                formik.handleBlur(e);
                                                normalizationDuration({
                                                    ...formik.values,
                                                    months: e.target.value,
                                                }, formik.setFieldValue);

                                                const updated = parseInt(e.target.value, 10) || 0
                                                setDuration((d) => ({
                                                    ...d,
                                                    months: updated
                                                }))
                                            }}
                                            readOnly
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                            <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                                            <p className="font-text pb-2">Months</p>
                                            </label>
                                            {/* {formik2.touched.months && formik2.errors.months ? (<div className="text-red-500 text-xs font-text">{formik2.errors.months}</div>):null} */}
                                        </div>
                                        {/* Weeks */}
                                        <div className="inline-flex flex-col row-start-2">
                                        <input type="text" name="weeks"
                                            value={formik.values.weeks}
                                            onChange={formik.handleChange}
                                            onBlur={(e) => {
                                                formik.handleBlur(e);
                                                normalizationDuration({
                                                    ...formik.values,
                                                    weeks: e.target.value,
                                                }, formik.setFieldValue);

                                                const updated = parseInt(e.target.value, 10) || 0
                                                setDuration((d) => ({
                                                    ...d,
                                                    weeks: updated
                                                }))
                                            }}
                                            readOnly
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                            <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                                            <p className="font-text pb-2">Weeks</p>
                                            </label>
                                            {/* {formik2.touched.weeks && formik2.errors.weeks ? (<div className="text-red-500 text-xs font-text">{formik2.errors.weeks}</div>):null} */}
                                        </div>
                                        {/* Days */}
                                        <div className="inline-flex flex-col row-start-2">
                                        <input type="text" name="days"
                                            value={formik.values.days}
                                            onChange={formik.handleChange}
                                            onBlur={(e) => {
                                                formik.handleBlur(e);
                                                normalizationDuration({
                                                    ...formik.values,
                                                    days: e.target.value,
                                                }, formik.setFieldValue);

                                                const updated = parseInt(e.target.value, 10) || 0
                                                setDuration((d) => ({
                                                    ...d,
                                                    days: updated
                                                }))
                                            }}
                                            readOnly
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                            <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between pb-2">
                                            <p className="font-text">Days</p>
                                            </label>
                                            {/* {formik2.touched.days && formik2.errors.days ? (<div className="text-red-500 text-xs font-text">{formik2.errors.days}</div>):null} */}
                                        </div>
                                    </div>
                                    </form>

                                    {/* Start Date and End Date */}
                                    <div className="col-span-2 flex flex-row gap-4 w-full px-4">
                                    <div className="flex-col gap-2 flex w-full">
                                        <p className="text-xs font-text">Start Date and End Date</p>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="flex flex-row justify-between items-center font-text border border-divider rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                    <p>{
                                                        date?.from instanceof Date && !isNaN(date?.from) ? (
                                                            date?.to instanceof Date && !isNaN(date?.to) ? (
                                                            <>
                                                                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                                            </>
                                                            ) : (
                                                            format(date.from, "LLL dd, y")
                                                            )
                                                        ) : (
                                                            "Pick a Date"
                                                        )
                                                        }</p>
                                                    <FontAwesomeIcon icon={faCalendar} className="text-primary text-lg"/>
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-fit">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={date?.from}
                                                    selected={date}
                                                    onSelect={handleDateChange}
                                                    disabled={{ before: new Date() }}
                                                    numberOfMonths={breakpoint ? 2 : 1}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    </div>
                                    {/* Save and Cancel */}
                                    <div className="col-span-2 flex flex-row gap-2 px-4 pt-4">
                                        <div className={`p-4 flex items-center justify-center bg-white border-2 border-primary rounded-md font-header uppercase text-primary text-xs transition-all ease-in-out w-full ${enrolling ? "opacity-50 cursor-not-allowed": "hover:bg-primaryhover hover:text-white hover:border-primaryhover"}`}
                                        onClick={()=>{
                                                if (enrolling) return;
                                                if(!save){
                                                        setCancelEnrollment(true);
                                                    }
                                            }}>
                                            <p>Cancel</p>
                                        </div>
                                        <div className={`p-4 flex justify-center items-center bg-primary rounded-md font-header uppercase text-white text-xs transition-all ease-in-out w-full ${enrolling ? "opacity-50 cursor-not-allowed": "hover:cursor-pointer hover:bg-primaryhover"}`}
                                            onClick={()=>{
                                                if (enrolling) return;
                                                enroll()
                                            }
                                            }>

                                            {!enrolling ?
                                                <>
                                                <p>Enroll</p>
                                                </>:<>
                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-white text-lg"/>
                                                <p className="ml-2">Enrolling...</p>
                                                </>}
                                        </div>

                                        </div>

                                    </div>
                            </DialogPanel>
                        </div>
                    </div>
            </Dialog>
            <CancelEnrollmentModal open={cancelEnrollment} close={()=>{setCancelEnrollment(false)}} discardChanges={()=>{close(), setCancelEnrollment(false)}}/>
        </>

    )
}

export default TraningDurationModal
