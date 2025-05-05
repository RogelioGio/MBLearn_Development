import ReactPlayer from "react-player"

const CourseVideo = () => {
    return(
        <div className="pl-1 grid grid-cols-1 grid-rows-[min-content_min-content_min-content_min-content] gap-2">
            {/* Content Header */}
            <div>
                <p className="font-header text-primary">What are Direct Taxes?</p>
                <p className="font-text text-sm">
                In this lesson, you’ll learn about the fundamentals of direct taxation in the Philippines. We'll explore the different types, characteristics, and the role of direct taxes in the economy.
                </p>
            </div>
            {/* Video Content */}
            <div>
                <iframe class="w-full aspect-video rounded-lg"
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                    title="Understanding Direct Taxes"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
            <div>
                <p className="font-header text-primary">📝 Key Takeaways:</p>
                <ul class="list-disc list-inside space-y-1">
                    <li className="font-text text-sm"><span class="font-header text-sm">Income Tax</span> – Paid by individuals and businesses based on earnings.</li>
                    <li className="font-text text-sm"><span class="font-header text-sm">Corporate Tax</span> – Paid by companies based on their net income.</li>
                    <li className="font-text text-sm"><span class="font-header text-sm">Capital Gains Tax</span> – Imposed on profits from the sale of assets.</li>
                    <li className="font-text text-sm"><span class="font-header text-sm">Property Tax</span> – Paid by individuals who own land or buildings.</li>
                    <li className="font-text text-sm"><span class="font-header text-sm">Withholding Tax</span> – Deducted at source by employers or payers.</li>
                </ul>
            </div>
            {/* Reference Links */}
            <div className="py-2 border-t border-divider">
                <p className="font-header text-primary">Reference Links:</p>
                <ul class="list-disc list-inside space-y-1 italic">
                    <li className="font-text text-sm">https://www.bir.gov.ph</li>
                    <li className="font-text text-sm">https://www.dof.gov.ph</li>
                    <li className="font-text text-sm">https://www.bsp.gov.ph</li>
                </ul>
            </div>
        </div>
    )
}
export default CourseVideo
