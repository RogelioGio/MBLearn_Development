import { faArrowLeft, faCalendar, faClock, faGraduationCap, faStar, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';
import {
   startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react"
import React, { useState } from "react";
import { useNavigate } from 'react-router';


export default function Calendar() {
    const navigate = useNavigate();
        const [currentMonth, setCurrentMonth] = useState(new Date());
        const [selectedDate, setSelectedDate] = useState(null);

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const renderCells = () => {
            const startDate = startOfWeek(startOfMonth(currentMonth));
            const days = [];
            let day = startDate;

            //6 weeks grid
            for (let i=0; i<42; i++){
                const formattedDate = format(day, "d");
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isToday = isSameDay(day, new Date());

                days.push(
                    <div className={`group font-text flex items-start justify-start border border-division w-full h-full ${!isCurrentMonth ? "!text-gray-300" : ""} transition-all ease-in-out hover:cursor-pointer hover:!text-primary`}>
                        <div className={`text-sm w-8 h-8 flex items-center justify-center m-2 ${isToday && !isSameDay(day, selectedDate) ? "bg-primary text-white rounded-full shadow-md hover:text-white font-header" : ""} group-hover:border rounded-full border-primary transition-all ease-in-out`}>
                            {formattedDate}
                        </div>
                    </div>
                )
                day = addDays(day, 1);
            }

            const rows = [];
            for (let i = 0; i < 7; i++) {
                rows.push(
                    <div key={i} className="grid grid-cols-7">
                        {days.slice(i * 7, i * 7 + 7)}
                    </div>
                );
            }
            return rows;
        }

    return (
        <>
            <Helmet><title>MBLearn | Calendar</title></Helmet>
            <div className="grid  grid-cols-4 grid-rows-[6.25rem_min-content_1fr] h-full w-full">
                {/* Header */}
                <div className='flex flex-row items-center gap-x-4 col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                    <div>
                        <div className='border-2 border-primary rounded-full w-8 h-8 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out' onClick={() => navigate(-1)}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-primary text-4xl font-header'>Calendar </h1>
                        <p className="text-unactive font-text text-xs">Displays a user’s upcoming events, training schedules, deadlines, and course-related events, helping them stay organized and on track with their activities.</p>

                    </div>
                </div>
                <div className='border-b border-divider mr-5 flex flex-row justify-end items-center'>
                    <div className='p-6 aspect-square bg-secondaryprimary rounded-full flex justify-center items-center'>
                        <FontAwesomeIcon icon={faCalendar} className='text-primary text-2xl'/>
                    </div>
                </div>
                {/* Calendar Header */}
                <div className='col-span-3 py-2 pl-5 pr-2 flex flex-row items-center justify-between'>
                    <div>
                        <p className="text-unactive font-text text-xs">Current Month & Date:</p>
                        {/* Will be change later on */}
                        <p className="text-primary font-header text-xl">{format(currentMonth, "MMMM dd yyyy")}</p>
                    </div>
                    <div className="flex flex-row gap-1">
                        <div>
                            <div className='w-9 h-9 border-2 rounded-md text-primary border-primary flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'
                            //onClick={()=> {calendarRef.current?.goToPreviousMonth(), setTimeout(updateMonthLabel, 0)}}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </div>
                        </div>
                        <div>
                            <div className='w-9 h-9 border-2 rounded-md text-primary border-primary flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'
                            //onClick={()=> {calendarRef.current?.goToNextMonth(), setTimeout(updateMonthLabel, 0)}}
                            >
                            <ArrowRight className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Calendar */}
                <div className='row-start-3 col-span-3 pl-5 pr-2 pb-2'>
                    <div className="rounded-md border-2 border-primary h-full flex flex-col">
                        <div className="bg-primary flex flex-row items-center justify-between text-white py-2 px-5 border-b border-white uppercase font-header">
                            <p>{format(currentMonth, "MMMM")}</p>
                            <p>{format(currentMonth, "yyyy")}</p>
                        </div>
                        <div>
                                <div className="grid grid-cols-7 bg-primary text-center py-2 text-white font-header text-sm">
                                {daysOfWeek.map((d)=> (
                                    <div key={d}>{d}</div>
                                ))}
                            </div>
                        </div>
                        <div className='grid grid-rows-6 h-full'>
                            {renderCells()}
                        </div>
                    </div>
                </div>
                <div className='col-start-4 row-start-2 row-span-2 flex flex-col'>
                    <p className="pr-5 pl-2 py-2 font-text text-xs text-unactive">Date Events:</p>
                    <div className="grid grid-cols-1 grid-rows-7 gap-2 pr-5 pl-2 h-full">
                    <div className="flex flex-row gap-4 border-2 border-primary rounded-md shadow-sm p-2 items-center">
                        <div className="w-10 h-10 bg-primarybg rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faClock} className="text-primary text-lg" />
                        </div>
                        <div className="flex flex-col">
                            {/* Event Title */}
                            <p className="font-header text-primary text-sm">Sample Date Event</p>
                            <p className="font-text text-primary text-xs">DEADLINE 00-00-0000</p>
                            {/* Event Type - Event Date */}
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 border-2 border-primary rounded-md shadow-sm p-2 items-center">
                        <div className="w-10 h-10 bg-primarybg rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faGraduationCap} className="text-primary text-lg" />
                        </div>
                        <div className="flex flex-col">
                            {/* Event Title */}
                            <p className="font-header text-primary text-sm">Sample Date Event</p>
                            <p className="font-text text-primary text-xs">ENROLLED 00-00-0000</p>
                            {/* Event Type - Event Date */}
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 border-2 border-primary rounded-md shadow-sm p-2 items-center">
                        <div className="w-10 h-10 bg-primarybg rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faStar} className="text-primary text-lg" />
                        </div>
                        <div className="flex flex-col">
                            {/* Event Title */}
                            <p className="font-header text-primary text-sm">Sample Date Event</p>
                            <p className="font-text text-primary text-xs">Custom 00-00-0000</p>
                            {/* Event Type - Event Date */}
                        </div>

                    </div>

                </div>
                </div>
            </div>
        </>
    )
}
