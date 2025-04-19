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
import NotFound from "./pages/Errors/NotFound.jsx";
import PrivacyPolicy from "./pages/Support/PrivacyPolicy.jsx";
import TermsOfUse from "./pages/Support/TermsOfUse.jsx";
import Contact from "./pages/Support/Contact.jsx";
import FAQ from "./pages/Support/FAQ.jsx";
import About from "./pages/Support/About.jsx";
import OAuth2RedirectHandler from "./pages/Auth/OAuth2RedirectHandler.jsx";
import Profile from "./pages/User/Profile.jsx";
import Settings from "./pages/User/Settings.jsx";
import UserEdit from "./pages/Admin/UserEdit.jsx";
import UserView from "./pages/Admin/UserView.jsx";
import TicketsTable from "./pages/Ticket/TicketsTable.jsx";
import TicketCreate from "./pages/Ticket/TicketCreate.jsx";
import TicketView from "./pages/Ticket/TicketView.jsx";
import ForumList from "./pages/Forum/ForumList.jsx";
import {SectionEdit} from "./pages/Forum/SectionEdit.jsx";
import {CategoryEdit as ForumCategoryEdit} from "./pages/Forum/CategoryEdit.jsx";
import {SectionCreate} from "./pages/Forum/SectionCreate.jsx";
import {CategoryCreate as ForumCategoryCreate} from "./pages/Forum/CategoryCreate.jsx";
import TopicList from "./pages/Forum/TopicList.jsx";
import TopicView from "./pages/Forum/TopicView.jsx";
import {TopicCreate} from "./pages/Forum/TopicCreate.jsx";
import {TopicEdit} from "./pages/Forum/TopicEdit.jsx";
import ContactView from "./pages/Admin/ContactView.jsx";
import {ArticleCreate} from "./pages/Wiki/ArticleCreate.jsx";
import {Home as WikiHome} from "./pages/Wiki/Home.jsx";
import {CategoryCreate as WikiCategoryCreate} from "./pages/Wiki/CategoryCreate.jsx";
import {CategoryEdit as WikiCategoryEdit} from "./pages/Wiki/CategoryEdit.jsx";
import {ArticleEdit} from "./pages/Wiki/ArticleEdit.jsx";
import ArticleView from "./pages/Wiki/ArticleView.jsx";

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
            className={`flex flex-col min-h-screen  ${
                !isImageBackground ? currentBackground.value : ""
            }`}
            style={
                isImageBackground
                    ? { backgroundImage: `url(${currentBackground.value})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : {}
            }
        >
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/admin/user/edit/:id" element={<PrivateRoute roleNames={["ROLE_ADMIN"]}><UserEdit /></PrivateRoute>} />
                    <Route path="/admin/user/view/:id" element={<UserView />} />
                    <Route path="/admin/contact/view/:contactId" element={<PrivateRoute roleNames={["ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_SUPPORT"]}><ContactView/></PrivateRoute>}/>
                    <Route path="/admin/article/view/:articleSlug" element={<PrivateRoute roleNames={["ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_WIKI_CONTRIBUTOR"]}><ArticleView/></PrivateRoute>}/>

                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
                    <Route path="/terms-of-use" element={<TermsOfUse />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="*" element={<NotFound />} />

                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

                    <Route path="/tickets" element={<PrivateRoute><TicketsTable/></PrivateRoute>} />
                    <Route path="/tickets/create" element={<PrivateRoute><TicketCreate/></PrivateRoute>} />
                    <Route path="/tickets/view/:id" element={<PrivateRoute><TicketView/></PrivateRoute>} />

                    <Route path="/forum" element={<ForumList/>}/>
                    <Route path="/forum/section/create" element={<PrivateRoute roleNames={["ROLE_ADMIN"]}><SectionCreate/></PrivateRoute>}/>
                    <Route path="/forum/section/edit/:id" element={<PrivateRoute roleNames={["ROLE_ADMIN"]}><SectionEdit/></PrivateRoute> }/>
                    <Route path="/forum/category/create" element={<PrivateRoute roleNames={["ROLE_ADMIN"]}><ForumCategoryCreate/></PrivateRoute>}/>
                    <Route path="/forum/category/edit/:id" element={<PrivateRoute roleNames={["ROLE_ADMIN"]}><ForumCategoryEdit/></PrivateRoute> }/>
                    <Route path="/forum/topics/:categoryId" element={<PrivateRoute><TopicList/></PrivateRoute>}/>
                    <Route path="/forum/topic/:topicId" element={<PrivateRoute><TopicView/></PrivateRoute>}/>
                    <Route path="/forum/topic/create/:categoryId" element={<PrivateRoute><TopicCreate/></PrivateRoute>}/>
                    <Route path="/forum/topic/edit/:topicId" element={<PrivateRoute><TopicEdit/></PrivateRoute>}/>

                    <Route path="/wiki" element={<WikiHome/>}/>
                    <Route path="/wiki/category/create" element={<PrivateRoute roleNames={["ROLE_ADMIN", "ROLE_MODERATOR"]}><WikiCategoryCreate/></PrivateRoute>}/>
                    <Route path="/wiki/category/edit/:categoryId" element={<PrivateRoute roleNames={["ROLE_ADMIN", "ROLE_MODERATOR"]}><WikiCategoryEdit/></PrivateRoute>}/>
                    <Route path="/wiki/article/create" element={<PrivateRoute roleNames={["ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_WIKI_CONTRIBUTOR"]}><ArticleCreate/></PrivateRoute>}/>
                    <Route path="/wiki/article/edit/:articleSlug" element={<PrivateRoute roleNames={["ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_WIKI_CONTRIBUTOR"]}><ArticleEdit/></PrivateRoute>}/>

                    <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
