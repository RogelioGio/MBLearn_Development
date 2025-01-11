import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useRef } from "react"


const AddUserModal = ({open, close}) => {

    const nameRef = useRef();
    const employeeIDRef = useRef();
    const departmentRef = useRef();
    const titleRef = useRef();
    const branchRef = useRef();
    const cityRef = useRef();

    const workingEmailRef = useRef();
    const passwordRef = useRef();

    const addUserPayload = () => {
        return{
            name: nameRef.current.value,
            employeeID: employeeIDRef.current.value,
            department: departmentRef.current.value,
            title: titleRef.current.value,
            branch: branchRef.current.value,
            city: cityRef.current.value
        }
    }

    const addUserCredentialsPayload = () => {
        return{
            workingEmail: workingEmailRef.current.value,
            password: passwordRef.current.value
        }
    }

    //Submit Function
    const submitForm = async (e) => {
        e.preventDefault();
        const payload_1 = addUserPayload();
        const payload_2 = addUserCredentialsPayload();
        console.log(payload_1)
        console.log(payload_2)
    }

    return(
        <>
        <Dialog open={open} onClose={close}>
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='bg-white rounded-md h-full w-fit p-5 flex flex-col'>
                            {/* Header */}
                            <div className="py-4 mx-4 border-b border-divider">
                                <h1 className="text-primary font-header text-3xl">Add User</h1>
                                <p className="text-unactive font-text text-md">Create and register new users with defined roles and permissions.</p>
                            </div>
                            {/* Add User by Form */}
                            <div className="mx-4 flex flex-row gap-5">
                                <form onSubmit={submitForm} className="grid grid-cols-3 gap-y-2 ">
                                {/* User information */}
                                <div className="py-2 col-span-3">
                                    <p className="font-header uppercase">Employee Information</p>
                                    <p className="font-text text-unactive text-xs"> Input all basic information of the employee to be added in the system.</p>
                                </div>
                                {/* Name */}
                                <div className="inline-flex flex-col gap-2 row-start-2 col-span-3">
                                    <label htmlFor="Name" className="font-header text-xs uppercase ">Name:</label>
                                    <input type="text" name="Name" ref={nameRef} className="font-text border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                {/* Employee Details */}
                                <div className="inline-flex flex-col gap-2 row-start-3 col-span-1 pr-2">
                                    <label htmlFor="EmployeeID" className="font-header text-xs uppercase">Employee ID:</label>
                                    <input type="text" name="EmployeeID" ref={employeeIDRef} className="border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                <div className="inline-flex flex-col gap-2 row-start-3 col-span-1 pr-2">
                                    {/* Must be dropdown */}
                                    <label htmlFor="Department" className="font-header text-xs uppercase ">Deparment:</label>
                                    <input type="text" name="Department" ref={departmentRef} className="border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                <div className="inline-flex flex-col gap-2 row-start-3 col-span-1">
                                    {/* Must be dropdown */}
                                    <label htmlFor="Title" className="font-header text-xs uppercase ">Title:</label>
                                    <input type="text" name="Title" ref={titleRef} className="border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                <div className="inline-flex flex-col gap-2 row-start-4 col-span-2 pr-2">
                                    <label htmlFor="Branch" className="font-header text-xs uppercase ">Branch Location:</label>
                                    <input type="text" name="Branch" ref={branchRef} className="border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                <div className="inline-flex flex-col gap-2 row-start-4 col-span-1 pb-4">
                                    <label htmlFor="City" className="font-header text-xs uppercase ">City:</label>
                                    <input type="text" name="City" ref={cityRef} className="border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                {/* Account credentials */}
                                <div className="py-2 col-span-3 border-t border-divider">
                                    <p className="font-header uppercase">Employee Account Credentials</p>
                                    <p className="font-text text-unactive text-xs">Input all employee's account crendentials to be added in the system.</p>
                                </div>

                                <div className="inline-flex flex-col gap-2 row-start-6 col-span-2 pr-2">
                                    <label htmlFor="Email" className="font-header text-xs uppercase">Metrobank Working Email</label>
                                    <input type="text" name="Email" ref={workingEmailRef} className="border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>
                                <div className="inline-flex flex-col gap-2 row-start-6 col-span-2 pb-4">
                                    <label htmlFor="Password" className="font-header text-xs uppercase">Password</label>
                                    <input type="text" name="Password" ref={passwordRef} className="border border-divider rounded-md p-2 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary"/>
                                </div>

                                {/* submit */}
                                <input type="submit" className="inline-flex flex-col gap-2 row-start-7 col-span-3 bg-primary p-4 rounded-md font-header uppercase text-white text-xs" />
                                </form>

                                {/* divider */}
                                <div className="flex flex-col justify-center items-center">
                                    <div className="border-l border-divider h-2/6"></div>
                                    <p className="font-text text-unactive">or</p>
                                    <div className="border-l border-divider h-2/6"></div>
                                </div>

                                {/* Add user by Import file */}
                                <div className="py-3">
                                    <div className="flex flex-col gap-3 justify-center items-center rounded-lg border-2 border-dashed border-unactive px-6 py-10 h-full w-[30vw]">
                                        <FontAwesomeIcon icon={faFileArrowUp} className="text-4xl text-unactive"/>
                                        <p className="font-text text-center text-xs text-unactive">Upload .csv file to add multiple user in the system</p>
                                    </div>
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

export default AddUserModal
