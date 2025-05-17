import React, { useEffect, useRef, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faGraduationCap, faHeartPulse, faPenToSquare, faPeopleGroup, faUserLock, faUserShield } from '@fortawesome/free-solid-svg-icons';
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


// Sample configs for chart
const chartConfig = {
    visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-3)",
  },
}

const chartConfig2 = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-1)",
  },
}




//One Dashboard Component for 3 different roles
const DashboardLayout = ({role,name,user}) => {

    const calendarRef = useRef()
    const [monthLabel, setMonthLabel] = useState("")
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
        { date: "2025-05-20", title: "Meeting with Finance" },
        { date: "2025-05-25", title: "Payroll Deadline" },
    ];

    const chartData2 = [
      { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    ]
    const chartData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
    { date: "2024-04-11", desktop: 327, mobile: 350 },
    { date: "2024-04-12", desktop: 292, mobile: 210 },
    { date: "2024-04-13", desktop: 342, mobile: 380 },
    { date: "2024-04-14", desktop: 137, mobile: 220 },
    { date: "2024-04-15", desktop: 120, mobile: 170 },
    { date: "2024-04-16", desktop: 138, mobile: 190 },
    { date: "2024-04-17", desktop: 446, mobile: 360 },
    { date: "2024-04-18", desktop: 364, mobile: 410 },
    { date: "2024-04-19", desktop: 243, mobile: 180 },
    { date: "2024-04-20", desktop: 89, mobile: 150 },
    { date: "2024-04-21", desktop: 137, mobile: 200 },
    { date: "2024-04-22", desktop: 224, mobile: 170 },
    { date: "2024-04-23", desktop: 138, mobile: 230 },
    { date: "2024-04-24", desktop: 387, mobile: 290 },
    { date: "2024-04-25", desktop: 215, mobile: 250 },
    { date: "2024-04-26", desktop: 75, mobile: 130 },
    { date: "2024-04-27", desktop: 383, mobile: 420 },
    { date: "2024-04-28", desktop: 122, mobile: 180 },
    ]

    switch(role){
        //System admin Dasboard
        case 'System Admin':
            return (
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
                                <div className='w-9 h-9 border-2 rounded-md text-primary border-primary flex justify-center items-center hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'>
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
                    <div className='pb-3'>
                        <p className="font-header text-primary text-base">Online User Statistics</p>
                        <p className="font-text text-unactive text-xs">Visualization of the current amount of online users of MBLearn </p>

                    </div>
                    <div className='bg-white w-full h-full rounded-md shadow-md border-2 border-primary px-2'>
                        <ChartContainer config={chartConfig} className="aspect-auto h-[200px] w-full">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
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
                                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                        offset="5%"
                                        stopColor="var(--color-mobile)"
                                        stopOpacity={0.8}
                                        />
                                        <stop
                                        offset="95%"
                                        stopColor="var(--color-mobile)"
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
                                dataKey="mobile"
                                type="natural"
                                fill="url(#fillMobile)"
                                stroke="var(--color-mobile)"
                                stackId="a"
                                />
                                <Area
                                dataKey="desktop"
                                type="natural"
                                fill="url(#fillDesktop)"
                                stroke="var(--color-desktop)"
                                stackId="a"
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </div>
                <div className='col-span-1 row-start-3 mr-5 pb-5 flex flex-col'>
                    <div className='pb-3'>
                        <p className="font-header text-primary text-base">Total MBLearn Users</p>
                        <p className="font-text text-unactive text-xs">Total number of MBLearn users</p>
                    </div>
                    <div className='bg-white w-full h-full rounded-md shadow-md border-2 border-primary'>
                        <ChartContainer config={chartConfig2} className="mx-auto aspect-square max-h-[150px]" >
                            <RadialBarChart
                                data={chartData2}
                                startAngle={0}
                                endAngle={250}
                                innerRadius={80}
                                outerRadius={110}
                            >
                                <PolarGrid
                                gridType="circle"
                                radialLines={false}
                                stroke="none"
                                className="first:fill-muted last:fill-background"
                                polarRadius={[86, 74]}
                                />

                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData2[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>

                                <RadialBar dataKey="visitors" background cornerRadius={10} />
                            </RadialBarChart>
                        </ChartContainer>
                    </div>
                </div>

            </div>
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
            <DashboardLayout role={role} name={user.user_infos.first_name} user={user}/>
    )

}
