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
                                <p className="font-header text-primary">Course Objective:</p>
                                <p className="font-text text-sm">To provide learners with a comprehensive understanding of direct and indirect taxes, their applications, and their implications for individuals and businesses. The course aims to build foundational knowledge in tax structures to improve financial decision-making and compliance.</p>
                            </div>
                            <div className="col-span-1 row-span-1 py-5">
                                <p className="font-header text-primary">Course Outcomes:</p>
                                <ol>
                                    <li className="font-text text-sm"><strong>Differentiate</strong> between direct and indirect taxes with relevant examples.</li>
                                    <li className="font-text text-sm"><strong>Explain</strong> the role of income tax, GST, VAT, and other tax types in business and personal finance.</li>
                                    <li className="font-text text-sm"><strong>Identify</strong> who is responsible for paying each type of tax and how these taxes are collected.</li>
                                    <li className="font-text text-sm"><strong>Analyze</strong> the impact of various tax types on pricing, income, and expenditures.</li>
                                    <li className="font-text text-sm"><strong>Apply</strong> knowledge of tax concepts in realistic business and financial scenarios to ensure compliance.</li>
                                </ol>
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
