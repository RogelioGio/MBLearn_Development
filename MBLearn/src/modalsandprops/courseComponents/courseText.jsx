import { ScrollArea } from "MBLearn/src/components/ui/scroll-area"
import ReactPlayer from "react-player"

const CourseText = () => {
    return(
        <div className="h-full w-[400px] bg-white rounded-lg shadow-md flex flex-col">
        {/* Scrollable Content */}
        <div className="space-y-4 p-4 overflow-y-auto h-full">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="p-4 bg-gray-200 rounded-md">
                Item {i + 1}
              </div>
            ))}
          </div>
      </div>
    )
}
export default CourseText
