import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import CourseListCard from '../modalsandprops/CourseListCard';
import CourseCardModal from '../modalsandprops/CourseCardModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faSearch,  faArrowUpWideShort, faArrowDownWideShort, faPlus, faMinus, faChevronUp, faChevronDown, faPenToSquare, faTrash, faChevronLeft, faChevronRight, faLaptopFile, faChalkboardTeacher, faCheck, faPen, faFloppyDisk, faArrowUpAZ, faSort, faArrowDownAZ, faArrowDownShortWide, faArrowDownZA, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import AddCourseModal from '../modalsandprops/AddCourseModal';
import EditCourseModal from '../modalsandprops/EditCourseModal';
import DeleteCourseModal from '../modalsandprops/DeleteCourseModal';
import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import CourseFilterProps from '../modalsandprops/CourseFilterProps';
import AssignCourseAdmin from '../modalsandprops/AssignCourseAdminModal';
import axiosClient from '../axios-client';
import CourseCardLoading from '../modalsandprops/CourseCardLoading';

export default function CourseListMaintenance() {
const {user} = useStateContext()

// //Filter Options and Categories
// const [filter, setfilter] = useState([
//     {
//         id:'coursetype',
//         name: 'Course Type',
//         option: [
//             {value: 'softskill' , label: 'Soft Skill Training', checked: false },
//             {value: 'technical' , label: 'Technical Training', checked: false },
//             {value: 'leadership' , label: 'Compliance Training', checked: false },
//         ]
//     },
//     {
//         id:'coursecategory',
//         name: 'Course Category',
//         option: [
//             {value: 'professionaldev' , label: 'Professional Development', checked: false },
//             {value: 'dataandanalytics' , label: 'Data and Analystics', checked: false },
//             {value: 'managementandleadership' , label: 'Management and Leadership', checked: false },
//         ]
//     },
//     {
//         id:'coursecategory',
//         name: 'Course Category',
//         option: [
//             {value: 'professionaldev' , label: 'Professional Development', checked: false },
//             {value: 'dataandanalytics' , label: 'Data and Analystics', checked: false },
//             {value: 'managementandleadership' , label: 'Management and Leadership', checked: false },
//         ]
//     }
// ])

//Modal State mounting
const [isOpen, setIsOpen] = useState(false);
const [selectedCourse, setSelectedCourse] = useState(null)

//Modal Open and Close Function
const OpenDialog = (course) => {
    toggleModal('openCard', true)
    setSelectedCourse(course)
}
const CloseDialog = () => {
    toggleModal('openCard', false)
    setIsOpen(false)
}

const [modalState, setModalState] = useState({
        openCard: false,
        openAddCourse: false,
        openFilterEditor: false,// open edit mode for filter
        insertNewCategory: false,
        openEditCourse: false,
        openDeleteCourse: false,
        editFilter: false,
        assignCourseAdmin:false,
        CourseID: null,
        loading: true,
    });

const [sort, setSort] = useState({
    nameOrder : "none",
    dateOrder : "none",
});

//Modal State
const toggleModal = (key,value) => {
    setModalState((prev => ({
        ...prev,
        [key]:value,
    })));
}

//setOrder state
const toggleSort = (key,value) => {
    setSort((prev => ({
        ...prev,
        [key]:value,
    })));
}
const setOrder = (key) => {
    const order = sort[key] === "none" ? "asc" : sort[key] === "asc" ? "desc" : "none";
    toggleSort(key, order);
}

// Action Button
const handleAction = (e,key,ID) => {
    e.stopPropagation();
    toggleModal(key, true);
    toggleModal("CourseID", ID);
}


// Checkbox Change state functions
const [isfilter, isSetfilter] = useState({});
const handleFilter = (sectionId, value) => {
    isSetfilter((prev) => ({
        ...prev,
        [sectionId]: prev[sectionId] === value ? undefined : value
    }));
}

//API Calls for the courses
const [courses, setCourses] = useState([])
const fetchCourses = () => {
    toggleModal('loading', true)
    axiosClient.get('/courses')
    .then(({ data }) => {
        setCourses(data.data)
        toggleModal('loading', false)
    })
    .catch((err) => {
        console.log(err);
    });

}


useEffect(() => {
    fetchCourses()
}, []);



    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_1fr_min-content] h-full w-full overflow-hidden'>
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
            <button className='inline-flex flex-row shadow-md items-center justify-center bg-primary font-header text-white text-base p-4 rounded-full hover:bg-primaryhover hover:scale-105 transition-all ease-in-out' onClick={()=>toggleModal('openAddCourse',true)}>
                <FontAwesomeIcon icon={faFolderPlus} className='mr-2'/>
                <p>Add Course</p>
            </button>
            </div>

            {/* Small Sorter */}
            <div className='row-start-2 col-start-1 inline-flex items-center px-5 py-3 h-fit gap-3'>
                {/* Sort by Name */}
                <div className={`flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.nameOrder === "asc" ? '!bg-primary !text-white' : sort.nameOrder === "desc" ? '!bg-primary !text-white': 'bg-secondarybackground' }`} onClick={() => setOrder("nameOrder")}>
                    <p>Name</p>
                    <FontAwesomeIcon icon={sort.nameOrder === "asc" ? faArrowUpAZ : sort.nameOrder === "desc" ? faArrowDownZA : faSort}/>
                </div>
                {/* Sort By Date-Added */}
                <div className={`flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md ${sort.dateOrder === "asc" ? '!bg-primary !text-white' : sort.dateOrder === "desc" ? '!bg-primary !text-white': 'bg-secondarybackground' }`} onClick={() => setOrder("dateOrder")}>
                    <p>Date-Added</p>
                    <FontAwesomeIcon icon={sort.dateOrder === "asc" ? faArrowUpWideShort : sort.dateOrder === "desc" ? faArrowDownShortWide : faSort}/>
                </div>
            </div>

            {/* Search bar */}
            <div className='inline-flex items-center col-start-3 row-start-2 pl-5 py-3 h-fit'>
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className='row-start-2 col-start-4 inline-flex justify-between items-center flex-row mx-5'>
                {/* Filter Header */}
                    <div>
                        <h1 className='font-header text-2xl text-primary'>Course Filter</h1>
                        <p className='text-md font-text text-unactive text-sm'>Categorize courses</p>
                    </div>
                    <div>
                    {/* Course Button */}
                    {
                        user.user_infos.roles[0]?.role_name === "System Admin" ? (

                                !modalState.editFilter ?
                                <div className='relative group aspect-square w-10 rounded-full flex items-center justify-center bg-primarybg text-primary cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out' onClick={()=>toggleModal('editFilter',true)}>
                                    <FontAwesomeIcon icon={faPen}/>
                                    <p className='absolute w-auto top-12 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Edit</p>
                                </div> :
                                <div className='relative group aspect-square w-10 rounded-full flex items-center justify-center bg-primarybg text-primary cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out' onClick={()=>toggleModal('editFilter',false)}>
                                    <FontAwesomeIcon icon={faFloppyDisk}/>
                                    <p className='absolute w-auto top-12 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Save</p>
                                </div>
                        ):null
                    }
                    </div>
            </div>
            <div className='row-start-3 row-span-3 col-start-4 flex flex-col h-full'>
                <CourseFilterProps isEdit={modalState.editFilter}/>
            </div>

            {/* Sample Card for course display */}
            {
                modalState.loading ? (
                    <div className='row-start-3 row-span-1 col-start-1 col-span-3 w-full pl-5 py-2 flex flex-col gap-2'>
                        <CourseCardLoading/>
                    </div>
                ) : (
                    <CourseListCard courseList={courses} classname='row-start-3 row-span-1 col-start-1 col-span-3 w-full pl-5 py-2 flex flex-col gap-2' onclick={OpenDialog} action={handleAction}/>
                )
            }

            {/* Sample Footer Pagenataion */}
            <div className='row-start-4 row-span-1 col-start-1 col-span-3 border-t border-divider mx-5 py-3 flex flex-row items-center justify-between'>
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
            <CourseCardModal open={modalState.openCard} close={CloseDialog} classname='relative z-10' selectedCourse={selectedCourse}/>
            {/* Add Modal */}
            <AddCourseModal open={modalState.openAddCourse} onClose={()=>toggleModal('openAddCourse',false)}/>
            {/* Edit */}
            <EditCourseModal open={modalState.openEditCourse} close={()=>toggleModal('openEditCourse', false)}/>
            {/* Delete */}
            <DeleteCourseModal open={modalState.openDeleteCourse} close={()=>toggleModal('openDeleteCourse', false)}/>
            {/* Assign Course Admin */}
            <AssignCourseAdmin courseID={modalState.CourseID} open={modalState.assignCourseAdmin} close={()=>toggleModal('assignCourseAdmin',false)}/>
        </div>

    )
}
