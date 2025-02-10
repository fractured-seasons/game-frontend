import {Link, useLocation} from "react-router-dom";
import {FaHome, FaForumbee, FaBook, FaSignInAlt, FaAngleDown, FaAngleUp} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import {useEffect, useRef, useState} from "react";

export default function Navbar() {
    const { currentUser, logout, isStaff } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setDropdownOpen(false);
    }, [location]);

    return (
        <div className="mx-6 mt-0 flex flex-col lg:flex-row">
            <nav className="backdrop-blur bg-yellow-500/25 outline outline-1 outline-yellow-500 rounded-3xl py-4 px-6 flex justify-between items-center text-yellow-400 font-pixelify w-full mt-2 lg:mt-4">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-12">
                    <Link to="/" className="text-4xl md:text-3xl lg:text-2xl hover:text-yellow-100 flex items-center gap-2">
                        <FaHome size={25} /> HOME
                    </Link>
                    <Link to="/forum" className="text-4xl md:text-3xl lg:text-2xl hover:text-yellow-100 flex items-center gap-2">
                        <FaForumbee size={25} /> FORUM
                    </Link>
                    <Link to="/wiki" className="text-4xl md:text-3xl lg:text-2xl hover:text-yellow-100 flex items-center gap-2">
                        <FaBook size={25} /> WIKI
                    </Link>
                </div>
            </nav>

            <div className={`relative z-20 backdrop-blur bg-yellow-500/25 outline outline-1 outline-yellow-500 ${dropdownOpen ? "rounded-t-3xl" : "rounded-3xl"} mt-2 lg:mt-4 lg:ml-4 text-yellow-400 font-pixelify`}>
                {currentUser ? (
                    <>
                        <button
                            onClick={toggleDropdown}
                            className="text-4xl md:text-3xl lg:text-2xl hover:text-yellow-100 py-4 px-8 flex items-center gap-2"
                        >
                            {currentUser.username
                                ? currentUser.username.length > 14
                                    ? `${currentUser.username.substring(0, 11)}...`
                                    : currentUser.username
                                : "Username"
                            }
                            { dropdownOpen ? <FaAngleUp size={25}/>
                                : <FaAngleDown size={25}/> }
                        </button>

                        {dropdownOpen && (
                            <div ref={dropdownRef} className="absolute backdrop-blur bg-yellow-500/25 outline outline-1 outline-yellow-500 rounded-b-3xl w-full z-10">
                                <Link
                                    to="/profile"
                                    className="block py-2 px-8 text-lg hover:text-yellow-100"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/settings"
                                    className="block py-2 px-8 text-lg hover:text-yellow-100"
                                >
                                    Settings
                                </Link>
                                {isStaff && (
                                    <Link to="/dashboard" className="block py-2 px-8 text-lg hover:text-yellow-100">
                                        Dashboard
                                    </Link>
                                )}
                                <hr className="border-t-2 border-yellow-500 my-1" />
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left py-2 px-8 text-lg hover:text-yellow-100"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <Link to="/login" className="text-4xl md:text-3xl lg:text-2xl hover:text-yellow-100 py-4 px-8 flex items-center gap-2">
                        <FaSignInAlt size={25} /> LOGIN
                    </Link>
                )}
            </div>
        </div>
    );
}
