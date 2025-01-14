import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/apiUtils.js";
import Section from "../../components/Section.jsx";
import Loading from "../../components/Loading.jsx";
import toast from "react-hot-toast";

export default function ViewUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/admin/user/${id}`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setUser(response.data);
            } catch (err) {
                toast.error(err.response?.data?.message || "Error fetching user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <Loading title="Loading User Details..." />;
    }

    if (!user) {
        return (
            <div className="text-center text-yellow-400 font-pixelify mt-12">
                <h1 className="text-5xl">Error</h1>
                <p className="text-2xl mt-4">Failed to load user details.</p>
            </div>
        );
    }

    return (
        <div className="mx-4 mt-6 md:mx-6">
            <Section title={`Viewing User: ${user.userName}`}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Username:</h3>
                            <p className="text-gray-700">{user.userName}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Email:</h3>
                            <p className="text-gray-700">{user.email}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Role:</h3>
                            <p className="text-gray-700">{user.role.roleName.replace("ROLE_", "")}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Status:</h3>
                            <p className={`font-bold ${user.enabled ? "text-green-500" : "text-red-500"}`}>
                                {user.enabled ? "Active" : "Inactive"}
                            </p>
                        </div>
                    </div>
            </Section>
        </div>
    );
}
