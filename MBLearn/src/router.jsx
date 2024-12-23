import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import SystemAdminDashboard from "./views/SystemAdminDashboard";
import CourseAdminDashboard from "./views/CourseAdminDashboard";
import Learner from "./views/LearnerDashboard";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";

const router = createBrowserRouter([
    //Dashboard and Role Base routing Layout,Route and Components
    {
        path: "/",
        element: <DefaultLayout/>,

        //must be put an role based access control here
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
            },
        ]
    },

    //Login Page Layout,Route and Components
    {
        path: "/",
        element: <GuestLayout/>,
        children:[
            {
                path: "/login",
                element: <Login/>
            },
        ]
    },


]);

export default router;
