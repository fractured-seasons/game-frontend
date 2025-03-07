import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center text-yellow-400 font-pixelify">
            <h1 className="text-6xl md:text-8xl">404</h1>
            <p className="text-2xl md:text-3xl mt-4">Oops! Page Not Found</p>
            <p className="text-lg md:text-xl mt-2">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="mt-6 px-6 py-2 text-2xl bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg">
                Go Home
            </Link>
        </div>
    );
}
