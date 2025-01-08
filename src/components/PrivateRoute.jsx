import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loading from "./Loading.jsx";
import AccessDenied from "./AccessDenied.jsx";

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { currentUser, isAdmin, loading } = useAuth();

    if (loading) {
        return <Loading title={"Loading..."}/>;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin) {
        return <AccessDenied/>;
    }

    return children;
};

export default PrivateRoute;
