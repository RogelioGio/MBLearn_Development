import { Children, createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { faTruckFieldUn } from "@fortawesome/free-solid-svg-icons";
import { set } from "date-fns";

const SelectedUser = createContext()

export const SelectedUserProvider = ({children}) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [selectedUserCreds, setSelectedUserCreds] = useState(null)
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
            setIsFetching(true)
        if (userId !== undefined && userId !== null) { // Ensuring userId is valid
            axiosClient.get(`/select-user/${userId}`)
            .then(response => {
                setSelectedUser(response.data.data);
                console.log("User fetched:", response.data.data);
            })
            .catch(err => console.error(err));

            axiosClient.get(`/select-user-creds/${userId}`)
            .then((res) => {
                setSelectedUserCreds(res.data.data);
                console.log("User credentials fetched:", res.data.data);
            })
        }
    }, [userId]);

    const selectUser = (id) => {
        if (id === userId && selectedUser) {
            setIsFetching(false);
            return; // Prevent unnecessary state updates
        }
        setIsFetching(true);
        setUserId(id);
    };

    const resetUser = () => {
        if (selectedUser) {
            setSelectedUser(null);
        }
    }

    return(
        <SelectedUser.Provider value={{selectedUser, selectUser, isFetching, resetUser}}>
            {children}
        </SelectedUser.Provider>
    )
}
export const useUser = () => useContext(SelectedUser)
