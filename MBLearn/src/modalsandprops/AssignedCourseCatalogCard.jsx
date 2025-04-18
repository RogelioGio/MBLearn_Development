import { Card, Progress, Text, RingProgress} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const AssignedCourseCatalogCard = ({name, courseType, courseCategory, trainingType, trainingMode, id}) => {
    const navigate = useNavigate();

    return(
        <div className="bg-white text-white h-full rounded-md shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out" onClick={() => navigate(`/courseadmin/course/${id}`)}>
            {/* Course Thumbnail */}
            <div className="flex justify-end bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-t-md h-1/3 p-4">
                <div>
                    {
                        trainingType ? (<span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                            {trainingType}
                        </span>)
                        :(null)


                    }
                </div>
            </div>
            <div className="h-2/3 p-3 grid grid-rows-[min-content_1fr_1fr] gap-2">
                <div>
                    {/* Course Name */}
                    <h1 className='font-header text-sm text-primary'>{name}</h1>
                    <p className='font-text text-primary text-xs'>{courseType} - {courseCategory}</p>
                </div>
                {/* Progress */}
                {/* Datas */}
            </div>
        </div>
    )
}
export default AssignedCourseCatalogCard
