import { faCircleXmark as regularXmark } from '@fortawesome/free-regular-svg-icons';
import { faListCheck, faTrash, faXmark, faCircleXmark as solidXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import axios from 'axios';
import { format } from 'date-fns';
import { useFormik, yupToFormErrors } from 'formik';
import axiosClient from 'MBLearn/src/axios-client';
import { useOption } from 'MBLearn/src/contexts/AddUserOptionProvider';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const DeleteFormInputModal = ({open, close, formInput, formInputEntry, cities}) => {
    return (
        <>
            <Dialog open={open} onClose={close}>
                <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-50 backdrop-blur-sm"/>
                <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text center'>
                        <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
                                                        w-[100vw]
                                                        md:w-[40vw]'>
                            <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                                <div className='pb-2 mx-4 border-b border-divider flex flex-row justify-between item-center'>
                                    {/* Header */}
                                    <div className=''>
                                        <h1 className='text-primary font-header
                                                        text-base
                                                        md:text-2xl'>Delete {formInput} Input</h1>
                                        <p className='text-unactive font-text
                                                        text-xs
                                                        md:text-sm'>Confirm {formInput?.toLowerCase()} input in the system can will be used in form and options</p>
                                    </div>
                                    <div>
                                        <div className="border-2 border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out
                                                    w-5 h-5 text-xs
                                                    md:w-8 md:h-8 md:text-base"
                                        onClick={close}>
                                            <FontAwesomeIcon icon={faXmark}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='grid w-full px-5 py-2 gap-y-2'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-text text-xs text-unactive'>Input Category:</p>
                                        <p className='font-text'>{formInput}</p>
                                    </div>
                                    {
                                        formInput === 'Branch' ?
                                        <>
                                        <div className='flex flex-col gap-1'>
                                            <p className='font-text text-xs text-unactive'>City:</p>
                                            <p className='font-text'>{cities?.find((c)=>c.id === formInputEntry?.[Object.keys(formInputEntry).find(key => key.endsWith('_id'))])?.city_name}</p>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <p className='font-text text-xs text-unactive'>Input Name:</p>
                                            <p className='font-text'>{formInputEntry?.[Object.keys(formInputEntry).find(key => key.endsWith('_name'))]}</p>
                                        </div>
                                        </>
                                        :
                                        <div className='flex flex-col gap-1'>
                                            <p className='font-text text-xs text-unactive'>Input Name:</p>
                                            <p className='font-text'>{formInputEntry?.[Object.keys(formInputEntry).find(key => key.endsWith('_name'))]}</p>
                                        </div>
                                    }
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-text text-xs text-unactive'>Input Created Date:</p>
                                        <p className="font-text">
                                            {formInputEntry?.created_at
                                                ? format(new Date(formInputEntry.created_at), "MMMM dd, yyyy")
                                                : "No date available"}
                                            </p>
                                    </div>
                                </div>

                                <div className="mx-4 flex flex-row gap-2 pt-2">
                                <button onClick={close}
                                className={`bg-white border-2 border-primary p-4 rounded-md font-header uppercase text-primary text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 hover:text-white hover:border-primaryhover transition-all ease-in-out w-full`}>
                                    Cancel
                                </button>
                                <input type="submit"
                                    //value={editing ? ("Editing...") : ("Edit Form Input")}
                                    //disabled = {editing}
                                    value="Delete"
                                    className={`bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out w-full
                                    `}/>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
export default DeleteFormInputModal;
