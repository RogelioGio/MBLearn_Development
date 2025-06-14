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
import Test from "./views/Test";
import SME from "./components/SME";
import SMEDashboard from "./views/Dashboards/SMEDashboard";
import Calendar from "./views/Calendar";
import UserProfile from "./views/UserProfile";
import { User } from "lucide-react";
import { useStateContext } from "./contexts/ContextProvider";
import Redirect from "./contexts/Redirect";
import { Course_ContexttProvider } from "./contexts/Course_Context";

// const {user} = useStateContext()
// const cleanRole = user.user_infos.role[0].role_name.toLowerCase().replace(/\s+/g, '');

const router = createBrowserRouter([

    // Authenticated Routes
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Redirect />
            },
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
                        path:"dashboard/calendar",
                        element: <Calendar/>
                    },
                    {
                        path: "usermanagementmaintenance",
                        element:<UserManagementMaintenance/>,
                    },
                    // {
                    //     path: "userdetail/:id",
                    //     element:
                    //     <SelectedUserProvider>
                    //         <SelectUser/>
                    //     </SelectedUserProvider>
                    //     // <UserProfile/>
                    // },
                    {
                        path: "useraccountsmaintenance",
                        element: <UserAccountSecurityMaintenance/>
                    },
                    {
                        path: "systemconfigurationmaintenance",
                        element:
                        <CourseListProvider>
                            <SystemConfiguration/>
                        </CourseListProvider>
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
                    },
                    {
                        path:'profile',
                        element: <UserProfile/>
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
                        element:
                        <Course_ContexttProvider>
                            <Dashboard/>
                        </Course_ContexttProvider>
                    },
                    {
                        path: "bulkenrollment",
                        element: <BulkEnrollment/>
                    },
                    // {
                    //     path: "courselistmaintenance",
                    //     element:
                    //     <SelectedCourseProvider>
                    //         <Course_ContexttProvider>
                    //             <CourseListMaintenance/>,
                    //         </Course_ContexttProvider>
                    //     </SelectedCourseProvider>
                    // },
                    {
                        path:"course/:id",
                        element:

                            <Course_ContexttProvider>
                                <Course/>
                            </Course_ContexttProvider>
                    },
                    {
                        path: "courses",
                        element:
                            <Course_ContexttProvider>
                                <AssignedCourse/>
                            </Course_ContexttProvider>

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
                    },
                    {
                        path:'test',
                        element:
                        <Course_ContexttProvider>
                            <Test/>
                        </Course_ContexttProvider>
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
                        element:
                        <Course_ContexttProvider>
                            <Dashboard/>
                        </Course_ContexttProvider>
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
                        <Course_ContexttProvider>
                                <Course/>
                        </Course_ContexttProvider>
                    },
                    {
                        path:"accountsettings",
                        element: <AccountSettings/>
                    }

                ]
            },
        ]
    },

    //SME ROUTES
    {
        path: "/",
        element:<SME/>,
        children: [
            {
                path: "/dashboard",
                element: <SMEDashboard/>
            }]
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
    },

    {
        path: "/profile",
        element: <UserProfile/>
    }




]);

export default router;
