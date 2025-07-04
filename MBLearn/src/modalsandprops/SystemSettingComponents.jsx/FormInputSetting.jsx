import { faChevronLeft, faChevronRight, faFilter, faPenToSquare, faPlus, faSpinner, faTrash, faUserLock, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useOption } from "MBLearn/src/contexts/AddUserOptionProvider"
import { useState, useEffect } from "react";
import { format } from "date-fns";
import React from "react";
import { ScrollArea } from "MBLearn/src/components/ui/scroll-area";
import AddFormInputModal from "./AddFormInput.Modal";
import EditFormInputModal from "./EditFormInput.Modal";
import DeleteFormInputModal from "./DeleteFormInputModal";
import { useStateContext } from "MBLearn/src/contexts/ContextProvider";

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
    const {user} = useStateContext()
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

    useEffect(()=>{
        if(departments.length <= 0){
            console.log("loading pa yan sya")
            setLoading(true);
            return
        }
        setLoading(false)
    },[departments,titles,cities,location,division,division])

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
            <div className="flex flex-col gap-5">
                {/* Employee Division */}
                <div className="row-span-1 col-span-2 flex flex-col gap-5 border-b border-divider pb-4">
                    {/* Header */}
                    <div className="flex flex-row justify-between">
                        <div>
                            <h1 className="font-header text-primary text-base">Employee's Division Options</h1>
                            <p className="font-text text-unactive text-xs">List of available employee division option for the system inputs and form</p>
                        </div>
                        {
                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "AddFormInput") ?
                            <div className="group relative">
                                <div className={`flex flex-row justify-center items-center border-2 border-primary font-header bg-secondarybackground rounded-md text-primary gap-5 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out shadow-md
                                                h-10 w-10
                                                md:py-2 md:px-8 md:h-full md:w-full`}
                                    onClick={() => handleFormInput("Division")}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    <p className="hidden md:block">Add Division</p>
                                </div>
                                <div className="md:hidden absolute text-center top-12 right-0 font-text text-xs bg-tertiary p-2 shadow-md rounded-md text-white whitespace-nowrap scale-0 group-hover:scale-100 transition-all ease-in-out">
                                    Add Division
                                </div>
                            </div> : null
                        }
                    </div>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Division Name</th>
                                <th className='py-4 px-4 uppercase hidden md:table-cell'>Date-added</th>
                                <th className='py-4 px-4 uppercase hidden md:table-cell'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    <tr>
                                        <td colSpan={1} className="flex flex-row items-center justify-center md:hidden py-4 gap-x-2">
                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                            <p className="font-text text-xs">Loading Items...</p>
                                        </td>
                                        <td colSpan={3} className="md:table-cell hidden py-4 ">
                                            <div className="flex flex-row items-center justify-center gap-x-2">
                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                <p className="font-text text-xs">Loading Items...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ):(
                                    currentDivision?.map((division =>(
                                        <tr key={division.id} className={`font-text text-md hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center justify-between gap-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                <p className="hidden md:block">{division.division_name}</p>
                                                <div className="flex flex-col
                                                                md:hidden">
                                                    <p>
                                                        {division.division_name}
                                                    </p>
                                                    <p className="text-xs font-text text-unactive">Date Added: {format(new Date(division.created_at), "MMMM dd, yyyy")}</p>
                                                </div>
                                                <div className="flex flex-row gap-1
                                                                md:hidden">
                                                    {
                                                    user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                    <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                        onClick={() => handleEditFormInput({ input: "Division", entry: division })}>
                                                        <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                    </div> : null
                                                    }
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                            onClick={()=>handleDeleteFormInput("Division",division)}>
                                                            <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                        </div> : null
                                                    }
                                                </div>
                                            </td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out hidden md:table-cell text-unactive`}>{format(new Date(division.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex-row gap-2 justify-end p-4 hidden md:flex">
                                                {
                                                    user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                    <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                        onClick={() => handleEditFormInput({ input: "Division", entry: division })}>
                                                        <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                    </div> : null
                                                }
                                                {
                                                    user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                    <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                        onClick={()=>handleDeleteFormInput("Division",division)}>
                                                        <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                    </div> : null
                                                }
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        {
                            !loading ?
                            <>
                                <div>
                                    <p className='text-sm font-text text-unactive'>
                                        Showing <span className='font-header text-primary'>{fromDivision + 1}</span> to <span className='font-header text-primary'>{toDivision}</span> of <span className='font-header text-primary'>{totalDivision}</span> <span className='text-primary'>results</span>
                                    </p>
                                </div>

                                <div>
                                <nav className='isolate inline-flex -space-x-px round-md shadow-xs cursor-pointer'>
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
                            </>
                            :
                            <>
                                <div>
                                    <p className="text-xs font-text text-unactive">
                                        Loading Items Please Wait...
                                    </p>
                                </div>
                            </>
                        }
                    </div>
                </div>
                {/* Employee's Department */}
                <div className="row-span-1 col-span-2 flex flex-col gap-5 border-b border-divider pb-4">
                    {/* Header */}
                    <div className="flex flex-row justify-between">
                        <div>
                            <h1 className="font-header text-primary text-base">Employee's Department Options</h1>
                            <p className="font-text text-unactive text-xs">List of available department option for the system inputs and form</p>
                        </div>
                        {
                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "AddFormInput") ?
                            <div className="group relative">
                                <div className={`flex flex-row justify-center items-center border-2 border-primary font-header bg-secondarybackground rounded-md text-primary gap-5 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out shadow-md
                                                h-10 w-10
                                                md:py-2 md:px-8 md:h-full md:w-full`}
                                    onClick={() => handleFormInput("Department")}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                        <p className="hidden md:block">Add Department</p>
                                </div>
                                <div className="md:hidden absolute text-center top-12 right-0 font-text text-xs bg-tertiary p-2 shadow-md rounded-md text-white whitespace-nowrap scale-0 group-hover:scale-100 transition-all ease-in-out">
                                    Add Department
                                </div>
                            </div> : null
                        }
                    </div>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                            <table className='text-left w-full overflow-y-scroll'>
                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                <tr>
                                    <th className='py-4 px-4 uppercase'>Department Name</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'>Date-added</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                {
                                    loading ? (
                                        <tr>
                                            <td colSpan={1} className="flex flex-row items-center justify-center md:hidden py-4 gap-x-2">
                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                <p className="font-text text-xs">Loading Items...</p>
                                            </td>
                                            <td colSpan={3} className="md:table-cell hidden py-4 ">
                                                <div className="flex flex-row items-center justify-center gap-x-2">
                                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                    <p className="font-text text-xs">Loading Items...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ):(
                                        currentDepartment?.map((department =>(
                                            <tr key={department.id} className={`font-text text-md hover:bg-gray-200 cursor-pointer`}>
                                                <td className={`font-text p-4 flex flex-row items-center justify-between gap-4 border-l-2 border-transparent transition-all ease-in-out`}>

                                                    <p className="hidden md:block">{department.department_name}</p>
                                                    <div className="flex flex-col
                                                                    md:hidden">
                                                        <p>
                                                            {department.department_name}
                                                        </p>
                                                        <p className="text-xs font-text text-unactive">Date Added: {format(new Date(department.created_at), "MMMM dd, yyyy")}</p>
                                                    </div>
                                                    <div className="flex flex-row gap-1
                                                                    md:hidden">
                                                        {
                                                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                                onClick={() => handleEditFormInput({ input: "Department", entry: department })}>
                                                                <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                            </div> : null
                                                        }
                                                        {
                                                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                                onClick={()=>handleDeleteFormInput("Department", department)}>
                                                                <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </td>
                                                <td className={`font-text p-4 gap-4 transition-all ease-in-out hidden md:table-cell text-unactive`}>{format(new Date(department.created_at), "MMMM dd, yyyy")}</td>
                                                <td className="flex-row gap-2 justify-end p-4 hidden md:flex">
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                            onClick={() => handleEditFormInput({ input: "Department", entry: department })}>
                                                            <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                        </div> : null
                                                    }
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                            onClick={()=>handleDeleteFormInput("Department", department)}>
                                                            <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                        </div> : null
                                                    }
                                                </td>

                                            </tr>
                                        ))
                                    ))
                                }
                            </tbody>
                            </table>
                        </div>
                    <div className="flex flex-row justify-between items-center">
                        {
                            !loading ?
                            <>
                                <div>
                                    <p className='text-sm font-text text-unactive'>
                                        Showing <span className='font-header text-primary'>{fromDepartment + 1}</span> to <span className='font-header text-primary'>{toDepartment}</span> of <span className='font-header text-primary'>{totalDepartment}</span> <span className='text-primary'>results</span>
                                    </p>
                                </div>

                                <div>
                                <nav className='isolate inline-flex -space-x-px round-md shadow-xs cursor-pointer'>
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
                            </>
                            :
                            <>
                            <div>
                                    <p className="text-xs font-text text-unactive">
                                        Loading Items Please Wait...
                                    </p>
                                </div>
                            </>
                        }


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
                        {
                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "AddFormInput") ?
                            <div className="group relative">
                                <div className={`flex flex-row justify-center items-center border-2 border-primary font-header bg-secondarybackground rounded-md text-primary gap-5 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out shadow-md
                                                h-10 w-10
                                                md:py-2 md:px-8 md:h-full md:w-full`}
                                    onClick={() => handleFormInput("Title")}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    <p className="hidden md:block">Add Title</p>
                                </div>
                                <div className="md:hidden absolute text-center top-12 right-0 font-text text-xs bg-tertiary p-2 shadow-md rounded-md text-white whitespace-nowrap scale-0 group-hover:scale-100 transition-all ease-in-out">
                                    Add Title
                                </div>
                            </div> : null
                        }
                    </div>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                            <table className='text-left w-full overflow-y-scroll'>
                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                <tr>
                                    <th className='py-4 px-4 uppercase'>Title Name</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'>Date-added</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                {
                                    loading ? (
                                        <tr>
                                            <td colSpan={1} className="flex flex-row items-center justify-center md:hidden py-4 gap-x-2">
                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                <p className="font-text text-xs">Loading Items...</p>
                                            </td>
                                            <td colSpan={3} className="md:table-cell hidden py-4 ">
                                                <div className="flex flex-row items-center justify-center gap-x-2">
                                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                    <p className="font-text text-xs">Loading Items...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ):(
                                        titles?.map((title =>(
                                            <tr key={title.id} className={`font-text text-md hover:bg-gray-200 cursor-pointer`}>
                                                <td className={`font-text p-4 flex flex-row justify-between items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                    <p className="hidden md:block"> {title.title_name}</p>
                                                    <div className="flex flex-col
                                                                    md:hidden">
                                                    <p>{title.title_name}</p>
                                                    <p className="text-xs font-text text-unactive">Date Added: {format(new Date(title.created_at), "MMMM dd, yyyy")}</p>
                                                    </div>
                                                    <div className="flex flex-row gap-1
                                                                    md:hidden">
                                                        {
                                                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                                onClick={() => handleEditFormInput({ input: "Title", entry: title })}>
                                                                <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                            </div> : null
                                                        }
                                                        {
                                                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                                onClick={()=>handleDeleteFormInput("Title", title)}>
                                                                <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                            </div> : null
                                                        }
                                                    </div>
                                                    </td>
                                                <td className={`font-text p-4 gap-4 transition-all ease-in-out text-unactive hidden md:table-cell`}>{format(new Date(title.created_at), "MMMM dd, yyyy")}</td>
                                                <td className="flex-row gap-2 justify-end p-4 hidden md:flex">
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '
                                                            onClick={() => handleEditFormInput({ input: "Title", entry: title })}>
                                                            <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                        </div> : null
                                                    }
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                            onClick={()=>handleDeleteFormInput("Title", title)}>
                                                            <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                        </div> : null
                                                    }
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
                <div className="row-span-1 col-span-2 flex flex-col gap-5 border-b border-divider pb-4">
                    {/* Header */}
                    <div className="flex flex-row justify-between">
                        <div>
                            <h1 className="font-header text-primary text-base">Employee's Sections Options</h1>
                            <p className="font-text text-unactive text-xs">List of available employee sections option for the system inputs and form</p>
                        </div>
                        {
                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "AddFormInput") ?
                            <div className="group relative">
                                <div className={`flex flex-row justify-center items-center border-2 border-primary font-header bg-secondarybackground rounded-md text-primary gap-5 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out shadow-md
                                                h-10 w-10
                                                md:py-2 md:px-8 md:h-full md:w-full`}
                                    onClick={()=>handleFormInput("Section")}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    <p className="md:block hidden">Add Section</p>
                                </div>
                                <div className="md:hidden absolute text-center top-12 right-0 font-text text-xs bg-tertiary p-2 shadow-md rounded-md text-white whitespace-nowrap scale-0 group-hover:scale-100 transition-all ease-in-out">
                                    Add Section
                                </div>
                            </div> : null
                        }
                    </div>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                            <table className='text-left w-full overflow-y-scroll'>
                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                <tr>
                                    <th className='py-4 px-4 uppercase'>Employee Section Name</th>
                                    <th className='py-4 px-4 uppercase hidden md:table-cell'>Date-added</th>
                                    <th className='py-4 px-4 uppercase hidden md:table-cell'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                {
                                    loading ? (
                                        <tr>
                                            <td colSpan={1} className="flex flex-row items-center justify-center md:hidden py-4 gap-x-2">
                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                <p className="font-text text-xs">Loading Items...</p>
                                            </td>
                                            <td colSpan={3} className="md:table-cell hidden py-4 ">
                                                <div className="flex flex-row items-center justify-center gap-x-2">
                                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                    <p className="font-text text-xs">Loading Items...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ):(
                                        currentSection?.map((section =>(
                                            <tr key={section.id} className={`font-text text-md hover:bg-gray-200 cursor-pointer`}>
                                                <td className={`font-text p-4 flex flex-row justify-between items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                    <p className="hidden md:block">{section.section_name}</p>
                                                    <div className="flex flex-col md:hidden">
                                                        <p>{section.section_name}</p>
                                                        <p className="text-xs font-text text-unactive">Date Added: {format(new Date(section.created_at), "MMMM dd, yyyy")}</p>
                                                    </div>
                                                    <div className="flex flex-row gap-1
                                                                    md:hidden">

                                                        {
                                                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                                onClick={() => handleEditFormInput({ input: "Section", entry: section })}>
                                                                <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                            </div> : null
                                                        }
                                                        {
                                                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                                onClick={()=>handleDeleteFormInput("Section", section)}>
                                                                <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </td>
                                                <td className={`font-text p-4 gap-4 transition-all ease-in-out hidden md:table-cell text-unactive`}>{format(new Date(section.created_at), "MMMM dd, yyyy")}</td>
                                                <td className="flex-row gap-2 justify-end p-4 hidden md:flex">
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                            onClick={() => handleEditFormInput({ input: "Section", entry: section })}>
                                                            <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                        </div> : null
                                                    }
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                            onClick={()=>handleDeleteFormInput("Section", section)}>
                                                            <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                        </div> : null
                                                    }
                                                </td>

                                            </tr>
                                        ))
                                    ))
                                }
                            </tbody>
                            </table>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        {
                            !loading ?
                            <>
                                <div>
                                    <p className='text-sm font-text text-unactive'>
                                        Showing <span className='font-header text-primary'>{fromSection + 1}</span> to <span className='font-header text-primary'>{toSection}</span> of <span className='font-header text-primary'>{totalSection}</span> <span className='text-primary'>results</span>
                                    </p>
                                </div>

                                <div>
                                <nav className='isolate inline-flex -space-x-px round-md shadow-xs cursor-pointer'>
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
                            </> : <>
                                <div>
                                    <p className="text-xs font-text text-unactive">
                                        Loading Items Please Wait...
                                    </p>
                                </div>
                            </>
                        }

                    </div>
                </div>
                {/* Employee's City */}
                <div className="row-span-1 col-span-2 flex flex-col gap-5 border-b border-divider pb-4">
                    {/* Header */}
                    <div className="flex flex-row justify-between">
                        <div>
                            <h1 className="font-header text-primary text-base">Employee's Branch City Option</h1>
                            <p className="font-text text-unactive text-xs">List of available city option for the system inputs and form</p>
                        </div>
                        {
                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "AddFormInput") ?
                            <div className="group relative">
                                <div className={`flex flex-row justify-center items-center border-2 border-primary font-header bg-secondarybackground rounded-md text-primary gap-5 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out shadow-md
                                                h-10 w-10
                                                md:py-2 md:px-8 md:h-full md:w-full`}
                                    onClick={()=>handleFormInput("City")}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    <p className="md:block hidden">Add City</p>
                                </div>
                                <div className="md:hidden absolute text-center top-12 right-0 font-text text-xs bg-tertiary p-2 shadow-md rounded-md text-white whitespace-nowrap scale-0 group-hover:scale-100 transition-all ease-in-out">
                                    Add City
                                </div>
                            </div> : null
                        }
                    </div>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                            <table className='text-left w-full overflow-y-scroll'>
                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                <tr>
                                    <th className='py-4 px-4 uppercase'>City Name</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'>Date-added</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                {
                                    loading ? (
                                        <tr>
                                            <td colSpan={1} className="flex flex-row items-center justify-center md:hidden py-4 gap-x-2">
                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                <p className="font-text text-xs">Loading Items...</p>
                                            </td>
                                            <td colSpan={3} className="md:table-cell hidden py-4 ">
                                                <div className="flex flex-row items-center justify-center gap-x-2">
                                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                    <p className="font-text text-xs">Loading Items...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ):(
                                        currentCity?.map((city =>(
                                            <tr key={city.id} className={`font-text text-md hover:bg-gray-200 cursor-pointer`}>
                                                <td className={`font-text p-4 flex flex-row justify-between items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                    <p className="md:block hidden">{city.city_name}</p>
                                                    <div className="flex flex-col
                                                                    md:hidden">
                                                        <p>{city.city_name}</p>
                                                        <p className="text-xs font-text text-unactive">Date Added: {format(new Date(city.created_at), "MMMM dd, yyyy")}</p>
                                                    </div>
                                                    <div className="flex flex-row gap-1
                                                                    md:hidden">
                                                        {
                                                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                                onClick={() => handleEditFormInput({ input: "City", entry: city })}>
                                                                <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                            </div> : null
                                                        }
                                                        {
                                                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                                onClick={()=>handleDeleteFormInput("City", city)}>
                                                                <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                            </div>:null
                                                        }
                                                    </div>
                                                </td>
                                                <td className={`font-text p-4 gap-4 transition-all ease-in-out md:table-cell hidden text-unactive`}>{format(new Date(city.created_at), "MMMM dd, yyyy")}</td>
                                                <td className="flex-row gap-2 justify-end p-4 md:flex hidden">
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                            onClick={() => handleEditFormInput({ input: "City", entry: city })}>
                                                            <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                        </div> : null
                                                    }
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                            onClick={()=>handleDeleteFormInput("City", city)}>
                                                            <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                        </div>:null
                                                    }
                                                </td>

                                            </tr>
                                        ))
                                    ))
                                }
                            </tbody>
                            </table>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        {
                            !loading ?
                            <>
                                <div>
                                    <p className='text-sm font-text text-unactive'>
                                        Showing <span className='font-header text-primary'>{fromCity + 1}</span> to <span className='font-header text-primary'>{toCity}</span> of <span className='font-header text-primary'>{totalCity}</span> <span className='text-primary'>results</span>
                                    </p>
                                </div>

                                <div>
                                <nav className='isolate inline-flex -space-x-px round-md shadow-xs cursor-pointer'>
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
                            </> : <>
                                <div>
                                    <p className="text-xs font-text text-unactive">
                                        Loading Items Please Wait...
                                    </p>
                                </div>
                            </>
                        }
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
                        {
                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "AddFormInput") ?
                            <div className="relative group">
                                <div className={`flex flex-row justify-center items-center border-2 border-primary font-header bg-secondarybackground rounded-md text-primary gap-5 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out shadow-md
                                                h-10 w-10
                                                md:py-2 md:px-8 md:h-full md:w-full`}
                                    onClick={()=>handleFormInput("Branch")}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    <p className="hidden md:block">Add Branch Location</p>
                                </div>
                                <div className="md:hidden absolute text-center top-12 right-0 font-text text-xs bg-tertiary p-2 shadow-md rounded-md text-white whitespace-nowrap scale-0 group-hover:scale-100 transition-all ease-in-out">
                                    Add Branch Location
                                </div>
                            </div>:null
                        }
                    </div>
                    <div>
                        {/*City Selector */}
                        <div className="grid grid-cols-1">
                            <select id="city" name="city" className={`appearance-none font-text col-start-1 row-start-1 border border-primary rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary ${loading ? "opacity-50 hover:cursor-not-allowed":"hover:cursor-pointer"}`}
                                onChange={(e) => handleRelatedCityAndBranch(e.target.value)}
                                disabled={loading}
                                >
                                    <option value=''>{loading ? "Loading Items":"Select City"}</option>
                                {
                                    cities?.map((city) => (
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
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'>Date-added</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                {
                                    loading ? (
                                        <tr>
                                            <td colSpan={1} className="flex flex-row items-center justify-center md:hidden py-4 gap-x-2">
                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                <p className="font-text text-xs">Loading Items...</p>
                                            </td>
                                            <td colSpan={3} className="md:table-cell hidden py-4 ">
                                                <div className="flex flex-row items-center justify-center gap-x-2">
                                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                                    <p className="font-text text-xs">Loading Items...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ):(
                                        currentBranch?.map((location =>(
                                            <tr key={location.id} className={`font-text text-md hover:bg-gray-200 cursor-pointer`}>
                                                <td className={`font-text p-4 flex justify-between flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                    <p className="md:block hidden">{location.branch_name}</p>
                                                    <div className="flex flex-col
                                                                    md:hidden">
                                                        <p>{location.branch_name}</p>
                                                        <p className="text-xs font-text text-unactive">Date Added: {format(new Date(location.created_at), "MMMM dd, yyyy")}</p>
                                                    </div>
                                                    <div className="flex flex-row gap-1 md:hidden">
                                                        {
                                                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '
                                                                onClick={() => handleEditFormInput({ input: "Branch", entry: location })}>
                                                                <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                            </div> : null
                                                        }
                                                        {
                                                            user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '
                                                                onClick={()=>handleDeleteFormInput("Branch", location)}>
                                                                <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </td>
                                                <td className={`font-text p-4 gap-4 transition-all ease-in-out md:table-cell hidden text-unactive`}>{format(new Date(location.created_at), "MMMM dd, yyyy")}</td>
                                                <td className="flex-row gap-2 justify-end p-4 md:flex hidden">
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "EditFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '
                                                            onClick={() => handleEditFormInput({ input: "Branch", entry: location })}>
                                                            <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                        </div> : null
                                                    }
                                                    {
                                                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "DeleteFormInput") ?
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '
                                                            onClick={()=>handleDeleteFormInput("Branch", location)}>
                                                            <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                        </div> : null
                                                    }
                                                </td>

                                            </tr>
                                        ))
                                    ))
                                }
                            </tbody>
                            </table>
                        </div>
                    <div className="flex flex-row justify-between items-center">
                        {
                            !loading ?
                            <>
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

                            </>
                            :<>
                                <div>
                                    <p className="text-xs font-text text-unactive">
                                        Loading Items Please Wait...
                                    </p>
                                </div>
                            </>
                        }
                        </div>
                    </div>
            </div>


        <AddFormInputModal isOpen={add} onClose={()=>setAdd(false)} formInput={formInput}/>
        <EditFormInputModal open={edit} close={()=>setEdit(false)} formInput={formInput} formInputEntry={entry}/>
        <DeleteFormInputModal open={_delete} close={()=>setDelete(false)} formInput={formInput} formInputEntry={entry} cities={cities} />
        </>
    )
}
export default FormInputSetting
