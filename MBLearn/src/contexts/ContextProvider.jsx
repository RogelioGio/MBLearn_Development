import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    role: null,
    availableRoles: [],
    EmployeeID: null,
    profile_image: null,
    authenticated: false,
    setUser: () => {},
    setToken: () => {},
    setRole: () => {},
    setAvailableRoles: () => {},
    setEmployeeID: () => {},
    setProfile: () => {},
    SetAuthenticated: () => {},
});

//passing information into layouts
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [role, _setRole] = useState(localStorage.getItem('LOGIN_AS'));
    const [availableRoles, setAvailableRoles] = useState([]);
    const [employeeID, setEmployeeID] = useState('');
    const [profile_image, setProfile] = useState('');
    const [authenticated, _setAuthenticated] = useState(false);

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

    const setRole = (role) => {
        _setRole(role);
        try{
            if(role){
                localStorage.setItem('LOGIN_AS', role)
            } else{
                localStorage.remove('LOGIN_AS')
            }
        }catch(e){
            console.log(e)
        }
    }

    const SetAuthenticated = (authenticated) => {
        _setAuthenticated(authenticated);
    }

    return(
        //passing information into the layouts and components
        <StateContext.Provider value={{
            user,
            token,
            role,
            availableRoles,
            employeeID,
            profile_image,
            authenticated,
            setUser,
            setToken,
            setRole,
            setAvailableRoles,
            setEmployeeID,
            setProfile,
            SetAuthenticated
            }}>

            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
