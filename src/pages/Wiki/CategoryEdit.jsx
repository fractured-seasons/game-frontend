import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import Section from "../../components/Section.jsx";
import Loading from "../../components/Loading";

export function CategoryEdit() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await api.get(`/wiki/category/${categoryId}`);
                setValue("title", response.data.title);
                setValue("description", response.data.description);
            } catch {
                toast.error("Failed to fetch category");
                navigate("/wiki");
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [categoryId, navigate, setValue]);

    const handleUpdate = async (data) => {
        try {
            await api.put(`/wiki/category/${categoryId}`, data);
            toast.success("Category updated successfully");
            navigate("/wiki");
        } catch {
            toast.error("Failed to update category");
        }
    };

    if (loading) return <Loading title="Loading Category..." />;

    return (
        <Section title="Edit Category">
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
                <InputField
                    label="Category Title"
                    id="title"
                    type="text"
                    register={register}
                    errors={errors}
                    required
                />
                <InputField
                    label="Category Description"
                    id="description"
                    type="text"
                    register={register}
                    errors={errors}
                />
                <Button type="submit" className="bg-yellow-400 text-2xl hover:bg-yellow-500">Save</Button>
            </form>
        </Section>
    );
}