import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import CourseListCard from '../modalsandprops/CourseListCard';
import CourseCardModal from '../modalsandprops/CourseCardModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faSearch,  faArrowUpWideShort, faArrowDownWideShort, faPlus, faMinus, faChevronUp, faChevronDown, faPenToSquare, faTrash, faChevronLeft, faChevronRight, faLaptopFile, faChalkboardTeacher, faCheck, faPen, faFloppyDisk, faArrowUpAZ, faSort, faArrowDownAZ, faArrowDownShortWide, faArrowDownZA } from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import AddCourseModal from '../modalsandprops/AddCourseModal';
import EditCourseModal from '../modalsandprops/EditCourseModal';
import DeleteCourseModal from '../modalsandprops/DeleteCourseModal';


//Sort Options Array
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
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


//Filter Options and Categories
const [filter, setfilter] = useState([
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
])

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
        openDeleteCourse: false
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

//Insert Entry
// Category
const [newFilterCategory, setNewFilterCategory] = useState([]);
const insertCategory = (e) =>{
    e.preventDefault();
    setNewFilterCategory((prev) => [...prev, {id:'', name:'',option:[]}])
}
const handleFilterCategory = (index, value) => {
    setNewFilterCategory((prev) => {
        const updatedCategories = [...prev];
        updatedCategories[index] = {
            ...updatedCategories[index],
            id: value.toLowerCase().replace(/\s+/g, ""),
            name: value,
            option:[]
        };
        return updatedCategories;
    })
}
// Filter Option
const [newFilterOption, setNewFilterOption] = useState({})
const insertOption = (e,categoryID, Index = null) =>{
    e.preventDefault();
    if(Index !== null){
        setNewFilterCategory((prev) => {
            const updatedCategories = [...prev];
            updatedCategories[Index].option.push("");
            return updatedCategories;
        })
    }else{
        setNewFilterOption((prev) => ({
            ...prev,
            [categoryID]:[...(prev[categoryID] || []), ''],
        }))
    }



}
const handleNewOption = (categoryID, index, value, Index=null) => {
    if(Index !== null){
        setNewFilterCategory((prev) => {
            const updatedCategories = [...prev];
            updatedCategories[Index].option[index] = value;
            return updatedCategories;
        });
    } else {
        setNewFilterOption((prev) => {
            const updatedOption = [...(prev[categoryID]||[])];
            updatedOption[index] = value;
            return{...prev, [categoryID]: updatedOption};
        });
    }
}

//Save Filter Options
const saveNewOptions = ()=> {
    setNewFilterOption((prev) =>{

        const updatedOptions = Object.fromEntries(
            Object.entries(prev).map(([categoryID, options]) => [
                categoryID,
                options.filter((option) => option.trim() !== "")
            ])
        );
        return updatedOptions
    })

    setfilter((prevFilters) =>
            prevFilters.map((category) =>
                newFilterOption[category.id]?.length > 0
                ?{
                    ...category,
                    option: [
                        ...category.option,
                        ...newFilterOption[category.id]
                        .filter((option) => option.trim() !== "")
                        .map((value) => ({
                            value: value.toLowerCase().replace(/\s+/g, ""),
                            label: value,
                            checked: false,
                        })),
                    ]
                }: category
            ))

    const unsavedCategoriesAndOption = newFilterCategory.map((category) =>
        ({
            ...category,
            option: (category.option||[])
            .filter((option) => option.trim() !== "") // Remove empty options
            .map((value) => ({
                value: value.toLowerCase().replace(/\s+/g, ""),
                label: value,
                checked: false,
            })),
        })
    )


            setNewFilterOption({});
            setfilter((prev) => [...prev, ...unsavedCategoriesAndOption]);
            setNewFilterCategory([]);

            // Close editor mode
            toggleModal('openFilterEditor', false);
}
// Edit Filter
const [editingFilterOption, setEditingFilterOption] = useState(null);
const [tempEditedValue, setTempEditedValue] = useState('');

const handleInputChange = (e) => {
    setTempEditedValue(e.target.value);
};
const editFilterOption = (categoryID, optionValue, isNew=false, optionLabel) => {
    setEditingFilterOption({categoryID, optionValue, isNew});
    setTempEditedValue(optionLabel);
}

const handleSave = (categoryID, oldValue, isNew) => {
    saveEditedFilterOption(categoryID, oldValue, tempEditedValue, isNew);
};

const saveEditedFilterOption = (categoryID, oldValue, newValue, isNew) => {
    if(isNew){
        setNewFilterOption((prev) => {
            const updatedOption = prev[categoryID].map((opt) => (opt === oldValue ? newValue : opt));
            return{...prev, [categoryID]: updatedOption};
        });
    } else {
        setfilter((prevFilters) =>
                prevFilters.map((category) =>
                    categoryID === category.id ? {
                        ...category,
                        option: category.option.map((option) => option.value === oldValue ? {...option, value:newValue.toLowerCase(), label: newValue} : option),
                    } : category
                )

        )
    }

    setEditingFilterOption(null);
}


//Delete Filter
const deleteFilterOption = (categoryID, optionValue, isNew = false) => {
    if(isNew){
        setNewFilterOption((prev => {
            const updatedOption = [...(prev[categoryID]||[])].filter((opt) => opt !== optionValue);
            return updatedOption.length > 0 ? { ...prev, [categoryID]: updatedOption}:{};
        }))
    } else {
        setfilter((prevFilters) =>
        prevFilters.map((category) =>
            category.id === categoryID ?
            {
                ...category,
                option: category.option.filter((option) => option.value !== optionValue),
            }:category)
        );
    }
}



// Action Button
const handleAction = (e,key) => {
    e.stopPropagation();
    toggleModal(key, true);
}
// Checkbox Change state functions
const [isfilter, isSetfilter] = useState({});
const handleFilter = (sectionId, value) => {
    isSetfilter((prev) => ({
        ...prev,
        [sectionId]: prev[sectionId] === value ? undefined : value
    }));
}


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
            <div className='inline-flex items-center col-start-3 row-start-2 px-5 py-3 h-fit'>
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className='row-start-2 col-start-4 inline-flex justify-between items-center flex-row mx-5'>
                <div>
                    {/* Filter Header */}
                    <h1 className='font-header text-2xl text-primary'>Course Filter</h1>
                    <p className='text-md font-text text-unactive text-sm'>Categorize courses</p>
                </div>
                <div>
                    {/* Course Button */}
                    {
                        !modalState.openFilterEditor ?
                        <div className='relative group aspect-square w-10 rounded-full flex items-center justify-center bg-primarybg text-primary cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out' onClick={()=>toggleModal('openFilterEditor',true)}>
                            <FontAwesomeIcon icon={faPen}/>
                            <p className='absolute w-auto top-12 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Edit</p>
                        </div> :
                        <div className='relative group aspect-square w-10 rounded-full flex items-center justify-center bg-primarybg text-primary cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out' onClick={()=>saveNewOptions()}>
                            <FontAwesomeIcon icon={faFloppyDisk}/>
                            <p className='absolute w-auto top-12 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Save</p>
                        </div>
                    }
                </div>
            </div>
            <div className='row-start-3 row-span-3 col-start-4 pl-5 pr-4 mr-2 overflow-y-auto max-h-full scrollbar-thin scrollbar-gutter scrollbar-thumb-primary scrollbar-track-primarybg scrollbar-thumb-rounded-full scrollbar-track-rounded-full sscrollbar-no-arrows'>
                <form>
                    {filter.map((section)=>(
                        <>
                        <Disclosure key={section.id} as="div" className='border-b border-divider py-6'>
                            <h3 className='-my-3 flow-root font-text text-primary'>
                                <DisclosureButton className='group flex w-full justify-between py-3 text-sm hover:text-primary transition-all ease-in-out'>
                                    <span>{section.name}</span>
                                    <span className='ml-6 flex items-center'>
                                        <FontAwesomeIcon icon={faChevronDown} className='group-data-[open]:hidden'/>
                                        <FontAwesomeIcon icon={faChevronUp} className='group-[&:not([data-open])]:hidden'/>
                                    </span>
                                </DisclosureButton>
                            </h3>
                            <DisclosurePanel className='pt-6'>
                                <div className='space-y-4'>
                                    {section.option.map((option, optionIdx) => (
                                        <div className='flex flex-row justify-between'>
                                            <div key={option.value} className='flex gap-4'>
                                            {/* Checkbox Styling */}
                                                <div className='flex h-5 shrink-0 items-center'>
                                                    {
                                                        modalState.openFilterEditor ? (
                                                            editingFilterOption?.categoryID === section.id && editingFilterOption?.optionValue === option.value
                                                            ?
                                                            <input type="text"
                                                            className='border border-unactive rounded-md p-2 text-xs focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary'
                                                            value={tempEditedValue}
                                                            onChange={handleInputChange}
                                                            onBlur={() => handleSave(section.id, option.value, false)}
                                                            onKeyDown={(e) => e.key === "Enter" && handleSave(section.id, option.value, false)}
                                                            />
                                                            :
                                                            <FontAwesomeIcon icon={faPenToSquare} className='text-unactive hover:cursor-pointer hover:text-primary transition-all ease-in-out' onClick={() => editFilterOption(section.id, option.value, false,option.label)}/>

                                                        ):(
                                                            <div className='group grid size-4 grid-cols-1'>
                                                                <input defaultValue={option.value} defaultChecked={option.checked}
                                                                id={`filter-${section.id}-${optionIdx}`} name={`${section.id}[]`} type="checkbox"
                                                                className='col-start-1 row-start-1 appearance-none rounded border border-divider bg-white checked:border-primary checked:bg-primary'
                                                                checked={isfilter[section.id] === option.value && !modalState.openFilterEditor} // Controlled state
                                                                onChange={() => handleFilter(section.id, option.value)}
                                                                disabled={modalState.openFilterEditor}/>

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
                                                        )
                                                    }
                                                </div>
                                                {
                                                    editingFilterOption?.categoryID === section.id && editingFilterOption?.optionValue === option.value
                                                    ? null :
                                                    <label htmlFor={`filter-${section.id}-${optionIdx}`} className='text-sm font-text text-black'>{option.label}</label>
                                                }
                                            </div>
                                            {/* Delete */}
                                            {
                                                modalState.openFilterEditor &&
                                                    <FontAwesomeIcon icon={faMinus} className='text-unactive cursor-pointer hover:text-primary transition-all ease-in-out' onClick={()=>deleteFilterOption(section.id,option.value)}/>
                                            }
                                        </div>

                                    ))}
                                    {
                                        newFilterOption[section.id]?.map((option, index) => (
                                            <div key={`new-${section.id}-${index}`} className='flex flex-row justify-between items-center'>
                                                <div className='flex gap-4 items-center'>
                                                    <div className='flex h-5 shrink-0 items-center'>
                                                        <FontAwesomeIcon icon={faPenToSquare} className='text-unactive hover:cursor-pointer hover:text-primary transition-all ease-in-out'/>
                                                    </div>
                                                    <input type="text"
                                                            className='border border-unactive rounded-md p-2 text-xs focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary'
                                                            value={option}
                                                            onChange={(e) => handleNewOption(section.id, index, e.target.value)}/>
                                                </div>
                                                <FontAwesomeIcon icon={faMinus} className='text-unactive cursor-pointer hover:text-primary transition-all ease-in-out' onClick={() => deleteFilterOption(section.id, option, true)}/>
                                            </div>
                                        ))
                                    }

                                    {
                                        modalState.openFilterEditor &&
                                        <button onClick={(e) => insertOption(e,section.id)} className='flex items-center gap-4 text-primary transition-all ease-in-out text-sm border border-primary py-2 px-4 rounded-full hover:bg-primary hover:text-white'>
                                            <FontAwesomeIcon icon={faPlus}/>
                                            <p className='font-text'>Add New Filter Item</p>
                                        </button>
                                    }
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                        </>
                    ))}
                    {
                        newFilterCategory.map((section, index) => (
                            <Disclosure key={`new-${index}`} as="div" className='border-b border-divider py-6'>
                                <h3 className='-my-3 flow-root font-text text-primary'>
                                    <DisclosureButton className='group flex w-full justify-between py-3 text-sm hover:text-primary transition-all ease-in-out'>
                                        <input
                                            type="text"
                                            className='border border-unactive rounded-md p-2 text-xs focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary'
                                            value={section.name}
                                            onChange={(e) => handleFilterCategory(index, e.target.value)}
                                        />

                                        <span className='ml-6 flex items-center'>
                                            <FontAwesomeIcon icon={faChevronDown} className='group-data-[open]:hidden'/>
                                            <FontAwesomeIcon icon={faChevronUp} className='group-[&:not([data-open])]:hidden'/>
                                        </span>
                                    </DisclosureButton>
                                </h3>

                                <DisclosurePanel>
                                    {
                                        section.option?.map((option, optionIndex) => (
                                            <div key={`new-${index}-${optionIndex}`} className="flex flex-row justify-between items-center">
                                                <input
                                                    type="text"
                                                    className="border border-unactive rounded-md p-2 text-xs focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                    value={option}
                                                    onChange={(e) => handleNewOption(null, optionIndex, e.target.value, index)}
                                                />

                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                    className="text-unactive cursor-pointer hover:text-primary transition-all ease-in-out"
                                                    onClick={() => {
                                                        const updatedCategories = [...newFilterCategory];
                                                        updatedCategories[index].option.splice(optionIndex, 1);
                                                        setNewFilterCategory(updatedCategories);
                                                    }}
                                                />
                                            </div>
                                        ))
                                    }
                                    {
                                        modalState.openFilterEditor &&
                                        <button
                                            onClick={(e) => insertOption(e, null, index)}
                                            className='flex items-center gap-4 text-primary transition-all ease-in-out text-sm border border-primary py-2 px-4 rounded-full hover:bg-primary hover:text-white'
                                        >
                                            <FontAwesomeIcon icon={faPlus}/>
                                            <p className='font-text'>Add New Filter Item</p>
                                        </button>
                                    }
                                </DisclosurePanel>
                            </Disclosure>
                        ))
                    }
                    {
                        modalState.openFilterEditor &&
                        <button onClick={insertCategory} className='flex items-center gap-4 text-primary transition-all ease-in-out text-sm border border-primary py-2 my-3 px-4 rounded-full hover:bg-primary hover:text-white'>
                        <FontAwesomeIcon icon={faPlus}/>
                        <p className='font-text'>Add New Filter Category</p>
                        </button>
                    }
                </form>
            </div>

            {/* Sample Card for course display */}
            <CourseListCard courseList={Courses} classname='row-start-3 row-span-1 col-start-1 col-span-3 w-full px-5 py-2 flex flex-col gap-2' onclick={OpenDialog} action={handleAction}/>

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
        </div>

    )
}
