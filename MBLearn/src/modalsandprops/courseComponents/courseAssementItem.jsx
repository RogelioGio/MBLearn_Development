const CourseAssesmentItem = ({assesmentItem, active}) => {

    const consent = (assesmentItemType) => {
        if(assesmentItemType === "trueOrfalse"){
            return(
                <div className="flex flex-col justify-between border-2 border-primary rounded-md p-4 bg-white shadow-md h-full">
                     {/* Question */}
                        <div>
                            <p className="font-header text-primary">Question {active+1}</p>
                            <p className="font-text text-sm">
                                {assesmentItem.question}
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
            )
        } else if(assesmentItemType === "multipleChoice") {
            return(
                <div className="flex flex-col justify-between border-2 border-primary rounded-md p-4 bg-white shadow-md h-full">
                     {/* Question */}
                        <div>
                            <p className="font-header text-primary">Question {active+1}</p>
                            <p className="font-text text-sm">
                                {assesmentItem.question}
                            </p>
                        </div>
                        {/* Answers */}
                        <div className="grid grid-cols-2 grid-rows-2 gap-2">
                            {
                                assesmentItem.choices.map((i) => (
                                    <div className=" group flex items-center justify-center w-full h-full py-2 bg-white border-2 border-primary rounded-md shadow-md hover:bg-primary hover:cursor-pointer transition-all ease-in-out">
                                        <p className="group-hover:text-white font-header text-primary">{i.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                </div>
            )
        }
    }

    return(
        <>
            <div className="col-span-1 row-span-1 pb-5">
                {consent(assesmentItem.questionType)}
            </div>
        </>
    )
}
export default CourseAssesmentItem
