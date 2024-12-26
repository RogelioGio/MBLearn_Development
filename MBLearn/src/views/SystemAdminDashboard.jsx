import React from "react";
import Navigation from "./Navigation";

export default function SystemAdminDashboard() {
    return (
        <div className="flex flex-row items-center h-screen">
            <Navigation/>
            <h1 className="border-2">System Admin Dashboard</h1>
        </div>
    );
}
