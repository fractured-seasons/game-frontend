import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import SelectInput from "../../components/SelectInput.jsx";
import Button from "../../components/Button.jsx";
import Section from "../../components/Section.jsx";

export function CategoryCreate() {
    const navigate = useNavigate();
    const [sections, setSections] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

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

    const handleCreate = async (data) => {
        try {
            await api.post("/forum/category/create", data);
            toast.success("Category created successfully");
            navigate("/forum");
        } catch {
            toast.error("Failed to create category");
        }
    };

    return (
        <Section title="Create Category">
            <form onSubmit={handleSubmit(handleCreate)} className="space-y-6">
                <InputField label="Category Name" id="name" type="text" register={register} errors={errors} required />
                <InputField label="Category Description" id="description" type="text" register={register} errors={errors} required />
                <SelectInput label="Select Section" id="sectionId" options={sections.map(section => ({ value: section.id, label: section.name }))} register={register} errors={errors} required />
                <Button type="submit" className="bg-yellow-400 text-2xl hover:bg-yellow-500">Create</Button>
            </form>
        </Section>
    );
}