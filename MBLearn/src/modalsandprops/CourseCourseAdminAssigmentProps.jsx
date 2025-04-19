import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CourseCourseAdminAssignmentProps = ({}) => {
    return (
        <div className="px-5 py-2 w-full h-full grid grid-cols-4 grid-rows-[min-content_min-content_1fr_min-content]">
            {/* Main Course Admin */}
            <div className="py-2">
                <p className="font-text text-xs text-unactive">Main Course Admin:</p>
                <div className="flex flex-row gap-2 py-2 items-center">
                    <div className='bg-blue-500 h-10 w-10 rounded-full'>
                    </div>
                    <div>
                        <p className='font-header text-primary text-2xl'>John Doe</p>
                        <p className='text-unactive text-xs font-text'>ID: 123456789</p>
                    </div>
                </div>
            </div>
            {/* Search bar */}
            <div className="col-start-4 flex flex-col justify-center">
                <div>
                    <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                        <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                        <div className='bg-primary py-2 px-4 text-white'>
                            <FontAwesomeIcon icon={faSearch}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter */}

            {/* Table */}

            {/* Paganitaion */}
        </div>
    )
}
export default CourseCourseAdminAssignmentProps;
