import React, { useState, useEffect } from "react";
import api from "../../utils/apiUtils.js";
import Loading from "../../components/Loading.jsx";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import {FaEdit} from "react-icons/fa";
import { MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import Main from "./Main.jsx";
import ArticleView from "./ArticleView.jsx";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/SearchInput.jsx";
import SearchResultCard from "../../components/SearchResultCard.jsx";
import {GiHamburgerMenu} from "react-icons/gi";

export function Home() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeArticle, setActiveArticle] = useState(null);
    const [activeMainPage, setActiveMainPage] = useState(true);
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [showSidebar, setShowSidebar] = useState(false);

    const navigate = useNavigate();
    const { role } = useAuth();
    const isAdmin = ["ROLE_ADMIN", "ROLE_MODERATOR"].includes(role);
    const isWikiContributor = ["ROLE_WIKI_CONTRIBUTOR"].includes(role);

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

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
                toast.error(err.response.data.message || "Error fetching categories");
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
                toast.error(err.response.data.message || "Error deleting wiki category");
            }
        }
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        setExpandedCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
        setShowSidebar(false);
    };

    const handleArticleClick = (slug) => {
        setActiveArticle(slug);
        setActiveMainPage(false);
        setIsSearching(false);
        setSearchQuery("");
        setSearchResults([]);
    };


    const handleMainPageClick = () => {
        setActiveMainPage(true);
        setActiveCategory(null);
        setActiveArticle(null);
        setShowSidebar(false);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        try {
            const res = await api.get(`/wiki/article/search?query=${searchQuery}`);
            setSearchResults(res.data);
            setIsSearching(true);
            setActiveMainPage(false);
            setActiveArticle(null);
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message || "Error searching articles");
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        setIsSearching(false);
        setSearchResults([]);
        setActiveMainPage(true);
    };


    if (loading) {
        return <Loading title="Loading Wiki..." />;
    }

    return (
        <>
            <div className="flex justify-center lg:justify-end md:justify-end text-lg mt-4 lg:mr-4">
                <div className="mx-4">
                    <SearchInput
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearch={handleSearch}
                        clearSearch={clearSearch}
                        isSearching={isSearching}
                        placeholder="Search articles..."
                    />
                </div>
                {isAdmin && (
                    <button onClick={() => navigate(`/wiki/category/create/`)}
                            className="mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                        Create Category
                    </button>
                )}
                {(isAdmin || isWikiContributor) && (
                    <button onClick={() => navigate(`/wiki/article/create/`)}
                            className="mr-4 px-4 py-2 text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
                        Create Article
                    </button>
                )}
            </div>
            <div
                className={`min-w-screen min-h-screen flex flex-col lg:flex-row md:items-center lg:items-stretch ${isAdmin || isWikiContributor ? " mt-2" : " lg:mt-12 md:mt-8 mt-4"}`}>
                <aside
                    className={`lg:block w-full lg:w-64 max-w-sm md:max-w-screen-md bg-yellow-500/25 backdrop-blur p-4 rounded-xl outline outline-1 outline-yellow-500 ml-6`}>
                    <div className="flex items-center justify-between mt-4 px-4">
                        <h2 className="text-2xl font-pixelify text-yellow-400 text-center ">Categories</h2>
                        <button
                            onClick={() => setShowSidebar(prev => !prev)}
                            className="text-yellow-500 text-3xl focus:outline-none lg:hidden "
                            aria-label="Toggle Sidebar"
                        >
                            <GiHamburgerMenu className="hover:text-yellow-300"/>
                        </button>
                    </div>
                    <div className={`lg:block ${showSidebar ? "block" : "hidden"}`}>
                        <button
                            className={`w-full py-2 px-4 text-lg text-left text-yellow-400 hover:text-yellow-500 font-pixelify ${activeMainPage ? "text-yellow-500" : ""}`}
                            onClick={handleMainPageClick}
                        >
                            Overview
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
                                                    <FaEdit className="ml-2 text-yellow-400 hover:text-yellow-500"/>
                                                </a>
                                                <div
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                    className="ml-2 cursor-pointer"
                                                >
                                                    <MdDelete className="text-yellow-400 hover:text-yellow-500"/>
                                                </div>
                                            </>
                                        )}
                                        {expandedCategories[category.id] ? (
                                            <MdExpandLess className="ml-auto"/>
                                        ) : (
                                            <MdExpandMore className="ml-auto"/>
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
                    </div>
                </aside>

                <main className="flex-1 p-4">
                    {isSearching ? (
                        searchResults.length ? (
                            <>
                                <h2 className="text-2xl font-pixelify text-yellow-400 mb-6">
                                    Search Results for “{searchQuery}”
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {searchResults.map(article => (
                                        <SearchResultCard
                                            key={article.slug}
                                            article={{
                                                ...article,
                                                categoryTitle: categories.find(c => c.id === article.categoryId)?.title
                                            }}
                                            highlight={searchQuery}
                                            onClick={() => handleArticleClick(article.slug)}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-yellow-300 font-pixelify text-xl mt-6">
                                No results found for “{searchQuery}”.
                            </div>
                        )
                    ) : activeMainPage ? (
                        <Main
                            categories={categories}
                            handleArticleClick={handleArticleClick}
                        />
                    ) : activeArticle && (
                        <ArticleView activeArticle={activeArticle}/>
                    )}
                </main>
            </div>
        </>
    );
}