import {useEffect, useState} from "react";
import api from "../../utils/apiUtils.js";
import toast from "react-hot-toast";
import Loading from "../../components/Loading.jsx";
import Section from "../../components/Section.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

export default function ForumList() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const { role } = useAuth();

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

    const isAdmin = ["ROLE_ADMIN"].includes(role);

    function handleDeleteCategory(categoryId) {
        return undefined;
    }

    function handleDeleteSection(sectionId) {
        return undefined;
    }

    return (
        <>
            {sections.map((section) => (
                <Section key={section.id} title={
                    <span className="flex items-center">
                        {section.name}
                        {isAdmin && (
                            <>
                                < a href={`/forum/edit-section/${section.id}`} className="ml-2"><FaEdit className="ml-2 text-yellow-400 hover:text-yellow-500"/></a>
                                <button onClick={handleDeleteSection(section.id)}><MdDelete
                                    className="ml-2 text-yellow-400 hover:text-yellow-500"/></button>
                            </>
                        )}
                    </span>}
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
                                        <button onClick={handleDeleteCategory(category.id)}><MdDelete className="ml-2 text-yellow-400 hover:text-yellow-500"/></button>
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