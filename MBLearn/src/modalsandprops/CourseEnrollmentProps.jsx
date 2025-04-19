import { faChevronLeft, faChevronRight, faFilter, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import Learner from '../components/Learner'


const CourseEnrollmentProps = ({course}) => {
    const [learners, setLearners] = useState([])
    const [learnerLoading, setLearnerLoading] = useState(false)

    const handleLearnerChange = (courseId) => {
        setLearnerLoading(true)
        axiosClient.get(`/index-user-enrollments/${courseId}`,
            // {
            // params: {
        //                 page: pageState.currentPage,
        //                 perPage: pageState.perPage
        //             }
            // }
            ).then(({data})=>{
                console.log(data)
                setLearners(data.data)
                // pageChangeState('totalUser', data.total)
                // pageChangeState('lastPage', data.lastPage)
                // pageChangeState('currentPerPage', data.data.length)
                setLearnerLoading(false)
            }).catch((err)=>{
                console.log(err)
            })
        }

    useEffect(() => {
        handleLearnerChange(course.id)
    },[])

    return(
        <div className="grid grid-cols-4 grid-rows-[min-content_min-content_1fr_min-content] h-full w-full">
            {/* Search */}
            <div className='flex flex-row justify-center py-3'>
                <div className=' inline-flex flex-row place-content-between border-2 border-primary rounded-md w-full font-text shadow-md'>
                    <input type="text" className='focus:outline-none text-sm px-4 w-full rounded-md bg-white' placeholder='Search...'/>
                    <div className='bg-primary py-2 px-4 text-white'>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
            </div>
            <div className='col-start-4 flex flex-row justify-end py-3'>
                <div className='text-white border-2 border-primary py-2 px-5 bg-primary flex flex-row gap-2 justify-center items-center rounded-md shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out'>
                    <FontAwesomeIcon icon={faUserPlus}/>
                    <p className='font-header'>Enroll</p>
                </div>
            </div>
            {/* Filter */}
            <div className="col-span-4 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_min-content] gap-x-2">
                <div className="inline-flex flex-col gap-1">
                    <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                        <p className="text-xs font-text text-unactive">Division </p>
                    </label>
                    <div className="grid grid-cols-1">
                        <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                            // value={filterformik.values.department}
                            // onChange={filterformik.handleChange}
                            // onBlur={filterformik.handleBlur}
                            >
                            <option value=''>Select Division</option>
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="inline-flex flex-col gap-1">
                    <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                        <p className="text-xs font-text text-unactive">Department </p>
                    </label>
                    <div className="grid grid-cols-1">
                        <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                            // value={filterformik.values.department}
                            // onChange={filterformik.handleChange}
                            // onBlur={filterformik.handleBlur}
                            >
                            <option value=''>Select Department</option>
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="inline-flex flex-col gap-1">
                    <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                        <p className="text-xs font-text text-unactive">Section </p>
                    </label>
                    <div className="grid grid-cols-1">
                        <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                            // value={filterformik.values.department}
                            // onChange={filterformik.handleChange}
                            // onBlur={filterformik.handleBlur}
                            >
                            <option value=''>Select Section</option>
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="inline-flex flex-col gap-1">
                    <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                        <p className="text-xs font-text text-unactive">City </p>
                    </label>
                    <div className="grid grid-cols-1">
                        <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                            // value={filterformik.values.department}
                            // onChange={filterformik.handleChange}
                            // onBlur={filterformik.handleBlur}
                            >
                            <option value=''>Select City</option>
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="inline-flex flex-col gap-1">
                    <label htmlFor="department" className="font-header text-xs flex flex-row justify-between">
                        <p className="text-xs font-text text-unactive">Branch </p>
                    </label>
                    <div className="grid grid-cols-1">
                        <select id="department" name="department" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                            // value={filterformik.values.department}
                            // onChange={filterformik.handleChange}
                            // onBlur={filterformik.handleBlur}
                            >
                            <option value=''>Select Branch</option>
                        </select>
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                {/* Filter Button */}
                <div className="flex flex-col justify-end py-1">
                    <div className="aspect-square border-2 border-primary rounded-md shadow-md text-white bg-primary flex flex-row justify-center items-center hover:scale-105 hover:cursor-pointer transition-all ease-in-out">
                        <FontAwesomeIcon icon={faFilter} className="p-2"/>
                    </div>
                </div>
            </div>

            {/* Enrolment Table */}
            <div className="col-span-4 h-full py-2">
                    <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                        <table className='text-left w-full'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                        <tr>
                            <th className='py-4 px-4 flex items-center flex-row gap-4'>
                                 {/* Checkbox */}
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            type="checkbox"
                                            // ref={selectAllRef}
                                            className="col-start-1 row-start-1 appearance-none border border-primary rounded checked:border-primary checked:bg-primary indeterminate:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                            // onChange={handleSelectAll}
                                            // checked={checkedUsers.length === users.length && users.length > 0}
                                            // disabled={isLoading}
                                        />
                                        {/* Custom Checkbox styling */}
                                        <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                            {/* Checked */}
                                            <path
                                                d="M3 8L6 11L11 3.5"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-[:checked]:opacity-100"
                                            />
                                            {/* Indeterminate */}
                                            <path
                                                d="M3 7H11"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                />
                                        </svg>
                                    </div>
                                    <p> EMPLOYEE NAME</p>
                                    </th>
                                    <th className='py-4 px-4'>DIVISION</th>
                                    <th className='py-4 px-4'>DEPARTMENT</th>
                                    <th className='py-4 px-4'>SECTION</th>
                                    <th className='py-4 px-4'>LOCATION</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-divider'>
                                {
                                    learnerLoading ? (
                                        Array.from({length: 4}).map((_, index) => (
                                            <tr key={index} className={`font-text text-sm hover:bg-gray-200`}>
                                                <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                    <div className='flex items-center gap-4 flex-row'>
                                                        {/* Checkbox */}
                                                        <div className="group grid size-4 grid-cols-1">
                                                            <input type="checkbox"
                                                                className="col-start-1 row-start-1 appearance-none border border-divider rounded checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                                                // onClick={(e) => e.stopPropagation()}
                                                                // onChange={(e) => {
                                                                //     handleCheckbox(e, userID);
                                                                // }}
                                                                // checked={isChecked} // Updated this line
                                                            />
                                                            {/* Custom Checkbox styling */}
                                                            <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                                                {/* Checked */}
                                                                <path
                                                                    d="M3 8L6 11L11 3.5"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                                                />
                                                                {/* Indeterminate */}
                                                                <path
                                                                    d="M3 7H11"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                    />
                                                            </svg>
                                                        </div>
                                                        {/* User Image */}
                                                        <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                            {/* <img src={profile_url} alt="" className='rounded-full'/> */}
                                                        </div>
                                                        {/* Name and employee-id*/}
                                                        <div>
                                                            <p className='font-text'></p>
                                                            <p className='text-unactive text-xs'>ID: </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-4'>
                                                    <div className='flex flex-col'>
                                                        {/* Division */}
                                                        <p className='text-unactive'>Division</p>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-4'>
                                                    <div className='flex flex-col'>
                                                        {/* Department */}
                                                        <p className='text-unactive'></p>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-4'>
                                                    <div className='flex flex-col'>
                                                        {/* Section */}
                                                        <p className='text-unactive'>Section</p>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-4'>
                                                    <div className='flex flex-col'>
                                                    {/* Branch Location */}
                                                    <p className='text-unactive'></p>
                                                    {/* City Location */}
                                                    <p className='text-unactive text-xs'></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        learners.map((learner, index) => (
                                            <tr key={index} className={`font-text text-sm hover:bg-gray-200`}>
                                            <td className={`text-sm  py-3 px-4 border-l-2 border-transparent transition-all ease-in-out`}>
                                                <div className='flex items-center gap-4 flex-row'>
                                                    {/* Checkbox */}
                                                    <div className="group grid size-4 grid-cols-1">
                                                        <input type="checkbox"
                                                            className="col-start-1 row-start-1 appearance-none border border-divider rounded checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-1"
                                                            // onClick={(e) => e.stopPropagation()}
                                                            // onChange={(e) => {
                                                            //     handleCheckbox(e, userID);
                                                            // }}
                                                            // checked={isChecked} // Updated this line
                                                        />
                                                        {/* Custom Checkbox styling */}
                                                        <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                                            {/* Checked */}
                                                            <path
                                                                d="M3 8L6 11L11 3.5"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="opacity-0 group-has-[:checked]:opacity-100"
                                                            />
                                                            {/* Indeterminate */}
                                                            <path
                                                                d="M3 7H11"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                />
                                                        </svg>
                                                    </div>
                                                    {/* User Image */}
                                                    <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                                        {/* <img src={profile_url} alt="" className='rounded-full'/> */}
                                                    </div>
                                                    {/* Name and employee-id*/}
                                                    <div>
                                                        <p className='font-text'>{learner.first_name} {learner.middle_name} {learner.last_name} {learner.name_suffix}</p>
                                                        <p className='text-unactive text-xs'>ID: {learner.employeeID}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4'>
                                                <div className='flex flex-col'>
                                                    {/* Division */}
                                                    <p className='text-unactive'>Division</p>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4'>
                                                <div className='flex flex-col'>
                                                    {/* Department */}
                                                    <p className='text-unactive'>{learner.department?.department_name}</p>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4'>
                                                <div className='flex flex-col'>
                                                    {/* Section */}
                                                    <p className='text-unactive'>Section</p>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4'>
                                                <div className='flex flex-col'>
                                                {/* Branch Location */}
                                                <p className='text-unactive'>{learner.branch?.branch_name}</p>
                                                {/* City Location */}
                                                <p className='text-unactive text-xs'>{learner.city?.city_name}</p>
                                                </div>
                                            </td>
                                        </tr>
                                        ))
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
            </div>

            {/* Pagination */}
            <div className="col-span-4 h-full mr-5 flex flex-row items-center justify-between py-3 border-t border-divider">
                <div>
                    <p className='text-sm font-text text-unactive'>
                        Showing <span className='font-header text-primary'>1</span> to <span className='font-header text-primary'>2</span> of <span className='font-header text-primary'>5</span> <span className='text-primary'>results</span>
                    </p>
                </div>
                {/* Paganation */}
                <div>
                    <nav className='isolate inline-flex -space-x-px round-md shadow-xs'>
                        {/* Previous */}
                        <a
                            //onClick={back}
                            className='relative inline-flex items-center rounded-l-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>

                        {/* Current Page & Dynamic Paging */}
                        {/* {Pages.map((page)=>(
                            <a
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
                        <a
                            //onClick={next}
                            className='relative inline-flex items-center rounded-r-md px-3 py-2 text-primary ring-1 ring-divider ring-inset hover:bg-primary hover:text-white transition-all ease-in-out'>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default CourseEnrollmentProps
