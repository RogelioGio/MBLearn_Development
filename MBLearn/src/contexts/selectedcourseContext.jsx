import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";


const SelectedCourse = createContext()
export const SelectedCourseProvider = ({children}) => {
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [courseID, setCourseID] = useState(null)
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true)
        if (courseID !== undefined && courseID !== null) { // Ensuring courseID is valid
            axiosClient.get(`/coursecontext/${courseID}`)
            .then(({data}) => {
                setSelectedCourse(data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [courseID]);

    const selectCourse = (id) => {
        if (id === courseID && selectedCourse) {
            setIsFetching(false);
            return; // Prevent unnecessary state updates
        }
        setIsFetching(true);
        setCourseID(id);
    }

    return (
        <SelectedCourse.Provider value={{selectedCourse, selectCourse, isFetching}}>
            {children}
        </SelectedCourse.Provider>
    )
}
export const useCourse = () => useContext(SelectedCourse)
