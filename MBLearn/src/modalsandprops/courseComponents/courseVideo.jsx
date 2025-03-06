import ReactPlayer from "react-player"

const CourseVideo = () => {
    return(
        <div className="row-start-3 col-span-3 ml-5 pr-5">
            {/* Sample content but needed to be changes as props to be dynamic */}
            <div className="w-auto h-full grid grid-cols-2 grid-rows-[auto_min-content]">
                {/* Course Desription */}
                <div className="col-span-2 row-span-1 py-5">
                    <p className="font-header text-primary text-2xl">Sample Video</p>
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=D95Djm6Y_2k&ab_channel=JanlouBty"
                        width="600px"
                        height="340px"
                        controls
                    />
                </div>
                {/* Attachment */}
                <div className="border-t border-divider col-span-2 py-4 h-fit">
                <p className="font-header text-primary text-2xl">Attachments:</p>
                <p className="font-text text-base">http//:Sample.com</p>
                </div>

            </div>
        </div>
    )
}
export default CourseVideo
