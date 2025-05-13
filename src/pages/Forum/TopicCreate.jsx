import {useEffect, useRef, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import Section from "../../components/Section.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import CheckboxInput from "../../components/CheckboxInput.jsx";
import CustomQuill from "../../components/CustomQuill.jsx";

export function TopicCreate() {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const { role } = useAuth();
    const isAdmin = ["ROLE_ADMIN", "ROLE_MODERATOR"].includes(role);
    const quillRef = useRef(null);
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await api.get(`/forum/category/${categoryId}`);
                setCategory(response.data);
            } catch {
                toast.error("Failed to fetch category");
            }
        };
        fetchCategory();
    }, [categoryId]);

    const handleCreate = async (data) => {
        const topicOptions = data.topicOptions || [];

        const formattedData = {
            title: data.title,
            content: getValues("content"),
            categoryId: categoryId,
            pinned: topicOptions.includes("pinned"),
            locked: topicOptions.includes("locked"),
            hidden: topicOptions.includes("hidden"),
        };

        try {
            await api.post("/forum/topic/create", formattedData);
            toast.success("Topic created successfully");
            navigate(`/forum/topics/${categoryId}`);
        } catch {
            toast.error("Failed to create topic");
        }
    };


    return (
        <Section title={`Create Topic in ${category ? category.name : "Loading..."}`}>
            <form onSubmit={handleSubmit(handleCreate)} className="space-y-6">
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
                <Button type="submit" className="bg-yellow-400 text-2xl hover:bg-yellow-500">Create</Button>
            </form>
        </Section>
    );
}
