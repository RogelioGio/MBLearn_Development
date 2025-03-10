import { Children, createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { faTruckFieldUn } from "@fortawesome/free-solid-svg-icons";

const SelectedUser = createContext()

export const SelectedUserProvider = ({children}) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (userId !== undefined && userId !== null) { // Ensuring userId is valid
            setIsFetching(true)
            axiosClient.get(`/select-user/${userId}`)
            .then(response => {
                setSelectedUser(response.data.data);
                setIsFetching(false)
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
        <SelectedUser.Provider value={{selectedUser, selectUser, isFetching}}>
            {children}
        </SelectedUser.Provider>
    )
}
export const useUser = () => useContext(SelectedUser)
