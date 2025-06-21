import { faTrashCan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOption } from "../contexts/AddUserOptionProvider";
import { useEffect, useState } from "react";

const UserSecEntyProps = ({user,name,employeeID,MBEmail,city,branch,division,section,department,role,image,status,lastLogin,edit,select}) => {

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
        <tr className='font-text text-sm hover:bg-gray-200 hover:cursor-pointer' onClick={(e) => edit(e,user,select)} >
            {
                breakpoint === 'base' || breakpoint === 'sm' || breakpoint === 'md' ? (<>
                    <td className="py-3 px-4 grid grid-cols-[min-content_1fr_1fr] grid-rows-2 gap-y-2 gap-x-3">
                        <div className="h-10 w-10 row-span-2">
                                    <img alt="" src={image} className='rounded-full w-full'/>
                        </div>
                        <div>
                            <p className='font-text'>{name}</p>
                            <p className='text-unactive text-xs'>ID: {employeeID}</p>
                        </div>
                        <div>
                            <p className="">{MBEmail}</p>
                            <p className='text-xs font-text text-unactive'>Email</p>
                        </div>
                        <div>
                            <p className="">{role}</p>
                            <p className='text-xs font-text text-unactive'>Account Role</p>
                        </div>
                        <div>
                            <p className="">{lastLogin != null ? lastLogin : "Not Logged Yet"}</p>
                            <p className='text-xs font-text text-unactive'>Last-Logged-in Time Stamp</p>
                        </div>
                    </td>
                </>) : (
                    <>
                    <td className='text-sm py-3 px-4'>
                            <div className='flex items-center gap-2'>
                                {/* User Image */}
                                <div className='bg-blue-500 h-10 w-10 rounded-full'>
                                    <img alt="" src={image} className='rounded-full'/>
                                </div>
                                {/* Name */}
                                <div>
                                    <p className='font-text'>{name}</p>
                                    <p className='text-unactive'>ID: {employeeID}</p>
                                </div>
                            </div>
                        </td>

                        <td className='py-3 px-4'>
                            <p className="text-unactive">{MBEmail}</p>
                        </td>

                        <td className='py-3 px-4'>
                            <p className="text-unactive">{role}</p>
                        </td>

                        {/* Last Login */}
                        <td className="py-3 px-4">
                        <p className="text-unactive">{lastLogin != null ? lastLogin : "Not Logged Yet"}</p>
                        </td>
                    </>
                )
            }
        </tr>
    );
}
export default UserSecEntyProps;
