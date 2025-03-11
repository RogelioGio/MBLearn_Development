import { useOption } from "MBLearn/src/contexts/AddUserOptionProvider";
import React, { useState } from "react";
import UserSecEntyProps from "../UserSecEntyProps";

const ReactivationAccountSetting = () => {
    const {departments, titles, cities, location} = useOption();
    const [loading, setLoading] = useState()
    return(
        <div className="mx-5 py-5 row-span-2 col-span-3 grid grid-cols-2 grid-rows-[min-content_auto] gap-2">
            {/* Header */}
            <div className="row-span-1 col-span-2 flex flex-row justify-between items-center">
                <div>
                    <h1 className="font-header text-primary text-xl">Re-Activation Account Management</h1>
                    <p className="font-text text-unactive">Manage and list all available inactive employee accounts in the system for reactivation or permanent deletion</p>
                </div>
            </div>
            <div className='row-start-3 row-span-2 col-start-1 col-span-4 py-4'>
                <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                <table className='text-left min-w-full table-layout-fixed'>
                    <thead className='font-header text-xs text-primary bg-secondaryprimary uppercase'>
                        <tr>
                            <th className='p-4 w-2/7'>EMPLOYEE NAME</th>
                            <th className='p-4 w-2/7'>Employee Location & Department</th>
                            <th className='p-4 w-1/7'>Metrobank Working Email</th>
                            <th className='p-4 w-1/7'>ROLE</th>
                            <th className='p-4 w-1/7'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-divider'>
                        {
                            loading ? (
                                <UserCredentialsLoadingProps/>
                            ) : (
                                <UserSecEntyProps
                                user={1}
                                name={"Sample Name"}
                                MBEmail={"Sample Email"}
                                city={1}
                                branch={1}
                                department={1}
                                title={1}
                                role={1}
                                image={""}
                                edit={""}
                                />
                            )


                        }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}
export default ReactivationAccountSetting
