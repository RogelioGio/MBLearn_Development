import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import CourseListCard from '../modalsandprops/CourseListCard';
import CourseCardModal from '../modalsandprops/CourseCardModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faSearch, faArrowDownWideShort, faPlus, faMinus, faChevronUp, faChevronDown, faPenToSquare, faTrash, faChevronLeft, faChevronRight, faLaptopFile, faChalkboardTeacher, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';


//Sort Options Array
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
]

//Filter Options and Categories
const filter = [
    {
        id:'coursetype',
        name: 'Course Type',
        option: [
            {value: 'softskill' , label: 'Soft Skill Training', checked: false },
            {value: 'technical' , label: 'Technical Training', checked: false },
            {value: 'leadership' , label: 'Compliance Training', checked: false },
        ]
    },
    {
        id:'coursecategory',
        name: 'Course Category',
        option: [
            {value: 'professionaldev' , label: 'Professional Development', checked: false },
            {value: 'dataandanalytics' , label: 'Data and Analystics', checked: false },
            {value: 'managementandleadership' , label: 'Management and Leadership', checked: false },
        ]
    }
]

//Sample Course Information Array
const Courses = [
    {
        id:"effectivecommunication",
        name: "Effective Communication Skills in the Workplace",
        coursetype: "Soft Skills Training",
        coursecategory: "Personal Development",
        duration: "2 weeks",
        dateadded: "December 2 2024",
        trainingmode: "Asynchronous"
    },
    {
        id:"timemanagement",
        name: "Time Management and Productivity Hacks",
        coursetype: "Soft Skills Training",
        coursecategory: "Personal Development",
        duration: "1 weeks",
        dateadded: "December 2 2024",
        trainingmode: "Online Training (Asynchronous)"
    },
    {
        id:"cybersec",
        name: "Cybersecurity Awareness and Best Practices",
        coursetype: "Compliance Training",
        coursecategory: "Information Security",
        duration: "1 weeks",
        dateadded: "December 2 2024",
        trainingmode: "Online Training (Asynchronous)"
    }
]



export default function CourseListMaintenance() {

//Modal State mounting
const [isOpen, setIsOpen] = useState(false);
const [selectedCourse, setSelectedCourse] = useState(null)

//Modal Open and Close Function
const OpenDialog = (course) => {
    setIsOpen(true)
    setSelectedCourse(course)
}
const CloseDialog = () => {
    setIsOpen(false)
}


    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_auto] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Course List Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
            <h1 className='text-primary text-4xl font-header'>Course List Maintenance </h1>
            <p className='font-text text-sm text-unactive'>Easily manage and add courses to streamline learning opportunities.</p>
            </div>

            {/* Add Button */}
            <div className='col-start-4 row-start-1 flex flex-col justify-center pl-5 mr-5 border-divider border-b'>
            <button className='inline-flex flex-row shadow-md items-center justify-center bg-primary font-header text-white text-base p-4 rounded-full hover:bg-primaryhover hover:scale-105 transition-all ease-in-out'>
                <FontAwesomeIcon icon={faFolderPlus} className='mr-2'/>
                <p>Add Course</p>
            </button>
            </div>

            {/* Small Sorter */}
            <div className='inline-flex items-center row-start-2 col-start-1 px-5 py-3 h-fit'>
                <Menu>
                    <MenuButton className='flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md'>
                    <p>Sort Courses by</p>
                    <FontAwesomeIcon icon={faArrowDownWideShort}/>
                    </MenuButton>
                    {/* Sort Options */}
                    <MenuItems anchor="bottom" className = 'absolute origin-top-right border-2 border-primary bg-secondarybackground rounded-md shadow-md inline-flex flex-col gap-2 w-fit font-text text-primary p-1'>
                        {sortOptions.map((index) =>
                            <MenuItem key={index.name} className = 'p-1 w-40 hover:bg-primary hover:text-white hover:cursor-pointer rounded-md transition-all ease-in-out'>
                                <p>{index.name}</p>
                            </MenuItem>
                        )}
                    </MenuItems>
                </Menu>
            </div>

            {/* Search bar */}
            <div className='inline-flex items-center col-start-4 row-start-2 px-5 py-3 h-fit'>
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className='row-start-3 col-start-4 px-5 py-2'>
                <div className='w-full bg-divider h-[1px] rounded-full'></div>
                <form>
                    {filter.map((section)=>(
                        <Disclosure key={section.id} as="div" className='border-b border-divider py-6'>
                            <h3 className='-my-3 flow-root font-text text-primary'>
                                <DisclosureButton className='group flex w-full justify-between py-3 text-sm hover:text-primary transition-all ease-in-out'>
                                    <span>{section.name}</span>
                                    <span className='ml-6 flex items-center'>
                                        <FontAwesomeIcon icon={faChevronUp} className='group-data-[open]:hidden'/>
                                        <FontAwesomeIcon icon={faChevronDown} className='group-[&:not([data-open])]:hidden'/>
                                    </span>
                                </DisclosureButton>
                            </h3>
                            <DisclosurePanel className='pt-6'>
                                <div className='space-y-4'>
                                    {section.option.map((option, optionIdx) => (
                                        <div key={option.value} className='flex gap-4'>
                                            <div className='flex h-5 shrink-0 items-center'>
                                                {/* Checkbox Styling */}
                                                <div className='group grid size-4 grid-cols-1'>
                                                    <input defaultValue={option.value} defaultChecked={option.checked} id={`filter-${section.id}-${optionIdx}`} name={`${section.id}[]`} type="checkbox"
                                                    className='col-start-1 row-start-1 appearance-none rounded border border-divider bg-white checked:border-primary checked:bg-primary'/>
                                                    <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                                    <path
                                                        d="M3 8L6 11L11 3.5"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="opacity-0 group-has-[:checked]:opacity-100"
                                                    />
                                                    <path
                                                        d="M3 7H11"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                    />
                                                    </svg>
                                                </div>

                                            </div>
                                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className='text-sm font-text text-black'>{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                    ))}
                </form>
            </div>

            {/* Sample Card for course display */}
            <CourseListCard courseList={Courses} classname='row-start-3 row-span-3 col-start-1 col-span-3 w-full px-5 py-2 flex flex-col gap-2' onclick={OpenDialog}/>

            {/* Sample Footer Pagenataion */}
            <div className='row-start-7 row-span-1 col-start-1 col-span-3 border-t border-divider mx-5 py-3 flex flex-row items-center justify-between'>
                {/* Total number of entries and only be shown */}
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>1</span> to <span className='font-header text-primary'>3</span> of {/*here is the backend code for total entries*/}
                        <span className='font-header text-primary'>97</span> <span className='text-primary'>results</span>
                    </p>
                </div>
                {/* Paganation */}
                <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a href="#" className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <a href="#" className='relative z-10 inline-flex item center bg-primary px-4 py-2 text-sm font-header text-white ring-1 ring-divider ring-inset'>1</a>
                        <a href="#" className='relative z-10 inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>2</a>
                        <a href="#" className= 'relative z-10 inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>3</a>
                        <span className='relative inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all eas'>...</span>
                        <a href="#" className='relative z-10 inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>8</a>
                        <a href="#" className='relative z-10 inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>9</a>
                        <a href="#" className='relative z-10 inline-flex item center bg-secondarybackground px-4 py-2 text-sm font-header text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>10</a>
                        {/* Next */}
                        <a href="#" className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>

            {/* Dialog box */}
            <CourseCardModal open={isOpen} close={CloseDialog} classname='relative z-10' selectedCourse={selectedCourse}/>
        </div>

    )
}
