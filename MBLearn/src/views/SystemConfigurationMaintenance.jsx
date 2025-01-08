import { Helmet } from "react-helmet"


export default function SystemConfiguration() {
    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | System Configuration Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>System Configuration Maintenance</h1>
                <p className='font-text text-sm text-unactive' >Module for managing and customizing system settings to ensure optimal performance and functionality.</p>
            </div>

        </div>
    )
}
