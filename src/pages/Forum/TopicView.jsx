import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/apiUtils.js";
import Loading from "../../components/Loading.jsx";
import Section from "../../components/Section.jsx";
import toast from "react-hot-toast";
import {FaEdit, FaEyeSlash, FaLock, FaLockOpen} from "react-icons/fa";
import {MdDelete, MdPushPin} from "react-icons/md";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext.jsx";
import Pagination from "../../components/Pagination.jsx";
import ReplyEdit from "./ReplyEdit.jsx";

export default function TopicView() {
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);
    const [replies, setReplies] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { role, currentUser } = useAuth();
    const isAdmin = ["ROLE_ADMIN", "ROLE_MODERATOR"].includes(role);

    const [editReplyId, setEditReplyId] = useState(null);
    const [editedReply, setEditedReply] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await api.get(`/forum/topic/${topicId}`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setTopic(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching topic");
                setLoading(false);
            }
        };

        fetchTopic();
    }, [topicId]);

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const response = await api.get(`/forum/reply?topicId=${topicId}&page=${page}&size=${10}`);
                setReplies(response.data.content);
                setTotalPages(response.data.page.totalPages);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch replies", error);
            }
        };

        fetchReplies();
    }, [topicId, page]);

    const handleReplySubmit = async (data) => {
        try {
            const payload = {
                content: data.content,
                topicId: topicId,
                hidden: false,
            };

            const response = await api.post(`/forum/reply/add`, payload, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            setReplies((prevReplies) => [...prevReplies, response.data]);

            reset()
            toast.success("Reply added successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to post reply");
        }
    };

    async function handleDeleteTopic(topicId) {
        const confirmed = window.confirm("Are you sure you want to delete this topic?");
        if (confirmed) {
            try {
                const response = await api.delete(`/forum/topic/${topicId}`, {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true,
                });
                toast.success(response.data.message || "Topic deleted successfully");
                navigate(-1);
            } catch (err) {
                toast.error(err.response?.data?.message || "Error deleting topic");
            }
        }
    }

    const handleEditReply = (reply) => {
        setEditReplyId(reply.id);
        setEditedReply(reply);
    };

    const handleSaveEdit = (updatedReply) => {
        setReplies(replies.map((reply) => (reply.id === updatedReply.id ? updatedReply : reply)));
        setEditReplyId(null);
    };

    const handleCancelEdit = () => {
        setEditReplyId(null);
    };

    async function handleDeleteReply(replyId) {
        const confirmed = window.confirm("Are you sure you want to delete this reply?");
        if (confirmed) {
            try {
                const response = await api.delete(`/forum/reply/${replyId}`, {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true,
                });
                toast.success(response.data.message || "Reply deleted successfully");
                setReplies(replies.filter(reply => reply.id !== replyId));
            } catch (err) {
                toast.error(err.response?.data?.message || "Error deleting reply");
            }
        }
    }

    if (loading || !topic) {
        return <Loading title="Loading Topic..." />;
    }

    if (error) {
        return (
            <div className="text-center text-yellow-400 font-pixelify mt-12">
                <h1 className="text-5xl">Error</h1>
                <p className="text-2xl mt-4">{error}</p>
            </div>
        );
    }

    return (
        <>
            <div className="mx-4 sm:mx-12 lg:mx-24 mt-8 flex justify-end text-lg">
                {(isAdmin || currentUser?.username === topic?.createdBy?.userName) && (
                    <>
                        <button onClick={() => navigate(`/forum/topic/edit/${topic.id}`)} className="mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                            <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteTopic(topicId)} className="mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                            <MdDelete />
                        </button>
                    </>
                )}
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-yellow-400 text-white rounded-md shadow-md hover:bg-yellow-500"
                >
                    Go Back
                </button>
            </div>
            <Section title={topic.title}>
                <div className="flex flex-col md:flex-row items-center md:items-start text-yellow-400 space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex flex-col items-center">
                        <img
                            src={`https://api.dicebear.com/5.x/bottts/svg?seed=${topic.createdBy.userName}`}
                            alt="User Avatar"
                            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-yellow-500"
                        />
                        <h3 className="text-lg font-bold mt-2">{topic.createdBy.userName}</h3>
                        <p className="text-sm text-yellow-500">{new Date(topic.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-base sm:text-lg leading-relaxed text-center md:text-left">
                        {topic.content}
                    </div>
                </div>
                <div className="flex space-x-2 text-xl sm:text-2xl text-yellow-400 mt-4">
                    {topic.pinned && <MdPushPin title="Topic Pinned" />}
                    {topic.locked ? <FaLock title="Topic Locked" /> : <FaLockOpen title="Topic Unlocked" />}
                    {topic.hidden && <FaEyeSlash title="Topic Hidden" />}
                </div>
                <hr className="border-yellow-400 mt-4" />
                <div className="mt-4">
                    {replies.length ? (
                        replies.map((reply) => (
                            <div key={reply.id} className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b border-yellow-400 py-4">
                                <img
                                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${reply.createdBy.userName}`}
                                    alt="User Avatar"
                                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-yellow-500"
                                />
                                <div className="flex flex-col text-center sm:text-left">
                                    <div className="text-yellow-300 font-bold text-lg">{reply.createdBy.userName}</div>
                                    <div className="text-yellow-500 text-sm">{new Date(reply.createdAt).toLocaleDateString()}</div>
                                    {editReplyId === reply.id ? (
                                        <ReplyEdit reply={reply} onSave={handleSaveEdit} onCancel={handleCancelEdit} topicId={topicId} isAdmin={isAdmin} />
                                    ) : (
                                        <p className="text-white mt-2">{reply.content}</p>
                                    )}
                                </div>
                                {(isAdmin || currentUser?.username === reply?.createdBy?.userName) && (
                                    <div className="absolute top-2 right-2 flex space-x-2">
                                        {reply.hidden && <FaEyeSlash title="Reply Hidden" className="text-yellow-400"/>}
                                        <button onClick={() => handleEditReply(reply)} className="text-yellow-400 hover:text-yellow-500">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDeleteReply(reply.id)} className="text-yellow-400 hover:text-yellow-500">
                                            <MdDelete />
                                        </button>
                                    </div>
                                )}
                            </div>

                        ))
                    ) : topic.locked ? (
                        <div className="text-center text-yellow-400 font-pixelify mt-4 text-lg">
                            You can&#39;t reply to a locked topic!
                        </div>
                    ) : (
                        <div className="text-center text-yellow-400 font-pixelify mt-4 text-lg">
                            No replies yet. Be the first to reply!
                        </div>
                    )}
                    {replies.length ? (<Pagination page={page} totalPages={totalPages} setPage={setPage} />) : (<></>)}
                </div>
                {!topic.locked && (
                    <form onSubmit={handleSubmit(handleReplySubmit)} className="space-y-4 mt-4">
                        <InputField
                            label="Your Reply"
                            id="content"
                            type="text"
                            register={register}
                            errors={errors}
                            required
                        />
                        <Button type="submit" className="bg-yellow-400 text-lg sm:text-2xl hover:bg-yellow-500">Reply</Button>
                    </form>
                )}
            </Section>
        </>
    );
}

