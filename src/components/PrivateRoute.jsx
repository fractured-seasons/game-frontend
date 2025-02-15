import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loading from "./Loading.jsx";
import AccessDenied from "./AccessDenied.jsx";

const PrivateRoute = ({ children, roleName }) => {
    const { currentUser, isStaff, role, loading } = useAuth();

    if (loading) {
        return <Loading title={"Loading..."}/>;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (roleName && !isStaff) {
        if (role !== roleName) {
            return <AccessDenied/>;
        }
    }

    return children;
};

export default PrivateRoute;
