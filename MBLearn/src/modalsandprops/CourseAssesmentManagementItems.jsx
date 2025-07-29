import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CourseAssesmentManagementItems = ({item, index, show}) => {

    const answerKey = item.answerKey;
    return (
        <div className={`grid gird-cols-1 grid-rows-[min-content_1fr_min-content] gap-2 h-full w-full border p-4 rounded-md border-divider shadow-md bg-[hsl(210,19%,92%)]`}>
            <div className="flex items-center justify-between">
                <p className={ `font-header text-primary text-sm`}>Question {index + 1}</p>
                <p className="text-xs font-text text-unactive">{item.points} points</p>
            </div>
            <div className="text-sm font-text">
                {item.question}
            </div>
            {
                item.questionType === "trueOrfalse" ?
                <div className={`flex items-center justify-between gap-x-2 py-2`}>
                    <div className={`flex items-center justify-center w-full font-header border-2 rounded-md shadow-md transition-all ease-in-out border-primary p-2
                                    ${show && answerKey === "true" ? "bg-primary text-white" : "bg-white text-primary"}`}>
                        {
                            show && answerKey === "true" ? <FontAwesomeIcon icon={faCheckCircle} className="text-white mr-2" /> : null
                        }
                        <p>True</p>
                    </div>
                    <div className={`flex items-center justify-center w-full font-header border-2 rounded-md shadow-md  transition-all ease-in-out border-primary p-2
                                    ${show && answerKey === "false" ? "bg-primary text-white" : "bg-white text-primary"}`}>
                        {
                            show && answerKey === "false" ? <FontAwesomeIcon icon={faCheckCircle} className="text-white mr-2" /> : null
                        }
                        <p>False</p>
                    </div>
                </div>
                : item.questionType === "multipleChoice" ?
                <div className={`grid grid-cols-2 grid-rows-2 items-center justify-between gap-2 py-2`}>
                    {item.choices.map((choice) => (
                        <div key={choice.name} className={`flex items-center justify-center w-full font-header border-2 rounded-md p-2 shadow-md transition-all ease-in-out  border-primary
                            ${show && answerKey === choice.value ? "bg-primary text-white" : "bg-white text-primary"}`}>
                            {
                                show && answerKey === choice.value ? <FontAwesomeIcon icon={faCheckCircle} className="text-white mr-2" /> : null
                            }
                            <p>{choice.name}</p>
                        </div>
                    ))}
                </div> : null
            }

        </div>
    )
}
export default CourseAssesmentManagementItems;
