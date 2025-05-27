import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import * as Yup from "yup";
import axiosClient from "../axios-client";


const ResetPasswordModal = ({open, close}) => {
    const [resetting, setResseting] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
        }),
        onSubmit: (values) => {
            // Handle form submission
            setResseting(true);
            const payload = {
                email: values.email,
            };
            axiosClient.post('/send-reset-password-req',payload)
            .then((res) => {
                console.log(res)
                setResseting(false)
            }).else((err) => {
                console.log(err)
                setResseting(false)
            })
            console.log('Form submitted:', payload);
            // Close the modal after submission
        },
    })

    return (
        <Dialog open={open} onClose={close}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40" />
            <div className='fixed inset-0 z-40 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text center'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-40'>
                        <div className='bg-white rounded-md h-full p-5 grid grid-row-5 grid-cols-2 w-[40vw]'>
                        {/* Header */}
                        <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row gap-4 col-span-2 justify-between">
                            <div>
                                <h1 className="text-primary font-header text-3xl">Reset Password</h1>
                                <p className="text-unactive font-text text-xs">Create an request to the system admin to reset your password by entering your MBLearn Email and wait for the respective response</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="h-fit bg-primarybg p-5 rounded-full flex items-center justify-center">
                                    <div className="h-full w-fit aspect-square flex items-center justify-center">
                                        <FontAwesomeIcon icon={faClock} className="text-primary text-lg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="px-4 w-full col-span-2">
                        <div>
                            <div className="inline-flex flex-col gap-1 col-span-2 py-2 w-full">
                                <label htmlFor="email" className="font-text text-xs flex flex-row justify-between">
                                    <p>MBLearn Email <span className="text-red-500">*</span></p>
                                </label>
                                <input type="text" name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        maxLength={50}
                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                {formik.touched.email && formik.errors.email ? (<div className="text-red-500 text-xs font-text">{formik.errors.email}</div>):null}
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                                <button type="button" className="w-full inline-flex flex-col items-center gap-2 p-4 rounded-md font-header uppercase text-primary border-2 border-primary text-xs hover:text-white hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out"
                                    onClick={close}>
                                    <p>Cancel</p>
                                </button>
                                <button type="submit" className="w-full inline-flex flex-col items-center gap-2 bg-primary p-4 rounded-md font-header uppercase text-white text-xs hover:cursor-pointer hover:bg-primaryhover hover:scale-105 transition-all ease-in-out">
                                    <p>{resetting ? "Resetting Pasword":"Reset Password"}</p>
                                </button>
                            </div>
                        </form>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
export default ResetPasswordModal;
