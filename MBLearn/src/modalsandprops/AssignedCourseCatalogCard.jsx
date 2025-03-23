import { Card, Progress, Text, RingProgress} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const AssignedCourseCatalogCard = ({name, courseType, courseCategory, trainingType, trainingMode, id}) => {
    const navigate = useNavigate();

    return(
        <div className="bg-primary text-white h-full rounded-md shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out" onClick={() => navigate(`/courseadmin/course/${id}`)}>
            {/* Course Thumbnail */}
            <div className="flex justify-end bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-t-md h-1/3 p-4">
                <div>
                    {
                        trainingType ? (<span className='text-xs py-1 px-6 rounded-full bg-white text-primary'>{trainingType}</span>)
                        :(null)
                    }
                </div>
            </div>
            <div className="h-2/3 p-3 grid grid-rows-[min-content,auto] gap-2">
                <div>
                    {/* Course Name */}
                    <h1 className='font-header text-sm text-white'>{name}</h1>
                </div>
                <div className='flex flex-col'>
                    {/* Course Type & Category */}
                    <p className='font-text text-white text-xs'>{courseType} - {courseCategory}</p>
                    {/* Training Type & Mode */}
                    <p className='font-text text-white text-xs'>{trainingMode}</p>
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
export default AssignedCourseCatalogCard
