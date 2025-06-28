import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [course, _setCourse] = useState(null);

    const setCourse = (course) => {
        _setCourse(course);
    };

    return (
        <CourseContext.Provider value={{ course, setCourse }}>
            {children}
        </CourseContext.Provider>
    )

}
export const useCourse = () => useContext(CourseContext);
