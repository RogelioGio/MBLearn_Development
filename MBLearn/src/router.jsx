import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import NotFound from "./views/NotFound";
import CourseListMaintenance from "./views/CourseListMaintenance";
import UserManagementMaintenance from "./views/UserManagementMaintenance";
import UserAccountSecurityMaintenance from "./views/UserAccountSecurityMaintenance";
import Dashboard from "./views/Dashboard";
import SystemAdmin from "./components/SystemAdmin";
import CourseAdmin from "./components/CourseAdmin";
import Learner from "./components/Learner";
import SystemConfiguration from "./views/SystemConfigurationMaintenance";
import ActivityLog from "./views/ActivityLog";
import SystemLevelReports from "./views/SystemLevelReports";
import BulkEnrollment from "./views/BulkEnrollment";
import ProtectedRoutes from "./ProtectedRoutes";
import Unauthorized from "./views/Unauthorized";
import AssignedCourse from "./views/AssignedCourseCatalog";
import AssignedCourseReport from "./views/AssignedCourseResport";
import Course from "./views/Course";
import MyEmployee from "./views/MyEmployee";
import { CourseListProvider } from "./contexts/CourseListProvider";
import { SelectedUserProvider } from "./contexts/selecteduserContext";
import { OptionProvider } from "./contexts/AddUserOptionProvider";
import SelectUser from "./views/SelectedUser";
import { SelectedCourseProvider } from "./contexts/selectedcourseContext";
import CsvToJson from "./views/CsvToJson";
import AccountSettings from "./views/AccountSetting";
import LearnerCourseManager from "./views/LearnerCourseManager";
import LearnerCertficates from "./views/LearnerCertificates";
import LearnerSelfEnrollment from "./views/LearnerSelfEnrollment";
import CompeLearnExtension from "./views/CompeLearnExtension";
import InitialLogin from "./views/InitialLogin";

const router = createBrowserRouter([

    // Authenticated Routes
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/systemadmin",
                element: <ProtectedRoutes allowed={["System Admin"]}/>,
                children: [
                    {
                        path: "/systemadmin",
                        element: <Navigate to="/systemadmin/dashboard" />
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard/>
                    },
                    {
                        path: "usermanagementmaintenance",
                        element:<UserManagementMaintenance/>,
                    },
                    {
                        path: "userdetail/:id",
                        element:
                        <SelectedUserProvider>
                            <SelectUser/>
                        </SelectedUserProvider>
                    },
                    {
                        path: "useraccountsmaintenance",
                        element: <UserAccountSecurityMaintenance/>
                    },
                    {
                        path: "systemconfigurationmaintenance",
                        element: <SystemConfiguration/>
                    },
                    {
                        path: "systemlevelreports",
                        element: <SystemLevelReports/>
                    },
                    {
                        path: "activitylogs",
                        element: <ActivityLog/>
                    },
                    {
                        path: "testCsvToJson",
                        element: <CsvToJson/>
                    },
                    {
                        path:"accountsettings",
                        element: <AccountSettings/>
                    }
                ]
            },
            {
                path:"/courseadmin",
                element:
                <CourseListProvider>
                    <ProtectedRoutes allowed={["System Admin","Course Admin"]}/>
                </CourseListProvider>,
                children: [
                    {
                        path: "/courseadmin",
                        element: <Navigate to="/courseadmin/dashboard" />
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard/>
                    },
                    {
                        path: "bulkenrollment",
                        element: <BulkEnrollment/>
                    },
                    {
                        path: "courselistmaintenance",
                        element:
                        <SelectedCourseProvider>
                            <CourseListMaintenance/>,
                        </SelectedCourseProvider>
                    },
                    {
                        path:"course/:id",
                        element:
                        <SelectedCourseProvider>
                                <Course/>
                        </SelectedCourseProvider>
                    },
                    {
                        path: "courses",
                        element:
                                <AssignedCourse/>
                    },
                    {
                        path: "coursereports",
                        element: <AssignedCourseReport/>
                    },
                    {
                        path: "myemployee",
                        element:<MyEmployee/>
                    },
                    // {
                    //     path: "courses/comp_e_learn",
                    //     element: <CompeLearnExtension/>
                    // }
                    {
                        path:"accountsettings",
                        element: <AccountSettings/>
                    }

                ]
            },
            {
                path:"/learner",
                element:
                <CourseListProvider>
                    <Learner/>
                </CourseListProvider>,
                children: [
                    {
                        path: "/learner",
                        element: <Navigate to="/learner/dashboard" />
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard/>
                    },
                    {
                        path: "learnercoursemanager/:coursetype?",
                        element: <SelectedCourseProvider>
                                        <LearnerCourseManager/>
                            </SelectedCourseProvider>
                    },
                    {
                        path: "learnercertificates",
                        element: <LearnerCertficates/>
                    },
                    {
                        path: "learnerselfenrollment",
                        element:
                            <LearnerSelfEnrollment/>
                    },
                    {
                        path:"course/:id",
                        element:
                        <SelectedCourseProvider>
                                <Course/>
                        </SelectedCourseProvider>
                    },
                    {
                        path:"accountsettings",
                        element: <AccountSettings/>
                    }

                ]
            },
        ]
    },


    //Login route
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
        ]
    },

    //404 route
    {
        path: "/404-not-found",
        element: <NotFound/>
    },

    //Unauthorized route
    {
        path: "/unauthorized",
        element: <Unauthorized/>
    },

    // COMP-E-LEARN EXTENSION
    {
        path: "/comp_e_learn",
        element: <CompeLearnExtension/>
        // <ProtectedRoutes allowed={["System Admin","Course Admin"]}>
        //             <CompeLearnExtension/>
        //         </ProtectedRoutes>
    },

    {
        path: "/welcome/:id/:role",
        element: <InitialLogin/>
    }


]);

export default router;
