import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/apiUtils.js";
import Section from "../../components/Section.jsx";
import InputField from "../../components/InputField.jsx";
import TextareaInput from "../../components/TextareaInput.jsx";
import Button from "../../components/Button.jsx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loading from "../../components/Loading.jsx";

export default function CreateTicket() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

    const handleFormSubmit = async (data) => {
        setLoading(true);
        try {
            await api.post("/ticket/create", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            toast.success("Ticket created successfully!");
            navigate("/tickets");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error creating ticket");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading title="Creating Ticket..." />;
    }

    return (
        <div className="mx-4 mt-6 md:mx-6">
            <Section title="Create New Ticket">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="flex flex-col gap-4">
                        <InputField
                            label="Title"
                            id="title"
                            type="text"
                            required
                            register={register}
                            errors={errors}
                            name="title"
                            placeholder="Enter the ticket title"
                        />

                        <TextareaInput
                            label="Describe your situation"
                            id="postDetails"
                            required
                            register={register}
                            errors={errors}
                            name="postDetails"
                            placeholder="Enter detailed description of the ticket"
                        />

                        <InputField
                            label="Media URL"
                            id="mediaUrl"
                            type="url"
                            register={register}
                            errors={errors}
                            name="mediaUrl"
                            placeholder="Enter media URL (optional)"
                        />

                        <div className="text-center">
                            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl">
                                Create Ticket
                            </Button>
                        </div>
                    </div>
                </form>
            </Section>
        </div>
    );
}
