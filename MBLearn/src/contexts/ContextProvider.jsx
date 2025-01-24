import { createContext, useContext, useState } from "react";
import axiosClient from "../axios-client";
import { useEffect } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    role: null,
    EmployeeID: null,
    profile_image: null,
    setUser: () => {},
    setToken: () => {},
    setRole: () => {},
    setEmployeeID: () => {},
    setProfile: () => {},
});

//passing information into layouts
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [role, setRole] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [profile_image, setProfile] = useState('');
    const [tokenTimeoutId, setTokenTimeoutId] = useState(null);

    // for Authentication and PageLoading token in logging in
    const setToken = (token) => {

        _setToken(token);
        try{
            if (token) {
                localStorage.setItem('ACCESS_TOKEN', token)
            } else{
                localStorage.removeItem('ACCESS_TOKEN')
            }
        }catch(e){
            console.error(e);
        }
    };

    return(
        //passing information into the layouts and components
        <StateContext.Provider value={{
            user,
            token,
            role,
            employeeID,
            profile_image,
            setUser,
            setToken,
            setRole,
            setEmployeeID,
            setProfile
            }}>

            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
