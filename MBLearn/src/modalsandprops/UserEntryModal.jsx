import { faUserPen, faTrash, faDotCircle, faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React, { useEffect, useMemo, useState } from 'react'
import axiosClient from '../axios-client'
import { InfinitySpin } from 'react-loader-spinner'
import EditUserModal from './EditUserModal'
import { useUser } from '../contexts/selecteduserContext'
import { use } from 'react'
import DeleteUserModal from './DeleteUserModal'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'


const UserEntryModal = ({open, close, classname,ID ,selectedUser}) =>{
    //const {selectUser, selectedUser, isFetching} = useUser()
    //API Call for fetching specific user
    const [date, setDate] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    //branch choice handelling
    // const handleBranchesOptions = (e) =>{
    //     const city = e.target.value;
    //     formik.setFieldValue('city', city)
    //     formik.setFieldValue('branch', '')

    //     //Filtering
    //     const filteredBranches = location.filter((branch) => branch.city_id.toString() === city)
    //     setSelectedBranches(filteredBranches)
    // }

    //Modal states
    const [modalState, setModalState] = useState({
        isEdit: false,
        isDelete: false,
    })

    //Toggle Modal State
    const toggleModal = (key,value) => {
        setModalState((prev => ({
            ...prev,
            [key]:value,
        })));
    }

    // useEffect(() => {
    //     if (open && ID) {
    //         if (selectedUser?.id === ID) {
    //             setLoading(false);
    //         } else {
    //             setLoading(true);
    //             selectUser(ID);
    //         }
    //     }
    // }, [ID, selectedUser, open]);
    // useEffect(() => {
    //     if (selectedUser && !isFetching) {
    //         setLoading(false);
    //     }
    // }, [selectedUser, isFetching]);

    //function for readable dates
    useEffect(() => {
        if(selectedUser?.created_at){
            const created_date = new Date(selectedUser.created_at).toLocaleDateString('en-US', {
                year: 'numeric',  // Display the full year (e.g., 2025)
                month: 'long',    // Display the full month name (e.g., January)
                day: 'numeric'    // Display the numeric day (e.g., 16)
            });
            setDate(created_date)
        }
    },[selectedUser])

    //Function for handling Edit
    const handleEdit = () => {
        toggleModal('isEdit',true)
    }
    const CloseEdit = () => {
        toggleModal("isEdit", false);
    }

      //Function for handling Delete
    const handleDelete = () => {
        toggleModal('isDelete',true)
        console.log("Must be deleted")
    }
    const CloseDelete = () => {
        toggleModal("isDelete", false);
    }

    //User Profile
    const OpenDetailView = (e, id) => {
        e.stopPropagation()
        navigate(`/systemadmin/userdetail/${id}`)
    }


    //Memoize the user profile
    const userProfile = useMemo(()=>{
        if (!selectedUser) return null;
        return (
            <div className='w-[25vw] h-40 flex items-center justify-center flex-col gap-2'>
            <div className='w-[8vw] h-[8vw] bg-white rounded-full shadow-md flex items-center justify-center'>
                <img src={selectedUser.profile_image} alt="" className='w-[7vw] h-[7vw] bg-primary rounded-full'/>
            </div>
            <p className='text-white font-header'>ID: {selectedUser.employeeID}</p>
            </div>
        )
    },[selectedUser]);



    //Memoize the Action Button
    // const actionButton = useMemo(()=>{
    //     if(!selectedUser) return null;
    //     return (
    //         <div className='col-start-3 border-b border-divider'>
    //             {/* Action button */}
    //             <div className='flex flex-row gap-2 justify-end'>
    //                 <div className='relative border-2 border-primary h-10 w-10 rounded-full flex items-center justify-center text-primary text-sm hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out group shadow-md' onClick={(e) => OpenDetailView(e, ID)}>
    //                     <FontAwesomeIcon icon={faEllipsis}/>
    //                     <p className='absolute w-auto top-10 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Details</p>
    //                 </div>
    //                 <div className='relative border-2 border-primary h-10 w-10 rounded-full flex items-center justify-center text-primary text-sm hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out group shadow-md' onClick={handleEdit}>
    //                     <FontAwesomeIcon icon={faUserPen}/>
    //                     <p className='absolute w-auto top-10 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Edit</p>
    //                 </div>
    //                 <div className='relative border-2 border-primary h-10 w-10 rounded-full flex items-center justify-center text-primary text-sm hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out group shadow-md' onClick={handleDelete}>
    //                     <FontAwesomeIcon icon={faTrash}/>
    //                     <p className='absolute w-auto top-10 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Delete</p>
    //                 </div>
    //             </div>


    //         </div>
    //     )
    // })

    //Memoize the User Information
    const userInformation = useMemo(()=>{
        if(!selectedUser) return null;
        return (
            <>
            <div className='grid grid-col-3 grid-row-3 bg-white w-full p-5'>
                <div className='col-start-1 col-span-2 row-start-1 py-4 px-4 border-b border-divider'>
                    {/* Name */}
                    <p className='font-header text-sm text-unactive uppercase'>Name:</p>
                    <h1 className='font-header text-4xl text-primary mb-0.5'>{selectedUser.first_name} {selectedUser.middle_name} {selectedUser.last_name}</h1>
                    <p className='font-text text-sm uppercase'>{selectedUser.title?.title_name}</p>
                </div>
            <div className='row-start-2 col-start-1 py-4 px-4 border-b border-r border-divider'>
                {/* Department */}
                <p className='font-header text-sm text-unactive uppercase'>Department:</p>
                <p className='font-text text-lg'>{selectedUser?.department?.department_name}</p>
                {/* <p className='font-text text-xs uppercase'>{selectedUser?.title.title_name}</p> */}
            </div>
            <div className='row-start-2 col-start-2 py-4 px-4 border-b border-r border-divider'>
                {/* Branch & City */}
                <p className='font-header text-sm text-unactive uppercase'>Branch:</p>
                <p className='font-text text-lg'>{selectedUser?.branch?.branch_name}</p>
                <p className='font-text text-xs uppercase'>{selectedUser?.city?.city_name}</p>
            </div>
            <div className='row-start-2 col-start-3 py-4 px-4 border-b border-divider'>
                {/* System Admin */}
                <p className='font-header text-sm text-unactive uppercase'>Role:</p>
                <p className='font-text text-lg'>{selectedUser.roles?.[0]?.role_name}</p>
            </div>
                {/* User Status */}
            <div className='row-start-3 col-span-2 py-4 px-4 border-r border-divider'>
                <p className='font-header text-sm text-unactive uppercase'>User Status:</p>
                <p className='font-text text-lg'>{selectedUser?.status}</p>
            </div>
                {/* User Added */}
            <div className='row-start-3 col-span-1 py-4 px-4'>
                    <p className='font-header text-sm text-unactive uppercase'>User Added:</p>
                    <p className='font-text text-lg'>{date}</p>
            </div>
            </div>
            </>
        )
    })

    return(
    <>
        <Dialog open={open} onClose={()=>""} className={classname}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text center'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='w-[50vw] grid grid-rows-[170px_min-content]'>
                            {/* Name Header */}
                            <div className='bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)]'>
                                <div className='bg-gradient-to-b from-transparent to-black p-5 grid grid-rows-[min-content_1fr] h-full'>
                                    <div className='flex flex-row justify-end'>
                                        <div>
                                            <div className='h-8 w-8 text-white border-2 border-white rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-white hover:text-primary transition-all ease-in-out' onClick={close}>
                                                <FontAwesomeIcon icon={faXmark}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-5 items-end px-5'>
                                        <div className='flex flex-row items-center justify-between p-2 rounded-full w-24 h-24 bg-white shadow-md'>
                                        <img src={selectedUser?.profile_image} alt="" className='rounded-full'/>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row gap-2'>
                                                <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">{selectedUser?.roles[0].role_name}</span>
                                                <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">{selectedUser?.status}</span>
                                            </div>
                                            <p className='font-header text-3xl text-white'>{selectedUser?.first_name} {selectedUser?.middle_name} {selectedUser?.last_name}</p>
                                            <p className='font-text text text-white'>ID: {selectedUser?.employeeID}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mx-5 my-2 py-2 grid grid-cols-3 grid-rows-[min_content-min_content]'>
                                <div className='py-4 border-b border-r border-divider px-5'>
                                    <p className='font-text text-xs text-unactive pb-2'>Division:</p>
                                    <p className='font-text text-primary leading-tight'>{selectedUser?.division.division_name}</p>
                                </div>
                                <div className='py-4 border-b border-r border-divider px-5'>
                                    <p className='font-text text-xs text-unactive pb-2'>Department & Title:</p>
                                    <p className='font-text text-primary leading-tight'>{selectedUser?.department.department_name}</p>
                                    <p className='font-text text-xs text-primary'>{selectedUser?.title.title_name}</p>
                                </div>
                                <div className='py-4 border-b border-divider px-5'>
                                    <p className='font-text text-xs text-unactive pb-2'>Section:</p>
                                    <p className='font-text text-primary leading-tight'>{selectedUser?.section.section_name}</p>
                                </div>
                                <div className='py-4 border-r border-divider px-5'>
                                    <p className='font-text text-xs text-unactive pb-2'>Location:</p>
                                    <p className='font-text text-primary leading-tight'>{selectedUser?.city.city_name}</p>
                                    <p className='font-text text-xs text-primary'>{selectedUser?.branch.branch_name}</p>
                                </div>
                                <div className='py-4 border-r border-divider px-5'>
                                    <p className='font-text text-xs text-unactive pb-2'>Date-Added:</p>
                                    <p className='font-text text-primary leading-tight'>{selectedUser?.created_at? format(new Date(selectedUser.created_at), "MMMM dd yyyy"): ""}</p>
                                    <p className='font-text text-xs text-primary'>{selectedUser?.created_at? format(new Date(selectedUser?.created_at||""), "hh:mm a"):""}</p>
                                </div>
                                <div className='py-4 border-divider px-5'>
                                    <p className='font-text text-xs text-unactive pb-2'>Last Login Time-stamp:</p>
                                    <p className={`font-text leading-tight ${selectedUser?.user_credentials?.last_logged_in? "text-primary" : "text-unactive"}`}>{selectedUser?.user_credentials?.last_logged_in? format(new Date(selectedUser?.user_credentials?.last_logged_in), "MMMM dd yyyy"): "Not-logged-in yet"}</p>
                                    <p className='font-text text-xs text-primary'>{selectedUser?.user_credentials?.last_logged_in?  format(new Date(selectedUser?.user_credentials?.last_logged_in), "hh:mm a"):""}</p>
                                </div>

                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
        <EditUserModal open={modalState.isEdit} close={CloseEdit} ID={ID} />
        <DeleteUserModal open={modalState.isDelete} close={CloseDelete} EmployeeID={ID}/>
    </>
    )
}

export default UserEntryModal
