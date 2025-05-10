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
    const [carouselData, setCarouselData] = useState([]) // Carousel data

    useEffect(() => {
        axiosClient.get('/carousels')
        .then(({data}) => {
            console.log("Response", data);
            setCarouselData(data)
        }).catch((error) => {
            console.log("Error", error);
        })
    }, [])


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
                                carouselData.map((img, index) => (
                                    <CarouselItem key={index} w-full h-full>
                                        <div className="border border-primary h-full rounded-md shadow-sm bg-white">
                                            <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${img.image_path}`} alt="" className="w-full h-full rounded-md object-contain"/>
                                        </div>
                                    </CarouselItem>
                                ))
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
