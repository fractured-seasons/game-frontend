import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/apiUtils.js";
import Section from "../../components/Section.jsx";
import Loading from "../../components/Loading.jsx";
import toast from "react-hot-toast";

export default function ContactView() {
    const { contactId } = useParams();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await api.get(`/contact/${contactId}`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setContact(response.data);
            } catch (err) {
                toast.error(err.response?.data?.message || "Error fetching contact details");
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [contactId]);

    if (loading) {
        return <Loading/>;
    }

    if (!contact) {
        return (
            <div className="text-center text-yellow-400 font-pixelify mt-12">
                <h1 className="text-5xl">Error</h1>
                <p className="text-2xl mt-4">Failed to load contact details.</p>
            </div>
        );
    }

    return (
        <div className="mx-4 mt-6 md:mx-6">
            <Section title={`Viewing Contact`}>
                <div className="space-y-4 text-yellow-400">
                    <div>
                        <h3 className="text-lg font-semibold">Name</h3>
                        <p className="text-yellow-200">{contact.name}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-yellow-200">{contact.email}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Message</h3>
                        <p className="text-yellow-200">{contact.message}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Created</h3>
                        <p className="text-yellow-200">{new Date(contact.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </Section>
        </div>
    );
}
