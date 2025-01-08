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


const router = createBrowserRouter([

    // Authenticated Routes
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/systemadmin",
                element: <SystemAdmin/>,
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
                        path: "courselistmaintenance",
                        element: <CourseListMaintenance/>
                    },
                    {
                        path: "usermanagementmaintenance",
                        element: <UserManagementMaintenance/>
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
                element: <CourseAdmin/>,
                children: [
                    {
                        path: "/courseadmin",
                        element: <Navigate to="/courseadmin/dashboard" />
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard/>
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

    //testing routes



]);

export default router;
