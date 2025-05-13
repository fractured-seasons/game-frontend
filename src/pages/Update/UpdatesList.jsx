import React, { useEffect, useState } from "react";
import Section from "../../components/Section.jsx";
import Pagination from "../../components/Pagination.jsx";
import { MdExpandMore, MdExpandLess, MdDelete } from "react-icons/md";
import { FaPlus, FaEdit } from "react-icons/fa";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../../components/Button.jsx";

const PAGE_SIZE = 3;

export default function UpdatesList() {
    const { role } = useAuth();
    const isStaff = ["ROLE_ADMIN", "ROLE_MODERATOR"].includes(role);

    const [updates, setUpdates] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [formVisible, setFormVisible] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [formData, setFormData] = useState({ title: "", content: "" });

    const fetchUpdates = async () => {
        try {
            const res = await api.get(`/update?page=${page}&size=${PAGE_SIZE}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setUpdates(res.data.content);
            setTotalPages(res.data.page.totalPages);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch updates");
        }
    };

    useEffect(() => {
        fetchUpdates();
    }, [page, refresh]);

    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        try {
            if (editMode) {
                await api.put(`/update/${editMode}`, formData, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                toast.success("Update edited successfully!");
            } else {
                await api.post("/update/create", formData, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                toast.success("Update created successfully!");
            }

            setFormVisible(false);
            setFormData({ title: "", content: "" });
            setEditMode(null);
            setRefresh(prev => !prev);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error submitting update");
        }
    };

    const handleEdit = (update) => {
        setFormData({ title: update.title, content: update.content });
        setEditMode(update.id);
        setFormVisible(true);
        setRefresh(prev => !prev);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this update?")) return;

        try {
            await api.delete(`/update/${id}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            toast.success("Update deleted successfully!");
            setRefresh(prev => !prev);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error deleting update");
        }
    };

    return (
        <Section title="System & Feature Updates">
            <p className="text-lg text-yellow-100 mb-6">
                View major changes across the Fractured Seasons platform. Expand entries to view details.
            </p>

            {isStaff && (
                <div className="mb-6">
                    {!formVisible ? (
                        <button
                            onClick={() => {
                                setFormVisible(true);
                                setEditMode(null);
                                setFormData({ title: "", content: "" });
                            }}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg font-pixelify flex items-center"
                        >
                            <FaPlus className="mr-2" /> Add Update
                        </button>
                    ) : (
                        <div className="border border-yellow-500 rounded-xl p-4 bg-yellow-500/10 space-y-4">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Title"
                                className="w-full p-2 rounded bg-yellow-100 text-gray-900"
                            />
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                rows={5}
                                placeholder="Content"
                                className="w-full p-2 rounded bg-yellow-100 text-gray-900"
                            />
                            <div className="flex justify-between">
                                <Button
                                    onClick={handleSubmit}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white"
                                >
                                    {editMode ? "Update" : "Create"}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setFormVisible(false);
                                        setFormData({ title: "", content: "" });
                                        setEditMode(null);
                                    }}
                                    className="ml-2 bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-4">
                {updates.map((update) => (
                    <div
                        key={update.id}
                        className="border border-yellow-500 rounded-xl p-4 backdrop-blur bg-yellow-500/20 transition-all"
                    >
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(update.id)}>
                            <div>
                                <h2 className="text-xl font-pixelify text-yellow-400">{update.title}</h2>
                                <p className="text-yellow-200 text-sm">{new Date(update.createdAt || update.date).toLocaleDateString()}</p>
                            </div>
                            {expandedId === update.id ? (
                                <MdExpandLess className="text-yellow-300 text-3xl" />
                            ) : (
                                <MdExpandMore className="text-yellow-300 text-3xl" />
                            )}
                        </div>

                        {expandedId === update.id && (
                            <div className="mt-4 text-yellow-100 whitespace-pre-line leading-relaxed text-base">
                                {update.content}
                            </div>
                        )}

                        {isStaff && (
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() => handleEdit(update)}
                                    className="text-yellow-300 hover:text-yellow-100"
                                >
                                    <FaEdit className="text-2xl" />
                                </button>
                                <button
                                    onClick={() => handleDelete(update.id)}
                                    className="text-red-400 hover:text-red-200"
                                >
                                    <MdDelete className="text-2xl" />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </Section>
    );
}
