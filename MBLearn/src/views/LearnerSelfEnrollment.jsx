import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { useEffect, useState } from "react"
import { FerrisWheel } from "lucide-react"


export default function LearnerSelfEnrollment() {

    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchCourses = () => {
        axiosClient.get('/courses')
        .then(({ data }) => {
            setCourse(data.data)
            pageChangeState("totalCourses", data.total)
            pageChangeState("lastPage", data.lastPage)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const [pageState, setPagination] = useState({
            currentPage: 1,
            perPage: 8,
            totalCourses: 0,
            lastPage:1,
            startNumber: 0,
            endNumber: 0,
            currentPerPage:0
        });

        const pageChangeState = (key, value) => {
            setPagination ((prev) => ({
                ...prev,
                [key]: value
            }))
        }

        useEffect(() => {
                pageChangeState('startNumber', (pageState.currentPage - 1) * pageState.perPage + 1)
                pageChangeState('endNumber', Math.min(pageState.currentPage * pageState.perPage, pageState.totalCourses))
            },[pageState.currentPage, pageState.perPage, pageState.totalCourses])


            //Next and Previous
            const back = () => {
                if (loading) return;
                if (pageState.currentPage > 1){
                    pageChangeState("currentPage", pageState.currentPage - 1)
                    pageChangeState("startNumber", pageState.perPage - 4)
                }
            }
            const next = () => {
                if (loading) return;
                if (pageState.currentPage < pageState.lastPage){
                    pageChangeState("currentPage", pageState.currentPage + 1)
                }
            }

            const Pages = [];
            for(let p = 1; p <= pageState.lastPage; p++){
                Pages.push(p)
            }

            const pageChange = (page) => {
                if(loading) return;
                if(page > 0 && page <= pageState.lastPage){
                    pageChangeState("currentPage", page)
                }
            }

            useEffect(()=>{
                fetchCourses()
            },[])




    return(
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_1fr_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Self-Enrollment</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 border-b mx-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>Self Course Enrollment</h1>
                <p className='font-text text-sm text-unactive'>View shows all available courses learners can freely enroll in to expand their skills at their own pace.</p>
            </div>

            <div className="row-start-2">
                {course.map((course) => (
                    <p key={course.id}>{course.name}</p>
                ))}
            </div>
        </div>
    )
}
