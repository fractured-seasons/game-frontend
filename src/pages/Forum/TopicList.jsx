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
    const [loading, setLoading] = useState(true);
    const { role } = useAuth();
    const isAdmin = ["ROLE_ADMIN"].includes(role);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await api.get(`/forum/topic?categoryId=${categoryId}&page=${page}&size=10`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setTopics(response.data.content);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching topics");
                setLoading(false);
            }
        };
        fetchTopics();
    }, [categoryId, page]);

    if (loading) return <Loading title="Loading Topics..." />;
    if (error) return <div className="text-center text-yellow-400 font-pixelify mt-12 text-xl sm:text-2xl md:text-3xl">{error}</div>;
    if (!topics.length) return <div className="text-center text-yellow-400 font-pixelify mt-12 text-xl sm:text-2xl md:text-3xl">No Topics Found</div>;

    return (
        <>
            <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-24 mt-6 sm:mt-8 lg:mt-10 flex justify-end">
                <button
                    onClick={() => navigate('/forum/create-topic')}
                    className="py-2 px-4 text-white font-pixelify rounded-md shadow-lg transition-all hover:bg-yellow-500 bg-yellow-400 text-sm sm:text-base md:text-lg"
                >
                    Start a new topic
                </button>
            </div>
            <Section title={topics.length > 0 ? topics[0].category.name : "Loading..."}>
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
