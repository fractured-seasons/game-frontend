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
import SearchInput from "../../components/SearchInput.jsx";

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
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (isSearching) return;

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
    }, [categoryId, page, isSearching]);

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
        if (!searchQuery.trim()) {
            if (isSearching) {
                try {
                    const response = await api.get(`/forum/topic?categoryId=${categoryId}&page=${page}&size=10`);
                    setTopics(response.data.content);
                    setIsSearching(false);
                } catch (err) {
                    toast.error("Error resetting search");
                }
            }
            return;
        }

        try {
            const response = await api.get(`/forum/topic/search?query=${searchQuery}`);
            const normalizedTopics = response.data.map(topic => ({
                ...topic,
                createdBy: {
                    userName: topic.createdByUsername
                },
                createdAt: topic.createdAt || new Date().toISOString()
            }));
            setTopics(normalizedTopics);
            setIsSearching(true);
        } catch {
            toast.error("Error searching topics");
        }
    };

    const clearSearch = async () => {
        setSearchQuery("");
        try {
            const response = await api.get(`/forum/topic?categoryId=${categoryId}&page=0&size=10`);
            setTopics(response.data.content);
            setPage(0);
            setIsSearching(false);
        } catch (err) {
            toast.error("Error clearing search");
        }
    };

    if (loading) return <Loading title="Loading Topics..." />;
    if (error) return <div className="text-center text-yellow-400 font-pixelify mt-12 text-xl sm:text-2xl md:text-3xl">{error}</div>;
    if (!topics.length)
        return (
            <>
                <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-24 mt-6 sm:mt-8 lg:mt-10 flex justify-end space-x-2">
                    <SearchInput
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearch={handleSearch}
                        clearSearch={clearSearch}
                        isSearching={isSearching}
                        placeholder="Search topics..."
                    />
                    <button
                        onClick={() => navigate(`/forum/topic/create/${categoryId}`)}
                        className="py-2 px-4 text-white font-pixelify rounded-md shadow-lg transition-all hover:bg-yellow-500 bg-yellow-400 text-sm sm:text-base md:text-lg"
                    >
                        Start a new topic
                    </button>
                </div>
                <div className="text-center text-yellow-400 font-pixelify mt-12 text-xl sm:text-2xl md:text-3xl">
                    No Topics Found
                </div>
            </>
        );


    return (
        <>
            <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-24 mt-6 sm:mt-8 lg:mt-10 flex justify-end space-x-2">
                <SearchInput
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    clearSearch={clearSearch}
                    isSearching={isSearching}
                    placeholder="Search topics..."
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
                            <span>by {topic.createdBy?.userName || topic.createdByUsername}</span>
                            <span>•</span>
                            <span>{new Date(topic.createdAt || new Date()).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
                {!isSearching && (
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                )}
            </Section>
        </>
    );
}