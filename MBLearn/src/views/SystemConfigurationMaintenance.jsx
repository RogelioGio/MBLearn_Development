import { faUsersLine } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"


export default function SystemConfiguration() {
    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | System Configuration Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 border-b mx-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>System Configuration Maintenance</h1>
                <p className='font-text text-sm text-unactive' >Module for managing and customizing system settings to ensure optimal performance and functionality.</p>
            </div>
            {/* Settings Tabs */}
            <div className="col-start-4 col-span-1 row-span-3 border-l border-divider px-3 py-3 flex items-center flex-col">
                <div className='flex flex-row items-center w-60 px-3 py-3 gap-4 text-sm text-unactive hover:text-primary cursor-pointer transition-all ease-in-out'>
                    <FontAwesomeIcon icon={faUsersLine}/>
                    <h1 className="uppercase font-text">Role Management</h1>
                </div>
            </div>
            {/* Setting Content */}
            <div className="mx-5 py-5">
                <h1 className="font-header text-primary text-xl">Role Management</h1>
                <p className="font-text text-unactive">Create and Manage Roles in the system</p>
            </div>

        </div>
    )
}
