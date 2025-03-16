import { faArrowLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";

const SelectUser = () => {
    return (
        <div className='grid  grid-cols-4 grid-rows-[min-content_min-content_1fr_min-content] h-full w-full overflow-hidden'>
            <Helmet>
                {/* Title of the mark-up */}
                <title>MBLearn | User Detail</title>
            </Helmet>

            <div className="flex flex-row col-span-3 row-span-1 item-center ml-5">
                <div className="text-primary flex flex-row justify-center items-start py-5">
                    <div className="flex flex-row justify-center items-center w-10 aspect-square border-2 border-primary rounded-full hover:scale-105 hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out">
                        <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" onClick={() => navigate(-1)}/>
                    </div>
                </div>
                <div className=" p-4">
                    {/* Image */}
                    <div className="w-60 aspect-square bg-primary rounded-full">

                    </div>
                </div>
                <div className=' pl-5 flex flex-col justify-center w-full'>
                    <h1 className='text-primary text-4xl font-header'> Employee Name</h1>
                    <p className='font-text text-sm text-unactive'>Department - Title</p>
                </div>
            </div>

        </div>
    )
}
export default SelectUser;
