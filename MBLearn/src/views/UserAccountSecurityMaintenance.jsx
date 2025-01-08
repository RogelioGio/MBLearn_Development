import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"


export default function UserAccountSecurityMaintenance(){
    return(
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | User Account Security Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>User Account Security Maintenance</h1>
                <p className='font-text text-sm text-unactive' >Handles user credentials, account status, and last login tracking for secure access management..</p>
            </div>

            {/* Search bar */}
            <div className='col-start-4 row-start-1 mr-5 py-3 border-b border-divider'>
                <div className="flex items-center w-full h-full">
                    <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full h-fit font-text shadow-md'>
                        <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                        <div className='bg-primary py-2 px-4 text-white'>
                            <FontAwesomeIcon icon={faSearch}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
