import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import SelectInput from "../../components/SelectInput.jsx";
import Button from "../../components/Button.jsx";
import Section from "../../components/Section.jsx";
import CustomQuill from "../../components/CustomQuill.jsx";

export function ArticleCreate() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const quillRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/wiki/category");
                setCategories(response.data);
            } catch {
                toast.error("Failed to fetch categories");
            }
        };
        fetchCategories();
    }, []);

    const extractImagesFromContent = (content) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const images = Array.from(doc.querySelectorAll("img"));
        return images.map((img) => img.src);
    };

    const uploadImage = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "image.png", { type: blob.type });

            const formData = new FormData();
            formData.append("file", file);

            const uploadResponse = await api.post("/uploads/image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return uploadResponse.data.url;
        } catch (error) {
            console.error("Image upload failed", error);
            toast.error("Failed to upload image");
            return null;
        }
    };

    const handleCreate = async (data) => {
        const content = getValues("content");
        const imageUrls = extractImagesFromContent(content);

        let updatedContent = content;
        for (const imageUrl of imageUrls) {
                const uploadedUrl = await uploadImage(imageUrl);
                if (uploadedUrl) {
                    updatedContent = updatedContent.replace(imageUrl, uploadedUrl);
                }

        }

        setValue("content", updatedContent);

        try {
            await api.post("/wiki/article/create", {
                title: data.title,
                content: updatedContent,
                categoryId: data.categoryId,
            });
            toast.success("Article submitted for review");
            navigate("/wiki")
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create article");
        }
    };

    return (
        <Section title="Create Wiki Article">
            <form onSubmit={handleSubmit(handleCreate)} className="space-y-6">
                <InputField label="Article Title" id="title" type="text" register={register} errors={errors} required />

                <div>
                    <label className="block font-pixelify text-lg sm:text-xl text-yellow-400">Content</label>
                    <CustomQuill
                        ref={quillRef}
                        value={getValues("content") || ""}
                        onChange={(content) => setValue("content", content)}
                    />
                    {errors.content && <p className="text-red-500 text-sm">Content is required</p>}
                </div>

                <SelectInput
                    label="Select Category"
                    id="categoryId"
                    options={categories.map(category => ({ value: category.id, label: category.title }))}
                    register={register}
                    errors={errors}
                    required
                />

                <Button type="submit" className="bg-yellow-400 text-2xl hover:bg-yellow-500">Submit for Review</Button>
            </form>
        </Section>
    );
}