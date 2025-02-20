import {useEffect, useState} from "react";
import api from "../../utils/apiUtils.js";
import toast from "react-hot-toast";
import Loading from "../../components/Loading.jsx";
import Section from "../../components/Section.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {useNavigate} from "react-router-dom";

export default function ForumList() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const { role } = useAuth();
    const isAdmin = ["ROLE_ADMIN"].includes(role);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await api.get(`/forum/section`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setSections(response.data);
            } catch (err) {
                toast.error(err.response?.data?.message || "Error fetching forum sections");
            } finally {
                setLoading(false);
            }
        };

        fetchSections();
    }, []);


    if (loading) {
        return <Loading title="Loading Ticket Details..." />;
    }

    if (!sections.length) {
        return (
            <div className="text-center text-yellow-400 font-pixelify mt-12">
                <h1 className="text-5xl">No Forums Found</h1>
            </div>
        );
    }

    async function handleDeleteCategory(categoryId) {
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if (confirmed) {
            try {
                const response = await api.delete(`/forum/category/${categoryId}`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                toast.success(response.data.message || "Category deleted successfully");
                setSections((prevSections) =>
                    prevSections.map((section) => ({
                        ...section,
                        categories: section.categories.filter((category) => category.id !== categoryId),
                    }))
                );
            } catch (err) {
                toast.error(err.response?.data?.message || "Error deleting category");
            }
        }
    }

    async function handleDeleteSection(sectionId) {
        const confirmed = window.confirm("Are you sure you want to delete this section?");
        if (confirmed) {
            try {
                const response = await api.delete(`/forum/section/${sectionId}`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                toast.success(response.data.message || "Section deleted successfully");
                setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
            } catch (err) {
                toast.error(err.response?.data?.message || "Error deleting section");
            }
        }
    }

    return (
        <>
            {isAdmin && (
                <div className="mx-4 sm:mx-12 lg:mx-24 mt-8 sm:mt-10 lg:mt-12 flex justify-end text-lg">
                    <button onClick={() => navigate('/forum/create-section')} className="py-2 px-4 text-white font-pixelify rounded-md shadow-lg transition-colors hover:bg-yellow-500 bg-yellow-400">Create Section</button>
                </div>
            )}
            {sections.map((section) => (
                <Section key={section.id} title={
                    <>
                        {isAdmin && (
                            <div className="mb-6 flex justify-end text-lg font-light">
                                <button onClick={() => navigate('/forum/create-category')} className="py-2 px-4 text-white font-pixelify rounded-md shadow-lg transition-colors hover:bg-yellow-500 bg-yellow-400">Create Category</button>
                            </div>
                        )}
                        <span className="flex items-center">
                            {section.name}
                            {isAdmin && (
                                <>
                                    < a href={`/forum/edit-section/${section.id}`} className="ml-2"><FaEdit
                                        className="ml-2 text-yellow-400 hover:text-yellow-500"/></a>
                                    <button onClick={() => handleDeleteSection(section.id)}><MdDelete
                                        className="ml-2 text-yellow-400 hover:text-yellow-500"/></button>
                                </>
                            )}
                        </span>
                    </>
                }
                >
                    {section.categories.map((category) => (
                        <div key={category.id} className="mb-4">
                            <div className="flex items-center">
                                <a href={`forum/topics/${category.id}`}
                                   className="text-xl text-yellow-400 hover:text-yellow-500 flex items-center">
                                    {category.name}
                                </a>
                                {isAdmin && (
                                    <>
                                        <a href={`/forum/edit-category/${category.id}`}
                                           className="ml-2 text-yellow-400 hover:text-yellow-500"><FaEdit/></a>
                                        <button onClick={() => handleDeleteCategory(category.id)}><MdDelete className="ml-2 text-yellow-400 hover:text-yellow-500"/></button>
                                    </>
                                )}
                            </div>
                            <p>{category.description}</p>
                        </div>
                    ))}
                </Section>
            ))}
        </>
    );
}