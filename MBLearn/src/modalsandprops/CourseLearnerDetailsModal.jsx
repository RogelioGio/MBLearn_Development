import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"

const  CourseLearnerDetailsModal  = ({open, close, learner}) => {
    return (
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="backdrop-blur-sm fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30"/>
            <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
                                                        w-[100vw]
                                                        md:w-[60vw]'>
                        <div className='bg-white rounded-md h-full flex flex-col'>
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
                                            <div className="min-w-20 min-h-20 w-20 h-20 bg-white rounded-full shadow-md">
                                                <img src={learner.enrolled_user.profile_image} alt="" className="rounded-full"/>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-header text-white">{learner.enrolled_user.first_name} {learner.enrolled_user.middle_name || ""} {learner.enrolled_user.last_name}</p>
                                            <p className="text-xs font-text text-white">Employee ID: {learner.enrolled_user.employeeID}</p>
                                        </div>
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
