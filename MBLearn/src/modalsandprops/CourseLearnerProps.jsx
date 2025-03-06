import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core';

const CourseLearnerProps = () => {
    const stat = {
        progress: 50, // Progress in percentage
        color: "white", // Color of the progress ring
    };
    return(
        <div className="mx-5 pt-2 pb-5 col-span-4 overflow-y-scroll">
            {/* Latest Batch */}
            <div>
                {/* Header */}
                <div className="py-2 border-b border-divider">
                    <h1 className="font-header text-lg text-primary">Latest Learner Batch</h1>
                    <p className="font-text text-xs">Latest batch of learner that is going to take this course</p>
                </div>

                <div>
                    <div className="py-4">
                        <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                            <table className='text-left w-full overflow-y-scroll'>
                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                <tr>
                                    <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                    <th className='py-4 px-4'>DEPARTMENT</th>
                                    <th className='py-4 px-4'>BRANCH</th>
                                    <th className='py-4 px-4'>COURSE PROGRESS</th>
                                    <th className='py-4 px-4'>DATE OF ENROLLMENT</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                <tr className='font-text text-sm hover:bg-gray-200' onClick={() => click(employeeID)}>
                                <td className='text-sm  py-3 px-4'>
                                    <div className='flex items-center gap-2'>
                                        {/* User Image */}
                                        <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                            {/* //<img src={profile_url} alt="" className='rounded-full'/> */}
                                        </div>
                                        {/* Name and employee-id*/}
                                        <div>
                                            <p className='font-text'>SampleName</p>
                                            <p className='text-unactive text-xs'>ID: 1234567789</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <div className='flex flex-col'>
                                        {/* Department */}
                                        <p className='text-unactive'>IT</p>
                                        {/* Title */}
                                        <p className='text-unactive text-xs'>Developer</p>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <div className='flex flex-col'>
                                    {/* Branch Location */}
                                    <p className='text-unactive'>General Santos</p>
                                    {/* City Location */}
                                    <p className='text-unactive text-xs'>Novaliches</p>
                                    </div>
                                </td>
                                <td className='py-3 px-4 flex flex-row gap-2'>
                                    <RingProgress
                                        size={35} // Diameter of the ring
                                        roundCaps
                                        thickness={4} // Thickness of the progress bar
                                        sections={[{ value: stat.progress, color: "blue" }]} // Lighter blue progress
                                        rootColor="hsl(218, 97%, 15%)" // Darker blue track
                                        />
                                    <div>
                                        <p className='font-header'>{stat.progress}%</p>
                                        <p className='font-text text-xs'>Employee Progress</p>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <p className='text-unactive'>January 01 2025</p>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* On-going Batch */}
            <div>
                {/* Header */}
                <div className="py-2 border-b border-divider">
                    <h1 className="font-header text-lg text-primary">Ongoing Batch</h1>
                    <p className="font-text text-xs">On-going batch that is currently taking the course</p>
                </div>

                <div>
                    <div className="py-4">
                        <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                            <table className='text-left w-full overflow-y-scroll'>
                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                <tr>
                                    <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                    <th className='py-4 px-4'>DEPARTMENT</th>
                                    <th className='py-4 px-4'>BRANCH</th>
                                    <th className='py-4 px-4'>COURSE PROGRESS</th>
                                    <th className='py-4 px-4'>DATE OF ENROLLMENT</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                <tr className='font-text text-sm hover:bg-gray-200' onClick={() => click(employeeID)}>
                                <td className='text-sm  py-3 px-4'>
                                    <div className='flex items-center gap-2'>
                                        {/* User Image */}
                                        <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                            {/* //<img src={profile_url} alt="" className='rounded-full'/> */}
                                        </div>
                                        {/* Name and employee-id*/}
                                        <div>
                                            <p className='font-text'>SampleName</p>
                                            <p className='text-unactive text-xs'>ID: 1234567789</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <div className='flex flex-col'>
                                        {/* Department */}
                                        <p className='text-unactive'>IT</p>
                                        {/* Title */}
                                        <p className='text-unactive text-xs'>Developer</p>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <div className='flex flex-col'>
                                    {/* Branch Location */}
                                    <p className='text-unactive'>General Santos</p>
                                    {/* City Location */}
                                    <p className='text-unactive text-xs'>Novaliches</p>
                                    </div>
                                </td>
                                <td className='py-3 px-4 flex flex-row gap-2'>
                                    <RingProgress
                                        size={35} // Diameter of the ring
                                        roundCaps
                                        thickness={4} // Thickness of the progress bar
                                        sections={[{ value: stat.progress, color: "blue" }]} // Lighter blue progress
                                        rootColor="hsl(218, 97%, 15%)" // Darker blue track
                                        />
                                    <div>
                                        <p className='font-header'>{stat.progress}%</p>
                                        <p className='font-text text-xs'>Employee Progress</p>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <p className='text-unactive'>January 01 2025</p>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Previous Batch */}
            <div>
                {/* Header */}
                <div className="py-2 border-b border-divider">
                    <h1 className="font-header text-lg text-primary">Previous Batch</h1>
                    <p className="font-text text-xs">Previous batch that is done taking the course</p>
                </div>

                <div>
                    <div className="py-4">
                        <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                            <table className='text-left w-full overflow-y-scroll'>
                            <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                <tr>
                                    <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                    <th className='py-4 px-4'>DEPARTMENT</th>
                                    <th className='py-4 px-4'>BRANCH</th>
                                    <th className='py-4 px-4'>COURSE PROGRESS</th>
                                    <th className='py-4 px-4'>DATE OF ENROLLMENT</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                <tr className='font-text text-sm hover:bg-gray-200' onClick={() => click(employeeID)}>
                                <td className='text-sm  py-3 px-4'>
                                    <div className='flex items-center gap-2'>
                                        {/* User Image */}
                                        <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                            {/* //<img src={profile_url} alt="" className='rounded-full'/> */}
                                        </div>
                                        {/* Name and employee-id*/}
                                        <div>
                                            <p className='font-text'>SampleName</p>
                                            <p className='text-unactive text-xs'>ID: 1234567789</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <div className='flex flex-col'>
                                        {/* Department */}
                                        <p className='text-unactive'>IT</p>
                                        {/* Title */}
                                        <p className='text-unactive text-xs'>Developer</p>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <div className='flex flex-col'>
                                    {/* Branch Location */}
                                    <p className='text-unactive'>General Santos</p>
                                    {/* City Location */}
                                    <p className='text-unactive text-xs'>Novaliches</p>
                                    </div>
                                </td>
                                <td className='py-3 px-4 flex flex-row gap-2'>
                                    <RingProgress
                                        size={35} // Diameter of the ring
                                        roundCaps
                                        thickness={4} // Thickness of the progress bar
                                        sections={[{ value: stat.progress, color: "blue" }]} // Lighter blue progress
                                        rootColor="hsl(218, 97%, 15%)" // Darker blue track
                                        />
                                    <div>
                                        <p className='font-header'>{stat.progress}%</p>
                                        <p className='font-text text-xs'>Employee Progress</p>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <p className='text-unactive'>January 01 2025</p>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CourseLearnerProps
