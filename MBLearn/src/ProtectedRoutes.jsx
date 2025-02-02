import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "./contexts/ContextProvider";

const ProtectedRoutes = ({allowed}) => {
    const {token, user} = useStateContext();

    if (!token) {
        return <Navigate to="/login" replace/>;
    }

    if(!allowed.includes(user.role)){
        return <Navigate to="/404-not-found" replace/>;
    }

    return <Outlet/>
}

export default ProtectedRoutes;

