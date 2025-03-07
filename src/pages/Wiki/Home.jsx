import React, { useState, useEffect } from "react";
import api from "../../utils/apiUtils.js";
import Loading from "../../components/Loading.jsx";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import Main from "./Main.jsx";
import ArticleView from "./ArticleView.jsx";
import { useNavigate } from "react-router-dom";

export function Home() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeArticle, setActiveArticle] = useState(null);
    const [activeMainPage, setActiveMainPage] = useState(true);
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState({});
    const navigate = useNavigate();

    const { role } = useAuth();
    const isAdmin = ["ROLE_ADMIN", "ROLE_MODERATOR"].includes(role);
    const isWikiContributor = ["ROLE_WIKI_CONTRIBUTOR"].includes(role);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/wiki/category/approved", {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setCategories(response.data);

                const initialExpandedState = response.data.reduce((acc, category) => {
                    acc[category.id] = true;
                    return acc;
                }, {});
                setExpandedCategories(initialExpandedState);
            } catch (err) {
                toast.error(err.response?.data?.message || "Error fetching categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDeleteCategory = async (categoryId) => {
        const confirmed = window.confirm("Are you sure you want to delete this wiki category?");
        if (confirmed) {
            try {
                const response = await api.delete(`/wiki/category/${categoryId}`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                toast.success(response.data.message || "Wiki category deleted successfully");
                setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
            } catch (err) {
                toast.error(err.response?.data?.message || "Error deleting wiki category");
            }
        }
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        setExpandedCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    const handleArticleClick = (slug) => {
        setActiveArticle(slug);
        setActiveMainPage(false);
    };

    const handleMainPageClick = () => {
        setActiveMainPage(true);
        setActiveCategory(null);
        setActiveArticle(null);
    };

    if (loading) {
        return <Loading title="Loading Wiki..." />;
    }

    return (
        <>
            <div className="flex justify-center lg:justify-end md:justify-end text-lg mt-4 lg:mr-4">
                {isAdmin && (
                    <button onClick={() => navigate(`/wiki/category/create/`)} className="mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                        Create Category
                    </button>
                )}
                {(isAdmin || isWikiContributor) && (
                    <button onClick={() => navigate(`/wiki/article/create/`)} className="mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                        Create Article
                    </button>
                )}
            </div>
            <div className={`min-w-screen min-h-screen flex flex-col lg:flex-row md:items-center lg:items-stretch ${isAdmin || isWikiContributor ? " mt-2" : " lg:mt-12 md:mt-8 mt-4"}`}>
                <aside className="lg:w-64 w-full max-w-sm md:max-w-screen-md bg-yellow-500/25 backdrop-blur p-4 rounded-xl outline outline-1 outline-yellow-500 lg:block ml-6">
                    <h2 className="text-2xl font-pixelify text-yellow-400 mb-6 text-center">Categories</h2>
                    <button
                        className={`w-full py-2 px-4 text-lg text-left text-yellow-400 hover:text-yellow-500 font-pixelify ${activeMainPage ? "text-yellow-500" : ""}`}
                        onClick={handleMainPageClick}
                    >
                        Main page
                    </button>
                    <ul className="text-yellow-400 font-pixelify">
                        {categories.map(category => (
                            <li key={category.id}>
                                <button
                                    className={`flex items-center w-full py-2 px-4 text-lg text-left hover:text-yellow-500 ${activeCategory === category.id ? "text-yellow-500 " : ""}`}
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    {category.title}
                                    {isAdmin && (
                                        <>
                                            <a href={`/wiki/category/edit/${category.id}`} className="ml-2">
                                                <FaEdit className="ml-2 text-yellow-400 hover:text-yellow-500" />
                                            </a>
                                            <div
                                                onClick={() => handleDeleteCategory(category.id)}
                                                className="ml-2 cursor-pointer"
                                            >
                                                <MdDelete className="text-yellow-400 hover:text-yellow-500" />
                                            </div>
                                        </>
                                    )}
                                    {expandedCategories[category.id] ? (
                                        <MdExpandLess className="ml-auto" />
                                    ) : (
                                        <MdExpandMore className="ml-auto" />
                                    )}
                                </button>
                                {expandedCategories[category.id] && (
                                    <ul className="pl-4">
                                        {category.articles.map(article => (
                                            <li key={article.slug}>
                                                <button
                                                    className={`flex items-center w-full py-2 px-4 text-lg text-left hover:text-yellow-500 ${activeArticle === article.slug ? "text-yellow-500 " : ""}`}
                                                    onClick={() => handleArticleClick(article.slug)}
                                                >
                                                    {article.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="flex-1 p-4">
                    {activeMainPage ? (
                        <Main
                            categories={categories}
                            handleArticleClick={handleArticleClick}
                        />
                    ) : activeArticle && (
                        <ArticleView activeArticle={activeArticle} />
                    )}
                </main>
            </div>
        </>
    );
}