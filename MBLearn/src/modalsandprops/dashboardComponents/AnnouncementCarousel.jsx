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
import React, { useState } from "react";
import PhotoforCarouselModal from "../PhotoforCarouselModal";

const AnnouncmentCarousel = () => {
    const [openAdd, setOpenAdd] = useState(false)


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
                                Array.from({length: 5}).map((_, index) => (
                                    <CarouselItem key={index} w-full h-full>
                                        <div className="border-2 border-primary h-full p-2 rounded-md shadow-sm bg-white">
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <p className="text-primary font-header text-2xl">
                                                    Panel {index + 1}
                                                </p>
                                            </div>
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
