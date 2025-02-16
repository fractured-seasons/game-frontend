import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/apiUtils.js";
import Section from "../../components/Section.jsx";
import Loading from "../../components/Loading.jsx";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import TextareaInput from "../../components/TextareaInput.jsx";
import Button from "../../components/Button.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

export default function ViewTicket() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const { role } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            postDetails: "",
            status: true,
            mediaUrl: "",
        },
    });

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await api.get(`/ticket/${id}`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setTicket(response.data);
            } catch (err) {
                toast.error(err.response?.data?.message || "Error fetching ticket details");
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    if (loading) {
        return <Loading title="Loading Ticket Details..." />;
    }

    if (!ticket) {
        return (
            <div className="text-center text-yellow-400 font-pixelify mt-12">
                <h1 className="text-5xl">Error</h1>
                <p className="text-2xl mt-4">Failed to load ticket details.</p>
            </div>
        );
    }

    async function handleCommentSubmit(data, action) {
        try {
            if (action === "reply") {
                const response = await api.post(
                    `/comments/add?ticketId=${id}`,
                    { text: data.comment },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );

                setTicket((prevTicket) => ({
                    ...prevTicket,
                    comments: [...prevTicket.comments, response.data],
                }));

                toast.success("Comment added successfully");
            } else {
                const status = action !== "close";
                await api.put(
                    `/ticket/status/${id}`,
                     status,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                window.location.reload()
                toast.success(`Ticket marked as ${action}d`);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Error processing request");
        }
    }


    async function handleDeactivateUser() {
        try {
            await api.put(
                `/admin/deactivate?username=${ticket.createdBy.userName}`,
                {},
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            toast.success("User deactivated");
            window.location.reload()
        } catch (err) {
            toast.error(err.response?.data?.message || "Error processing request");
        }
    }

    return (
        <div className="mx-4 mt-6 md:mx-12 lg:mx-24 flex flex-col md:flex-row md:gap-6 justify-center">
            <Section title={`Ticket - ${new Date(ticket.lastUpdated).toLocaleString()}`} defaultFont className="!mx-4">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">Ticket creator</h3>
                        <p className="bg-yellow-300 p-2 rounded text-gray-700">{ticket.createdBy.userName}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Title</h3>
                        <p className="bg-yellow-300 p-2 rounded text-gray-700">{ticket.title}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Details</h3>
                        <p className="bg-yellow-300 p-2 rounded text-gray-700">{ticket.postDetails}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Media files (images or video)</h3>
                        <p className={`text-gray-700 ${ticket.mediaUrl ? (' bg-yellow-300 p-2 rounded ') : (" ")}`}>
                            <a href={ticket.mediaUrl} target="_blank" rel="noopener noreferrer"
                               className="text-blue-500 hover:underline">
                                {ticket.mediaUrl}
                            </a>
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Status</h3>
                        <p className="font-bold">
                            {ticket.status === true ? (
                                <span className="p-1 rounded-lg bg-green-700">opened</span>
                            ) : (
                                <span className="p-1 rounded-lg bg-red-700">closed</span>
                            )}
                        </p>
                    </div>
                </div>
            </Section>
            <Section title={"Comments"} defaultFont className="!mx-0">
                <div>
                    <ul>
                        {ticket.comments.map((comment, index) => (
                            <li key={index} className="mb-4">
                                <div className="flex justify-between text-yellow-300">
                                    <strong>{`${comment.postedBy.userName}${comment.createdByAdmin ? ' - staff' : ''}`}</strong>
                                    <b>{new Date(comment.createdAt).toLocaleString()}</b>
                                </div>
                                <p className="text-yellow-200">{comment.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <TextareaInput
                        id="comment"
                        type="url"
                        register={register}
                        errors={errors}
                        name="comment"
                        placeholder="Write your reply here..."
                    />
                    <div className="flex text-center">
                        <Button type="button" onClick={handleSubmit((data) => handleCommentSubmit(data, "reply"))} name="reply" className="mr-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl">
                            Post reply
                        </Button>

                        {(ticket.status === false && ["ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_SUPPORT"].includes(role)) ? (
                            <Button type="button" onClick={() => handleCommentSubmit({}, "open")} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl">
                                Reopen
                            </Button>
                        ) : (
                            <Button type="button" onClick={() => handleCommentSubmit({}, "close")} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl">
                                Mark as solved
                            </Button>
                        )}

                        {["ROLE_ADMIN"].includes(role) && (
                            <Button type="button" onClick={() => handleDeactivateUser()} className="ml-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl">
                                Deactivate user
                            </Button>
                        )}
                    </div>
                </form>
            </Section>
        </div>
    );
}