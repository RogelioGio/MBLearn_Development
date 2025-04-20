const LearnerLoadingProps = () => {
    return(
        <>
        {
            Array(5).fill(0).map((item, index) => (
                <tr key={index}>
                    <td className={`font-header p-4 flex flex-row items-center gap-4 border-l-2 border-transparent animate-pulse w-full`}>

                    {/* Checkbox */}
                    <div className="group grid size-4 grid-cols-1">
                        <input type="checkbox"
                            className="col-start-1 row-start-1 appearance-none border border-divider rounded"
                            />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>


                    <div className="flex flex-col gap-2">
                    <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                    <div className="h-3 w-28 bg-gray-300 rounded-full"></div>
                    </div>
                    </td>

                    <td className="p-4 font-text text-unactive animate-pulse">
                        <div className="flex flex-col gap-2">
                        <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                        <div className="h-3 w-20 bg-gray-300 rounded-full"></div>
                        </div>
                    </td>
                    <td className="p-4 font-text text-unactive animate-pulse">
                        <div className="flex flex-col gap-2">
                        <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                        <div className="h-3 w-20 bg-gray-300 rounded-full"></div>
                        </div>
                    </td>
                    <td className="p-4 font-text text-unactive animate-pulse">
                        <div className="flex flex-col gap-2">
                        <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                        <div className="h-3 w-20 bg-gray-300 rounded-full"></div>
                        </div>
                    </td>
                    <td className="p-4 font-text text-unactive animate-pulse">
                        <div className="flex flex-col gap-2">
                        <div className="h-4 w-full bg-gray-300 rounded-full"></div>
                        <div className="h-3 w-20 bg-gray-300 rounded-full"></div>
                        </div>
                    </td>
                </tr>
            ))
        }
        </>
    )
}
export default LearnerLoadingProps;
