import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import SystemAdminDashboard from "./views/SystemAdminDashboard";
import CourseAdminDashboard from "./views/CourseAdminDashboard";
import Learner from "./views/LearnerDashboard";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import NotFound from "./views/NotFound";


const router = createBrowserRouter([

    // Authenticated Routes
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/systemadmin",
                element: <SystemAdminDashboard/>,
            },
            {
                path:"/courseadmin",
                element:
                    <CourseAdminDashboard/>
            },
            {
                path:"/learner",
                element:
                        <Learner/>
            },
            {
                path: "/404-not-found",
                element: <NotFound/>
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
