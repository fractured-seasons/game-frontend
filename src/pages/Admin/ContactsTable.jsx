import { useEffect, useState } from "react";
import api from "../../utils/apiUtils.js";
import Section from "../../components/Section.jsx";
import Pagination from "../../components/Pagination.jsx";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast'
import {useAuth} from "../../context/AuthContext.jsx";
import AccessDenied from "../../components/AccessDenied.jsx";
import Loading from "../../components/Loading.jsx";

export default function ContactsTable() {
    const { isStaff, role } = useAuth()
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await api.get(`/contact?page=${page}&size=10`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setContacts(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching contacts");
            }
        };

        fetchContacts();
    }, [page]);

    if (error) {
        return (
            <div className="text-center text-yellow-400 font-pixelify mt-12">
                <h1 className="text-5xl">Error</h1>
                <p className="text-2xl mt-4">{error}</p>
            </div>
        );
    }

    if (!contacts.length) {
        return (
            <Loading/>
        );
    }

    return (
        <div className="mx-4 mt-6 md:mx-6">
            <Section title="Contacts Management">
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-yellow-400 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id} className="bg-yellow-600 text-yellow-100">
                                <td className="px-4 py-2">
                                    <button
                                        className="text-yellow-300 hover:underline"
                                        onClick={() => navigate(`/admin/contact/view/${contact.id}`)}
                                    >
                                        {(
                                            contact.name
                                        ).length > 30
                                            ? (contact.name).slice(0, 30) + "..."
                                            : contact.name
                                        }
                                    </button>
                                </td>
                                <td className="px-4 py-2">{contact.email}</td>
                                <td className="px-4 py-2">{new Date(contact.createdAt).toLocaleDateString()}</td>
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
