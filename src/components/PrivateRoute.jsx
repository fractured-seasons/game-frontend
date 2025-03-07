import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loading from "./Loading.jsx";
import AccessDenied from "./AccessDenied.jsx";

const PrivateRoute = ({ children, roleNames = [] }) => {
    const { currentUser, isStaff, role, loading } = useAuth();

    if (loading) {
        return <Loading title={"Loading..."}/>;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (roleNames.length > 0 && isStaff) {
        if (!roleNames.includes(role)) {
            return <AccessDenied/>;
        }
    }

    return children;
};

export default PrivateRoute;
