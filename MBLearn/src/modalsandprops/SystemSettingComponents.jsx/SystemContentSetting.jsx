import { useEffect, useState } from "react";
import UploadPhotoModal from "../UploadPhotoModal";
import DeletePanelModal from "../DeletePanelModal";
import axiosClient from "MBLearn/src/axios-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faChevronLeft, faChevronRight, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ScrollArea } from "MBLearn/src/components/ui/scroll-area";
import * as React from "react";
import { format } from "date-fns";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from "MBLearn/src/components/ui/carousel";
import { useRef } from "react";
import LoginBackground2 from '../../assets/Login_Background2.png';
import { CarouselContentProvider, useCarouselContext } from "MBLearn/src/contexts/CarourselContext";




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
    const [panels, setPanels] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [destroy, setDestroy] = useState(false)
    const [deletingID, setDeletingID] = useState()
    const [currentPanel, setCurrentPanel] = useState(0)
    const carouselRef = useRef(null)
    const {_setCarousel} = useCarouselContext();

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
                _setCarousel(data)
                setIsLoading(false)
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

    function ActivePanel() {
    const { api } = useCarousel();
    React.useEffect(() => {
        if (!api) return;

        const onSelect = () => {
        setCurrentPanel(api.selectedScrollSnap());

        };

        api.on("select", onSelect);
        onSelect();

        return () => {
        api.off("select", onSelect);
        };
    }, [api]);
    }

    // useEffect(() => {
    //     console.log(currentPanel)
    //     console.log(panels)
    // }, [currentPanel])


    return (
        <CarouselContentProvider>
        <>
            <div className="pb-5 border-b border-divider">
                <div className="flex flex-row justify-between items-center pb-5">
                    <div>
                        <h1 className="font-header text-primary text-base">Customize Announcement Panels</h1>
                        <p className="font-text text-unactive text-xs">Upload and manage announcement panel to be used in the system</p>
                    </div>
                    <div className="relative group">
                        <div className="flex flex-row justify-center items-center border-2 border-primary font-header bg-secondarybackground rounded-md text-primary gap-5 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out shadow-md
                                        h-10 w-10
                                        md:py-2 md:px-8 md:h-full md:w-full"
                            onClick={() => setOpenUpload(true)}>
                            <FontAwesomeIcon icon={faAdd}/>
                            <p className="md:block hidden"> Add Panel </p>
                        </div>
                        <div className="md:hidden absolute text-center top-12 right-0 font-text text-xs bg-tertiary p-2 shadow-md rounded-md text-white whitespace-nowrap scale-0 group-hover:scale-100 transition-all ease-in-out">
                            Upload Panel
                        </div>
                    </div>
                </div>

                {/* Current Panels */}
                <div>
                    <p className="font-text py-1 text-xs">Active Panels:</p>
                    <Carousel
                            ref={carouselRef}
                            opts={{
                                align: "start",
                                loop: true,
                            }}>
                        <ActivePanel />
                        <CarouselContent>
                            {
                                isLoading ?
                                <CarouselItem>
                                    <div className="border-2 border-primary rounded-md shadow-md aspect-[4/1] flex flex-row items-center justify-center gap-2 text-primary">
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin ease-in-out"/>
                                        <p className="font-text text-sm">Loading item please wait...</p>
                                        <p></p>
                                    </div>
                                </CarouselItem>
                                // ${import.meta.env.VITE_API_BASE_URL}/storage/carouselimages/${img.image_path}
                                : panels?.slice(0,5).map((img, index) => (
                                    <CarouselItem key={index}>
                                        <div className="border-2 border-primary rounded-md shadow-md aspect-[4/1]">
                                            <img src={img.image_path} alt="Announcment Panel" className="w-full h-full object-cover rounded-sm"/>
                                        </div>
                                    </CarouselItem>
                                ))
                            }
                        </CarouselContent>
                        <div className="flex flex-row gap-2 justify-between">
                            <div className="font-text text-xs py-3 flex flex-col justify-center">
                                {
                                    isLoading ?
                                    <p className="text-unactive">Loading Items</p>
                                    :<>
                                        <p className="text-unactive">Active Panel Details</p>
                                        <p className="text-sm text-primary">{panels[currentPanel]?.image_name || "Loading"}</p>
                                        <p className="text-unactive">Date-Added:  {panels?.length > 0 ? null : panels[currentPanel]?.created_at ?
                                                            format(new Date(panels[currentPanel].created_at), "MMMM dd yyyy")
                                                            : "Loading"}</p>
                                    </>
                                }
                            </div>
                            <div className="flex flex-row gap-2 py-2 items-center">
                                <CarouselPrevious/>
                                <CarouselNext/>
                            </div>
                        </div>
                    </Carousel>
                </div>


                {/* Table for Announcement Panel */}
                <div className="pb-5">
                    <p className="font-text py-1 text-xs">List of the Current Panels:</p>
                    <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                <tr>
                                    <th className='py-4 px-4 uppercase'>Panel Name</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'>Date-added</th>
                                    <th className='py-4 px-4 uppercase md:table-cell hidden'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                {
                                    isLoading ? (
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
                                    ) : (
                                        currentPaginated?.map((panel, index) => (
                                            <tr key={panel.id} className={`font-text text-md hover:bg-gray-200 cursor-pointer`}>
                                                <td className={`font-text px-4  py-2 flex flex-row justify-between items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                    <p className="md:block hidden">{panel.image_name}</p>
                                                    <div className="flex flex-col md:hidden">
                                                        <p>{panel.image_name}</p>
                                                        <p className="text-xs font-text text-unactive">Date-Added:  {panels?.length > 0 ? null : panels[currentPanel]?.created_at ?
                                                            format(new Date(panels[currentPanel].created_at), "MMMM dd yyyy")
                                                            : "Loading"}</p>
                                                    </div>
                                                    <div className="md:hidden">
                                                        <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all'
                                                            onClick={()=> openDelete(panel.id)}>
                                                            <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={`font-text px-4 py-2 gap-4 transition-all ease-in-out hidden md:table-cell text-unactive`}>{format(new Date(panel.created_at), "MMMM dd, yyyy")}</td>
                                                <td className="flex-row gap-2 justify-end px-4 py-2 md:flex hidden">
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
                </div>

                <div className="flex flex-row justify-between items-center">
                    {
                        !isLoading ?
                        <>
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
            <div>
                <div className="flex flex-row justify-between items-center pb-5 pt-5">
                    <div>
                        <h1 className="font-header text-primary text-base">Customize Login Background</h1>
                        <p className="font-text text-unactive text-xs">Manange to change the backdrop image at the login page interface</p>
                    </div>
                    <div className="relative group">
                        <div className="flex flex-row justify-center items-center border-2 border-primary font-header bg-secondarybackground rounded-md text-primary gap-5 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out shadow-md
                                        h-10 w-10
                                        md:py-2 md:px-8 md:h-full md:w-full"
                            onClick={() => setOpenUpload(true)}>
                            <FontAwesomeIcon icon={faAdd}/>
                            <p className="md:block hidden"> Upload  </p>
                        </div>
                        <div className="md:hidden absolute text-center top-12 right-0 font-text text-xs bg-tertiary p-2 shadow-md rounded-md text-white whitespace-nowrap scale-0 group-hover:scale-100 transition-all ease-in-out">
                            Upload Panel
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="relative flex">
                    <div className="aspect-[3/1] border-2 border-primary rounded-md">
                        <img src={LoginBackground2} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-3/4 w-1/6 rounded-md shadow-md p-5 flex flex-col justify-between items-stretch">
                        <div>
                            <div className="h-2 w-4/5 bg-primary rounded-full mb-1"/>
                            <div className="h-2 w-1/2 bg-primary rounded-full"/>
                        </div>

                        <div>
                            <div className="w-full h-5 rounded-md bg-primary"/>
                        </div>

                    </div>
                </div>

                {/* Panel Detail */}
                {/* <div className="flex flex-col font-text text-xs py-2">
                    <p className="text-unactive">Active Panel Details</p>
                                        <p className="text-sm text-primary">{panels[currentPanel]?.image_name}</p>
                                        <p className="text-unactive">Date-Added: {format(new Date(panels[currentPanel]?.created_at),"MMMM dd yyyy")}</p>
                </div> */}

            </div>

            <UploadPhotoModal open={openUpload} close={() => setOpenUpload(false)} refreshlist={fetchPanels}/>
            <DeletePanelModal open={destroy} close={closeDelete} refresh={fetchPanels} id={deletingID}/>
        </>
        </CarouselContentProvider>
    )
}
export default SystemContentSetting;
