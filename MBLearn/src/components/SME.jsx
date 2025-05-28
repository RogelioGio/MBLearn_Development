import { Navigate, Outlet, useNavigate } from "react-router";
import { useStateContext } from "../contexts/ContextProvider";
import Navigation from "../views/Navigation";
import { toast } from 'sonner';
import axiosClient from "../axios-client";



export default function SME() {
    const {token, role, setRole, setUser, setProfile, setToken, user} = useStateContext();
    const navigate = useNavigate();

    console.log("Token in SME:", token);
    if(!token){
        return <Navigate to="/login" replace/>
    }

    const onLogout = async () => {
        try{
            Logout()
            await axiosClient.post('/logout');
            setRole('');
            setUser('');
            setToken(null);
            navigate('/login');
            toast("Log Out Successfully.",{
                description: "User account is logged out the system",
            })
        }catch (e){
            console.error(e);
        }
    }

    const Logout = () => {
            toast("Logging Out....",{
                description: "User account is logging out the system",
            }
            )
        }

    return(
        <div className='flex flex-row items-center h-screen bg-background overflow-hidden'>
            <div onClick={()=>onLogout()}>Logout</div>
            <Outlet />
        </div>
    )
}
