import React, { useEffect, useRef, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faGraduationCap, faHeartPulse, faPenToSquare, faPeopleGroup, faUser, faUserLock, faUserShield } from '@fortawesome/free-solid-svg-icons';
import AnnouncmentCarousel from '../modalsandprops/dashboardComponents/AnnouncementCarousel';
import LearnerDashboard from './Dashboards/LearnerDashboard';
import { CarouselPrevious, CarouselNext } from '../components/ui/carousel';
import CourseAdminDashboard from './Dashboards/CourseAdminDashboard';
import {Label, Area, AreaChart, CartesianGrid, XAxis, PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,} from 'recharts';
import {  ChartContainer,
        ChartLegend,
        ChartLegendContent,
        ChartTooltip,
        ChartTooltipContent, } from '../components/ui/chart';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import './../index.css';
import { ArrowLeft, ArrowRight } from "lucide-react"
import Calendar from '../modalsandprops/dashboardComponents/Calendar';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import CalendarModal from '../modalsandprops/dashboardComponents/CalendarModal';
import { useNavigate } from 'react-router';


// Sample configs for chart
const chartConfig = {
    visitors: {
    label: "Visitors",
  },
  SystemAdmin: {
    label: "System Admin",
    color: "hsl(218, 97%, 26%)",
  },
  CourseAdmin: {
    label: "Course Admin",
    color: "hsl(218, 97%, 35%)",
  },
  Learner: {
    label: "Learner",
    color: "hsl(218, 97%, 50%)",
  },
}

const chartConfig2 = {
  SystemAdmin: {
    label: "System Admin",
    color: "hsl(218, 97%, 26%)",
  },
  CourseAdmin: {
    label: "Course Admin",
    color: "hsl(218, 97%, 35%)",
  },
  Learner: {
    label: "Learner",
    color: "hsl(218, 97%, 50%)",
  },
}




//One Dashboard Component for 3 different roles
const DashboardLayout = ({role,name,user}) => {
    const calendarRef = useRef()
    const [monthLabel, setMonthLabel] = useState("")
    const [openCalendarModal, setOpenCalendarModal] = useState(false);
    const updateMonthLabel = () => {
        const current = calendarRef.current?.getCurrentMonth();
        if (current) {
        setMonthLabel(format(current, "MMMM yyyy"));
        }
    };
    useEffect(() => {
        updateMonthLabel(); // set initial label
    }, []);
    const sampleEvents = [
        { date: "2025-06-25", title: "Meeting with Finance", event_type: "Meeting" },
        { date: "2025-06-30", title: "Payroll Deadline", event_type: "Deadline" },
        { date: "2025-06-30", title: "Payroll Deadline", event_type: "Deadline" },
        { date: "2025-06-30", title: "Payroll Deadline", event_type: "Deadline" },
        { date: "2025-06-30", title: "Hello", event_type: "Meeting" },
    ];

    const navigate = useNavigate();


    //Sample Data
const chartData = [
  // --- January ---
  { date: "2025-01-01", visitors: 460, SystemAdmin: 110, CourseAdmin: 70,  Learner: 280 },
  { date: "2025-01-02", visitors: 480, SystemAdmin: 118, CourseAdmin: 72,  Learner: 290 },
  { date: "2025-01-03", visitors: 495, SystemAdmin: 120, CourseAdmin: 78,  Learner: 300 },
  { date: "2025-01-04", visitors: 470, SystemAdmin: 122, CourseAdmin: 74,  Learner: 285 },
  { date: "2025-01-05", visitors: 500, SystemAdmin: 125, CourseAdmin: 80,  Learner: 295 },
  { date: "2025-01-06", visitors: 520, SystemAdmin: 130, CourseAdmin: 82,  Learner: 308 },
  { date: "2025-01-07", visitors: 505, SystemAdmin: 128, CourseAdmin: 79,  Learner: 298 },
  // …(keep pattern through Jan-31)…

  // --- February ---
  { date: "2025-02-01", visitors: 515, SystemAdmin: 132, CourseAdmin: 84,  Learner: 305 },
  { date: "2025-02-02", visitors: 525, SystemAdmin: 134, CourseAdmin: 86,  Learner: 310 },
  // …Feb-28…

  // --- March ---
  { date: "2025-03-01", visitors: 530, SystemAdmin: 136, CourseAdmin: 88,  Learner: 315 },
  // …Mar-31…

  // --- April (sample already looked like this, so numbers stay similar) ---
  { date: "2025-04-01", visitors: 500, SystemAdmin: 120, CourseAdmin: 80,  Learner: 300 },
  { date: "2025-04-02", visitors: 450, SystemAdmin: 130, CourseAdmin: 70,  Learner: 250 },
  { date: "2025-04-03", visitors: 480, SystemAdmin: 140, CourseAdmin: 90,  Learner: 250 },
  { date: "2025-04-04", visitors: 530, SystemAdmin: 110, CourseAdmin: 100, Learner: 320 },
  { date: "2025-04-05", visitors: 560, SystemAdmin: 150, CourseAdmin: 85,  Learner: 325 },
  { date: "2025-04-06", visitors: 520, SystemAdmin: 125, CourseAdmin: 95,  Learner: 300 },
  { date: "2025-04-07", visitors: 490, SystemAdmin: 135, CourseAdmin: 75,  Learner: 280 },
  { date: "2025-04-08", visitors: 510, SystemAdmin: 120, CourseAdmin: 80,  Learner: 310 },
  { date: "2025-04-09", visitors: 470, SystemAdmin: 115, CourseAdmin: 85,  Learner: 270 },
  { date: "2025-04-10", visitors: 495, SystemAdmin: 130, CourseAdmin: 90,  Learner: 275 },
  // …Apr-30…

  // --- May (up to today) ---
  { date: "2025-05-01", visitors: 540, SystemAdmin: 138, CourseAdmin: 92,  Learner: 325 },
  { date: "2025-05-02", visitors: 550, SystemAdmin: 140, CourseAdmin: 94,  Learner: 330 },
  { date: "2025-05-03", visitors: 560, SystemAdmin: 142, CourseAdmin: 96,  Learner: 335 },
  { date: "2025-05-04", visitors: 545, SystemAdmin: 139, CourseAdmin: 95,  Learner: 328 },
  { date: "2025-05-05", visitors: 555, SystemAdmin: 141, CourseAdmin: 97,  Learner: 332 },
  { date: "2025-05-06", visitors: 565, SystemAdmin: 144, CourseAdmin: 99,  Learner: 338 },
  { date: "2025-05-07", visitors: 558, SystemAdmin: 142, CourseAdmin: 98,  Learner: 334 },
  { date: "2025-05-08", visitors: 570, SystemAdmin: 146, CourseAdmin: 100, Learner: 340 },
  { date: "2025-05-09", visitors: 575, SystemAdmin: 148, CourseAdmin: 102, Learner: 345 },
  { date: "2025-05-10", visitors: 580, SystemAdmin: 150, CourseAdmin: 104, Learner: 350 },
  { date: "2025-05-11", visitors: 590, SystemAdmin: 152, CourseAdmin: 106, Learner: 355 },
  { date: "2025-05-12", visitors: 585, SystemAdmin: 151, CourseAdmin: 105, Learner: 352 },
  { date: "2025-05-13", visitors: 595, SystemAdmin: 153, CourseAdmin: 107, Learner: 357 },
  { date: "2025-05-14", visitors: 600, SystemAdmin: 155, CourseAdmin: 109, Learner: 360 },
  { date: "2025-05-15", visitors: 610, SystemAdmin: 158, CourseAdmin: 111, Learner: 365 },
  { date: "2025-05-16", visitors: 605, SystemAdmin: 156, CourseAdmin: 110, Learner: 362 },
  { date: "2025-05-17", visitors: 615, SystemAdmin: 160, CourseAdmin: 113, Learner: 368 },
  { date: "2025-05-18", visitors: 620, SystemAdmin: 162, CourseAdmin: 115, Learner: 372 },
  { date: "2025-05-19", visitors: 625, SystemAdmin: 164, CourseAdmin: 117, Learner: 375 },
  { date: "2025-05-20", visitors: 630, SystemAdmin: 166, CourseAdmin: 118, Learner: 378 },
];

    switch(role){
        //System admin Dasboard
        case 'System Admin':
            return (
                <>

            <div className="grid  grid-cols-4 grid-rows-[6.25rem_1fr_1fr] h-full w-full">
                <Helmet>{/* Title of the mark-up */}
                    <title>MBLearn | System Admin Dashboard</title>
                </Helmet>

                <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                    <h1 className='text-primary text-4xl font-header'>Good Day! {name} </h1>
                    <p className='font-text text-sm text-unactive'>System Admin Dashboard, A centralized hub for system administrators to manage users, monitor system activity.</p>
                </div>
                <div className='border-b border-divider mr-5 flex flex-row justify-end items-center'>
                    <div className='p-6 aspect-square bg-secondaryprimary rounded-full flex justify-center items-center'>
                        <FontAwesomeIcon icon={faUserShield} className='text-primary text-2xl'/>
                    </div>
                </div>

                {/* Announcement */}
                <div className='col-span-3 row-span-1 pl-5 pr-3 py-2 w-full h-full'>
                    <AnnouncmentCarousel/>
                </div>
                <div className='col-span-1 row-span-1 pr-5 py-2 grid grid-cols-1 grid-rows-[min-content_1fr]'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className="pb-3">
                            <p className="font-text text-unactive text-xs">Current Month & Date:</p>
                            <p className="font-header text-primary text-base">{monthLabel || "Loadding"}</p>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <div>
                                <div className='w-9 h-9 border-2 rounded-md text-primary border-primary flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out' onClick={()=>navigate('calendar')}>
                                    <FontAwesomeIcon icon={faCalendar} className='text-sm'/>
                                </div>
                            </div>
                            <div>
                                <div className='w-9 h-9 border-2 rounded-md text-primary border-primary flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'
                                onClick={()=> {calendarRef.current?.goToPreviousMonth(), setTimeout(updateMonthLabel, 0)}}>
                                    <ArrowLeft className="h-4 w-4" />
                                </div>
                            </div>
                            <div>
                                <div className='w-9 h-9 border-2 rounded-md text-primary border-primary flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'
                                onClick={()=> {calendarRef.current?.goToNextMonth(), setTimeout(updateMonthLabel, 0)}}>
                                <ArrowRight className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full rounded-md shadow-md border-2 border-primary overflow-hidden">
                        <Calendar ref={calendarRef} events={sampleEvents}/>
                    </div>
                </div>


                {/* Changing Content */}
                <div className='col-span-3 row-start-3 ml-5 pr-3 pb-5 flex flex-col'>
                    <div className='pb-3 grid grid-cols-4'>
                        <div className='col-span-2'>
                        <p className="font-header text-primary text-base">Online User Statistics</p>
                        <p className="font-text text-unactive text-xs">Visualization of the current amount of online users of MBLearn </p>
                        </div>
                        <div className='col-span-1 col-start-4'>
                        <div className="grid grid-cols-1">
                            <select id="dept" name="dept" className="appearance-none text-primary font-header col-start-1 row-start-1 border-2 border-primary rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                // value={formik.values.role}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}\
                                >
                                <option value='' className='text-primary font-header'>Last 3 Months</option>
                                <option value='' className='text-primary font-header'>Last 30 Days</option>
                                <option value='' className='text-primary font-header'>Last 7 Days</option>

                            </select>
                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        </div>


                    </div>
                    <div className='w-full h-full'>
                        <ChartContainer config={chartConfig} className="aspect-auto h-full w-full flex flex-col gap-4">
                            <AreaChart data={chartData}>
                            <ChartLegend content={<ChartLegendContent />}/>
                                <defs>
                                    <linearGradient id="fillSystemAdmin" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                        offset="5%"
                                        stopColor="var(--chart-1)"
                                        stopOpacity={0.8}
                                        />
                                        <stop
                                        offset="95%"
                                        stopColor="var(--chart-2)"
                                        stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillCourseAdmin" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                        offset="5%"
                                        stopColor="var(--chart-2)"
                                        stopOpacity={0.8}
                                        />
                                        <stop
                                        offset="95%"
                                        stopColor="var(--chart-3)"
                                        stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillLearner" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                        offset="5%"
                                        stopColor="var(--chart-4)"
                                        stopOpacity={0.8}
                                        />
                                        <stop
                                        offset="95%"
                                        stopColor="var(--chart-5)"
                                        stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tick={{ fill: "hsl(218, 97%, 26%)" }}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    })
                                }}
                                />
                                <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                    />
                                }
                                />
                                <Area
                                dataKey="Learner"
                                type="natural"
                                fill="url(#fillLearner)"
                                stroke="hsl(218, 97%, 50%)"
                                stackId="a"
                                />
                                <Area
                                dataKey="CourseAdmin"
                                type="natural"
                                fill="url(#fillCourseAdmin)"
                                stroke="hsl(218, 97%, 35%)"
                                stackId="a"
                                />
                                <Area
                                dataKey="SystemAdmin"
                                type="natural"
                                fill="url(#fillSystemAdmin)"
                                stroke="hsl(218, 97%, 26%)"
                                stackId="a"
                                />

                            </AreaChart>
                        </ChartContainer>
                    </div>
                </div>
                <div className='col-span-1 row-start-3 mr-5 pb-5 flex flex-col'>
                    <div className='pb-3 flex flex-row justify-between'>
                        <div>
                            <p className="font-header text-primary text-base">Total MBLearn Users</p>
                            <p className="font-text text-unactive text-xs">Total number of MBLearn users</p>
                        </div>
                        <div className='w-9 h-9 border-primary border-2 rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                    </div>
                    <div className='w-full h-full items-center justify-center grid grid-cols-1 grid-rows-4 gap-y-2'>
                        <div className='flex flex-row justify-between items-center text-primary'>
                            <p className='text-xs font-text text-unactive'>ACTIVE USERS</p>
                            <p className='text-2xl font-header'>14,000</p>
                        </div>
                        <div className='flex flex-row border-2 border-primary w-full h-full rounded-md items-center justify-between px-3 py-1 text-primary hover:cursor hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer'>
                                <p className='text-xs font-text'><span><FontAwesomeIcon icon={faUserShield}/></span> System Admin Accounts</p>
                                <p className='text-lg font-header'>5,000</p>

                        </div>
                        <div className='flex flex-row border-2 border-primary w-full h-full rounded-md items-center justify-between px-3 py-1 text-primary hover:cursor hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer'>
                                <p className='text-xs font-text'><span><FontAwesomeIcon icon={faBookOpenReader}/></span> Course Admin Accounts</p>
                                <p className='text-lg font-header'>5,100</p>
                        </div>
                        <div className='flex flex-row border-2 border-primary w-full h-full rounded-md items-center justify-between px-3 py-1 text-primary hover:cursor hover:bg-primary hover:text-white transition-all ease-in-out hover:cursor-pointer'>
                                <p className='text-xs font-text'><span><FontAwesomeIcon icon={faGraduationCap}/></span> Learner Accounts</p>
                                <p className='text-lg font-header'>5,100</p>
                        </div>

                    </div>
                </div>

            </div>
            <CalendarModal open={openCalendarModal} close={()=>setOpenCalendarModal(false)}/>
            </>
            )
        //Course Admin Dashboard
        case 'Course Admin':
            return (
                <>
                    <Helmet>{/* Title of the mark-up */}
                    <title>MBLearn | Course Admin Dashboard</title>
                    </Helmet>
                    <CourseAdminDashboard name={name} user={user}/>
                </>

            )
        //Learner Dashboard
        case 'Learner':
            return (
                <>
                    <Helmet>{/* Title of the mark-up */}
                    <title>MBLearn | Learner Dashboard</title>
                    </Helmet>
                    <LearnerDashboard name={name} user={user}/>
                </>
            )
    }

}

export default function Dashboard()
{
    const {user, role, token} = useStateContext();
    if(!token){
        return window.location.href = "/login";
    }
    if (!user) {
        return <div>Loading...</div>;
    }

    const EnrolledCourses = ([])
    // useEffect(() => {
    //     if(!role === 'Learner')return

    //     axiosClient.get(`/select-user-courses/${user.id}`).then(({data}) => {console.log(data)}).catch((err) => {console.log(err)});
    // }, [role])

    return (
        <>
            <DashboardLayout role={role} name={user.user_infos.first_name} user={user}/>
        </>
    )

}
