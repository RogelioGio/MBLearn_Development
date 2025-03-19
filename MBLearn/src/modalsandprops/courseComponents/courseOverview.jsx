import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../../axios-client";
import { useParams } from "react-router-dom";
import { useCourse } from "MBLearn/src/contexts/selectedcourseContext";
import CourseLoading from "../../assets/Course_Loading.svg";

const CourseOveriew = () => {
    const [isLoading ,setLoading] = useState(true);
    const [course, setCourse] = useState([]);
    const {selectedCourse, isFetching} = useCourse();

    useEffect(() => {
        setLoading(isFetching);
        setCourse(selectedCourse);
    },[selectedCourse])



    return(
        <div className="row-start-3 col-span-3 ml-5 pr-5">
            {/* Sample content but needed to be changes as props to be dynamic */}
            {
                !isLoading ? (
                        <div className="w-auto h-auto grid grid-cols-2 grid-row-2">
                            {/* Course Desription */}
                            <div className="col-span-2 row-span-1 py-5">
                                <p className="font-header text-primary text-2xl">Course Description:</p>
                                <p className="font-text text-base">{
                                    isLoading ? "Loading..." : course?.description || "No Course Description Found"
                                    }</p>
                            </div>
                            {/* Course Objective */}
                            <div className="col-span-1 row-span-1 py-5">
                                <p className="font-header text-primary text-2xl">Course Objective:</p>
                                <p className="font-text text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam necessitatibus at doloremque atque veritatis? Commodi nihil vero omnis corporis pariatur unde totam, laboriosam aperiam. Perferendis illo nisi molestiae voluptates asperiores!</p>
                            </div>
                            {/* Course Content */}
                            <div className="col-span-1 row-span-1 py-5">
                                <p className="font-header text-primary text-2xl">Course Outcome:</p>
                                <p className="font-text text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam necessitatibus at doloremque atque veritatis? Commodi nihil vero omnis corporis pariatur unde totam, laboriosam aperiam. Perferendis illo nisi molestiae voluptates asperiores!</p>
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
