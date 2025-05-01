import { faCircleXmark as regularXmark } from '@fortawesome/free-regular-svg-icons';
import { faListCheck, faCircleXmark as solidXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useFormik } from 'formik';
import { useOption } from 'MBLearn/src/contexts/AddUserOptionProvider';
import { useState } from 'react'
const AddFormInputModal = ({ isOpen, onClose, formInput }) => {
    const {departments, cities} = useOption()
    const [adding, setAdding] = useState(false)
    const formik = useFormik({})
    return (
        <>
        <Dialog open={isOpen} onClose={()=>{}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-50 backdrop-blur-sm"/>
                <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='w-[50vw] p-5 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                            <div className='grid grid-cols-[1fr_1fr_min-content] grid-rows-[min-content] mx-5 py-5 border-b border-divider gap-y-4'>
                                {/* Header */}
                                <div className='col-span-2 flex flex-col justify-center items-start'>
                                    <h1 className='text-primary font-header text-3xl'>Add {formInput} Input</h1>
                                    <p className='text-unactive font-text text-xs'>Add new {formInput?.toLowerCase()} input in the system can will be used in form and options</p>
                                </div>
                                <div className='col-span-1 flex justify-end items-center'>
                                    <div className='flex items-center justify-center p-5 bg-primarybg rounded-full text-primary'>
                                        <FontAwesomeIcon icon={faListCheck} className='text-lg'/>
                                    </div>
                                </div>
                            </div>
                            {/* Content based on the clicked */}
                            {
                                formInput === 'Division' ? (
                                    <div className='px-5 py-2'>
                                        <div className='row-start-2 py-2'>
                                            <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                            <p className="font-text text-unactive">{formInput} Input Name:</p>
                                            </label>
                                            <input type="input" name="input"
                                                // value={formik.values.courseID}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}
                                                // maxLength={11}
                                                className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {/* Validation Errors */}
                                            </div>
                                            <div className="flex flex-row gap-2 py-2">
                                                <button onClick={() => onClose()}
                                                className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full`}>
                                                    Cancel
                                                </button>
                                                <input type="submit"
                                                    value="Add Input"
                                                    className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                                    `}/>
                                                </div>
                                        </div>
                                ) : formInput === 'Department' ? (
                                    <div className='px-5 py-2'>
                                        <div className='row-start-2 py-2'>
                                            <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                            <p className="font-text text-unactive">{formInput} Input Name:</p>
                                            </label>
                                            <input type="input" name="input"
                                                // value={formik.values.courseID}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}
                                                // maxLength={11}
                                                className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {/* Validation Errors */}
                                            </div>
                                            <div className="flex flex-row gap-2 py-2">
                                                <button onClick={() => onClose()}
                                                className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full`}>
                                                    Cancel
                                                </button>
                                                <input type="submit"
                                                    value="Add Input"
                                                    className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                                    `}/>
                                                </div>
                                        </div>
                                ) : formInput === 'Title' ? (
                                    <div className='px-5 py-2'>
                                        {/* Department Selector */}
                                        <div className="grid grid-cols-1 py-2">
                                            <select id="dept" name="dept" className="appearance-none font-text col-start-1 row-start-1 border border-primary rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                // value={formik.values.role}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}\
                                                >
                                                <option value=''>Select Department</option>
                                                {
                                                    departments.map((department) => (
                                                        <option key={department.id} value={department.id}>{department.department_name}</option>
                                                    ))
                                                }
                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className='row-start-2 py-2'>
                                            <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                            <p className="font-text text-unactive">{formInput} Input Name:</p>
                                            </label>
                                            <input type="input" name="input"
                                                // value={formik.values.courseID}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}
                                                // maxLength={11}
                                                className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {/* Validation Errors */}
                                            </div>
                                            <div className="flex flex-row gap-2 py-2">
                                                <button onClick={() => onClose()}
                                                className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full`}>
                                                    Cancel
                                                </button>
                                                <input type="submit"
                                                    value="Add Input"
                                                    className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                                    `}/>
                                                </div>
                                        </div>
                                ) : formInput === 'Section' ? (
                                    <div className='px-5 py-2'>
                                        <div className='row-start-2 py-2'>
                                            <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                            <p className="font-text text-unactive">{formInput} Input Name:</p>
                                            </label>
                                            <input type="input" name="input"
                                                // value={formik.values.courseID}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}
                                                // maxLength={11}
                                                className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {/* Validation Errors */}
                                            </div>
                                            <div className="flex flex-row gap-2 py-2">
                                                <button onClick={() => onClose()}
                                                className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full`}>
                                                    Cancel
                                                </button>
                                                <input type="submit"
                                                    value="Add Input"
                                                    className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                                    `}/>
                                                </div>
                                        </div>
                                ) : formInput === 'City' ? (
                                    <div className='px-5 py-2'>
                                        <div className='row-start-2 py-2'>
                                            <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                            <p className="font-text text-unactive">{formInput} Input Name:</p>
                                            </label>
                                            <input type="input" name="input"
                                                // value={formik.values.courseID}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}
                                                // maxLength={11}
                                                className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {/* Validation Errors */}
                                            </div>
                                            <div className="flex flex-row gap-2 py-2">
                                                <button onClick={() => onClose()}
                                                className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full`}>
                                                    Cancel
                                                </button>
                                                <input type="submit"
                                                    value="Add Input"
                                                    className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                                    `}/>
                                                </div>
                                        </div>
                                ) : formInput === 'Branch' ? (
                                    <div className='px-5 py-2'>
                                        {/* Department Selector */}
                                        <div className="grid grid-cols-1 py-2">
                                            <select id="role" name="role" className="appearance-none font-text col-start-1 row-start-1 border border-primary rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                // value={formik.values.role}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}\
                                                >
                                                <option value=''>Select City</option>
                                                {
                                                    cities.map((city) => (
                                                        <option key={city.id} value={city.id}>{city.city_name}</option>
                                                    ))
                                                }
                                            </select>
                                            <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className='row-start-2 py-2'>
                                            <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                            <p className="font-text text-unactive">{formInput} Input Name:</p>
                                            </label>
                                            <input type="input" name="input"
                                                // value={formik.values.courseID}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}
                                                // maxLength={11}
                                                className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                {/* Validation Errors */}
                                            </div>
                                            <div className="flex flex-row gap-2 py-2">
                                                <button onClick={() => onClose()}
                                                className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full`}>
                                                    Cancel
                                                </button>
                                                <input type="submit"
                                                    value="Add Input"
                                                    className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                                    `}/>
                                                </div>
                                        </div>
                                ): (null)
                            }

                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
        </>
    )
}
export default AddFormInputModal;
