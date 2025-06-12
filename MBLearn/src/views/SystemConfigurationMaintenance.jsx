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
import Test_Notfications from "./Test"
import ArchiveAndAuditingSetting from "../modalsandprops/SystemSettingComponents.jsx/ArchiveAndAuditingSetting"
import CourseFormInputSetting from "../modalsandprops/SystemSettingComponents.jsx/CourseFormInputSetting"
import SystemContentSetting from "../modalsandprops/SystemSettingComponents.jsx/SystemContentSetting"
import React from "react"


export default function SystemConfiguration() {
    const {user} = useStateContext();
    const [tab, setTab] = useState(1)
    const [breakpoint, setBreakpoint] = useState();
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        const handleResize = () => {
        setViewport({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        const { width } = viewport;

        if (width < 640) {
            setBreakpoint('base');
        } else if (width >= 640 && width < 768) {
            setBreakpoint('sm');
        } else if (width >= 768 && width < 1024) {
            setBreakpoint('md');
        } else if (width >= 1024 && width < 1280) {
            setBreakpoint('lg');
        } else if (width >= 1280 && width < 1536) {
            setBreakpoint('xl');
        } else {
            setBreakpoint('2xl');
        }
    }, [viewport]);


    return (
        <div className='grid grid-cols-4 h-full w-full
                        xl:grid-rows-[6.25rem_min-content_auto_auto_min-content]
                        sm:grid-rows-[6.25rem_min-content_auto]'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | System Configuration Maintenance</title>
            </Helmet>

            {/* Header */}
            <div className='flex flex-col justify-center col-span-4 row-span-1 pr-5 border-b mr-5 border-divider'>
                <h1 className='text-primary font-header
                                xl:text-4xl'>System Configuration Maintenance</h1>
                <p className='font-text text-unactive
                                xl:text-sm
                                sm:text-xs' >Module for managing and customizing system settings to ensure optimal performance and functionality.</p>
            </div>
            {/* Settings Tabs */}
            {
                breakpoint === 'xl' ? (
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
                ):(
                <ScrollArea className="col-start-1 col-span-4 row-span-1 flex items-center justify-centern mr-5">
                    <div className="my-4 flex items-center flex-row gap-2 h-full">
                    <div className= {`border-primary border-2 flex flex-row  items-center w-full px-5 py-3 gap-4 text-sm text-primary hover:text-white hover:bg-primary rounded-md cursor-pointer transition-all ease-in-out ${tab === 1 ? '!bg-primary !text-white':null}`} onClick={() => setTab(1)}>
                        <FontAwesomeIcon icon={faUsersLine}/>
                        <h1 className="uppercase font-text whitespace-nowrap">Role Management</h1>
                    </div>
                    <div className= {`border-primary border-2 flex flex-row  items-center w-full px-5 py-3 gap-4 text-sm text-primary hover:text-white hover:bg-primary rounded-md cursor-pointer transition-all ease-in-out ${tab === 2 ? '!bg-primary !text-white':null}`} onClick={() => setTab(2)}>
                        <FontAwesomeIcon icon={faFileSignature}/>
                        <h1 className="uppercase font-text whitespace-nowrap">Form Input Setting</h1>
                    </div>
                    {
                        user.user_infos.permissions?.some((permission)=> permission.permission_name === "AccountReactivation") ?
                        <div className= {`border-primary border-2 flex flex-row  items-center w-full px-5 py-3 gap-4 text-sm text-primary hover:text-white hover:bg-primary rounded-md cursor-pointer transition-all ease-in-out ${tab === 3 ? '!bg-primary !text-white':null}`} onClick={() => setTab(3)}>
                        <FontAwesomeIcon icon={faUserClock}/>
                        <h1 className="uppercase font-text whitespace-nowrap">Re-Activation Account</h1>
                        </div>:null
                    }
                    <div className= {`border-primary border-2 flex flex-row  items-center w-full px-5 py-3 gap-4 text-sm text-primary hover:text-white hover:bg-primary rounded-md cursor-pointer transition-all ease-in-out ${tab === 4 ? '!bg-primary !text-white':null}`} onClick={() => setTab(4)}>
                        <FontAwesomeIcon icon={faBook}/>
                        <h1 className="uppercase font-text whitespace-nowrap">Course Form Input Settings</h1>
                    </div>
                    <div className= {`border-primary border-2 flex flex-row  items-center w-full px-5 py-3 gap-4 text-sm text-primary hover:text-white hover:bg-primary rounded-md cursor-pointer transition-all ease-in-out ${tab === 5 ? '!bg-primary !text-white':null}`} onClick={() => setTab(5)}>
                        <FontAwesomeIcon icon={faSliders}/>
                        <h1 className="uppercase font-text whitespace-nowrap">System Content Settings</h1>
                    </div>
                    <div className= {`border-primary border-2 flex flex-row  items-center w-full px-5 py-3 gap-4 text-sm text-primary hover:text-white hover:bg-primary rounded-md cursor-pointer transition-all ease-in-out ${tab === 6 ? '!bg-primary !text-white':null}`} onClick={() => setTab(6)}>
                        <FontAwesomeIcon icon={faFolderClosed}/>
                        <h1 className="uppercase font-text whitespace-nowrap">Archive and Auditing Settings</h1>
                    </div>
                </div>
                </ScrollArea>
                )
            }

            {/* Setting Content */}

                {
                    tab === 1 ? (
                        <RoleManagementSetting/>
                    ) : tab === 2 ? (
                        <FormInputSetting/>
                    ) : tab === 3 ? (
                        <ReactivationAccountSetting/>
                    ) : tab === 4 ? (
                        <CourseFormInputSetting/>
                    ): tab === 5 ? (
                        <SystemContentSetting/>
                    ): tab === 6 ? (
                        <ArchiveAndAuditingSetting/>
                    ):
                    (null)
                }
        </div>
    )
}
