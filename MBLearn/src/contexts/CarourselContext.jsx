import { Children, createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const CarouselContent = createContext();

export const CarouselContentProvider = ({children}) => {
    const [carousels, setCarousels] = useState([])

    useEffect(()=>{
        axiosClient.get('/carousels')
                .then(({data}) => {
                    setCarousels(data)
                }).catch((error) => {
                    console.log("Error", error)
                })
    },[])

    return(
        <CarouselContent.Provider value={carousels}>
            {children}
        </CarouselContent.Provider>
    )
}
export const useCarouselContext = () => useContext(CarouselContent)
