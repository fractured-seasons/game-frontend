import { useEffect, useState } from "react";
import api from "../../utils/apiUtils.js";
import toast from "react-hot-toast";
import Loading from "../../components/Loading.jsx";
import Section from "../../components/Section.jsx";
import Pagination from "../../components/Pagination.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { FaEyeSlash, FaLock, FaLockOpen } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

export default function TopicList() {
    const { categoryId } = useParams();
    const [topics, setTopics] = useState([]);
    const [category, setCategory] = useState({ name: "", description: "", sectionId: "" });
    const [loading, setLoading] = useState(true);
    const { role } = useAuth();
    const isAdmin = ["ROLE_ADMIN", "ROLE_MODERATOR"].includes(role);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await api.get(`/forum/topic?categoryId=${categoryId}&page=${page}&size=10`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setTopics(response.data.content);
                setTotalPages(response.data.page.totalPages);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching topics");
                setLoading(false);
            }
        };

        fetchTopics();
    }, [categoryId, page]);

    useEffect(() => {
        if (topics.length === 0) return;

        const fetchCategory = async () => {
            try {
                const response = await api.get(`/forum/category/${categoryId}`);
                setCategory(response.data);
            } catch {
                toast.error("Failed to fetch category");
            }
        };

        fetchCategory();
    }, [topics]);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        try {
            const response = await api.get(`/forum/topic/search?query=${searchQuery}`);
            setTopics(response.data);
        } catch {
            toast.error("Error searching topics");
        }
    };

    if (loading) return <Loading title="Loading Topics..." />;
    if (error) return <div className="text-center text-yellow-400 font-pixelify mt-12 text-xl sm:text-2xl md:text-3xl">{error}</div>;
    if (!topics.length)
        return <>
                <div className="text-center text-yellow-400 font-pixelify mt-12 text-xl sm:text-2xl md:text-3xl">No Topics Found</div>;
                <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-24 mt-6 sm:mt-8 lg:mt-10 flex justify-center">
                    <button
                        onClick={() => navigate(`/forum/topic/create/${categoryId}`)}
                        className="py-2 px-4 text-white font-pixelify rounded-md shadow-lg transition-all hover:bg-yellow-500 bg-yellow-400 text-sm sm:text-base md:text-lg"
                    >
                        Start a new topic
                    </button>
                </div>
            </>


    return (
        <>
            <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-24 mt-6 sm:mt-8 lg:mt-10 flex justify-end space-x-2">
                <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-2 px-3 border border-yellow-600 bg-yellow-900/20 text-yellow-200 placeholder-yellow-300 rounded-md focus:border-1 transition-colors pr-10"
                />
                <button
                    onClick={() => navigate(`/forum/topic/create/${categoryId}`)}
                    className="py-2 px-4 text-white font-pixelify rounded-md shadow-lg transition-all hover:bg-yellow-500 bg-yellow-400 text-sm sm:text-base md:text-lg"
                >
                    Start a new topic
                </button>
            </div>
            <Section title={topics.length > 0 ? category.name : "Loading..."}>
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-yellow-400 py-3 gap-2 sm:gap-4"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex space-x-2 text-lg sm:text-xl text-yellow-400">
                                {topic.pinned && <MdPushPin title="Topic Pinned" />}
                                {topic.locked ? <FaLock title="Topic Locked" /> : <FaLockOpen title="Topic Unlocked" />}
                                {topic.hidden && <FaEyeSlash title="Topic Hidden" />}
                            </div>
                            <h2
                                className="text-base sm:text-lg md:text-xl font-medium text-yellow-300 cursor-pointer hover:text-yellow-400"
                                onClick={() => navigate(`/forum/topic/${topic.id}`)}
                            >
                                {topic.title}
                            </h2>
                        </div>
                        <div className="text-sm sm:text-md text-yellow-500 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span>by {topic.createdBy.userName}</span>
                            <span>•</span>
                            <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </Section>
        </>
    );
}
