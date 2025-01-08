import { createContext, useContext, useState } from "react";
import axiosClient from "../axios-client";
import { useEffect } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    role: null,
    profileUrl: null,
    setUser: () => {},
    setToken: () => {},
    setRole: () => {},
    setProfileUrl: () => {},
});

//passing information into layouts
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [role, setRole] = useState({});
    const [profileUrl, setProfileUrl] = useState({});
    const [tokenTimeoutId, setTokenTimeoutId] = useState(null);

    // for Authentication and PageLoading token in logging in
    const setToken = (token) => {

        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    };

    return(
        //passing information into the layouts and components
        <StateContext.Provider value={{
            user,
            token,
            role,
            profileUrl,
            setUser,
            setToken,
            setRole,
            setProfileUrl
            }}>

            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
