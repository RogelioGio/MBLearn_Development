import { faBook, faBookOpen, faBuilding, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"


export default function SystemLevelReports() {
    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | System Level Reports </title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 border-b mx-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>System Level Reports</h1>
                <p className='font-text text-sm text-unactive' >Generates comprehensive reports on system performance, usage, and security for analysis and decision-making.</p>
            </div>

            {/* Statistical numbers */}
            <div className='flex flex-row py-4 mx-5 col-span-4 gap-4'>
                {/* Total User Counter */}
                <div className="flex flex-col gap-2">
                    <p className="font-text text-unactive text-sm">Total MBLearn Users</p>
                    <div className="bg-white shadow-md border-primary border-2 rounded-md flex-row flex items-center">
                        <div className="aspect-square w-12 bg-primary text-lg text-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faUserGroup}/>
                        </div>
                        <p className="text-lg font-text px-10">
                            <span className="font-header">7,000</span> Users
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-text text-unactive text-sm">Total Metrobank Branches</p>
                    <div className="bg-white shadow-md border-primary border-2 rounded-md flex-row flex items-center">
                        <div className="aspect-square w-12 bg-primary text-lg text-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faBuilding}/>
                        </div>
                        <p className="text-lg font-text px-10">
                            <span className="font-header">500</span> Branches
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-text text-unactive text-sm">Total On-going Courses</p>
                    <div className="bg-white shadow-md border-primary border-2 rounded-md flex-row flex items-center">
                        <div className="aspect-square w-12 bg-primary text-lg text-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faBookOpen}/>
                        </div>
                        <p className="text-lg font-text px-10">
                            <span className="font-header">275</span> Courses
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-text text-unactive text-sm">Total Available Courses</p>
                    <div className="bg-white shadow-md border-primary border-2 rounded-md flex-row flex items-center">
                        <div className="aspect-square w-12 bg-primary text-lg text-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faBook}/>
                        </div>
                        <p className="text-lg font-text px-10">
                            <span className="font-header">5,000</span> Courses
                        </p>
                    </div>
                </div>
            </div>

            {/* Metrobank City Table */}
            <div className="flex flex-col py-4 mx-5 col-span-2 gap-4">
                {/* Header */}
                <div>
                    <h2 className="font-header text-xl text-primary">Metrobank City Locations</h2>
                    <p className="font-text text-sm text-unactive">List of metrobank cities and respective number of branch per city</p>
                </div>
                {/* Table */}
                <div className='row-start-3 row-span-2 col-start-1 col-span-4'>
                                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                                <table className='text-left w-full overflow-y-scroll'>
                                    <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                                        <tr>
                                            <th className='py-4 px-4'>City Name</th>
                                            <th className='py-4 px-4'>Number of Branches</th>
                                            <th className='py-4 px-4'>Active Users</th>
                                            <th className='py-4 px-4'>Inactive Users</th>
                                            <th className='py-4 px-4'>Total Users</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white divide-y divide-divider'>

                                    </tbody>
                                </table>
                                </div>
                            </div>
            </div>
            {/* Metrobank Branches  */}

        </div>
    )
}
