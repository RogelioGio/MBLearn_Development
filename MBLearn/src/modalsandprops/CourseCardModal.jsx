import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faSearch, faArrowDownWideShort, faPlus, faMinus, faChevronUp, faChevronDown, faPenToSquare, faTrash, faChevronLeft, faChevronRight, faLaptopFile, faChalkboardTeacher, faCheck } from '@fortawesome/free-solid-svg-icons'

const CourseCardModal = ({open,close,classname,selectedCourse}) => {
    return(
        <Dialog open={open} onClose={close} className={classname}>
                        <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
                        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                            <div className='flex min-h-full items-center justify-center p-4 text center'>
                                <DialogPanel transition className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                                    <div className='h-full w-fit bg-primary'>
                                        {/* Course Image */}
                                        <div className='w-[60vw] h-40'>
                                            <img src="" alt="" />
                                        </div>
                                        {/* Course Information and Content */}
                                        <div className='bg-white w-full'>
                                            {/* Course Header */}
                                            <div className='grid grid-cols-3 grid-rows-2 mx-5 pt-5 border-b border-divider'>
                                            {selectedCourse &&
                                                <>
                                                <div className='col-start-1 col-span-2 row-start-1 p-1'>
                                                        <h2 className='font-header text-primary text-2xl'>{selectedCourse.name}</h2>
                                                        <span className='font-text tex-sm text-primary'>{selectedCourse.coursetype}-{selectedCourse.coursecategory}</span>
                                                </div>
                                                {/* course Action */}
                                                <div className='flex flex-row gap-2 justify-end'>
                                                    <div className='relative border-2 border-primary h-10 w-10 rounded-full flex items-center justify-center text-primary text-sm hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out group'>
                                                        <FontAwesomeIcon icon={faPenToSquare}/>
                                                        <p className='absolute w-auto bottom-10 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Edit</p>
                                                    </div>
                                                    <div className='relative border-2 border-primary h-10 w-10 rounded-full flex items-center justify-center text-primary text-sm hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out group'>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                        <p className='absolute w-auto bottom-10 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Delete</p>
                                                    </div>
                                                </div>
                                                <p className='col-start-1 flex items-center gap-2 text-sm text-tertiary font-header pl-1'><span className='font-text'>Duration:</span>{selectedCourse.duration}</p>
                                                <p className='col-start-2 flex items-center gap-2 text-sm text-tertiary font-header'><span className='font-text'>Date-Added: </span>{selectedCourse.dateadded}</p>
                                                <p className='col-start-3 flex items-center gap-2 text-sm text-tertiary font-header pr-1'><span className='font-text'>Training Mode: </span>{selectedCourse.trainingmode}</p>
                                                </>
                                            }
                                            </div>
                                        </div>
                                        {/* Course Modules & Assigned Course Admins */}
                                        <div className='bg-white py-5'>
                                            {/* Tabs for module and course admin */}
                                            <div className='mx-5 w-full'>
                                                <nav className='isolate inline-flex round-md shadow-md'>
                                                    <a href="#" className='flex flex-row gap-5 items-center text-md text-white font-header ring-1 ring-primary rounded-l-md px-5 py-3 bg-primary hover:bg-primaryhover transition-all ease-in-out'>{/*Active state*/}
                                                        <FontAwesomeIcon icon={faLaptopFile}/>
                                                        <p>Modules</p>
                                                    </a>
                                                    <a href="#" className='flex flex-row gap-5 items-center text-md text-primary font-header ring-1 ring-primary rounded-r-md px-5 py-3 bg-secondarybackground hover:bg-primary hover:text-white transition-all ease-in-out' >
                                                        <FontAwesomeIcon icon={faChalkboardTeacher} />
                                                        <p>Assigned Course Admin</p>
                                                    </a>
                                                </nav>
                                            </div>
                                            {/* Module Contents*/}
                                            {/* This only a sample and will be dealt with in the future */}
                                            <div className='mx-5'>
                                                <Disclosure as="div" className='border-b border-divider py-6'>
                                                    <h3 className='-my-3 flow-root font-text text-black'>
                                                        <DisclosureButton className='group flex w-full justify-between py-3 text-sm hover:text-primary transition-all ease-in-out'>
                                                        <span>Module 1</span>
                                                        <span className='ml-6 flex items-center'>
                                                            <FontAwesomeIcon icon={faChevronUp} className='group-data-[open]:hidden'/>
                                                            <FontAwesomeIcon icon={faChevronDown} className='group-[&:not([data-open])]:hidden'/>
                                                        </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className='pt-6'>
                                                        <div className='space-y-4 text-sm font-text'>
                                                            <p>- Item 1</p>
                                                        </div>
                                                    </DisclosurePanel>
                                                </Disclosure>
                                                <Disclosure as="div" className='border-b border-divider py-6'>
                                                    <h3 className='-my-3 flow-root font-text text-black'>
                                                        <DisclosureButton className='group flex w-full justify-between py-3 text-sm hover:text-primary transition-all ease-in-out'>
                                                        <span>Module 2</span>
                                                        <span className='ml-6 flex items-center'>
                                                            <FontAwesomeIcon icon={faChevronUp} className='group-data-[open]:hidden'/>
                                                            <FontAwesomeIcon icon={faChevronDown} className='group-[&:not([data-open])]:hidden'/>
                                                        </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className='pt-6'>
                                                        <div className='space-y-4 text-sm font-text'>
                                                            <p>- Item 1</p>
                                                        </div>
                                                    </DisclosurePanel>
                                                </Disclosure>
                                                <Disclosure as="div" className='border-b border-divider py-6'>
                                                    <h3 className='-my-3 flow-root font-text text-black'>
                                                        <DisclosureButton className='group flex w-full justify-between py-3 text-sm hover:text-primary transition-all ease-in-out'>
                                                        <span>Module 3</span>
                                                        <span className='ml-6 flex items-center'>
                                                            <FontAwesomeIcon icon={faChevronUp} className='group-data-[open]:hidden'/>
                                                            <FontAwesomeIcon icon={faChevronDown} className='group-[&:not([data-open])]:hidden'/>
                                                        </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className='pt-6'>
                                                        <div className='space-y-4 text-sm font-text'>
                                                            <p>- Item 1</p>
                                                            <p>- Item 2</p>
                                                            <p>- Item 3</p>
                                                        </div>
                                                    </DisclosurePanel>
                                                </Disclosure>
                                                <Disclosure as="div" className='border-b border-divider py-6'>
                                                    <h3 className='-my-3 flow-root font-text text-black'>
                                                        <DisclosureButton className='group flex w-full justify-between py-3 text-sm hover:text-primary transition-all ease-in-out'>
                                                        <span className='inline-flex item-center gap-2'><FontAwesomeIcon icon={faCheck} className='text-lg'/> Assesment</span>
                                                        <span className='ml-6 flex items-center'>
                                                            <FontAwesomeIcon icon={faChevronUp} className='group-data-[open]:hidden'/>
                                                            <FontAwesomeIcon icon={faChevronDown} className='group-[&:not([data-open])]:hidden'/>
                                                        </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className='pt-6'>
                                                        <div className='space-y-4 text-sm font-text'>
                                                            <p>- Item 1</p>
                                                        </div>
                                                    </DisclosurePanel>
                                                </Disclosure>
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
    )
}

export default CourseCardModal