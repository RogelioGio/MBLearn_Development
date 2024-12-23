import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

//passing information into layouts
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({}); // for getting the current username
    //const [token, _setToken] = useState(null);

    // for Authentication and PageLoading token in logging in
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    return(
        //passing information into the layouts and components
        <StateContext.Provider value={{
            user,
           // token,
            setUser,
            setToken,
            }}>

            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
