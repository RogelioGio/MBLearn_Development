import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import SystemAdminDashboard from "./views/SystemAdminDashboard";
import CourseAdminDashboard from "./views/CourseAdminDashboard";
import Learner from "./views/LearnerDashboard";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";

const router = createBrowserRouter([

    //Authenticated routes
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/systemadmin",
                element: <SystemAdminDashboard />
            },
            {
                path: "/courseadmin",
                element: <CourseAdminDashboard />
            },
            {
                path: "/learner",
                element: <Learner />
            }
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
    }


]);

export default router;
