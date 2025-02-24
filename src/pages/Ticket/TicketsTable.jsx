import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/apiUtils.js";
import Section from "../../components/Section.jsx";
import Pagination from "../../components/Pagination.jsx";
import {FaPlus} from "react-icons/fa";

export default function TicketsTable() {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchTickets = async () => {
            const endpoint = window.location.pathname ===  "/dashboard" ? "/ticket" : "/ticket/user";
            try {
                const response = await api.get(`${endpoint}?page=${page}&size=10`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setTickets(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching tickets");
            }
        };

        fetchTickets();
    }, [page]);

    if (error) {
        return (
            <div className="text-center text-yellow-400 font-pixelify mt-12">
                <h1 className="text-5xl">Error</h1>
                <p className="text-2xl mt-4">{error}</p>
            </div>
        );
    }

    if (!tickets.length) {
        return (
            <div className="text-center text-yellow-400 font-pixelify mt-12 flex flex-col items-center space-y-4">
                <button
                    className="bg-yellow-400 font-bold text-white py-2 px-4 rounded-lg hover:bg-yellow-500 flex items-center"
                    onClick={() => navigate("/tickets/create")}
                >
                    <FaPlus className="mr-2"/> Create a new ticket
                </button>
                <h1 className="text-5xl">No Tickets Found</h1>
            </div>
        );
    }

    return (
        <div className="mx-4 mt-6 md:mx-6">
            <Section title="Your Tickets">
                <div className="text-right mb-4 flex items-center justify-end">
                    <button
                        className="bg-yellow-400 font-bold text-white py-2 px-4 rounded-lg hover:bg-yellow-500 flex items-center"
                        onClick={() => navigate("/tickets/create")}
                    >
                        <FaPlus className="mr-2"/> Create a new ticket
                    </button>
                </div>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-yellow-400 text-white text-center">
                        <tr>
                            <th className="px-4 py-2">Number</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Last Updated</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} className="bg-yellow-600 text-yellow-100 text-center">
                                <td className="px-4 py-2">{ticket.id}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="text-yellow-300 hover:underline"
                                        onClick={() => navigate(`/tickets/view/${ticket.id}`)}
                                    >
                                        {(
                                            ticket.createdBy.userName + " - " + ticket.title
                                        ).length > 30
                                            ? (ticket.createdBy.userName + " - " + ticket.title).slice(0, 30) + "..."
                                            : ticket.createdBy.userName + " - " + ticket.title
                                        }
                                    </button>
                                </td>
                                <td className="px-4 py-2">{new Date(ticket.lastUpdated).toLocaleString()}</td>
                                <td className="px-4 py-2 font-bold text-yellow-100">
                                    {ticket.status === true ? (
                                        <span className="p-1 rounded-lg bg-green-700">opened</span>
                                    ) : (
                                        <span className="p-1 rounded-lg bg-red-700">closed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <Pagination page={page} totalPages={totalPages} setPage={setPage}/>
            </Section>
        </div>
    );
}
