    import { useEffect, useState } from "react";
    import api from "../../utils/apiUtils.js";
    import Section from "../../components/Section.jsx";
    import Pagination from "../../components/Pagination.jsx";
    import {useNavigate} from "react-router-dom";
    import toast from 'react-hot-toast'
    import {useAuth} from "../../context/AuthContext.jsx";
    import AccessDenied from "../../components/AccessDenied.jsx";

    export default function UsersTable() {
        const { isStaff, role } = useAuth()
        const navigate = useNavigate()
        const [users, setUsers] = useState([]);
        const [error, setError] = useState(null);
        const [page, setPage] = useState(0);
        const [totalPages, setTotalPages] = useState(0);

        if (!isStaff || role !== "ROLE_ADMIN") {
            return (
                <AccessDenied/>
            );
        }

        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const response = await api.get(`/admin/users?page=${page}&size=10`, {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    });
                    setUsers(response.data.content);
                    setTotalPages(response.data.totalPages);
                } catch (err) {
                    setError(err.response?.data?.message || "Error fetching users");
                }
            };

            fetchUsers();
        }, [page]);

        if (error) {
            return (
                <div className="text-center text-yellow-400 font-pixelify mt-12">
                    <h1 className="text-5xl">Error</h1>
                    <p className="text-2xl mt-4">{error}</p>
                </div>
            );
        }

        if (!users.length) {
            return (
                <div className="text-center text-yellow-400 font-pixelify mt-12">
                    <h1 className="text-5xl">Loading...</h1>
                </div>
            );
        }

        const handleDelete = async (userId) => {
            if (window.confirm("Are you sure you want to delete this user?")) {
                try {
                    await api.delete(`/admin/user/delete/${userId}`, {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    });
                    toast.success("User deleted successfully!");
                    setUsers(users.filter((user) => user.userId !== userId));
                } catch (err) {
                    toast.error(err.response.data || "Error deleting user");
                }
            }
        };

        return (
            <div className="mx-4 mt-6 md:mx-6">
                <Section title="User Management">
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="min-w-full table-auto">
                            <thead className="bg-yellow-400 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">Username</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                {/*<th className="px-4 py-2 text-left">Roles</th>*/}
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.userId} className="bg-yellow-600 text-yellow-100">
                                    <td className="px-4 py-2">{user.userName}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    {/*<td className="px-4 py-2">*/}
                                    {/*    {user.roles.join(", ").replace("ROLE_", "")}*/}
                                    {/*</td>*/}
                                    <td className="px-4 py-2">
                                        {user.enabled ? "Active" : "Inactive"}
                                    </td>
                                    <td className="px-4 py-2 space-x-4">
                                        <button
                                            onClick={() => navigate(`/admin/user/view/${user.userId}`)}
                                            className="text-yellow-400 hover:text-yellow-100"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/user/edit/${user.userId}`)}
                                            className="text-yellow-400 hover:text-yellow-100">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.userId)}
                                            className="text-red-600 hover:text-red-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                </Section>
            </div>
        );
    }
