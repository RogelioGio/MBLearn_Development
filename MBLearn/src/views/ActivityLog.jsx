import { faArrowUpAZ, faArrowDownZA, faSort, faArrowUpWideShort, faArrowDownShortWide, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"


export default function ActivityLog() {
    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Activity Log</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 border-b mx-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>Activity Log</h1>
                <p className='font-text text-sm text-unactive' >A detailed record of user actions and system events for monitoring and auditing purposes..</p>
            </div>

            {/* Record Sorter, Filter & Search */}
            <div className='row-start-2 col-start-1  col-span-4 inline-flex flex-row justify-between items-center px-5 py-3 h-fit gap-3'>
                <div>
                    <div className={`flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md `}>
                        <p>Record Date</p>
                        <FontAwesomeIcon icon={faSort}/>
                    </div>
                </div>
                <div>
                    <div className='inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                        <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                        <div className='bg-primary py-2 px-4 text-white'>
                            <FontAwesomeIcon icon={faSearch}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Record Table */}
            <div className='flex flex-col gap-2 row-start-3 row-span-2 col-start-1 col-span-4 px-5 py-2'>
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left w-full overflow-y-scroll'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                        <tr className='flex flex-row justify-between items-center text-left px-4 py-2'>
                            <th className='w-1/4'>Time Stamp</th>
                            <th className='w-1/4'>User in-charge</th>
                            <th className='w-2/4'>Action Description</th>
                        </tr>
                    </thead>
                </table>

                </div>
            </div>
        </div>
    )
}
