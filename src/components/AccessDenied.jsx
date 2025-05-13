import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AccessDenied() {
    return (
        <div className="mx-4 sm:mx-12 lg:mx-24 mt-8 sm:mt-10 lg:mt-12 flex flex-col items-center justify-center rounded-3xl bg-yellow-500/25 backdrop-blur outline outline-1 outline-yellow-500 text-yellow-200 p-8 sm:p-12 lg:p-16">
            <FaLock className="text-yellow-400 text-6xl mb-4" />
            <h1 className="font-pixelify font-bold text-3xl sm:text-4xl lg:text-5xl text-yellow-400 mb-6 text-center">
                Access Denied
            </h1>
            <p className="text-yellow-200 text-lg sm:text-xl mb-4 text-center">
                You do not have permission to access this page. Please contact your administrator for more information.
            </p>
            <Link to="/" className="text-yellow-500 hover:text-yellow-400 text-xl">
                Go back to home
            </Link>
        </div>
    );
}
