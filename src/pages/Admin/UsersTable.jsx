    import { useEffect, useState } from "react";
    import api from "../../utils/apiUtils.js";
    import Section from "../../components/Section.jsx";
    import Pagination from "../../components/Pagination.jsx";
    import {Link} from "react-router-dom";

    export default function UsersTable() {
        const [users, setUsers] = useState([]);
        const [error, setError] = useState(null);
        const [page, setPage] = useState(0);
        const [totalPages, setTotalPages] = useState(0);

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
                                    <td className="px-4 py-2">
                                        <Link to={`/admin/edit-user/${user.userId}`} className="text-yellow-400 hover:text-yellow-100">
                                            Edit
                                        </Link>
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
