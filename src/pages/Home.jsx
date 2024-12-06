import React from "react";
import { useAuth } from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button.jsx";

export default function Home() {
    const { currentUser, loading, logout } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-pixelify mb-4">Welcome to the Home Page</h1>
            {!currentUser ? (
                <div>
                    <p className="text-xl font-pixelify mb-4">You are not logged in.</p>
                    <Link to="/login" className="text-lg text-orange-600 hover:text-orange-700">
                        Login here
                    </Link>
                </div>
            ) : (
                <div>
                    <p className="text-xl font-pixelify mb-4">
                        Welcome back, {currentUser.username}!
                    </p>
                    <p className="text-md">You are successfully logged in.</p>
                    <Button
                        onClick={handleLogout}
                        className="bg-orange-600 hover:bg-orange-700"
                    >
                        Logout
                    </Button>
                </div>
            )}
        </div>
    );
}
