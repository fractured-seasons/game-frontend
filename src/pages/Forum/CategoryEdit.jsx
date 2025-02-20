import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import SelectInput from "../../components/SelectInput.jsx";
import Button from "../../components/Button.jsx";
import Section from "../../components/Section.jsx";

export function CategoryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({ name: "", description: "", sectionId: "" });
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await api.get(`/forum/category/${id}`);
                setCategory(response.data);
                setValue("name", response.data.name);
                setValue("description", response.data.description);
                setValue("sectionId", response.data.sectionId);
            } catch  {
                toast.error("Failed to fetch category");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [id, navigate, setValue]);


    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await api.get("/forum/section");
                setSections(response.data);
            } catch {
                toast.error("Failed to fetch sections");
            }
        };
        fetchSections();
    }, []);

    const handleUpdate = async (data) => {
        try {
            console.log(data)
            await api.put(`/forum/category/${id}`, data);
            toast.success("Category updated successfully");
            window.location.reload();
        } catch  {
            toast.error("Failed to update category");
        }
    };

    if (loading) return <Loading title="Loading Category..." />;

    return (
        <Section title="Edit Category">
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
                <InputField
                    label="Category Name"
                    id="name"
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
                    required
                />
                <SelectInput
                    label="Select Section"
                    id="sectionId"
                    options={sections.map(section => ({
                        value: section.id,
                        label: section.name,
                    }))}
                    register={register}
                    errors={errors}
                    required
                />
                <Button type="submit" className="bg-yellow-400 text-2xl hover:bg-yellow-500">Save</Button>
            </form>
        </Section>
    );
}
