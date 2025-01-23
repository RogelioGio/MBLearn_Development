import { faChevronLeft, faChevronRight, faFilter, faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
export default function BulkEnrollment() {
    return (
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Enroll Trainee</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 border-b mx-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>Enroll Trainee</h1>
                <p className='font-text text-sm text-unactive' >Quickly enroll large groups of trainees into assigned courses for efficient training delivery.</p>
            </div>

            {/* Assigned Courses */}
            <div className="col-start-4 row-start-2 row-span-4 my-5 border-l border-divider flex flex-col justify-between">
                {/* Course list header */}
                <div className="px-4">
                    <h1 className='text-primary text-2xl font-header'>Assigned Courses</h1>
                    <p className='font-text text-xs text-unactive' >Assigned courses to enroll users into effortlessly.</p>
                </div>
                {/* Course Props */}
                <div className="h-full p-5 flex flex-col gap-2">
                    <div className="w-full py-5 px-4 border border-divider bg-primary rounded-md font-text text-white text-center shadow-md">
                        sample course card
                    </div>
                    <div className="w-full py-5 px-4 border border-divider bg-white rounded-md font-text text-primary text-center shadow-md">
                        sample course card
                    </div>
                    <div className="w-full py-5 px-4 border border-divider bg-white rounded-md font-text text-primary text-center shadow-md">
                        sample course card
                    </div>
                    <div className="w-full py-5 px-4 border border-divider bg-white rounded-md font-text text-primary text-center shadow-md">
                        sample course card
                    </div>
                </div>
                {/* Enroll button */}
                <div className="px-5">
                    <button className="w-full p-3 bg-primary font-header text-white rounded-md hover:scale-105 transition-all ease-in-out">
                        <FontAwesomeIcon icon={faUserPlus} className='mr-2'/>
                        Enroll Employees
                    </button>
                </div>
            </div>

            {/* Search and filter */}
            <div className="col-start-1 col-span-3 row-start-2 row-span-1 px-5 flex flex-row justify-between items-center gap-5">

                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>


                <button className='flex flex-row items-center border-2 border-primary py-2 px-4 font-header bg-secondarybackground rounded-md text-primary gap-2 w-fit hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md'>
                    <p>Filter</p>
                    <FontAwesomeIcon icon={faFilter}/>
                </button>
            </div>

            {/* User table */}
            <div className='row-start-3 row-span-2 col-start-1 col-span-3 px-5 py-2'>
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left w-full overflow-y-scroll'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                        <tr>
                            <th className='py-4 px-4'>EMPLOYEE NAME</th>
                            <th className='py-4 px-4'>DEPARTMENT</th>
                            <th className='py-4 px-4'>BRANCH</th>
                            <th className='py-4 px-4'>ROLE</th>
                            <th className='py-4 px-4'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        <tr>
                            <td colSpan="5">
                                <div className="p-5 text-center font-text text-unactive">
                                    <p>Please choose a course to select employee to enroll</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>

            {/* User Pagination */}
            <div className='row-start-5 row-span-1 col-start-1 col-span-3 border-t border-divider mx-5 py-3 flex flex-row items-center justify-between'>
                {/* Total number of entries and only be shown */}
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>1</span> to <span className='font-header text-primary'>31</span> of <span className='font-header text-primary'>43</span> <span className='text-primary'>results</span>
                    </p>
                </div>
                {/* Paganation */}
                <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a href="#"
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {/* {Pages.map((page)=>(
                            <a href="#"
                                key={page}
                                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-header ring-1 ring-divider ring-inset
                                    ${
                                        page === pageState.currentPage
                                        ? 'bg-primary text-white'
                                        : 'bg-secondarybackground text-primary hover:bg-primary hover:text-white'
                                    } transition-all ease-in-out`}
                                    onClick={() => pageChange(page)}>
                                {page}</a>
                        ))} */}

                        <a href="#"
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>

        </div>
    )
}
