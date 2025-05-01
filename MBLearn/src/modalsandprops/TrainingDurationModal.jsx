import { faCalendar, faClock, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import * as React from "react"
import { useState } from "react";
import { addDays, addMonths, addWeeks, differenceInDays, differenceInMonths, differenceInWeeks, format } from "date-fns"
import { useEffect } from "react";
import { useFormik } from "formik";

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

const TraningDurationModal = ({ open, close, enroll, date, _setDate, course}) => {
    const [duration, setDuration] = useState({
        months: course.months !== null ? course.months : 0,
        weeks: course.weeks !== null ? course.weeks : 0,
        days: course.days !== null ? course.days : 0,
    })



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
        _setDate((d) => ({
            from: d?.from,
            to: calculateDuration(d?.from, duration),
        }));
        setDuration ((d) => ({
            months: course.months !== null ? course.months : 0,
            weeks: course.weeks !== null ? course.weeks : 0,
            days: course.days !== null ? course.days : 0,
        }))
        }, [open]);

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


    return (
        <Dialog open={open} onClose={close}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40" />
                <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40'>
                            <div className='bg-white rounded-md h-full p-5 grid grid-row-5 grid-cols-2 w-[50vw]'>
                                {/* Header */}
                                <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row gap-4 col-span-2">
                                    <div>
                                        <h1 className="text-primary font-header text-3xl">Training Duration</h1>
                                        <p className="text-unactive font-text text-xs">Set a customized training period for learners, helping them manage their course timelines effectively.</p>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="h-fit bg-primarybg p-5 rounded-full flex items-center justify-center">
                                            <div className="h-full w-fit aspect-square flex items-center justify-center">
                                                <FontAwesomeIcon icon={faClock} className="text-primary text-lg"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Course Default Duration */}
                                <form onSubmit={formik.handleSubmit} className="col-span-2">
                                <div className="px-4 grid grid-cols-3 grid-rows-[min-content_auto] gap-2 py-2">
                                    <div  className="inline-flex flex-col gap-2 row-start-1 col-span-1">
                                        <p className="font-text text-unactive text-xs"> Course Duration:</p>
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
                                        <p className="font-text text-unactive pb-2">Months</p>
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
                                        <p className="font-text text-unactive pb-2">Weeks</p>
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
                                        <p className="font-text text-unactive">Days</p>
                                        </label>
                                        {/* {formik2.touched.days && formik2.errors.days ? (<div className="text-red-500 text-xs font-text">{formik2.errors.days}</div>):null} */}
                                    </div>
                                </div>
                                </form>
                                {/* Start Date and End Date */}
                                <div className="col-span-2 flex flex-row gap-4 w-full px-4">
                                <div className="flex-col gap-2 flex w-full">
                                    <p className="text-xs font-text text-unactive">Start Date and End Date</p>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="flex flex-row justify-between items-center font-text border border-divider rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                <p>{
                                                    date?.from ? (
                                                        date?.to ? (
                                                            <>
                                                            {format(date.from, "LLL dd, y")} -{" "}
                                                            {format(date.to, "LLL dd, y")}
                                                            </>
                                                        ) : (format(date.from, "LLL dd, y"))
                                                    ) : ("Pick a Date")

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
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                </div>
                                {/* Save and Cancel */}
                                <div className="col-span-2 flex flex-row gap-2 row-start-8 px-4 pt-4">
                                    <button
                                        onClick={close}
                                        className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full
                                        `}>
                                        Cancel</button>
                                    <button
                                        onClick={()=>enroll()}
                                        className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                        `}>
                                        Set Duration</button>
                                    </div>

                                </div>
                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
    )
}

export default TraningDurationModal
