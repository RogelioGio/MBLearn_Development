import { faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React, { useEffect, useMemo, useState } from 'react'
import axiosClient from '../axios-client'
import { InfinitySpin } from 'react-loader-spinner'
import EditUserModal from './EditUserModal'
import { useUser } from '../contexts/selecteduserContext'
import { use } from 'react'


const UserEntryModal = ({open, close, classname,ID}) =>{
    const {selectUser, selectedUser, isFetching} = useUser()
    //API Call for fetching specific user
    const [date, setDate] = useState();
    const [loading, setLoading] = useState(true)


    //branch choice handelling
    const handleBranchesOptions = (e) =>{
        const city = e.target.value;
        formik.setFieldValue('city', city)
        formik.setFieldValue('branch', '')

        //Filtering
        const filteredBranches = location.filter((branch) => branch.city_id.toString() === city)
        setSelectedBranches(filteredBranches)
    }

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

    useEffect(() => {
        if (open && ID) {
            if (selectedUser?.id === ID) {
                setLoading(false);
            } else {
                setLoading(true);
                selectUser(ID);
            }
        }
    }, [ID, selectedUser, open]);
    useEffect(() => {
        if (selectedUser && !isFetching) {
            setLoading(false);
        }
    }, [selectedUser, isFetching]);

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
        fetchUsers()
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
    const actionButton = useMemo(()=>{
        if(!selectedUser) return null;
        return (
            <div className='col-start-3 border-b border-divider'>
                {/* Action button */}
                <div className='flex flex-row gap-2 justify-end'>
                    <div className='relative border-2 border-primary h-10 w-10 rounded-full flex items-center justify-center text-primary text-sm hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out group shadow-md' onClick={handleEdit}>
                        <FontAwesomeIcon icon={faUserPen}/>
                        <p className='absolute w-auto top-10 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Edit</p>
                    </div>
                    <div className='relative border-2 border-primary h-10 w-10 rounded-full flex items-center justify-center text-primary text-sm hover:text-white hover:bg-primary hover:cursor-pointer transition-all ease-in-out group shadow-md'>
                        <FontAwesomeIcon icon={faTrash}/>
                        <p className='absolute w-auto top-10 z-10 bg-tertiary text-white p-2 rounded-md text-xs scale-0 font-text group-hover:scale-100'>Delete</p>
                    </div>
                </div>


            </div>
        )
    })

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
            {actionButton}
            <div className='row-start-2 col-start-1 py-4 px-4 border-b border-r border-divider'>
                {/* Department */}
                <p className='font-header text-sm text-unactive uppercase'>Department:</p>
                <p className='font-text text-lg'>{selectedUser.department.department_name}</p>
                {/* <p className='font-text text-xs uppercase'>{selectedUser?.title.title_name}</p> */}
            </div>
            <div className='row-start-2 col-start-2 py-4 px-4 border-b border-r border-divider'>
                {/* Branch & City */}
                <p className='font-header text-sm text-unactive uppercase'>Branch:</p>
                <p className='font-text text-lg'>{selectedUser.branch.branch_name}</p>
                <p className='font-text text-xs uppercase'>{selectedUser?.city.city_name}</p>
            </div>
            <div className='row-start-2 col-start-3 py-4 px-4 border-b border-divider'>
                {/* System Admin */}
                <p className='font-header text-sm text-unactive uppercase'>Role:</p>
                <p className='font-text text-lg'>{selectedUser.roles?.[0]?.role_name}</p>
            </div>
                {/* User Status */}
            <div className='row-start-3 col-span-2 py-4 px-4 border-r border-divider'>
                <p className='font-header text-sm text-unactive uppercase'>User Status:</p>
                <p className='font-text text-lg'>{selectedUser.status}</p>
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
        <Dialog open={open} onClose={close} className={classname}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text center'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        {
                            loading ? (
                                <div className='h-full w-fit flex items-center justify-center p-10'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className='w-fit h-fit'>
                                        <InfinitySpin
                                            visible={true}
                                            width="200"
                                            color="hsl(239,94%,19%)"
                                            ariaLabel="infinity-spin-loading"
                                        />
                                        </div>
                                        <p className='font-text'>Retrieving user information, Please wait...</p>
                                    </div>
                                </div>
                            ) : selectedUser ? (
                                <div className='h-full w-fit bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] flex items-center'>
                                    {userProfile}
                                    {userInformation}
                                </div>
                            ): (
                            <div className="h-full w-full flex items-center justify-center">
                                <p>Loading user data...</p>
                            </div>
                        )}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
        <EditUserModal open={modalState.isEdit} close={CloseEdit} ID={ID} />
    </>
    )
}

export default UserEntryModal
