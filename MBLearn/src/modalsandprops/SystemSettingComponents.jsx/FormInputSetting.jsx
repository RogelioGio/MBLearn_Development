import { faFilter, faPenToSquare, faPlus, faTrash, faUserLock, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useOption } from "MBLearn/src/contexts/AddUserOptionProvider"
import { useState } from "react";
import { format } from "date-fns";
import React from "react";
import { ScrollArea } from "MBLearn/src/components/ui/scroll-area";
import AddFormInputModal from "./AddFormInput.Modal";

const FormInputSetting = () => {
    const {departments, titles, cities, location, division, section} = useOption();
    const [loading, setLoading] = useState()
    const [add, setAdd] = useState(false)
    const [formInput, setFormInput] = useState()

    const handleFormInput = (input) => {
        setFormInput(input)
        setAdd(true)
    }

    return(
        <>
        <ScrollArea className="col-span-3 row-span-3 overflow-y-auto max-h-[calc(100vh-6.25rem)]">
        <div className="mx-2 px-3 py-5 row-span-2 col-span-3 grid grid-cols-2 grid-rows-[min-content_auto] gap-8 overflow-y-auto max-h-full">
            {/* Header */}
            <div className="row-span-1 col-span-2 flex flex-row justify-between items-center pb-2">
                <div>
                    <h1 className="font-header text-primary text-xl">Form-Input Setting</h1>
                    <p className="font-text text-unactive text-xs">Manage all available inputs that are going to be used in several forms in the system</p>
                </div>
            </div>

            {/* Employee Division */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                 {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Division Options</h1>
                        <p className="font-text text-unactive text-xs">List of available employee division option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={() => handleFormInput("Division")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add Employee Division</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                    <table className='text-left w-full overflow-y-scroll'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                        <tr>
                            <th className='py-4 px-4 uppercase'>Employee Division Name</th>
                            <th className='py-4 px-4 uppercase'>Date-added</th>
                            <th className='py-4 px-4 uppercase'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            loading ? (
                                "Loading..."
                            ):(
                                division.map((division =>(
                                    <tr key={division.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                        <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{division.division_name}</td>
                                        <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(division.created_at), "MMMM dd, yyyy")}</td>
                                        <td className="flex flex-row gap-2 justify-end p-4">
                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                            </div>
                                            <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ))
                        }
                    </tbody>
                    </table>
                </div>
            </div>
            {/* Employee's Department */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Department Options</h1>
                        <p className="font-text text-unactive text-xs">List of available department option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={() => handleFormInput("Department")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add Department</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Department Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    departments.map((department =>(
                                        <tr key={department.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{department.department_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(department.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
            </div>
            {/* Employee's Title */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Title Options</h1>
                        <p className="font-text text-unactive text-xs">List of available employee title option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={() => handleFormInput("Title")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add Employee Title</p>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Department Selector */}
                    <div className="grid grid-cols-1">
                        <select id="role" name="role" className="appearance-none font-text col-start-1 row-start-1 border border-primary rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
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
                    {/* {formik.touched.role && formik.errors.role ? (<div className="text-red-500 text-xs font-text">{formik.errors.role}</div>):null} */}
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Employee Title Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    titles.map((title =>(
                                        <tr key={title.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{title.title_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(title.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                </div>
            </div>
            {/* Employee's Section */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Sections Options</h1>
                        <p className="font-text text-unactive text-xs">List of available employee sections option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={()=>handleFormInput("Section")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add Employee Section</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Employee Section Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    section.map((section =>(
                                        <tr key={section.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{section.section_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(section.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                </div>
            </div>
            {/* Employee's City */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Branch City</h1>
                        <p className="font-text text-unactive text-xs">List of available city option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={()=>handleFormInput("City")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add City</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>City Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    cities.map((city =>(
                                        <tr key={city.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{city.city_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(city.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
            </div>
            {/* Employee's Branch */}
            <div className="row-span-1 col-span-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-header text-primary text-base">Employee's Branch Location</h1>
                        <p className="font-text text-unactive text-xs">List of available employee title option for the system inputs and form</p>
                    </div>
                    <div>
                        <div className={`flex flex-row justify-center items-center border-2 border-primary py-2 px-8 font-header bg-secondarybackground rounded-md text-primary gap-5 w-full hover:bg-primary hover:text-white hover:scale-105 hover:cursor-pointer transition-all ease-in-out shadow-md`}
                            onClick={()=>handleFormInput("Branch")}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add Branch Location</p>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Department Selector */}
                    <div className="grid grid-cols-1">
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
                    {/* {formik.touched.role && formik.errors.role ? (<div className="text-red-500 text-xs font-text">{formik.errors.role}</div>):null} */}
                </div>
                <div className="w-full border-primary border rounded-md overflow-hidden shadow-md">
                        <table className='text-left w-full overflow-y-scroll'>
                        <thead className='font-header text-xs text-primary bg-secondaryprimary'>
                            <tr>
                                <th className='py-4 px-4 uppercase'>Employee Branch Location Name</th>
                                <th className='py-4 px-4 uppercase'>Date-added</th>
                                <th className='py-4 px-4 uppercase'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-divider'>
                            {
                                loading ? (
                                    "Loading..."
                                ):(
                                    location.map((location =>(
                                        <tr key={location.id} className={`font-text text-md text-primary hover:bg-gray-200 cursor-pointer`}>
                                            <td className={`font-text p-4 flex flex-row items-center gap-4 border-l-2 border-transparent transition-all ease-in-out`}>{location.branch_name}</td>
                                            <td className={`font-text p-4 gap-4 transition-all ease-in-out`}>{format(new Date(location.created_at), "MMMM dd, yyyy")}</td>
                                            <td className="flex flex-row gap-2 justify-end p-4">
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='text-sm'/>
                                                </div>
                                                <div className='aspect-square w-10 flex flex-row justify-center items-center bg-white border-2 border-primary rounded-md shadow-md text-primary hover:text-white hover:cursor-pointer hover:scale-105 hover:bg-primary ease-in-out transition-all '>
                                                    <FontAwesomeIcon icon={faTrash} className='text-sm'/>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
            </div>
        </div>
        </ScrollArea>
        <AddFormInputModal isOpen={add} onClose={()=>setAdd(false)} formInput={formInput}/>
        </>
    )
}
export default FormInputSetting
