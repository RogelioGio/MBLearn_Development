import { Card, Progress, Text } from '@mantine/core';

const AssignedCourseCatalogCard = ({name, courseType, courseCategory}) => {
    return(
        <div className="bg-primary text-white h-full rounded-md shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out">
            {/* Course Thumbnail */}
            <div className="bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-t-md h-1/3">
                <img src="" alt="" />
            </div>
            <div className="h-2/3 p-3 flex flex-col justify-between">
                <div>
                    {/* Course Name */}
                    <p className="font-header text-sm">{name}</p>
                    {/* Course Type and Course Category */}
                    <p className="font-text text-xs text-divider">{courseType} - {courseCategory}</p>
                </div>
                {/* Enrolled, On-going, Finished */}
                <div className="grid grid-rows-[auto_min-content] grid-cols-3 w-full gap-y-1">
                <div className='row-start-1 col-span-1'>
                    <p className='font-text text-xs'>Ongoing</p>
                    <p className='font-text text-xs'>10</p>
                </div>
                <div className='row-start-1 col-span-1'>
                    <p className='font-text text-xs'>Enrolled</p>
                    <p className='font-text text-xs'>12</p>
                </div>
                <div className='row-start-1 col-span-1'>
                    <p className='font-text text-xs'>Completed</p>
                    <p className='font-text text-xs'>2</p>
                </div>
                <div className="w-full row-start-2 col-span-3">
                    <Progress value={54.31} size='md' radius='xl'/>
                </div>
                </div>
            </div>

        </div>
    )
}
export default AssignedCourseCatalogCard
