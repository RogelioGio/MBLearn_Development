import { faCalendar, faClock, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import * as React from "react"
import { useState } from "react";
import { addDays, format } from "date-fns"

const TraningDurationModal = ({ open, close }) => {
    const [date, setDate] = React.useState({
        from: new Date(),
        to: addDays(new Date(), 20),
      });

      const handleDateChange = (newDate) => {
        setDate(newDate);
      };


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
                                <div className="px-4 col-span-2 grid grid-cols-3 grid-rows-[min-content_auto] gap-2 py-2">
                                    <div  className="inline-flex flex-col gap-2 row-start-1 col-span-1">
                                        <p className="font-text text-unactive text-xs"> Course Duration:</p>
                                    </div>
                                    {/* Months */}
                                    <div className="inline-flex flex-col row-start-2">
                                    <input type="text" name="months"
                                        // value={formik2.values.months}
                                        // onChange={formik2.handleChange}
                                        // onBlur={(e) => {
                                        //     formik2.handleBlur(e);
                                        //     normalizationDuration({
                                        //         ...formik2.values,
                                        //         months: e.target.value,
                                        //     }, formik2.setFieldValue);
                                        // }}
                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                        <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                                        <p className="font-text text-unactive pb-2">Months</p>
                                        </label>
                                        {/* {formik2.touched.months && formik2.errors.months ? (<div className="text-red-500 text-xs font-text">{formik2.errors.months}</div>):null} */}
                                    </div>
                                    {/* Weeks */}
                                    <div className="inline-flex flex-col row-start-2">
                                    <input type="text" name="weeks"
                                        // value={formik2.values.weeks}
                                        // onChange={formik2.handleChange}
                                        // onBlur={(e) => {
                                        //     formik2.handleBlur(e);
                                        //     normalizationDuration({
                                        //         ...formik2.values,
                                        //         weeks: e.target.value,
                                        //     }, formik2.setFieldValue);
                                        // }}
                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                        <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between">
                                        <p className="font-text text-unactive pb-2">Weeks</p>
                                        </label>
                                        {/* {formik2.touched.weeks && formik2.errors.weeks ? (<div className="text-red-500 text-xs font-text">{formik2.errors.weeks}</div>):null} */}
                                    </div>
                                    {/* Days */}
                                    <div className="inline-flex flex-col row-start-2">
                                    <input type="text" name="days"
                                        // value={formik2.values.days}
                                        // onChange={formik2.handleChange}
                                        // onBlur={(e) => {
                                        //     formik2.handleBlur(e);
                                        //     normalizationDuration({
                                        //         ...formik2.values,
                                        //         days: e.target.value,
                                        //     }, formik2.setFieldValue);
                                        // }}
                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                        <label htmlFor="course_name" className="font-header text-xs flex flex-row justify-between pb-2">
                                        <p className="font-text text-unactive">Days</p>
                                        </label>
                                        {/* {formik2.touched.days && formik2.errors.days ? (<div className="text-red-500 text-xs font-text">{formik2.errors.days}</div>):null} */}
                                    </div>
                                </div>
                                {/* Start Date and End Date */}
                                <div className="col-span-2 flex flex-row gap-4 w-full px-4">
                                <div className="flex-col gap-2 flex w-full">
                                    <p className="text-xs font-text text-unactive">Start Date and End Date</p>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="flex flex-row justify-between items-center font-text border border-divider rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                <p>Pick a Date</p>
                                                <FontAwesomeIcon icon={faCalendar} className="text-primary text-lg"/>
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-fit">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
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
                                        //onClick={()=>submitCourse()}
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
