import { useEffect, useState } from "react";
import api from "../../utils/apiUtils.js";
import Section from "../../components/Section.jsx";
import Pagination from "../../components/Pagination.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import AccessDenied from "../../components/AccessDenied.jsx";
import Loading from "../../components/Loading.jsx";
import {FaEye, FaEyeSlash} from "react-icons/fa";

export default function ArticlesTable() {
    const { isStaff, role } = useAuth()
    const navigate = useNavigate()
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    if (!isStaff || !["ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_WIKI_CONTRIBUTOR"].includes(role)) {
        return (
            <AccessDenied/>
        );
    }

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await api.get(`/wiki/article?page=${page}&size=10`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setArticles(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching wiki articles");
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

    if (!articles.length) {
        return (
            <Loading/>
        );
    }

    return (
        <div className="mx-4 md:mx-6">
            <Section title="Wiki Management" className="!mx-4" marginTop={false}>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-yellow-400 text-white">
                        <tr className="px-4 py-2 text-center">
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Hidden</th>
                        </tr>
                        </thead>
                        <tbody>
                        {articles.map((article) => (
                            <tr key={article.id} className="bg-yellow-600 text-yellow-100 text-center">
                                <td className="px-4 py-2">
                                    <button
                                        className="text-yellow-300 hover:underline"
                                        onClick={() => navigate(`/admin/article/view/${article.slug}`)}
                                    >
                                        {(
                                            article.title
                                        ).length > 30
                                            ? (article.title).slice(0, 30) + "..."
                                            : article.title
                                        }
                                    </button>
                                </td>
                                <td className="px-4 py-2">{article.categoryTitle || "No Category"}</td>
                                <td className="px-4 py-2">
                                    {article.approvalStatus === "APPROVED" ? (
                                        <span className="p-1 rounded-lg bg-green-700">approved</span>
                                    ) : article.approvalStatus === "REJECTED" ? (
                                        <span className="p-1 rounded-lg bg-red-700">rejected</span>
                                    ) : article.approvalStatus === "PENDING" ? (
                                        <span className="p-1 rounded-lg bg-orange-500">pending</span>
                                    ) : null}
                                </td>
                                <td className="px-4 py-2">{new Date(article.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 flex justify-center">{article.hidden ? <FaEyeSlash title="Article Hidden" /> : <FaEye title="Article Visible" />}</td>
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
