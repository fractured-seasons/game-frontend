import Login from "./pages/Auth/Login.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import Home from "./pages/Home.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import background from "./assets/background.gif";
import NotFound from "./pages/NotFound.jsx";

function App() {
    const location = useLocation();
    const backgroundStyles = {
        "/": { type: "image", value: background },
        "/login": { type: "image", value: background },
        "/register": { type: "color", value: "bg-green-700" },
        "/forgot-password": { type: "color", value: "bg-green-700" },
        "/reset-password": { type: "color", value: "bg-green-700" },
        "/dashboard": { type: "image", value: background },
    };

    const currentBackground = backgroundStyles[location.pathname] || { type: "color", value: "bg-green-700" };

    const isImageBackground = currentBackground.type === "image";

    return (
        <div
            className={`min-h-screen min-w-screen ${
                !isImageBackground ? currentBackground.value : ""
            }`}
            style={
                isImageBackground
                    ? { backgroundImage: `url(${currentBackground.value})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : {}
            }
        >
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
