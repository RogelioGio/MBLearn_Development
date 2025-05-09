
{/* <div className="mx-5 py-5">
                            <div className="border-divider border-b py-1">
                                <p className="font-header text-sm text-primary">Reference Link</p>
                            </div>
                            <div className="py-1">
                                {
                                    content.referenceBlockcontent.map((reference, _)=>{
                                        return (
                                            <a
                                            key={_}
                                            href={reference.marks[0].attrs.href}
                                            target={reference.marks[0].attrs.target}
                                            rel={reference.marks[0].attrs.rel}
                                            className="hover:cursor-pointer hover:text-primary"
                                            >
                                            <span className="font-text text-sm">
                                                {reference.text}
                                            </span>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div> */}

const CourseVideo = () => {
     //This is will be recycled for Comp-e-Learn's mp4 import
    return(
        <>
        <video src="" controls className="w-full aspect-video"/>
        <div className="mx-5 py-5">
            <div className="border-divider border-b py-1">
                <p className="font-header text-sm text-primary">Reference Link</p>
            </div>
            <div className="py-1">
                <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:cursor-pointer hover:text-primary"
                >
                <span className="font-text text-sm">
                    Reference Link
                </span>
                </a>
            </div>
        </div>
        </>
    )
}
export default CourseVideo
