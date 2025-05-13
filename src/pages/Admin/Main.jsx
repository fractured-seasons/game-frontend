import React from "react";
import Section from "../../components/Section.jsx";

const roleAccessMatrix = {
    "User": [
        "Profile & Settings",
        "Create & View Tickets",
        "View Forum Sections & Topics",
        "Browse Wiki Articles"
    ],
    "Wiki Contributor": [
        "Create & Edit Wiki Articles",
        "View Wiki Content",
        "Access Wiki Dashboard"
    ],
    "Support": [
        "View & Manage Contact Submissions",
        "Respond to Tickets",
        "Change Ticket Status"
    ],
    "Moderator": [
        "Manage Wiki Articles & Categories",
        "Approve/Reject Wiki Submissions",
        "Moderate Forum Topics",
        "Full Updates Management",
        "Manage Contacts",
        "Reopen/Close Tickets"
    ],
    "Admin": [
        "Full User Management",
        "Edit Any Wiki Article or Category",
        "Full Forum Management (Sections & Categories)",
        "Full Updates Management",
        "Contact & Ticket Oversight",
        "Deactivate Users",
        "Access All Admin Pages"
    ]
};

const getRoleColor = (role) => {
    switch (role) {
        case "User": return "border-yellow-400 bg-yellow-400/25";
        case "Wiki Contributor": return "border-green-400 bg-green-400/25";
        case "Support": return "border-blue-400 bg-blue-400/25";
        case "Moderator": return "border-purple-400 bg-purple-400/25";
        case "Admin": return "border-red-400 bg-red-400/25";
        default: return "border-gray-400 bg-gray-400/25";
    }
};

export default function Main() {
    return (
        <Section title="Admin Dashboard Overview" className="!mx-4" marginTop={false}>
            <p className="text-lg mb-6 text-yellow-100">
                This is your command center for managing <strong>Fractured Seasons</strong>.
                From here, staff members can moderate users, resolve issues, maintain wiki content,
                and ensure the community thrives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {[
                    { title: "🧑‍💼 Users", desc: "Review player profiles, manage roles, and oversee activity." },
                    { title: "🎫 Support Tickets", desc: "Handle bug reports and support tickets submitted by users." },
                    { title: "📬 Contact Submissions", desc: "Respond to player messages and form submissions." },
                    { title: "📚 Wiki Articles", desc: "Approve, edit, and manage wiki articles submitted by the community." }
                ].map((item, i) => (
                    <div
                        key={i}
                        className="rounded-2xl p-6 border border-yellow-500 bg-yellow-500/20 backdrop-blur shadow-lg transition-all hover:bg-yellow-500/30"
                    >
                        <h2 className="font-pixelify text-xl text-yellow-400 mb-2">{item.title}</h2>
                        <p className="text-yellow-100 text-base">{item.desc}</p>
                    </div>
                ))}
            </div>

            <p className="text-lg mb-4 text-yellow-100">
                Below is a role-based breakdown of access and capabilities within the system.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.entries(roleAccessMatrix).map(([role, permissions]) => (
                    <div
                        key={role}
                        className={`p-6 rounded-2xl shadow-md border-2 backdrop-blur text-yellow-100 ${getRoleColor(role)}`}
                    >
                        <h2 className="font-pixelify text-2xl mb-4 text-yellow-300">{role}</h2>
                        <ul className="list-disc list-inside space-y-2 text-base">
                            {permissions.map((perm, i) => (
                                <li key={i}>{perm}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}
