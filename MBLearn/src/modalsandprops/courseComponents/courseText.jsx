

const CourseText = () => {
    return(
        <div className="pl-1 grid grid-cols-1 grid-rows-[min-content_min-content] gap-2">
            {/* Text Content */}
            <div className="col-span-1 row-span-1 flex flex-col gap-2">
                <p className="font-header text-primary">What are Direct Taxes?</p>
                <p className="font-text text-sm">
                    Direct taxes are taxes paid directly by individuals or organizations to the government. These taxes are imposed on income, profits, and wealth, and they are not transferable to another party.
                </p>
                <p className="font-text text-sm italic">📌 Example: When you earn a salary, a portion of it is deducted as income tax and paid directly to the government.</p>
                <p className="font-header text-primary">Types of Direct Taxes in the Philippines:</p>
                <ul class="list-disc list-inside space-y-1">
                    <li className="font-text text-sm"><span class="font-header text-sm">Income Tax</span> – Paid by individuals and businesses based on earnings.</li>
                    <li className="font-text text-sm"><span class="font-header text-sm">Corporate Tax</span> – Paid by companies based on their net income.</li>
                    <li className="font-text text-sm"><span class="font-header text-sm">Capital Gains Tax</span> – Imposed on profits from the sale of assets.</li>
                    <li className="font-text text-sm"><span class="font-header text-sm">Property Tax</span> – Paid by individuals who own land or buildings.</li>
                    <li className="font-text text-sm"><span class="font-header text-sm">Withholding Tax</span> – Deducted at source by employers or payers.</li>
                </ul>
                <p className="font-header text-primary">Key Characteristics of Direct Taxes:</p>
                <ul class="list-disc list-inside space-y-1">
                    <li className="font-text text-sm"><span class="font-header text-sm">Non-transferable:</span> The tax burden cannot be shifted to someone else.</li>
                    <li className="font-text text-sm"><span class="font-header text-sm">Based on ability to pay:</span> Higher earners pay more, making it progressive.</li>
                    <li className="font-text text-sm"><span class="font-header text-sm">Transparent:</span> Individuals are aware of the amount they are paying.</li>
                </ul>
                <p className="font-header text-primary">Role of Direct Taxes in the Economy:</p>
                <ul class="list-disc list-inside space-y-1">
                    <li className="font-text text-sm">Fund public services (education, health, infrastructure).</li>
                    <li className="font-text text-sm">Promote wealth redistribution.</li>
                    <li className="font-text text-sm">upport national defense and social welfare programs.</li>
                </ul>
            </div>
            {/* <h1 style={"text-align: center"}>
                <span style={"font-family: 'Courier New', monospace;"}>
                    <strong>This is the title</strong>
                </span>
            </h1> */}
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
export default CourseText
