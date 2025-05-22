import { faBook, faBookAtlas, faBookOpen, faFileSignature, faFolderClosed, faSliders, faUserClock, faUserLock, faUsers, faUsersLine } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import axiosClient from "../axios-client"
import { act, useEffect, useRef, useState } from "react"
import RoleManagementSetting from "../modalsandprops/SystemSettingComponents.jsx/RoleManagementSetting"
import FormInputSetting from "../modalsandprops/SystemSettingComponents.jsx/FormInputSetting"
import ReactivationAccountSetting from "../modalsandprops/SystemSettingComponents.jsx/ReactivationAccountSetting"
import { ScrollArea } from "@mantine/core"
import { useStateContext } from "../contexts/ContextProvider"

export default function SystemConfiguration() {
    const {user} = useStateContext();
    const [tab, setTab] = useState(1)

    return (
        <div className='grid  grid-cols-4 grid-rows-[6.25rem_min-content_auto_auto_min-content] h-full w-full'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | System Configuration Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 border-b mx-5 border-divider'>
                <h1 className='text-primary text-4xl font-header'>System Configuration Maintenance</h1>
                <p className='font-text text-sm text-unactive' >Module for managing and customizing system settings to ensure optimal performance and functionality.</p>
            </div>
            {/* Settings Tabs */}
            <div className="col-start-1 col-span-1 row-span-3 border-r border-divider px-3 py-3 flex items-center flex-col gap-1">
                <div className= {`flex flex-row  items-center w-full px-3 py-3 gap-4 text-sm text-unactive hover:text-primary hover:bg-divider rounded-md cursor-pointer transition-all ease-in-out ${tab === 1 ? '!bg-divider !text-primary':null}`} onClick={() => setTab(1)}>
                    <FontAwesomeIcon icon={faUsersLine}/>
                    <h1 className="uppercase font-text">Role Management</h1>
                </div>
                <div className= {`flex flex-row  items-center w-full px-3 py-3 gap-4 text-sm text-unactive hover:text-primary hover:bg-divider rounded-md cursor-pointer transition-all ease-in-out ${tab === 2 ? '!bg-divider !text-primary':null}`} onClick={() => setTab(2)}>
                    <FontAwesomeIcon icon={faFileSignature}/>
                    <h1 className="uppercase font-text">Form Input Setting</h1>
                </div>
                {
                    user.user_infos.permissions?.some((permission)=> permission.permission_name === "AccountReactivation") ?
                    <div className= {`flex flex-row  items-center w-full px-3 py-3 gap-4 text-sm text-unactive hover:text-primary hover:bg-divider rounded-md cursor-pointer transition-all ease-in-out ${tab === 3 ? '!bg-divider !text-primary':null}`} onClick={() => setTab(3)}>
                    <FontAwesomeIcon icon={faUserClock}/>
                    <h1 className="uppercase font-text">Re-Activation Account</h1>
                    </div>:null
                }
                <div className= {`flex flex-row  items-center w-full px-3 py-3 gap-4 text-sm text-unactive hover:text-primary hover:bg-divider rounded-md cursor-pointer transition-all ease-in-out ${tab === 4 ? '!bg-divider !text-primary':null}`} onClick={() => setTab(4)}>
                    <FontAwesomeIcon icon={faBook}/>
                    <h1 className="uppercase font-text">Course Form Input Settings</h1>
                </div>
                <div className= {`flex flex-row  items-center w-full px-3 py-3 gap-4 text-sm text-unactive hover:text-primary hover:bg-divider rounded-md cursor-pointer transition-all ease-in-out ${tab === 5 ? '!bg-divider !text-primary':null}`} onClick={() => setTab(5)}>
                    <FontAwesomeIcon icon={faSliders}/>
                    <h1 className="uppercase font-text">System Content Settings</h1>
                </div>
                <div className= {`flex flex-row  items-center w-full px-3 py-3 gap-4 text-sm text-unactive hover:text-primary hover:bg-divider rounded-md cursor-pointer transition-all ease-in-out ${tab === 6 ? '!bg-divider !text-primary':null}`} onClick={() => setTab(6)}>
                    <FontAwesomeIcon icon={faFolderClosed}/>
                    <h1 className="uppercase font-text">Archive and Auditing Settings</h1>
                </div>

            </div>
            {/* Setting Content */}

                {
                    tab === 1 ? (
                        <RoleManagementSetting/>
                    ) : tab === 2 ? (
                        <FormInputSetting/>
                    ) : tab === 3 ? (
                        <ReactivationAccountSetting/>
                    ) : (null)
                }


        </div>
    )
}
