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
                        path:"course/:id",
                        element: <Course/>
                    },
                    {
                        path: "usermanagementmaintenance",
                        element:<UserManagementMaintenance/>,
                    },
                    {
                        path: "userdetail",
                        element: <SelectUser/>
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
                ]
            },
            {
                path:"/courseadmin",
                element: <ProtectedRoutes allowed={["System Admin","Course Admin"]}/>,
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
                        <CourseListProvider>
                            <CourseListMaintenance/>,
                        </CourseListProvider>
                    },
                    {
                        path: "assignedcourses",
                        element: <AssignedCourse/>
                    },
                    {
                        path: "coursereports",
                        element: <AssignedCourseReport/>
                    },
                    {
                        path: "myemployee",
                        element:<MyEmployee/>
                    }
                ]
            },
            {
                path:"/learner",
                element: <Learner/>,
                children: [
                    {
                        path: "/learner",
                        element: <Navigate to="/learner/dashboard" />
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard/>
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
    }



]);

export default router;
