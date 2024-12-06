import React from "react";

const Dashboard = () => {
    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center bg-blue-100">
            <h1 className="text-4xl font-bold">Welcome to the Dashboard!</h1>
            <p className="mt-4 text-lg">This page is protected and only accessible to authenticated users.</p>
        </div>
    );
};

export default Dashboard;
