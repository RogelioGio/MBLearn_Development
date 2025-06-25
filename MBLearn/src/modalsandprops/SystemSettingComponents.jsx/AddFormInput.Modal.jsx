import { faCircleXmark as regularXmark } from '@fortawesome/free-regular-svg-icons';
import { faListCheck, faXmark, faCircleXmark as solidXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import axios from 'axios';
import { useFormik, yupToFormErrors } from 'formik';
import axiosClient from 'MBLearn/src/axios-client';
import { useOption } from 'MBLearn/src/contexts/AddUserOptionProvider';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from "sonner"

const AddFormInputModal = ({ isOpen, onClose, formInput, category}) => {
    const {departments, cities} = useOption()
    const [adding, setAdding] = useState(false)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues:
        formInput === 'Branch' ? {
            city: '',
            [formInput]: ''
        }:{
            [formInput]: ''
        },
        validationSchema: Yup.object(
            formInput === 'Branch' ? {
                city: Yup.string().required('This field is required'),
                [formInput]: Yup.string().required('This field is required').max(100, "too many characters").matches(/^[a-zA-Z\s]*$/, 'No special characters allowed')
            } : {
                [formInput]: Yup.string().required('This field is required').max(100, "too many characters").matches(/^[a-zA-Z\s]*$/, 'No special characters allowed')
            }
        ),
        onSubmit: (value) => {
            console.log(value[formInput])

            setAdding(true)
            function getEndPoint(formInput) {
                switch (formInput) {
                    case 'Division' :
                        return 'divisions';
                    case 'Department' :
                        return 'departments';
                    case 'Section' :
                        return 'sections'
                    case 'City' :
                        return 'cities'
                    case 'Branch' :
                        return 'add-branch-city'
                    default:
                        return null
                }
            }

            const payload = {
                ...(formInput === "Branch" && { city_id: value.city }),
                [`${formInput.toLowerCase()}_name`]: value[formInput]
            }

            if (formInput === 'Branch') {
                axiosClient.post(`/${getEndPoint(formInput)}`, payload)
                .then((res) =>
                    {
                        toast.success("New Form input added", {
                                    description: "New form input added in the system"
                                });
                        setAdding(false)
                        setTimeout(()=>{
                            formik.resetForm()
                        },500)
                        onClose();
                    })
                .catch((err) => {
                    setAdding(false)
                    toast.error("Adding Form Input Failed", {
                                description: "Something went wrong while saving the data."
                                });
                    formik.resetForm()
                })
            } else {
                axiosClient.post(`/${getEndPoint(formInput)}`, payload)
                .then((res) =>
                    {
                        toast.success("New Form input added", {
                                    description: "New form input added in the system"
                                });
                        setAdding(false)
                        setTimeout(()=>{
                            formik.resetForm()
                        },500)
                        onClose()
                    })
                .catch((err) => {
                    setAdding(false)
                    toast.error("Adding Form Input Failed", {
                                description: "Something went wrong while saving the data."
                                });
                    formik.resetForm()
                })
            }
        }
    })

    return (
        <>
        <Dialog open={isOpen} onClose={()=>{}}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-50 backdrop-blur-sm"/>
                <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
                                                        w-[100vw]
                                                        md:w-[50vw]'>
                            <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                                <div className='pb-2 mx-4 border-b border-divider flex flex-row justify-between item-center'>
                                    {/* Header */}
                                    <div>
                                        <h1 className='text-primary font-header
                                                        text-base
                                                        md:text-2xl'>Add {formInput} Input</h1>
                                        <p className='text-unactive font-text
                                                        text-xs
                                                        md:text-sm'>Add new {formInput?.toLowerCase()} input in the system can will be used in form and options</p>
                                    </div>
                                    <div>
                                        <div className="border-2 border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out
                                                    w-5 h-5 text-xs
                                                    md:w-8 md:h-8 md:text-base"
                                        onClick={onClose}>
                                            <FontAwesomeIcon icon={faXmark}/>
                                        </div>
                                    </div>
                                </div>
                                {/* Content based on the clicked */}
                                {
                                    formInput === 'Division' ? (
                                        <div className='px-4 py-2'>
                                            <form onSubmit={formik.handleSubmit}>
                                            <div className='row-start-2 py-2'>
                                                <label htmlFor={formInput} className="font-header text-xs flex flex-row justify-between pb-2">
                                                <p className="font-text">{formInput} Input Name:</p>
                                                </label>
                                                <input type="input" name={formInput}
                                                    value={formik.values[formInput]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {/* Validation Errors */}
                                                    {formik.touched[formInput] && formik.errors[formInput] && <div className='pt-2 text-xs text-red-500 font-text'>{formik.errors[formInput]}</div>}
                                                </div>
                                            </form>
                                        </div>
                                    ) : formInput === 'Department' ? (
                                        <div className='px-4 py-2'>
                                            <form onSubmit={formik.handleSubmit}>
                                            <div className='row-start-2 py-2'>
                                                <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                                <p className="font-text">{formInput} Input Name:</p>
                                                </label>
                                                <input type="input" name={formInput}
                                                    value={formik.values[formInput]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    maxLength={50}
                                                    className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {/* Validation Errors */}
                                                    {formik.touched[formInput] && formik.errors[formInput] && <div className='pt-2 text-xs text-red-500 font-text'>{formik.errors[formInput]}</div>}
                                                </div>
                                            </form>
                                        </div>
                                    ) : formInput === 'Title' ? (
                                        <div className='px-4 py-2'>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className='row-start-2 py-2'>
                                                <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                                <p className="font-text">{formInput} Input Name:</p>
                                                </label>
                                                <input type="input" name={formInput}
                                                    value={formik.values[formInput]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    maxLength={50}
                                                    className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {/* Validation Errors */}
                                                    {formik.touched[formInput] && formik.errors[formInput] && <div className='pt-2 text-xs text-red-500 font-text'>{formik.errors[formInput]}</div>}
                                            </div>
                                            </form>
                                        </div>
                                    ) : formInput === 'Section' ? (
                                        <div className='px-4 py-2'>
                                            <form onSubmit={formik.handleSubmit}>
                                            <div className='row-start-2 py-2'>
                                                <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                                <p className="font-text">{formInput} Input Name:</p>
                                                </label>
                                                <input type="input" name={formInput}
                                                    value={formik.values[formInput]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {/* Validation Errors */}
                                                    {formik.touched[formInput] && formik.errors[formInput] && <div className='pt-2 text-xs text-red-500 font-text'>{formik.errors[formInput]}</div>}
                                                </div>
                                            </form>
                                            </div>
                                    ) : formInput === 'City' ? (
                                        <div className='px-4 py-2'>
                                            <form onSubmit={formik.handleSubmit}>
                                            <div className='row-start-2 py-2'>
                                                <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                                <p className="font-text">{formInput} Input Name:</p>
                                                </label>
                                                <input type="input" name={formInput}
                                                    value={formik.values[formInput]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {/* Validation Errors */}
                                                    {formik.touched[formInput] && formik.errors[formInput] && <div className='pt-2 text-xs text-red-500 font-text'>{formik.errors[formInput]}</div>}
                                                </div>
                                            </form>
                                            </div>
                                    ) : formInput === 'Branch' ? (
                                        <div className='px-4 py-2'>
                                            <form onSubmit={formik.handleSubmit}>
                                            {/* City Selector */}
                                            <div>
                                                <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                                <p className="font-text">City:</p>
                                                </label>
                                                <div className="grid grid-cols-1">
                                                    <select id="role" name="city" className="appearance-none font-text col-start-1 row-start-1 border border-divider rounded-md py-2 px-4 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"
                                                        value={formik.values.city}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        >
                                                        <option value=''>
                                                            <p className='text-unactive'>Select City</p>
                                                        </option>
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
                                                {formik.touched.city && formik.errors.city && <div className='text-xs text-red-500 font-text py-2'>{formik.errors.city}</div>}
                                            </div>

                                            <div className='py-2'>
                                                <label htmlFor="input" className="font-header text-xs flex flex-row justify-between pb-2">
                                                <p className="font-text">{formInput} Input Name:</p>
                                                </label>
                                                <input type="input" name={formInput}
                                                    value={formik.values[formInput]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className="w-full font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                                    {/* Validation Errors */}
                                                    {formik.touched[formInput] && formik.errors[formInput] && <div className='pt-2 text-xs text-red-500 font-text'>{formik.errors[formInput]}</div>}
                                                </div>
                                            </form>
                                        </div>
                                    ): (null)
                                }
                                <div className='mx-4 flex flex-row gap-1'>
                                    <div className='flex items-center justify-center bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:text-white hover:border-primaryhover transition-all ease-in-out w-full'
                                        onClick={()=>{
                                            onClose()
                                            setTimeout(()=>{formik.resetForm()},500)
                                        }}>
                                        Cancel
                                    </div>
                                    <div className={`${adding ? "opacity-50 hover:cursor-not-allowed":"hover:cursor-pointer"} flex items-center justify-center bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:bg-primaryhover transition-all ease-in-out w-full`}
                                        onClick={()=>{if(adding) return
                                                        formik.handleSubmit()
                                                    }}>
                                        {adding ? "Adding...":"Add Form Input"}
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
        </Dialog>
        </>
    )
}
export default AddFormInputModal;
