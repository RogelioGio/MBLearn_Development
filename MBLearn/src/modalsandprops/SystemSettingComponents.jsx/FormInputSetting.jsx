import { faChevronLeft, faChevronRight, faFilter, faPenToSquare, faPlus, faTrash, faUserLock, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useOption } from "MBLearn/src/contexts/AddUserOptionProvider"
import { useState, useEffect } from "react";
import { format } from "date-fns";
import React from "react";
import { ScrollArea } from "MBLearn/src/components/ui/scroll-area";
import AddFormInputModal from "./AddFormInput.Modal";
import EditFormInputModal from "./EditFormInput.Modal";
import DeleteFormInputModal from "./DeleteFormInputModal";

//Front end Pagination
const usePagination = (data, itemPerpage = 2) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexFirstItem = (currentPage - 1) * itemPerpage;
    const indexLastItem = Math.min(indexFirstItem + itemPerpage, data?.length);
    const currentPaginated = data?.slice(indexFirstItem, indexLastItem)
    const totalPage = Math.ceil(data?.length / itemPerpage)
    const totalitem = data?.length

    //Pagination Controll
    const goto = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPage) setCurrentPage(pageNum);
    }
    const next = () => {
        // setCurrentPage((prev) => Math.min(prev + 1, totalPage));
        if (currentPage < totalPage) setCurrentPage(currentPage + 1)
    };

    const back = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return {
        currentPaginated,
        currentPage,
        totalPage,
        indexFirstItem,
        indexLastItem,
        totalitem,
        goto,
        next,
        back
    }
}

const FormInputSetting = () => {
    const {departments, titles, cities, location, division, section} = useOption();
    const [loading, setLoading] = useState()
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const [_delete, setDelete] = useState(false)
    const [entry, setEntry] = useState()
    const [formInput, setFormInput] = useState()
    const [branches, setBranches] = useState()

    const { currentPaginated: currentDivision, indexFirstItem: fromDivision, indexLastItem: toDivision, totalitem: totalDivision, next: nextDivision, back: backDivision ,goto: gotoDivision, currentPage: currentPageDivision, totalPage: TotalPageDivision } = usePagination(division, 5);
    const { currentPaginated: currentDepartment, indexFirstItem: fromDepartment, indexLastItem: toDepartment, totalitem: totalDepartment, next: nextDepartment, back: backDepartment ,goto: gotoDepartment, currentPage: currentPageDepartment, totalPage: TotalPageDepartment } = usePagination(departments, 5);

    const { currentPaginated: currentSection, indexFirstItem: fromSection, indexLastItem: toSection, totalitem: totalSection, next: nextSection, back: backSection ,goto: gotoSection, currentPage: currentPageSection, totalPage: TotalPageSection } = usePagination(section, 5);
    const { currentPaginated: currentCity, indexFirstItem: fromCity, indexLastItem: toCity, totalitem: totalCity, next: nextCity, back: backCity ,goto: gotoCity, currentPage: currentPageCity, totalPage: TotalPageCity } = usePagination(cities, 5);
    const { currentPaginated: currentBranch, indexFirstItem: fromBranch, indexLastItem: toBranch, totalitem: totalBranch, next: nextBranch, back: backBranch ,goto: gotoBranch, currentPage: currentPageBranch, totalPage: TotalPageBranch } = usePagination(branches, 5);

    useEffect(() => {
        handleRelatedCityAndBranch(''); // Load the entire location list on initial render
    }, [location]);

    const handleRelatedCityAndBranch = (cityId) => {
        if(cityId == '') {
            setBranches(location)
            gotoBranch(1)
        } else {
            const selectedBranches = location.filter((l) => l.city_id == cityId)
            setBranches(selectedBranches)
            gotoBranch(1)
        }
    }

    const handleFormInput = (input) => {
        setFormInput(input)
        setAdd(true)
    }

    const handleEditFormInput = ({input, entry}) => {
        setFormInput(input)
        setEntry(entry)
        setEdit(true)
    }

    const handleDeleteFormInput = (input, entry) => {
        setFormInput(input)
        setEntry(entry)
        setDelete(true)
    }

    return(
        <>
        <ScrollArea className="col-span-3 row-span-3 overflow-y-auto max-h-[calc(100vh-6.25rem)]">
        <div className="mx-2 px-3 py-5 row-span-2 col-span-3 grid grid-cols-2 grid-rows-[min-content_auto] gap-8 overflow-y-auto max-h-full">
            {/* Header */}
            <div className="row-span-1 col-span-2 flex flex-row justify-between items-center pb-2">
                <div>
                    <h1 className="font-header text-primary text-xl">Form-Input Setting</h1>
                    <p className="font-text text-unactive text-xs">Manage all available inputs that are going to be used in several forms in the system</p>
                </div>
            </div>

            {/* Employee Division */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                 {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Division Options</h1>
                        <p className="font-text text-unactive text-xs">List of available employee division option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={() => handleFormInput("Division")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add Employee Division</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                    <table className='text-left w-full overflow-y-scroll'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                        <tr>
                            <th className='py-4 px-4 uppercase'>Employee Division Name</th>
                            <th className='py-4 px-4 uppercase'>Date-added</th>
                            <th className='py-4 px-4 uppercase'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            loading ? (
                                "Loading..."
                            ):(
                                currentDivision.map((division =>(
                                    <tr key={division.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                        <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{division.division_name}</td>
                                        <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(division.created_at), "MMMM dd, yyyy")}</td>
                                        <td className="flex flex-row gap-2 justify-end p-4">
                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                onClick={() => handleEditFormInput({ input: "Division", entry: division })}>
                                                <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                            </div>
                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                onClick={()=>handleDeleteFormInput("Division",division)}>
                                                <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ))
                        }
                    </tbody>
                    </table>
                </div>
                <div className="flex flex-row justify-between items-center">

                    <div>
                        <p className='text-sm font-text text-unactive'>
                            Showing <span className='font-header text-primary'>{fromDivision + 1}</span> to <span className='font-header text-primary'>{toDivision}</span> of <span className='font-header text-primary'>{totalDivision}</span> <span className='text-primary'>results</span>
                        </p>
                    </div>

                    <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a
                            onClick={backDivision}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {
                            Array.from({ length: TotalPageDivision }, (_, i) => (
                                <a
                                    key={i}
                                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                        ${
                                            currentPageDivision === i + 1
                                            ? 'bg-primary text-white'
                                            : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                        } transition-all ease-in-out`}
                                    onClick={() => gotoDivision(i + 1)}
                                >
                                    {i + 1}
                                </a>))
                        }
                        {/*
                        */}
                        <a
                            onClick={nextDivision}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>

                </div>
                </div>
            </div>
            {/* Employee's Department */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Department Options</h1>
                        <p className="font-text text-unactive text-xs">List of available department option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={() => handleFormInput("Department")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add Department</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Department Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    currentDepartment.map((department =>(
                                        <tr key={department.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{department.department_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(department.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className='text-sm font-text text-unactive'>
                            Showing <span className='font-header text-primary'>{fromDepartment + 1}</span> to <span className='font-header text-primary'>{toDepartment}</span> of <span className='font-header text-primary'>{totalDepartment}</span> <span className='text-primary'>results</span>
                        </p>
                    </div>

                    <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a
                            onClick={backDepartment}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {
                            Array.from({ length: TotalPageDepartment }, (_, i) => (
                                <a
                                    key={i}
                                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                        ${
                                            currentPageDepartment === i + 1
                                            ? 'bg-primary text-white'
                                            : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                        } transition-all ease-in-out`}
                                    onClick={() => gotoDepartment(i + 1)}
                                >
                                    {i + 1}
                                </a>))
                        }
                        {/*
                        */}
                        <a
                            onClick={nextDepartment}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>

                    </div>

                </div>
            </div>
            {/* Employee's Title */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Title Options</h1>
                        <p className="font-text text-unactive text-xs">List of available employee title option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={() => handleFormInput("Title")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add Employee Title</p>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Department Selector */}
                    <div className="grid grid-cols-1">
                        <select id="role" name="role" className="appearance-none font-text col-start-1 row-start-1 border border-primary rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                            // value={formik.values.role}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}\
                            >
                            <option value=''>Select Department</option>
                            {
                                departments.map((department) => (
                                    <option key={department.id} value={department.id}>{department.department_name}</option>
                                ))
                            }
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    {/* {formik.touched.role && formik.errors.role ? (<div className="text-red-500 text-xs font-text">{formik.errors.role}</div>):null} */}
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Employee Title Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    titles.map((title =>(
                                        <tr key={title.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{title.title_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(title.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                </div>
            </div>
            {/* Employee's Section */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Sections Options</h1>
                        <p className="font-text text-unactive text-xs">List of available employee sections option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={()=>handleFormInput("Section")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add Employee Section</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Employee Section Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    currentSection.map((section =>(
                                        <tr key={section.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{section.section_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(section.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className='text-sm font-text text-unactive'>
                            Showing <span className='font-header text-primary'>{fromSection + 1}</span> to <span className='font-header text-primary'>{toSection}</span> of <span className='font-header text-primary'>{totalSection}</span> <span className='text-primary'>results</span>
                        </p>
                    </div>

                    <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a
                            onClick={backSection}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {
                            Array.from({ length: TotalPageSection }, (_, i) => (
                                <a
                                    key={i}
                                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                        ${
                                            currentPageSection === i + 1
                                            ? 'bg-primary text-white'
                                            : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                        } transition-all ease-in-out`}
                                    onClick={() => gotoSection(i + 1)}
                                >
                                    {i + 1}
                                </a>))
                        }
                        {/*
                        */}
                        <a
                            onClick={nextSection}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                    </div>

                </div>
            </div>
            {/* Employee's City */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Branch City Option</h1>
                        <p className="font-text text-unactive text-xs">List of available city option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={()=>handleFormInput("City")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add City</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>City Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    currentCity.map((city =>(
                                        <tr key={city.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{city.city_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(city.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className='text-sm font-text text-unactive'>
                            Showing <span className='font-header text-primary'>{fromCity + 1}</span> to <span className='font-header text-primary'>{toCity}</span> of <span className='font-header text-primary'>{totalCity}</span> <span className='text-primary'>results</span>
                        </p>
                    </div>

                    <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a
                            onClick={backCity}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {
                            Array.from({ length: TotalPageCity }, (_, i) => (
                                <a
                                    key={i}
                                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                        ${
                                            currentPageCity === i + 1
                                            ? 'bg-primary text-white'
                                            : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                        } transition-all ease-in-out`}
                                    onClick={() => gotoCity(i + 1)}
                                >
                                    {i + 1}
                                </a>))
                        }
                        {/*
                        */}
                        <a
                            onClick={nextCity}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>

                    </div>

                </div>
            </div>
            {/* Employee's Branch */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Branch Location Option</h1>
                        <p className="font-text text-unactive text-xs">List of available employee title option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={()=>handleFormInput("Branch")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add Branch Location</p>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Department Selector */}
                    <div className="grid grid-cols-1">
                        <select id="role" name="role" className="appearance-none font-text col-start-1 row-start-1 border border-primary rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                            //value=''
                            onChange={(e) => handleRelatedCityAndBranch(e.target.value)}
                            // onBlur={formik.handleBlur}\
                            >
                                <option value=''>Select a city</option>
                            {
                                cities.map((city) => (
                                    <option key={city.id} value={city.id}>{city.city_name}</option>
                                ))
                            }
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    {/* {formik.touched.role && formik.errors.role ? (<div className="text-red-500 text-xs font-text">{formik.errors.role}</div>):null} */}
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Employee Branch Location Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    currentBranch?.map((location =>(
                                        <tr key={location.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{location.branch_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(location.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className='text-sm font-text text-unactive'>
                            Showing <span className='font-header text-primary'>{fromBranch + 1}</span> to <span className='font-header text-primary'>{toBranch}</span> of <span className='font-header text-primary'>{totalBranch}</span> <span className='text-primary'>results</span>
                        </p>
                    </div>

                    <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a
                            onClick={backBranch}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {
                            Array.from({ length: TotalPageBranch }, (_, i) => (
                                <a
                                    key={i}
                                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                        ${
                                            currentPageDivision === i + 1
                                            ? 'bg-primary text-white'
                                            : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                        } transition-all ease-in-out`}
                                    onClick={() => gotoBranch(i + 1)}
                                >
                                    {i + 1}
                                </a>))
                        }
                        {/*
                        */}
                        <a
                            onClick={nextBranch}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>

                    </div>
                </div>
            </div>

        </div>
        </ScrollArea>
        <AddFormInputModal isOpen={add} onClose={()=>setAdd(false)} formInput={formInput}/>
        <EditFormInputModal open={edit} close={()=>setEdit(false)} formInput={formInput} formInputEntry={entry}/>
        <DeleteFormInputModal open={_delete} close={()=>setDelete(false)} formInput={formInput} formInputEntry={entry} />
        </>
    )
}
export default FormInputSetting
