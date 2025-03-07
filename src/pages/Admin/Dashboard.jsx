import React, {useState} from "react";
import UsersTable from "./UsersTable.jsx";
import Section from "../../components/Section.jsx";
import TicketsTable from "../Ticket/TicketsTable.jsx";
import ContactsTable from "./ContactsTable.jsx";
import ArticleTable from "./ArticlesTable.jsx";

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("users");
    const handleActionClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="min-w-screen min-h-screen flex flex-col lg:flex-row md:items-center lg:items-stretch lg:mt-12 md:mt-8 mt-4">
            <aside className="lg:w-64 w-full max-w-sm md:max-w-screen-md bg-yellow-500/25 backdrop-blur p-4 rounded-xl outline outline-1 outline-yellow-500 lg:block mx-6">
                <h2 className="text-2xl font-pixelify text-yellow-400 mb-6 text-center">Staff Actions</h2>
                <ul className="text-yellow-400 font-pixelify">
                    <li className="hover:text-yellow-100">
                        <button
                            className={`w-full py-2 px-4 text-lg text-left ${activeSection === "users" ? "text-yellow-100 " : ""}`}
                            onClick={() => handleActionClick("users")}
                        >
                            Users Management
                        </button>
                    </li>
                    <li className="hover:text-yellow-100">
                        <button
                            className={`w-full py-2 px-4 text-lg text-left ${activeSection === "tickets" ? "text-yellow-100 " : ""}`}
                            onClick={() => handleActionClick("tickets")}
                        >
                            Tickets
                        </button>
                    </li>
                    <li className="hover:text-yellow-100">
                        <button
                            className={`w-full py-2 px-4 text-lg text-left ${activeSection === "contacts" ? "text-yellow-100 " : ""}`}
                            onClick={() => handleActionClick("contacts")}
                        >
                            Contacts
                        </button>
                    </li>
                    <li className="hover:text-yellow-100">
                        <button
                            className={`w-full py-2 px-4 text-lg text-left ${activeSection === "wiki" ? "text-yellow-100 " : ""}`}
                            onClick={() => handleActionClick("wiki")}
                        >
                            Wiki
                        </button>
                    </li>
                    <li className="hover:text-yellow-100">
                        <button
                            className={`w-full py-2 px-4 text-lg text-left ${activeSection === "settings" ? "text-yellow-100 " : ""}`}
                            onClick={() => handleActionClick("settings")}
                        >
                            Settings
                        </button>
                    </li>
                </ul>
            </aside>

            <main className="flex-1 p-6">
                {activeSection === "users" && <UsersTable />}
                {activeSection === "tickets" && <TicketsTable />}
                {activeSection === "contacts" && <ContactsTable />}
                {activeSection === "wiki" && <ArticleTable />}
                {activeSection === "settings" && (
                    <Section title={"Settings"} className="!mx-4" marginTop={false}>
                        <h2>Settings Page</h2>
                        <p>Admin settings go here...</p>
                    </Section>
                )}
            </main>
        </div>
    );
};

export default Dashboard;