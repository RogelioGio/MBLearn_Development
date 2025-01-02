import React from "react";
import Navigation from "./Navigation";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { Helmet } from "react-helmet";



export default function SystemAdminDashboard() {
    const {user, setUser} = useStateContext();
    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data)
        });
    }), [];

    return(
        <div className="flex flex-col flex-start h-full w-full">
            <Helmet>{/* Title of the mark-up */}
                <title>MBLearn | System Admin Dashboard</title>
            </Helmet>

            <h1 className="p-3 m-3 text-primary text-4xl font-header">Good Day! {user.name}</h1>

            <div className="h-full w-full grid grid-cols-5">
                    <div className="flex flex-col justify-start border-2 col-span-4 gap-4">
                        {/* TODO: Will be reuseable component soon */}
                        <div className="bg-white w-full h-1/4 shadow-md rounded-xl flex justify-center items-center">
                            <p>this is home view</p>
                        </div>
                        <div className="flex flex-row w-full h-2/4 gap-4">
                            <div className="flex h-full bg-white w-1/2 shadow-md rounded-xl justify-center items-center"><p>data driven insight 1</p></div>
                            <div className="flex h-full bg-white w-1/2 shadow-md rounded-xl justify-center items-center"><p>data driven insight 2</p></div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center border-2">Side</div>
                </div>

        </div>
    );

}
