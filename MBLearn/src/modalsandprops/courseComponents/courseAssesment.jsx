

const CourseAssesment = () => {
    return(
        <div className="pl-1 grid grid-cols-1 grid-rows-[min-content_min-content] gap-2">
            <div>
                <p className="font-header text-primary">Course Assesment</p>
                <p className="font-text text-sm">
                    This is a sample course assesment. Please answer the following questions to the best of your ability.
                </p>
            </div>
            {/* Assesment items Content */}
            <div className="col-span-1 row-span-1 flex flex-col gap-2">
                <div className="flex flex-col gap-10 border-2 border-primary rounded-md p-4 bg-white shadow-md">
                    {/* Question */}
                    <div>
                        <p className="font-header text-primary">Question 1: (True or False)</p>
                        <p className="font-text text-sm">
                            Capital Gains Tax is imposed on profits made from the sale of income-generating properties only.
                        </p>
                    </div>
                    {/* Answers */}
                    <div className="grid grid-cols-2 gap-2">
                    <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out">
                        <p className="group-hover:text-white font-header text-primary">True</p>
                    </div>
                    <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out ">
                        <p className="group-hover:text-white font-header text-primary">False</p>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col gap-10 border-2 border-primary rounded-md p-4 bg-white shadow-md">
                    {/* Question */}
                    <div>
                        <p className="font-header text-primary">Question 2: (Multiple Choice)</p>
                        <p className="font-text text-sm">
                        Which of the following is NOT a type of direct tax in the Philippines?
                        </p>
                    </div>
                    {/* Answers */}
                    <div className="grid grid-cols-2 grid-rows-2 gap-2">
                    <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out">
                        <p className="group-hover:text-white font-header text-primary">A. Income Tax</p>
                    </div>
                    <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out ">
                        <p className="group-hover:text-white font-header text-primary">B. Value-Added Tax</p>
                    </div>
                    <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out ">
                        <p className="group-hover:text-white font-header text-primary">C. Capital Gains Tax</p>
                    </div>
                    <div className=" group flex items-center justify-center w-full h-full py-4 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out ">
                        <p className="group-hover:text-white font-header text-primary">D. Corporate Tax</p>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col gap-10 border-2 border-primary rounded-md p-4 bg-white shadow-md">
                    {/* Question */}
                    <div>
                        <p className="font-header text-primary">Question 3: (Essay)</p>
                        <p className="font-text text-sm">
                            Explain the importance of direct taxes in the Philippine economy.
                        </p>
                    </div>
                    {/* Answers */}
                    <div className="grid grid-cols-1 gap-2">
                        <textarea id="essay" name="essay" rows="5" placeholder="Write your answer here..."
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                </div>

            </div>
            {/* Submit */}
            <div className="py-2">
                <div className="flex items-center justify-center w-full h-full py-4 border-2 bg-primary rounded-md shadow-md hover:cursor-pointer hover:bg-primaryhover transition-all ease-in-out">
                    <p className="font-header text-white">Submit Assesment</p>
                </div>
            </div>
        </div>
    )
}
export default CourseAssesment
