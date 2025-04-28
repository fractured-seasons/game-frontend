import {useEffect, useRef, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import CheckboxInput from "../../components/CheckboxInput.jsx";
import Button from "../../components/Button.jsx";
import Section from "../../components/Section.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import CustomQuill from "../../components/CustomQuill.jsx";

export function TopicEdit() {
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);
    const navigate = useNavigate();
    const { role } = useAuth();
    const isAdmin = ["ROLE_ADMIN", "ROLE_MODERATOR"].includes(role);
    const quillRef = useRef(null);
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await api.get(`/forum/topic/${topicId}`);
                const topicData = response.data;
                setTopic(response.data)

                setValue("title", topicData.title);
                setValue("content", topicData.content);

                const options = [];
                if (topicData.pinned) options.push("pinned");
                if (topicData.locked) options.push("locked");
                if (topicData.hidden) options.push("hidden");
                setValue("topicOptions", options);

                setLoading(false);
            } catch {
                toast.error("Failed to load topic data");
                navigate("/forum");
            }
        };
        fetchTopic();
    }, [topicId, setValue, navigate]);

    const handleUpdate = async (data) => {
        const topicOptions = data.topicOptions || [];

        const formattedData = {
            title: data.title,
            content: getValues("content"),
            categoryId: topic.categoryId,
            pinned: topicOptions.includes("pinned"),
            locked: topicOptions.includes("locked"),
            hidden: topicOptions.includes("hidden"),
        };

        try {
            await api.put(`/forum/topic/${topicId}`, formattedData);
            toast.success("Topic updated successfully");
            navigate(`/forum/topic/${topicId}`);
        } catch {
            toast.error("Failed to update topic");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <Section title="Edit Topic">
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
                <InputField label="Topic Title" id="title" type="text" register={register} errors={errors} required />
                <div>
                    <label className="block font-pixelify text-lg sm:text-xl text-yellow-400">Content</label>
                    <CustomQuill
                        ref={quillRef}
                        value={getValues("content") || ""}
                        allowImage={false}
                        onChange={(content) => setValue("content", content)}
                    />
                    {errors.content && <p className="text-red-500 text-sm">Content is required</p>}
                </div>
                {isAdmin && (
                    <CheckboxInput
                        label="Options"
                        id="topicOptions"
                        name="topicOptions"
                        options={[
                            { value: "pinned", label: "Pinned" },
                            { value: "locked", label: "Locked" },
                            { value: "hidden", label: "Hidden" }
                        ]}
                        register={register}
                        errors={errors}
                    />
                )}
                <Button type="submit" className="bg-yellow-400 text-2xl hover:bg-yellow-500">Update</Button>
            </form>
        </Section>
    );
}
