import { faAddressCard, faBuildingUser, faChevronDown, faClapperboard, faClipboard, faFileArrowUp, faSuitcase, faUser, faUserCircle, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser as faUserRegular, faCircleCheck as faCircleCheckRegular, faAddressCard as faAddressCardRegular,  faBuilding as faBuildingRegular, faIdBadge as faIdBadgeRegular}  from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client"
import * as Yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import UserAddedSuccessfullyModal from "./UserAddedSuccessfullyModal"
import AddUserErrorModal from "./AdduserErrorModal"
//import { Stepper } from '@mantine/core';
import { useOption } from "../contexts/AddUserOptionProvider"
import AddMultipleUserProps from "./AddMultipleUserProps"
import AccountPermissionProps from "./AccountPermissionsProps"
import { ScrollArea } from "../components/ui/scroll-area"
import { AddUser, Step } from "../components/ui/addUserStepper"



const AddUserModal = ({open, close, updateTable}) => {
    //Option Context
    const {cities,departments,location,titles,roles,permission,division,section} = useOption();
    const [selectedBranches, setSelectedBranches] = useState([])
    const [generatedEmail, setGeneratedEmail] = useState('')
    const [generatedPassword, setGeneratedPassword] = useState('')
    const [role, setRoles] = useState([])
    const [accountPerm, setAccountPerm] = useState([])

    const stepperRef = useRef(null);



    const handleBranchesOptions = (e) =>{
        const city = e.target.value;
        formik.setFieldValue('city', city)
        formik.setFieldValue('branch', '')

        //Filtering
        const filteredBranches = location.filter((branch) => branch.city_id.toString() === city)
        setSelectedBranches(filteredBranches)
    }


    // Modals state(subject to change)
    const [OpenError, setError] = useState(false)
    const reset = () => {
        close();
        formik.resetForm();
        toggleState("steps",0);
    }

    //Data
    const [errorMessage, setErrorMessage] = useState({
        message: '',
        errors: {}
    })


    //Loading
    const [loading, setLoading] = useState(false);

    //payload and validation schema
    const formik = useFormik({
        //references
        initialValues: {
            employeeID: '',
            lastname:'',
            firstname:'',
            middlename:'',
            suffix:'',
            department: '',
            title: '',
            branch: '',
            city: '',
            role: '',
            status: 'Active',
        },
        //validation
        validationSchema: Yup.object({

            employeeID: Yup.string().required('required *').matches(/^\d+$/, 'Numbers only').length(11, 'Employee ID must be exactly 11 characters'),
            lastname: Yup.string().required('required *').matches(/^[A-Za-z.\s]+$/, 'Only letters are allowed'),
            firstname: Yup.string().required('required *').matches(/^[A-Za-z.\s]+$/, 'Only letters are allowed'),
            middlename: Yup.string().matches(/^[A-Za-z]+\.?$/, 'Invalid Special Character'),
            suffix: Yup.string().matches(/^[A-Za-z]+\.?$/, 'Invalid Special Character'),
            department: Yup.string().required('required *'),
            title: Yup.string().required('required *'),
            city: Yup.string().required('required *'),
            //branch: Yup.string().required('required *'),
            role: Yup.string().required('required *'),
        }),
        //submission
        onSubmit:(values) => {
            setLoading(true)
            const payload = {
                employeeID: values.employeeID,
                first_name: values.firstname.charAt(0).toUpperCase() + values.firstname.slice(1),
                last_name: values.lastname.charAt(0).toUpperCase() + values.lastname.slice(1),
                middle_name: values.middlename.charAt(0).toUpperCase() + values.middlename.slice(1),
                name_suffix: values.suffix.charAt(0).toUpperCase() + values.suffix.slice(1),
                department_id: values.department,
                section_id: values.section,
                division_id: values.division,
                title_id: values.title,
                branch_id: values.branch,
                city_id: values.city,
                role_id: values.role,
                status: "Active",
                MBemail: `${values.firstname.replace(/\s+/g, '').trim()}.${values.lastname.replace(/\s+/g, '').trim()}@mbtc.com`.toLowerCase(),
                password: `${values.firstname.replace(/\s+/g, '').trim()}_${values.employeeID}`,
                permissions:accountPerm
            }
            axiosClient.post('/add-user',payload).
            then((res) => {
                console.log(res)
                setLoading(false);
                nextStep();
            })
            .catch((err)=>{
                setErrorMessage({
                    message: err.response.data.message,
                    errors: err.response.data.errors
                })
                setError(true)
                setLoading(false);
            })
        }

    })

//     useEffect(()=>{console.log("Account Permissions",accountPerm)
//         console.log(formik.values.role)
// },[accountPerm])

    //Field Checker per step
    const stepFieldsMap = {
        0: ["lastname", "firstname",],
        1: ["employeeID", "department","title","city",'location'],
        2: ["role"]
    }


    //UseState
    const [state, setState] = useState({
        tab: "single",
        steps: 0,
    })
    const toggleState = (key,value) => {
        setState((prev => ({
            ...prev,
            [key]:value,
        })));
    }

    //Form Navigation
    //const nextStep = () => )
    const nextStep = async () => {
        const stepFields = stepFieldsMap[state.steps] || [];
        const errors = await formik.validateForm();
        const stepErrors = stepFields.some((field) => errors[field]);

        if (!stepErrors) {
            toggleState("steps",Math.min(state.steps + 1, 4))
        } else {
            console.log("Validation errors found:", errors);
        formik.setTouched(
            stepFields.reduce((acc, key) => ({ ...acc, [key]: true }), {})
        );
        }
    }
    const prevStep = () => toggleState("steps",Math.max(state.steps - 1, 0))

    //closing and reseting function
    const Closing = () => {
        toggleState("steps",0);
        close();
    }

    //Permission Helper
    // const fetchRoles = () => {
    //     axiosClient.get('/roles')
    //     .then(({data}) => {
    //         setRoles(data.roles)
    //     })
    //     .catch(error => console.error(error));
    // }
    useEffect(() => {
        setRoles(roles)
    },[])



    return(
        <>
        <Dialog open={open} onClose={()=>{}}>
            <DialogBackdrop transition className="backdrop-blur-sm fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-30"/>
            <div className='fixed inset-0 z-30 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel transition className='relative overflow-hidden transform rounded-md w-3/4 bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'>
                        <div className='bg-white rounded-md h-full p-5 flex flex-col'>
                            {/* Header */}
                            <div className="pt-2 pb-4 mx-4 border-b border-divider flex flex-row justify-between item-center">
                                <div>
                                    <h1 className="text-primary font-header text-3xl">Add User</h1>
                                    <p className="text-unactive font-text text-md">Create and register new users with defined roles</p>
                                </div>
                                <div className="bg-primarybg p-5 rounded-full">
                                    <div className="h-full w-fit aspect-square flex items-center justify-center">
                                        <FontAwesomeIcon icon={faUserPlus} className="text-primary text-lg"/>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs to add user by import or form */}
                            <div className="mx-4 py-4">
                                <div className="w-full flex flex-row rounded-md shadow-md hover:cursor-pointer">
                                    <span className={`w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-l-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${state.tab === "single" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={()=> toggleState("tab", "single")}>
                                        <FontAwesomeIcon icon={faUser}/>
                                        Add Single User
                                    </span>
                                    <span className={` w-1/2 flex flex-row gap-5 items-center text-md font-header ring-2 ring-primary rounded-r-md px-5 py-2 text-primary hover:bg-primary hover:text-white transition-all ease-in-out ${state.tab === "multiple" ? "bg-primary text-white" : "bg-white text-primary"}`} onClick={()=> toggleState("tab", "multiple")}>
                                        <FontAwesomeIcon icon={faUserGroup}/>
                                        Add Multiple Users
                                    </span>
                                </div>
                            </div>


                            {/* Add User by Form */}
                            {
                                state.tab === "single" ? (
                                    <>
                                        <AddUser ref={stepperRef} initialValues={0}>
                                            <Step stepTitle="Employee Information" stepDesc="Enter the user's personal information" stepID="user-info" icon={faUserCircle}>
                                                Hello
                                            </Step>
                                            <Step stepTitle="Status and Location" stepDesc="Specify the employee's department and branch location" stepID="user-details" icon={faBuildingUser}>
                                                Hello
                                            </Step>
                                            <Step stepTitle=" Account Status and Role" stepDesc="Assign the appropriate system role to define user access" stepID="account-permissions" icon={faAddressCard}>
                                                Hello
                                            </Step>
                                            <Step stepTitle="Review" stepDesc="Review all entered information" stepID="account-permissions" icon={faClipboard}>
                                                Hello
                                            </Step>
                                        </AddUser>
                                    </>
                                ) : state.tab === "multiple" ? (
                                    // <div>
                                    //     {/* Add user by Import file */}
                                    //     <div className="py-3 mx-4">
                                    //         <div className="flex flex-col gap-3 justify-center items-center rounded-lg border-2 border-dashed border-unactive px-6 py-10 h-full w-full">
                                    //             <FontAwesomeIcon icon={faFileArrowUp} className="text-4xl text-unactive"/>
                                    //             <p className="font-text text-center text-xs text-unactive">Upload .csv file to add multiple user in the system</p>
                                    //         </div>
                                    //     </div>
                                    //      {/* Action Buttons */}
                                    //     <div className="flex flex-row gap-2 mx-4 py-3">
                                    //         <div
                                    //         className="font-header text-center text-primary border-2 border-primary w-1/2 py-2 rounded-md shadow-md  hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">Cancel</div>
                                    //         <div className="font-header text-center text-white border-2 border-primary w-1/2 py-2 rounded-md shadow-md bg-primary hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">Next</div>
                                    //     </div>
                                    // </div>
                                    <AddMultipleUserProps onClose={close}/>
                                ) : null
                            }

                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>

        {/* Error Message*/}
        <AddUserErrorModal error={OpenError} close={()=>setError(false)} message={errorMessage.message} desc={errorMessage.errors}/>
        </>
    )
}

export default AddUserModal
