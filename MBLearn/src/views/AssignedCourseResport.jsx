import { Helmet } from "react-helmet"




export default function AssignedCourseReport() {
    return(
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_3.75rem] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Assigned Course Report</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>Assigned Course Report</h1>
                <p className='font-text text-sm text-unactive' >Access the assigned course report panel to track progress and performance insights.</p>
            </div>
        </div>
    )
}
