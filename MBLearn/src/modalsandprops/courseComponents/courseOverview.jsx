import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../../axios-client";
import { useParams } from "react-router-dom";

const CourseOveriew = () => {
    const [isLoading ,setLoading] = useState(true);
    const {id} = useParams();
    const [course, setCourse] = useState([]);

    const fetchCourses = () => {
        setLoading(true)
        axiosClient.get(`/courses/${id}`)
        .then(({data}) => {
            setCourse(data.data)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchCourses();
    },[])

    return(
        <div className="row-start-3 col-span-3 ml-5 pr-5">
            {/* Sample content but needed to be changes as props to be dynamic */}
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
        </div>
    );
}

export default CourseOveriew
