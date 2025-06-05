import { Helmet } from "react-helmet"
import { useStateContext } from "../contexts/ContextProvider"
import { format, set } from "date-fns"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCertificate, faGraduationCap, faSwatchbook } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import LearningJourney from "../modalsandprops/UserProfileComponents.jsx/LearningJourney"

export default function UserProfile() {
    const {user} = useStateContext()
    const [tab, setTab] = useState();

    useEffect(() => {
        if (user.user_infos.roles[0].role_name === "Course Admin") {
            setTab("course_management");
        } else{
            setTab("learning_journey");
        }
    },[user])

    const renderTabContent = () => {
    switch (tab) {
        case "learning_journey":
            return <LearningJourney user={user} />;
        default:
            return null;
    }

};
    return (
        <>
             <Helmet>{/* Title of the mark-up */}
                <title>MBLearn | My Profile</title>
            </Helmet>

            <div className="grid grid-cols-4 grid-rows-[min-content_1fr_1fr] h-full w-full">
                {/* Profile Card */}
                <div className="col-span-1 row-span-3 bg-white rounded-xl shadow-md my-5 grid grid-rows-[min-content_min-content_1fr_min-content]">
                    <div className="bg-gradient-to-b from-[hsl(239,94%,19%)] via-[hsl(214,97%,27%)] to-[hsl(201,100%,36%)] rounded-t-xl h-32 p-4">
                        <span className="inline-flex items-center rounded-md bg-primarybg px-2 py-1 text-xs font-medium text-primary font-text">{user.user_infos.roles[0].role_name}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-[-3rem]">
                        {/* Img here */}
                        <div className="w-32 h-32 rounded-full bg-white shadow-md flex items-center justify-center">
                            <img src={user.user_infos.profile_image} alt="" className="bg-primary w-28 h-28 rounded-full" />
                        </div>
                        <div className="flex flex-col items-center justify-center py-2">
                            <p className="font-header text-xl text-primary">{user.user_infos.first_name} {user.user_infos.middle_name || ""} {user.user_infos.last_name} {user.user_infos.suffix_name || ""}</p>
                            <p className="font-text text-sm text-unactive">ID: {user.user_infos.employeeID}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between p-5">
                        <div>
                            <p className="font-text text-unactive text-xs">Division:</p>
                            <p className="font-header text-primary text-base">{user.user_infos.division.division_name || "No Assigned Division"}</p>
                        </div>
                        <div>
                            <p className="font-text text-unactive text-xs">Department & Title:</p>
                            <p className="font-header text-primary text-base">{user.user_infos.department.department_name || "No Assigned Department"}</p>
                            <p className="font-text text-primary text-sm">{user.user_infos.title.title_name|| "No Assigned Title"}</p>
                        </div>
                        <div>
                            <p className="font-text text-unactive text-xs">Section:</p>
                            <p className="font-header text-primary text-base">{user.user_infos.section.section_name || "No Assigned Section"}</p>
                        </div>
                        <div>
                            <p className="font-text text-unactive text-xs">Location:</p>
                            <p className="font-header text-primary text-base">{user.user_infos.city.city_name || "No Assigned City"}</p>
                            <p className="font-text text-primary text-sm">{user.user_infos.branch.branch_name || "No Assigned Title"}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between p-5">
                        <div>
                            <p className="font-text text-unactive text-xs">Date-Added:</p>
                            <p className="font-header text-primary text-base">{format(user.user_infos.created_at,"MMMM dd yyyy")}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-text text-unactive text-xs">Account Status:</p>
                            <p className="font-header text-primary text-base">{user.user_infos.status}</p>
                        </div>
                    </div>
                </div>
                {/* User Detail Tab */}
                <div className={`col-start-2 col-span-3 row-span-1 mt-5 pl-2 pr-5 grid ${user.user_infos.roles[0].role_name === "Course Admin" ? "grid-cols-3" : "grid-cols-2"} gap-2`}>
                    {
                        user.user_infos.roles[0].role_name === "Course Admin" &&
                        <div className={`border-2 border-primary rounded-md flex flex-row items-center py-2 px-5 gap-2 text-primary font-header hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out ${tab === "course_management" ? "bg-primary text-white" : ""}`} onClick={() => setTab("course_management")}>
                            <FontAwesomeIcon icon={faSwatchbook}/>
                            <span>Course Management</span>
                        </div>
                    }
                    <div className={`border-2 border-primary rounded-md flex flex-row items-center py-2 px-5 gap-2 text-primary font-header hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out ${tab === "learning_journey" ? "bg-primary text-white" : ""}`} onClick={() => setTab("learning_journey")}>
                        <FontAwesomeIcon icon={faGraduationCap}/>
                        <span>Learning Journey</span>
                    </div>
                    <div className={`border-2 border-primary rounded-md flex flex-row items-center py-2 px-5 gap-2 text-primary font-header hover:bg-primary hover:text-white hover:cursor-pointer transition-all ease-in-out ${tab === "certificates" ? "bg-primary text-white" : ""}`} onClick={() => setTab("certificates")}>
                        <FontAwesomeIcon icon={faCertificate}/>
                        <span>Certificates</span>
                    </div>
                </div>
                {/* User Profile Content */}
                <div className="col-start-2 row-start-2 col-span-3 row-span-2 pl-2 pr-5 pt-2 pb-5">
                    {
                        renderTabContent()
                    }
                </div>
            </div>
        </>
    )
}

