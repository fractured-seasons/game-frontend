import React, { useState, useEffect } from "react";
import api from "../../utils/apiUtils.js";
import Section from "../../components/Section.jsx";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import 'react-quill/dist/quill.snow.css';
import Loading from "../../components/Loading.jsx";

export default function ArticleView({ activeArticle }) {
    const { articleSlug } = useParams();
    const [article, setArticle] = useState("");
    const [articleContributors, setArticleContributors] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { role } = useAuth();
    const isAdmin = ["ROLE_ADMIN", "ROLE_MODERATOR"].includes(role);
    const isWikiContributor = ["ROLE_WIKI_CONTRIBUTOR"].includes(role);

    useEffect(() => {
        if (activeArticle) {
            fetchArticleContent(activeArticle);
            fetchArticleContributors(activeArticle);
        } else if (articleSlug) {
            fetchArticleContent(articleSlug);
        }
    }, [activeArticle]);

    const fetchArticleContent = async (articleSlug) => {
        try {
            const response = await api.get(`/wiki/article/${articleSlug}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setArticle(response.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error fetching article content");
        } finally {
            setLoading(false);
        }
    };

    const fetchArticleContributors = async (articleSlug) => {
        try {
            const response = await api.get(`/wiki/${articleSlug}/contributors`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setArticleContributors(response.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error fetching article contributors");
        }
    };

    async function handleDeleteArticle(articleId) {
        const confirmed = window.confirm("Are you sure you want to delete this wiki article?");
        if (confirmed) {
            try {
                const response = await api.delete(`/wiki/article/${articleId}`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                toast.success(response.data.message || "Wiki article deleted successfully");
            } catch (err) {
                toast.error(err.response?.data?.message || "Error deleting wiki article");
            }
        }
    }

    const handleRejectArticle = async (articleId) => {
        try {
            const response = await api.put(`/wiki/article/${articleId}/reject`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            toast.success(response.data.message || "Article rejected successfully");
            fetchArticleContent(articleSlug);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error rejecting article");
        }
    };

    const handleApproveArticle = async (articleId) => {
        try {
            const response = await api.put(`/wiki/article/${articleId}/approve`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            toast.success(response.data.message || "Article approved successfully");
            fetchArticleContent(articleSlug);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error approving article");
        }
    };

    const handleToggleArticleVisibility = async (articleId) => {
        try {
            const response = await api.put(`/wiki/article/${articleId}/toggle-visibility`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            toast.success(response.data.message || "Article visibility toggled successfully");
            fetchArticleContent(articleSlug);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error toggling article visibility");
        }
    };

    const getImageSrc = (src) => {

        return `${import.meta.env.VITE_APP_API_URL}${src}`;

    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Section title={article.title} className={activeArticle && "!mx-4"} marginTop={!activeArticle}>
                {articleSlug && (
                    <>
                        <h2 className="mt-6 text-2xl font-bold text-yellow-400 mb-4">Article Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-yellow-400">Slug</h3>
                                <p className="text-yellow-300">{article.slug}</p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-yellow-400">Approval Status</h3>
                                <p className="text-yellow-300">{article.approvalStatus}</p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-yellow-400">Visibility</h3>
                                <p className="text-yellow-300">
                                    {article.hidden ? "Hidden" : "Visible"}
                                </p>
                            </div>

                            {article.createdBy && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-yellow-400">Created By</h3>
                                    <p className="text-yellow-300">{article.createdBy.userName}</p>
                                </div>
                            )}

                            {article.approvedBy && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-yellow-400">Approved By</h3>
                                    <p className="text-yellow-300">{article.approvedBy.userName}</p>
                                </div>
                            )}

                            {article.rejectedBy && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-yellow-400">Rejected By</h3>
                                    <p className="text-yellow-300">{article.rejectedBy.userName}</p>
                                </div>
                            )}

                            {article.hiddenBy && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-yellow-400">Hidden By</h3>
                                    <p className="text-yellow-300">{article.hiddenBy.userName}</p>
                                </div>
                            )}

                            {article.category && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-yellow-400">Category</h3>
                                    <p className="text-yellow-300">{article.category.title}</p>
                                </div>
                            )}

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-yellow-400">Last Updated</h3>
                                <p className="text-yellow-300">
                                    {new Date(article.lastUpdated).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </>
                )}

                <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: article.content.replace(
                            /<img src="(\/uploads\/[a-zA-Z0-9\-_.]+)"/g,
                            (match, p1) => `<img src="${getImageSrc(p1)}"`
                        ) }}
                />

                {articleContributors.length > 0 && (
                    <>
                        <h2 className="text-2xl my-4 font-bold text-yellow-400">Article Contributors</h2>
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                            {articleContributors.map((contributor) => (
                                <div key={contributor.id} className="relative group">
                                    <img
                                        src={`https://api.dicebear.com/5.x/bottts/svg?seed=${contributor.username}`}
                                        alt={contributor.username}
                                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-yellow-500"
                                    />
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded px-2 py-1">
                                        {contributor.username}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="mt-4 flex flex-wrap justify-center sm:justify-end text-lg">
                    {isAdmin && (
                        <>
                            <button onClick={() => handleApproveArticle(article.id)} className="mb-2 mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                                Approve
                            </button>

                            <button onClick={() => handleRejectArticle(article.id)} className="mb-2 mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                                Reject
                            </button>

                            <button onClick={() => handleToggleArticleVisibility(article.id)} className="mb-2 mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                                {article.hidden ? <FaEye title="Unhide" /> : <FaEyeSlash title="Hide" />}
                            </button>

                            <button onClick={() => handleDeleteArticle(article.id)} className="mb-2 mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                                <MdDelete title="Delete" />
                            </button>
                        </>
                    )}
                    {(isAdmin || isWikiContributor) && (
                        <button onClick={() => navigate(`/wiki/article/edit/${article.slug}`)} className="mb-2 mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                            <FaEdit title="Edit" />
                        </button>
                    )}
                </div>
            </Section>
        </>
    );
}