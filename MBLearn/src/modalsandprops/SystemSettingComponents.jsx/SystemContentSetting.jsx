import { useEffect, useState } from "react";
import UploadPhotoModal from "../UploadPhotoModal";
import DeletePanelModal from "../DeletePanelModal";
import axiosClient from "MBLearn/src/axios-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faChevronLeft, faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ScrollArea } from "MBLearn/src/components/ui/scroll-area";
import * as React from "react";
import { format } from "date-fns";



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

const SystemContentSetting = ({}) => {
    const [openUpload, setOpenUpload] = useState(false)
    const [panels, setPanels] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [destroy, setDestroy] = useState(false)
    const [deletingID, setDeletingID] = useState()


    //Carousel Pagination
    const {currentPaginated,
        currentPage,
        totalPage,
        indexFirstItem,
        indexLastItem,
        totalitem,
        goto,
        next,
        back} = usePagination(panels,5)

    const fetchPanels = () => {
            setIsLoading(true)
            axiosClient.get('/carousels')
            .then(({data}) => {
                setPanels(data)
                setIsLoading(false)
                console.log(data)
            }).catch((err)=> {
                setIsLoading(false)
            })
        }

    useEffect(()=>{
        fetchPanels()
    },[])

    const openDelete = (id) => {
        setDestroy(true)
        setDeletingID(id)
    }

    const closeDelete = () => {
        setDestroy(false)
    }


    return (
        <>
            <div className="row-span-1 col-span-2 flex flex-row justify-between items-center pb-2">
                <div>
                    <h1 className="font-header text-primary text-base">Customize Announcment Panels</h1>
                    <p className="font-text text-unactive text-xs">Upload and manage announcement panel to be used in the system</p>
                </div>
                <div>
                    <div className="flex flex-row justify-center items-center bg-white py-2 px-10 border-2 border-primary rounded-md shadow-md font-header text-primary gap-2 hover:cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out"
                        onClick={() => setOpenUpload(true)}>
                        <FontAwesomeIcon icon={faAdd}/>
                        <p> Add Panel </p>
                    </div>
                </div>
            </div>


            {/* Table for Announcement Panel */}
            <div className="row-start-3 col-span-2 row-span-2 grid grid-cols-1 gap-4 pb-4">
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                    <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Panel Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                isLoading ? (
                                    <tr>
                                        <td colSpan={3}>
                                            <div className="flex flex-col justify-center items-center py-4">
                                                <p className="text-primary font-text">Loading...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    currentPaginated?.map((panel, index) => (
                                        <tr key={panel.id} className={`font-text text-md text-unactive hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text text-xs px-4  py-2 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{panel.image_name}</td>
                                            <td className={`font-text text-xs px-4 py-2 gap-4 transition-all ease-in-out`}>{format(new Date(panel.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end px-4 py-2">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                    onClick={()=> openDelete(panel.id)}>
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
                    <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className='text-sm font-text text-unactive'>
                            Showing <span className='font-header text-primary'>{indexFirstItem + 1}</span> to <span className='font-header text-primary'>{indexLastItem}</span> of <span className='font-header text-primary'>{totalitem}</span> <span className='text-primary'>results</span>
                        </p>
                    </div>

                    <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a
                            onClick={back}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {
                            Array.from({ length: totalPage }, (_, i) => (
                                <a
                                    key={i}
                                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                        ${
                                            currentPage === i + 1
                                            ? 'bg-primary text-white'
                                            : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                        } transition-all ease-in-out`}
                                    onClick={() => goto(i + 1)}
                                >
                                    {i + 1}
                                </a>))
                        }
                        {/*
                        */}
                        <a
                            onClick={next}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>

                    </div>
                </div>

            </div>

            <UploadPhotoModal open={openUpload} close={() => setOpenUpload(false)} refreshlist={fetchPanels}/>
            <DeletePanelModal open={destroy} close={closeDelete} referesh={fetchPanels} id={deletingID}/>
        </>
    )
}
export default SystemContentSetting;
