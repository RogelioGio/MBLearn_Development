import { Children, createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";


const Option = createContext()

export const OptionProvider = ({children}) => {
    const [option, setOptions] = useState({
        cities:[],
        departments:[],
        titles:[],
        location:[],
        roles:[],
        permission:[],
        division:[],
        section:[]
    })

    const fetchOptions = () => {
        axiosClient.get("/options")
        .then((res) => {
            setOptions(res.data)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchOptions();
    },[]);

    return(
        <Option.Provider value={option}>
            {children}
        </Option.Provider>
    )
}

export const useOption = () => useContext(Option);
