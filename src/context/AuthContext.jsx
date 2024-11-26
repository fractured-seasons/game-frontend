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
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await api.get("/auth/public/check-auth");
            const userData = response.data;

            setCurrentUser(userData);
            setIsAdmin(userData.roles?.includes("ROLE_ADMIN") || false);
        } catch (error) {
            setCurrentUser(null);
            setIsAdmin(false);
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
            setIsAdmin(false);
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
        isAdmin,
        setIsAdmin,
        loading,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
