import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"


export default function LearnerCertficates() {

    return (
        <div className='grid grid-cols-4 grid-rows-[6.25rem_min-content_min-content_1fr_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Certificates</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-3 row-span-1 pr-5 border-b ml-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>Certificates</h1>
                <p className='font-text text-sm text-unactive' >Displays all earned and uploaded certificates, allowing easy tracking and management of your learning achievements.</p>
            </div>

            {/* Add Certificates */}
            <div className='col-start-4 row-start-1 flex flex-col justify-center pl-5 mr-5 border-divider border-b'>
                <button className='inline-flex flex-row shadow-md items-center justify-center bg-primary font-header text-white text-base p-4 rounded-full hover:bg-primaryhover hover:scale-105 transition-all ease-in-out'>
                    <FontAwesomeIcon icon={faFileCirclePlus} className='mr-2'/>
                    <p>Add Certificates</p>
                </button>
            </div>


        </div>
    )
}
