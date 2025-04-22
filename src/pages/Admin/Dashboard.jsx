import React, {useState} from "react";
import UsersTable from "./UsersTable.jsx";
import TicketsTable from "../Ticket/TicketsTable.jsx";
import ContactsTable from "./ContactsTable.jsx";
import ArticleTable from "./ArticlesTable.jsx";
import Main from "./Main.jsx";
import {GiHamburgerMenu} from "react-icons/gi";

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("main");
    const [showSidebar, setShowSidebar] = useState(false);
    const handleActionClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div
            className="min-w-screen min-h-screen flex flex-col lg:flex-row md:items-center lg:items-stretch lg:mt-12 md:mt-8 mt-4">
            <aside
                className="lg:block w-full lg:w-64 max-w-sm md:max-w-screen-md bg-yellow-500/25 backdrop-blur p-4 rounded-xl outline outline-1 outline-yellow-500 ml-6">
                <div className="flex items-center justify-between mt-4 px-4">
                    <h2 className="text-2xl font-pixelify text-yellow-400 text-center">Staff Actions</h2>
                    <button
                        onClick={() => setShowSidebar(prev => !prev)}
                        className="text-yellow-500 text-3xl focus:outline-none lg:hidden"
                        aria-label="Toggle Sidebar"
                    >
                        <GiHamburgerMenu className="hover:text-yellow-300"/>
                    </button>
                </div>

                <div className={`lg:block ${showSidebar ? "block" : "hidden"}`}>
                    <ul className="text-yellow-400 font-pixelify">
                        <li className="hover:text-yellow-100">
                            <button
                                className={`w-full py-2 px-4 text-lg text-left ${activeSection === "main" ? "text-yellow-100" : ""}`}
                                onClick={() => handleActionClick("main")}
                            >
                                Main
                            </button>
                        </li>
                        <li className="hover:text-yellow-100">
                            <button
                                className={`w-full py-2 px-4 text-lg text-left ${activeSection === "users" ? "text-yellow-100" : ""}`}
                                onClick={() => handleActionClick("users")}
                            >
                                Users Management
                            </button>
                        </li>
                        <li className="hover:text-yellow-100">
                            <button
                                className={`w-full py-2 px-4 text-lg text-left ${activeSection === "tickets" ? "text-yellow-100" : ""}`}
                                onClick={() => handleActionClick("tickets")}
                            >
                                Tickets
                            </button>
                        </li>
                        <li className="hover:text-yellow-100">
                            <button
                                className={`w-full py-2 px-4 text-lg text-left ${activeSection === "contacts" ? "text-yellow-100" : ""}`}
                                onClick={() => handleActionClick("contacts")}
                            >
                                Contacts
                            </button>
                        </li>
                        <li className="hover:text-yellow-100">
                            <button
                                className={`w-full py-2 px-4 text-lg text-left ${activeSection === "wiki" ? "text-yellow-100" : ""}`}
                                onClick={() => handleActionClick("wiki")}
                            >
                                Wiki
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            <main className="flex-1 p-6">
                {activeSection === "users" && <UsersTable/>}
                {activeSection === "tickets" && <TicketsTable/>}
                {activeSection === "contacts" && <ContactsTable/>}
                {activeSection === "wiki" && <ArticleTable/>}
                {activeSection === "main" && <Main/>}
            </main>
        </div>
    );
};

export default Dashboard;