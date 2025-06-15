import { createContext, useContext, useState } from "react";

const Course_Context = createContext();

export const Course_ContextProvider = ({ children }) => {
    const [course, _setCourse] = useState({});

    const setCourse = (course) => {
        _setCourse(course);
        console.log("Course set:", course);
    };

    return (
        <Course_Context.Provider value={{ course, setCourse }}>
            {children}
        </Course_Context.Provider>
    )

}
export const useCourse_Context = () => useContext(Course_Context);
