import { faChevronLeft, faChevronRight, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { ScrollArea } from "MBLearn/src/components/ui/scroll-area";
import { useCourseContext } from "MBLearn/src/contexts/CourseListProvider";
import React, { useEffect } from "react";
import { useState } from "react";

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

const CourseFormInputSetting = ({}) => {
    const {coursetypes, coursecategories} = useCourseContext()
    const [loading, setLoading] = useState()

    useEffect(()=>{
        coursetypes.length === 0 && coursecategories.length === 0 ? (
            setLoading(true)
        ) : (
            setLoading(false)
        )
    },[coursetypes,coursecategories])

    const {
        currentPaginated: currentTypes,
        currentPage: currentPageType,
        totalPage: totalPageType,
        indexFirstItem: indexFTypes,
        indexLastItem: indexLTypes,
        totalitem: totalItemTypes,
        goto: gotoType,
        next: nextType,
        back: backType,
    } = usePagination(coursetypes, 5)
    const {
        currentPaginated: currentCategories,
        currentPage: currentPageCategory,
        totalPage: totalPageCategory,
        indexFirstItem: indexFCategory,
        indexLastItem: indexLCategory,
        totalitem: totalItemCategory,
        goto: gotoCategory,
        next: nextCategory,
        back: backCategory,
    } = usePagination(coursecategories, 5)
    return(
        <>
                {/* Course Category */}
                <div className="row-span-1 col-span-2 flex flex-col gap-5">
                    {/* Header */}
                    <div className="flex flex-row justify-between">
                        <div>
                            <h1 className="font-header text-primary text-base">Course Category Options</h1>
                            <p className="font-text text-unactive text-xs">List of available course category option for the system inputs and form</p>
                        </div>
                        <div className="group relative">
                            <div className={`flex flex-row justify-center items-center border-2 border-primary font-header bg-secondarybackground rounded-md text-primary gap-5 hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md
                                            w-10 h-10
                                            md:py-2 md:px-8 md:h-full md:w-full`}
                                //onClick={() => handleFormInput("Division")}
                                >
                                <FontAwesomeIcon icon={faPlus}/>
                                <p className="md:flex hidden">Add Course Category</p>
                            </div>
                            <div className="md:hidden absolute text-center top-12 right-0 font-text text-xs bg-tertiary p-2 shadow-md rounded-md text-white whitespace-nowrap scale-0 group-hover:scale-100 transition-all ease-in-out">
                                Add Course Category
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                <tr>
                                    <th className='py-4 px-4 uppercase'>Course Category Name</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'>Date-added</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                {
                                    loading ? (
                                        <tr className="font-text text-sm hover:bg-gray-200">
                                            <td colSpan={3} className="text-center py-3 px-4 font-text text-primary">
                                                <p>Loading..</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentCategories.map((category)=>(
                                        <tr key={category.id} className={`font-text text-md hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row justify-between items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                <p className="hidden md:flex">{category.category_name}</p>
                                                <div className="flex flex-col md:hidden">
                                                    <p>{category.category_name}</p>
                                                    <p className="text-xs font-text text-unactive">Date Added: {format(new Date(category.created_at), "MMMM dd, yyyy")}</p>
                                                </div>
                                                <div className="flex flex-row gap-2 md:hidden">
                                                    <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                    //</td> onClick={() => handleEditFormInput({ input: "Division", entry: division })}
                                                        >
                                                        <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                    </div>
                                                    <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                        //</tbody>onClick={()=>handleDeleteFormInput("Division",division)}
                                                        >
                                                        <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out md:table-cell hidden text-unactive`}>{format(new Date(category.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex-row gap-2 justify-end p-4 md:flex hidden">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                //</td> onClick={() => handleEditFormInput({ input: "Division", entry: division })}
                                                    >
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                    //</tbody>onClick={()=>handleDeleteFormInput("Division",division)}
                                                    >
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            {
                                loading ? (
                                    <p className='text-sm font-text text-unactive'>
                                        Loading Content...
                                    </p>
                                ):(
                                    <p className='text-sm font-text text-unactive'>
                                        Showing <span className='font-header text-primary'>{indexFCategory + 1}</span> to <span className='font-header text-primary'>{indexLCategory}</span> of <span className='font-header text-primary'>{totalItemCategory}</span> <span className='text-primary'>results</span>
                                    </p>
                                )
                            }
                        </div>

                        <div>
                        <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                            {/* Previous */}
                            <a
                                onClick={backCategory}
                                className='hover:cursor-pointer relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </a>

                            {/* Current Page & Dynamic Paging */}
                            {
                                Array.from({ length: totalPageCategory }, (_, i) => (
                                    <a
                                        key={i}
                                        className={`hover:cursor-pointer relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                            ${
                                                currentPageCategory === i + 1
                                                ? 'bg-primary text-white'
                                                : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                            } transition-all ease-in-out`}
                                        onClick={() => gotoCategory(i + 1)}
                                    >
                                        {i + 1}
                                    </a>))
                            }
                            {/*
                            */}
                            <a
                                onClick={nextCategory}
                                className='hover:cursor-pointer relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </a>
                        </nav>

                        </div>

                    </div>
                </div>

                {/* Course Type */}
                <div className="row-span-1 col-span-2 flex flex-col gap-5">
                    {/* Header */}
                    <div className="flex flex-row justify-between">
                        <div>
                            <h1 className="font-header text-primary text-base">Course Type Options</h1>
                            <p className="font-text text-unactive text-xs">List of available course type option for the system inputs and form</p>
                        </div>
                        <div>
                            <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                                //onClick={() => handleFormInput("Division")}
                                >
                                <FontAwesomeIcon icon={faPlus}/>
                                <p>Add Course Type</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                <tr>
                                    <th className='py-4 px-4 uppercase'>Course Type Name</th>
                                    <th className='py-4 px-4 uppercase'>Date-added</th>
                                    <th className='py-4 px-4 uppercase'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                {
                                    loading ? (
                                        <tr className="font-text text-sm hover:bg-gray-200">
                                            <td colSpan={3} className="text-center py-3 px-4 font-text text-primary">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : (
                                        currentTypes.map((type) => (
                                        <tr key={type.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{type.type_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(type.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                //</td> onClick={() => handleEditFormInput({ input: "Division", entry: division })}
                                                    >
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                    //</tbody>onClick={()=>handleDeleteFormInput("Division",division)}
                                                    >
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            {
                                loading ? (
                                    <p className='text-sm font-text text-unactive'>
                                        Loading Content...
                                    </p>
                                ) : (
                                    <p className='text-sm font-text text-unactive'>
                                        Showing <span className='font-header text-primary'>{indexFTypes + 1}</span> to <span className='font-header text-primary'>{indexLTypes}</span> of <span className='font-header text-primary'>{totalItemTypes}</span> <span className='text-primary'>results</span>
                                    </p>
                                )
                            }
                        </div>

                        <div>
                        <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                            {/* Previous */}
                            <a
                                onClick={backType}
                                className='hover:cursor-pointer relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </a>

                            {/* Current Page & Dynamic Paging */}
                            {
                                Array.from({ length: totalPageType }, (_, i) => (
                                    <a
                                        key={i}
                                        className={`hover:cursor-pointer relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                            ${
                                                currentPageType === i + 1
                                                ? 'bg-primary text-white'
                                                : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                            } transition-all ease-in-out`}
                                        onClick={() => gotoType(i + 1)}
                                    >
                                        {i + 1}
                                    </a>))
                            }
                            {/*
                            */}
                            <a
                                onClick={nextType}
                                className='hover:cursor-pointer relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </a>
                        </nav>

                        </div>

                    </div>
                </div>
        </>
    )
}
export default CourseFormInputSetting;
