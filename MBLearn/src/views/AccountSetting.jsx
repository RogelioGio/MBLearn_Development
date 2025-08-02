import { Helmet } from "react-helmet";
import { ScrollArea } from "../components/ui/scroll-area";
import { faSave, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useOption } from "../contexts/AddUserOptionProvider";
const AccountSettings = () => {
    const {user} = useStateContext();
    const {division, departments, section, cities, location} = useOption();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: user.user_infos.first_name,
            middleName: user.user_infos.middle_name,
            lastName: user.user_infos.last_name,
            suffix: user.user_infos.name_suffix,
            employeeID: user.user_infos.employeeID,
            division: user.user_infos.division_id,
            department_id: user.user_infos.department_id,
            section: user.user_infos.section_id,
            city_id: user.user_infos.city.id,
            branch_id: user.user_infos.branch_id,
        },
        validationSchema: Yup.object({
            employeeID: Yup.string().required('required *').matches(/^\d+$/, 'Numbers only').length(11, 'Employee ID must be exactly 11 characters'),
        })
    })

    const [selectedBranches, setSelectedBranches] = useState();
    const handleBranchesOptions = (e, City) => {
        const city = e.target.value;

        formik.setFieldValue('city_id', city)
        formik.setFieldValue('branch_id', user.branch_id)
        //Filtering
        const filteredBranches = location.filter((branch) => branch.city_id.toString() === city)
        setSelectedBranches(filteredBranches)
    }


    return (
        <div className='grid grid-cols-4 h-full w-full
                        grid-rows-[6.25rem_min-content]
                        xl:grid-rows-[6.25rem_min-content_auto_auto_min-content]
                        sm:grid-rows-[6.25rem_min-content]'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | Account Setting</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center row-span-1 border-b border-divider
                            col-start-1 row-start-1 col-span-4 mx-3
                            xl:col-span-4
                            sm:col-span-4 sm:ml-4'>
                <h1 className='text-primary font-header
                                text-xl
                                sm:text-2xl
                                xl:text-4xl'>Account Settings</h1>
                <p className='font-text text-unactive
                                text-xs
                                xl:text-sm
                                sm:text-xs'>Effortlessly manage and add users to ensure seamless access and control.</p>
            </div>

            <form className="col-span-4">
                <div className=" px-3 py-2 flex flex-col gap-4">
                    <div className="">
                        <p className="font-header text-primary">Account Details and Basic Infomation</p>
                        <p className="font-text text-unactive text-xs">Update the user name, profile image and basic information</p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="p-4">
                            <div className="flex items-center justify-center bg-primary w-52 h-52 rounded-full">
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                    <label htmlFor="employeeID" className="font-text text-xs flex flex-row justify-between">
                                        <p>Employee ID <span className="text-red-500">*</span></p>
                                    </label>
                                    <input type="text" name="employeeID"
                                            value={formik.values.employeeID}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                <label htmlFor="firstName" className="font-text text-xs flex flex-row justify-between">
                                    <p>First Name <span className="text-red-500">*</span></p>
                                </label>
                                <input type="text" name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                <div className="inline-flex flex-col gap-1 row-start-2 col-span-1 py-2">
                                <label htmlFor="middleName" className="font-text text-xs flex flex-row justify-between">
                                    <p>Middle Name</p>
                                </label>
                                <input type="text" name="middlename"
                                        value={formik.values.middleName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                <div className="inline-flex flex-row gap-2 row-start-2 col-span-1 w-full">
                                <div className="w-3/4 gap-1 inline-flex flex-col py-2">
                                    <label htmlFor="lastName" className="font-text text-xs flex flex-row justify-between">
                                        <p>Last Name <span className="text-red-500">*</span></p>
                                    </label>
                                    <input type="text" name="lastName"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AccountSettings;
