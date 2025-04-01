import { useEffect, useState } from "react";
import Papa from "papaparse";
import { faChevronDown, faFileArrowUp, faSuitcase, faUser, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser as faUserRegular, faCircleCheck as faCircleCheckRegular, faAddressCard as faAddressCardRegular,  faBuilding as faBuildingRegular, faIdBadge as faIdBadgeRegular}  from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import User from "./UserEntryProp";

const AddMultipleUserProps = ({onClose}) => {
    const [csvData, setCsvData] = useState([]);
    const [filename, setFilename] = useState("");
    const [jsonData, setJsonData] = useState([]);
    const [dragOver, setDragover] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragover(true);
    };

    const handleDragLeave = (e) => {
        setDragover(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragover(false);

        const file = e.dataTransfer.files[0]; // Get dropped file
        processCsvFile(file);
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        processCsvFile(file);
    };

    const processCsvFile = (file) => {
        if (!file) return; // ✅ Prevents infinite loop

        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType !== 'csv') {
            alert('Please upload a CSV file');
            return;
        }

        setUploadedFile(true);
        setFilename(file.name);

        const res = JSON.stringify(csvData, null, 2);
        setJsonData(res);
        console.log(res);

        Papa.parse(file, {
            complete: (result) => {
                const filteredData = result.data.filter(row =>
                    Object.values(row).some(value => value.trim() !== "")
                );

                setCsvData(filteredData);
            },
            header: true,
            skipEmptyLines: true
        });
    };

    // const csvUploadFn = (e) => {
    //     const file = e.target.files[0];
    //     const fileType = file.name.split('.').pop().toLowerCase();

    //     if (fileType !== 'csv') {
    //         alert('Please upload a CSV file');
    //         return;
    //     }

    //     Papa.parse(file, {
    //         complete: (result) => {
    //             setCsvData(result.data);
    //         },
    //         header: true,
    //     })

    // }

    // const conversionFn = () => {
    //     const res = JSON.stringify(csvData, null, 2);
    //     setJsonData(res);
    //     console.log(res);
    // }


    return (
        <div>
            {/* <input type="file"
                    onChange={csvUploadFn}
                    accept=".csv" />
            <button className="button"
                    onClick={conversionFn}>
                    Convert to JSON
                </button> */}
            {
                !uploadedFile ? (<div className="py-3 mx-4">
                    <label htmlFor="import"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`flex flex-col gap-3 justify-center items-center rounded-lg border-2 border-dashed border-unactive px-6 py-10 h-full w-full ${
                            dragOver ? '!border-primary  bg-blue-100' : 'border-unactive'} shadow-md cursor-pointer transition-all ease-in-out`}>
                        <FontAwesomeIcon icon={faFileArrowUp} className={`text-4xl text-unactive ${dragOver ? 'text-primary' : 'text-unactive'}`}/>
                        <p className={`font-text text-center text-xs ${dragOver ? 'text-primary' : 'text-unactive'} text-unactive`}>Upload .csv file to add multiple user in the system</p>

                        {/* Input */}
                        <input type="file" accept=".csv" className="hidden" id="import" onChange={handleFileInput}/>
                    </label>
                    </div>
                    ) : (
                        <>
                    <div className="py-3 mx-4">
                        <p className="text-xs text-unactive">File Uploaded:</p>
                        <p className="text-sm font-text text-primary">{filename}</p>
                    </div>

                    <div className="py-3 mx-4">
                        <div className='w-full border-primary border rounded-md overflow-hidden shadow-md'>
                            <table className='text-left w-full'>
                                <thead className='font-header text-xs text-primary bg-secondaryprimary border-l-2 border-secondaryprimary'>
                                    <tr>
                                    <th className='py-4 px-4'>EMPLOYEE NAME</th>
                                    <th className='py-4 px-4'>DEPARTMENT</th>
                                    <th className='py-4 px-4'>BRANCH</th>
                                    <th className='py-4 px-4'>ROLE</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-divider'>
                                    {
                                        csvData.map(data => {
                                            const {first_name, middle_name, last_name } = data || {};
                                            const fullName = [first_name, middle_name, last_name].filter(Boolean).join(" ");
                                            return (
                                                <>
                                                <tr className="font-text text-sm hover:bg-gray-200">
                                                <td>
                                                    <p className="font-text">{fullName}</p>
                                                    <p className='text-unactive text-xs'>ID: {data.employeeID}</p>
                                                </td>
                                                <td className='py-3 px-4'>
                                                <div className='flex flex-col'>
                                                    {/* Department */}
                                                    <p className='text-unactive'>{data.department_Id}</p>
                                                    {/* Title */}
                                                    <p className='text-unactive text-xs'>{data.title_id}</p>
                                                </div>
                                                </td>
                                                <td className='py-3 px-4'>
                                                    <div className='flex flex-col'>
                                                    {/* Branch Location */}
                                                    <p className='text-unactive'>{data.branch_id}</p>
                                                    {/* City Location */}
                                                    <p className='text-unactive text-xs'>{data.city_id}</p>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-4'>
                                                    <p className='text-unactive'>{data.role_id}</p>
                                                </td>
                                                </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </>
                )

            }
            {/* <div className="py-3 mx-4">
                <label htmlFor="import"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="flex flex-col gap-3 justify-center items-center rounded-lg border-2 border-dashed border-unactive px-6 py-10 h-full w-full">
                    <FontAwesomeIcon icon={faFileArrowUp} className="text-4xl text-unactive"/>
                    <p className="font-text text-center text-xs text-unactive">Upload .csv file to add multiple user in the system</p>


                    <input type="file" accept=".csv" className="hidden" id="import" onChange={handleFileInput}/>
                </label>
            </div> */}


                <div className="flex flex-row gap-2 mx-4 py-3">
                    <div className="font-header text-center text-primary border-2 border-primary w-1/2 py-2 rounded-md shadow-md  hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white" onClick={onClose}>Cancel</div>
                    <div className="font-header text-center text-white border-2 border-primary w-1/2 py-2 rounded-md shadow-md bg-primary hover: cursor-pointer hover:scale-105 transition-all ease-in-out hover:bg-primaryhover hover:text-white">Next</div>
                </div>
        </div>
    );
}
export default AddMultipleUserProps;
