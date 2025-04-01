import { ScrollArea } from "MBLearn/src/components/ui/scroll-area"
import ReactPlayer from "react-player"

const CourseText = () => {
    return(
        <div className="row-start-3 col-span-3 ml-5 pr-5">
            {/* Sample content but needed to be changes as props to be dynamic */}

            <ScrollArea className="h-[500px] w-full">

            <div className="w-auto h-full grid grid-cols-2 grid-rows-[auto_min-content]">
                {/* Course Desription */}
                <div className="col-span-2 row-span-1 py-5">
                    <p className="font-header text-primary text-2xl">Overview of Financial Analysis in Excel</p>
                    <p className="font-text text-base">Financial analysis in Excel involves using built-in functions, formulas, and tools to assess financial data, forecast trends, and make informed business decisions. Analysts use Excel for tasks such as budgeting, financial modeling, and performance evaluation. Key features like PivotTables, financial functions (e.g., NPV, IRR), and data visualization help streamline the analysis process, making it easier to interpret complex financial datasets.</p>
                    <div className="col-span-2 row-span-1 py-5">
                                        <p className="font-header text-primary text-2xl">Sample Video</p>
                                        <ReactPlayer
                                            url="https://www.youtube.com/watch?v=D95Djm6Y_2k&ab_channel=JanlouBty"
                                            width="600px"
                                            height="340px"
                                            controls
                                            />
                                    </div>
                </div>
                {/* Attachment */}
                <div className="border-t border-divider col-span-2 py-4 h-fit">
                <p className="font-header text-primary text-2xl">Attachments:</p>
                <p className="font-text text-base">http//:Sample.com</p>
                </div>

            </div>
                                            </ScrollArea>
        </div>
    )
}
export default CourseText
