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
} from "date-fns";
import { useState } from "react";


export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const renderDays = () => (
        <div className="grid grid-cols-7 bg-primary text-center py-1 text-white font-header text-sm">
            {daysOfWeek.map((d)=> (
                <div key={d}>{d}</div>
            ))}
        </div>
    )

    const renderCells = () => {
        const startDate = startOfWeek(startOfMonth(currentMonth));
        const days = [];
        let day = startDate;

        //6 weeks
        for(let i=0; i<42; i++){
            const formattedDate = format(day, "d");
            const cloneDay = day;
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, new Date());

            days.push(
                <div key={day} className={`font-text flex items-center justify-center border border-divi ${!isCurrentMonth ? "!text-gray-300" : ""}`}>
                    <div className={`text-sm w-8 h-7 flex items-center justify-center ${isToday && !isSameDay(day, selectedDate) ? "bg-primary text-white rounded-md shadow-md hover:text-white" : ""} transition-all hover:border hover:cursor-pointer hover:text-primary border-primary rounded-md`}>{formattedDate}</div>
                </div>
            )
            day = addDays(day, 1);
        }

        const rows = [];
        for(let i=0; i<days.length; i+=7){
            rows.push(
                <div key={i} className="grid grid-cols-7 h-full">
                    {days.slice(i, i+7)}
                </div>
            )
        }
        return <div className="h-full flex flex-col justify-between">{rows}</div>

    }




    return(
        <>
            <div className="flex flex-col h-full">
                {renderDays()}
                {renderCells()}
            </div>
        </>
    )
}

