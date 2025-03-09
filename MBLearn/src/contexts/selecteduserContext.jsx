import { Children, createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const SelectedUser = createContext()

export const SelectedUserProvider = ({children}) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        if (userId !== undefined && userId !== null) { // Ensuring userId is valid
            axiosClient.get(`/select-user/${userId}`)
            .then(response => {
                setSelectedUser(response.data.data);
                console.log("User fetched:", response.data.data);
            })
            .catch(err => console.error(err));
        }
    }, [userId]);

    const selectUser = (id) => {
        if (id !== userId) {
            setUserId(id);
        }
    };

    return(
        <SelectedUser.Provider value={{selectedUser, selectUser}}>
            {children}
        </SelectedUser.Provider>
    )
}
export const useUser = () => useContext(SelectedUser)
