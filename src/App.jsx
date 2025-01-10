import Login from "./pages/Auth/Login.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import Home from "./pages/Home.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import background from "./assets/images/background.gif";
import NotFound from "./pages/NotFound.jsx";
import PrivacyPolicy from "./pages/Support/PrivacyPolicy.jsx";
import TermsOfUse from "./pages/Support/TermsOfUse.jsx";
import Contact from "./pages/Support/Contact.jsx";
import FAQ from "./pages/Support/FAQ.jsx";
import About from "./pages/Support/About.jsx";
import OAuth2RedirectHandler from "./pages/Auth/OAuth2RedirectHandler.jsx";
import Profile from "./pages/User/Profile.jsx";
import Settings from "./pages/User/Settings.jsx";
import EditUser from "./pages/Admin/EditUser.jsx";
import ViewUser from "./pages/Admin/ViewUser.jsx";

function App() {
    const location = useLocation();
    const backgroundStyles = {
        "/": { type: "image", value: background },
        "/login": { type: "image", value: background },
        "/register": { type: "color", value: "bg-green-700" },
        "/forgot-password": { type: "color", value: "bg-green-700" },
        "/reset-password": { type: "color", value: "bg-green-700" },
        "/dashboard": { type: "image", value: background },
        "/about": { type: "image", value: background },
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
                <Route path="/dashboard" element={<PrivateRoute adminOnly={true}><Dashboard /></PrivateRoute>} />
                <Route path="/admin/edit-user/:id" element={<PrivateRoute adminOnly={true}><EditUser /></PrivateRoute>} />
                <Route path="/admin/view-user/:id" element={<ViewUser />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />

                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
