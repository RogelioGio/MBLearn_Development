import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../../axios-client";
import { useParams } from "react-router-dom";
import { useCourse } from "MBLearn/src/contexts/selectedcourseContext";
import CourseLoading from "../../assets/Course_Loading.svg";

const CourseOveriew = ({course}) => {
    const [isLoading ,setLoading] = useState(false);


    return(
        <div className="row-start-2 col-span-3">
            {/* Sample content but needed to be changes as props to be dynamic */}
            {
                !isLoading ? (
                        <div className="w-full h-full py-4 grid grid-cols-2 grid-row-2 pl-1">
                            <div className="col-span-2 row-span-1">
                                <p className="font-header text-primary">Course Description:</p>
                                <p className="font-text text-sm">{
                                    isLoading ? "Loading..." : course?.description || "No Course Description Found"
                                    }</p>
                            </div>
                            <div className="col-span-1 row-span-1 py-5">
                                <p className="font-text text-sm">{
                                    isLoading ? "Loading..." : course?.course_objectives || "No Course Description Found"
                                    }</p>
                            </div>
                            <div className="col-span-1 row-span-1 py-5">
                                <p className="font-header text-primary">Course Outcomes:</p>
                                <p className="font-text text-sm">{
                                    isLoading ? "Loading..." : course?.course_outcomes || "No Course Description Found"
                                    }</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full grid grid-cols-2 grid-row-2">
                            <div className="col-span-2 row-span-2 py-5 flex flex-col items-center justify-center">
                                <img src={CourseLoading} alt="Loading" className="w-80"/>
                                <p className="text-sm font-text text-primary">Hang tight! 🚀 Loading courses for — great things take a second!</p>
                            </div>
                        </div>
                    )
            }

        </div>
    );
}

export default CourseOveriew
