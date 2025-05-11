import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    } from "../../components/ui/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import PhotoforCarouselModal from "../PhotoforCarouselModal";
import axiosClient from "MBLearn/src/axios-client";

const AnnouncmentCarousel = () => {
    const [openAdd, setOpenAdd] = useState(false)
    const [carouselData, setCarouselData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchPanels()
    }, [])

    const fetchPanels = () => {
        setIsLoading(true)
        axiosClient.get('/carousels')
        .then(({data}) => {
            setCarouselData(data)
            setIsLoading(false)
        }).catch((error) => {
            console.log("Error", error)
            setIsLoading(false)
        })
    }


    return(
        <>
        <div className="h-full w-full flex flex-col">
            <div className="w-full h-full">
                <Carousel className="w-full h-full grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr]"
                    plugins={[
                            Autoplay({
                                delay: 10000,
                            }),
                        ]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}>
                    {/* Header */}
                    <div className="flex-row flex col-span-3 justify-between">
                        <div className="pb-3 flex flex-row gap-2">
                            <div>
                                <h1 className="font-header text-primary text-base">Announcement Panel</h1>
                                <p className="font-text text-unactive text-xs">Get the latest update about the system and whole Metrobank Group</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 items-center justify-center">
                            {
                                <div className='aspect-square flex flex-row justify-center items-center text-primary border-2 border-primary rounded-md shadow-md hover:cursor-pointer hover:scale-105 hover:bg-primary hover:text-white ease-in-out transition-all'
                                    onClick={() => setOpenAdd(true)}>
                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm p-2'/>
                                </div>
                            }
                            <CarouselPrevious/>
                            <CarouselNext/>
                        </div>
                    </div>
                    <div className="flex items-center w-full h-full justify-center row-start-2 col-start-2">
                        <CarouselContent className="h-full">
                            {
                                isLoading ? (
                                    <CarouselItem w-full h-full>
                                    <div className="border-2 border-primary h-full rounded-md shadow-sm bg-white flex flex-col items-center justify-center">
                                        <h1 className='font-header text-xl text-primary'>"Loading your learning journey..."</h1>
                                        <p className='font-text text-unactive text-xs'>Empowering you with the knowledge to achieve your goals</p>
                                    </div>

                                    </CarouselItem>
                                ) : carouselData.length === 0 ? (
                                    <CarouselItem w-full h-full>
                                    <div className="border-2 border-primary h-full rounded-md shadow-sm bg-white bg-center bg-cover flex items-center justify-center">
                                        <p className='font-text text-unactive text-sm'>No panel to display</p>
                                    </div>

                                    </CarouselItem>
                                ) : (
                                    carouselData.map((img, index) => (
                                    <CarouselItem key={index} w-full h-full>
                                    <div
                                        className="border-2 border-primary h-full rounded-md shadow-sm bg-white bg-center bg-cover"
                                        style={{
                                            backgroundImage: `url(${import.meta.env.VITE_API_BASE_URL}/storage/${img.image_path})`,
                                        }}
                                        >
                                        {/* Optional: Overlay or content here */}
                                    </div>
                                    </CarouselItem>
                                ))
                                )


                            }
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
        </div>

        <PhotoforCarouselModal open={openAdd} close={() => setOpenAdd(false)}/>
        </>
    )
}
export default AnnouncmentCarousel;
