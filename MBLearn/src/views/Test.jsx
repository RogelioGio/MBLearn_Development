import { useEffect } from "react";
import axiosClient from "../axios-client";
import echo from "MBLearn/echo";
import { useCourse_Context } from "../contexts/Course_Context";
import { use } from "react";


export default function Test(){
    const {course} = useCourse_Context();
    console.log('Test component mounted: ', course);

return (
    <>
    <button>
        Call /Test
    </button>
    </>
);
};
