import React, { createContext, useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import api from "../utils/apiUtils.js";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isStaff, setIsStaff] = useState(false);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const staffRoles = ["ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_SUPPORT", "ROLE_WIKI_CONTRIBUTOR"];

    const checkAuth = async () => {
        const token = Cookie.get('access_token');

        if (!token) {
            setCurrentUser(null);
            setIsStaff(false);
            setRole(null);
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/auth/public/check-auth");
            const userData = response.data;

            setCurrentUser(userData);
            setRole(userData.roles?.[0] || null);
            setIsStaff(userData.roles?.some(role => staffRoles.includes(role)) || false);
        } catch (error) {
            setCurrentUser(null);
            setRole(null);
            setIsStaff(false);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/public/logout");

            Cookie.remove("access_token", { path: '/', secure: true, sameSite: 'Strict', httpOnly: true });
            Cookie.remove("csrf_token", { path: '/', secure: true, sameSite: 'Strict' });

            setCurrentUser(null);
            setIsStaff(false);
            setRole(null);
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Logout error", error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const value = {
        currentUser,
        setCurrentUser,
        role,
        setRole,
        isStaff,
        setIsStaff,
        staffRoles,
        loading,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
