import { useEffect, useState } from "react";
import api from "../../utils/apiUtils.js";
import Section from "../../components/Section.jsx";
import Loading from "../../components/Loading.jsx";

export default function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get("/auth/user", {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setUserDetails(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching user details");
            }
        };

        fetchUserDetails();
    }, []);

    if (error) {
        return (
            <div className="text-center text-yellow-400 font-pixelify mt-12">
                <h1 className="text-5xl">Error</h1>
                <p className="text-2xl mt-4">{error}</p>
            </div>
        );
    }

    if (!userDetails) {
        return (
            <Loading title={"Loading..."}/>
        );
    }

    const {
        username,
        email,
        roles,
        accountExpiryDate,
        accountNonExpired,
        accountNonLocked,
        credentialsExpiryDate,
        credentialsNonExpired,
        enabled,
        twoFactorEnabled,
    } = userDetails;
    const transformedRoles = roles.map(role => role.replace("ROLE_", ""));

    return (
        <div className="mx-4 mt-6 md:mx-6">
            <Section title="User Profile">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                    <div className="flex flex-col items-center md:items-start">
                        <img
                            src={`https://api.dicebear.com/5.x/bottts/svg?seed=${username}`}
                            alt="User Avatar"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-yellow-500"
                        />
                        <h2 className="text-2xl md:text-3xl text-yellow-400 mt-4">{username}</h2>
                        <p className="text-lg md:text-xl text-yellow-300">{email}</p>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
                        <h3 className="text-xl md:text-2xl text-yellow-400">Account Details</h3>
                        <div className="text-yellow-300 text-base md:text-lg">
                            <p><strong>Role:</strong> {transformedRoles.join(", ")}</p>
                            <p><strong>Account Expiry Date:</strong> {accountExpiryDate}</p>
                            <p><strong>Credentials Expiry Date:</strong> {credentialsExpiryDate}</p>
                            <p><strong>Account Non-Expired:</strong> {accountNonExpired ? "Yes" : "No"}</p>
                            <p><strong>Account Non-Locked:</strong> {accountNonLocked ? "Yes" : "No"}</p>
                            <p><strong>Credentials Non-Expired:</strong> {credentialsNonExpired ? "Yes" : "No"}</p>
                            <p><strong>Enabled:</strong> {enabled ? "Yes" : "No"}</p>
                            <p><strong>Two-Factor Authentication:</strong> {twoFactorEnabled ? "Enabled" : "Disabled"}</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Your Activity">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-yellow-500/25 rounded-3xl p-4 md:p-6 text-center">
                        <h3 className="text-xl md:text-2xl text-yellow-400">Forum Posts</h3>
                        <p className="text-lg text-yellow-300">120 Posts</p>
                    </div>
                    <div className="bg-yellow-500/25 rounded-3xl p-4 md:p-6 text-center">
                        <h3 className="text-xl md:text-2xl text-yellow-400">Wiki Contributions</h3>
                        <p className="text-lg text-yellow-300">45 Edits</p>
                    </div>
                    <div className="bg-yellow-500/25 rounded-3xl p-4 md:p-6 text-center">
                        <h3 className="text-xl md:text-2xl text-yellow-400">Achievements</h3>
                        <p className="text-lg text-yellow-300">8 Badges</p>
                    </div>
                </div>
            </Section>

            <Section title="Quick Links">
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-around text-center">
                    <a href="/User/Settings" className="text-lg md:text-xl text-yellow-400 hover:text-yellow-100">
                        Account Settings
                    </a>
                    <a href="/forum" className="text-lg md:text-xl text-yellow-400 hover:text-yellow-100">
                        Visit Forum
                    </a>
                    <a href="/wiki" className="text-lg md:text-xl text-yellow-400 hover:text-yellow-100">
                        Explore Wiki
                    </a>
                </div>
            </Section>
        </div>
    );
}
