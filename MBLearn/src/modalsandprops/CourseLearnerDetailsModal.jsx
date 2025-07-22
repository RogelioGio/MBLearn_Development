import { faBullhorn, faCalendarPlus, faPeopleArrows, faUserXmark, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { RingProgress } from "@mantine/core"
import { differenceInDays, format } from "date-fns"
import { useEffect, useState } from "react"

const  CourseLearnerDetailsModal  = ({open, close, learner}) => {

    const [enrollmentDuration, setEnrollmentDuration] = useState({})

    const duration = () => {
        if(!learner.start_date || !learner.end_date) return

        const totalDuration = differenceInDays(
            new Date(learner.end_date),
            new Date(learner.start_date)
        ) + 1;

        const month = Math.floor(totalDuration / 30);
        const week = Math.floor((totalDuration % 30) / 7);
        const day = (totalDuration % 30) % 7;

        setEnrollmentDuration({
            months: month,
            weeks: week,
            days: day,
        })
    }

    useEffect(()=> {
        duration();
    },[learner])

    return (
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="backdrop-blur-sm fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30"/>
            <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
                                                        w-[100vw]
                                                        md:w-[60vw]'>
                        <div className='bg-white rounded-md h-full flex flex-col'>
                            {/* Header */}
                            <div className="bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-t-md">
                                <div className="flex flex-col bg-gradient-to-b from-transparent to-black rounded-t-md gap-4 p-5">
                                    <div className="flex flex-col items-end">
                                        <div className="border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary hover:cursor-pointer transition-all ease-in-out
                                                    w-5 h-5 text-xs
                                                    md:w-8 md:h-8 md:text-base"
                                            onClick={()=>{close()}}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-4 py-2">
                                        <div className="bg-white p-2 w-fit rounded-full">
                                            <div className="min-w-20 min-h-20 w-10 h-10 bg-white rounded-full shadow-md">
                                                <img src={learner?.enrolled_user?.profile_image} alt="" className="rounded-full"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                {
                                                    <div className='flex flex-row gap-1 px-2 py-1 bg-red-400 text-red-800 border-red-600 border rounded-md w-fit text-xs items-center'>
                                                        <FontAwesomeIcon icon={faXmarkCircle}/>
                                                        <p>Not Started</p>
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                <p className="text-2xl font-header text-white">{learner?.enrolled_user?.first_name} {learner?.enrolled_user?.middle_name || ""} {learner?.enrolled_user?.last_name}</p>
                                                <p className="text-xs font-text text-white">Employee ID: {learner?.enrolled_user?.employeeID}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Content */}
                            <div className="py-5 px-4">
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <p className="text-xs font-text text-unactive">Enrollment Duration:</p>
                                        {/* <p className="text-xs font-text text-gray-500">{!learner.start_date || !learner.end_date ? "" : enrollmentDuration.months}</p> */}
                                        {
                                            !learner.start_date || !learner.end_date ? "" :
                                            <>
                                                {/* <p>{enrollmentDuration.months} months {enrollmentDuration.weeks} weeks {enrollmentDuration.days} day </p> */}
                                                <p className="font-header text-primary">
                                                    {enrollmentDuration.months > 1 ? enrollmentDuration.months + " Months" : enrollmentDuration.months + " Month"} {enrollmentDuration.months > 1 ? enrollmentDuration.weeks + " Weeks" : enrollmentDuration.weeks + " Week"} {enrollmentDuration.days > 1 ? enrollmentDuration.days + " days" : enrollmentDuration.days + " day"}
                                                </p>
                                            </>
                                        }
                                    </div>
                                    <div>
                                        <p className="text-xs font-text text-unactive">Enrollment Start Date:</p>
                                        <p className="font-header text-primary">{learner?.start_date ? format(new Date(learner?.start_date), "MMMM dd yyyy") : ""}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-text text-unactive">Enrollment Due Date:</p>
                                        <p className="font-header text-primary">{learner?.end_date ? format(new Date(learner?.end_date), "MMMM dd yyyy") : ""}</p>
                                    </div>
                                </div>
                                <div className="pt-2 grid grid-cols-2 gap-2">
                                    <div>
                                        <p className="text-xs font-text text-unactive">Current Learner Module:</p>

                                    </div>
                                    <div>
                                        <p className="text-xs font-text text-unactive">Current Learner Progress:</p>
                                        <div className="flex flex-row items-center gap-2">
                                            <RingProgress
                                                size={35} // Diameter of the ring
                                                roundCaps
                                                thickness={4} // Thickness of the progress bar
                                                sections={[{ value: learner.completed_percentage, color: "hsl(218,97%,26%)" }]} // Lighter blue progress
                                                rootColor="hsl(210, 14%, 83%)" // Darker blue track
                                                />
                                            <div>
                                                <p className='font-header'>{learner.completed_percentage}%</p>
                                                <p className='font-text text-xs'>Completion Progress</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-2 grid grid-cols-3 grid-rows-[min-content_1fr] gap-2">
                                    <div className="col-span-3 font-text text-unactive text-xs">
                                        <p>Actions:</p>
                                    </div>
                                    <div className="font-header text-primary border-2 border-primary rounded-md py-2 flex flex-row gap-2 justify-center items-center hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer transition-all ease-in-out">
                                        <FontAwesomeIcon icon={faUserXmark}/>
                                        <p>Unernoll</p>
                                    </div>
                                    <div className="font-header text-primary border-2 border-primary rounded-md py-2 flex flex-row gap-2 justify-center items-center hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer transition-all ease-in-out">
                                        <FontAwesomeIcon icon={faBullhorn}/>
                                        <p>Call to Actions</p>
                                    </div>
                                    <div className="font-header text-primary border-2 border-primary rounded-md py-2 flex flex-row gap-2 justify-center items-center hover:bg-primaryhover hover:border-primaryhover hover:text-white hover:cursor-pointer transition-all ease-in-out">
                                        <FontAwesomeIcon icon={faCalendarPlus}/>
                                        <p>Extend Training</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )

}
export default CourseLearnerDetailsModal
