import { Card, Progress, Text, RingProgress} from '@mantine/core';

const AssignedCourseCatalogCard = ({name, courseType, courseCategory}) => {
    const stat = {
        progress: 50, // Progress in percentage
        color: "blue", // Color of the progress ring
    };

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
                <div className='flex flez-row justify-between'>
                    <div className='flex flex-col justify-end'>
                        <p className='font-header text-xs'>Deadline</p>
                        <p className='font-text text-xs text-divider'>10/10/2024</p>
                    </div>
                    <div className='flex flex-row justify-between items-center gap-1'>
                        <div className='flex flex-col'>
                            <p className='text-xs font-header'>Completion</p>
                            <p className='text-xs font-text text-divider self-end'>20%</p>

                        </div>
                        <div>
                            <RingProgress
                                    size={35} // Diameter of the ring
                                    roundCaps
                                    thickness={4} // Thickness of the progress bar
                                    sections={[{ value: stat.progress, color: "white" }]} // Lighter blue progress
                                    rootColor="hsl(218, 97%, 15%)" // Darker blue track
                                    />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default AssignedCourseCatalogCard
