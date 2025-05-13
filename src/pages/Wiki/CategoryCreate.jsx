import { useNavigate } from "react-router-dom";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import Section from "../../components/Section.jsx";

export function CategoryCreate() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleCreate = async (data) => {
        try {
            await api.post("/wiki/category/create", data);
            toast.success("Wiki category created successfully");
            navigate("/wiki");
        } catch {
            toast.error("Failed to create category");
        }
    };

    return (
        <Section title="Create Category">
            <form onSubmit={handleSubmit(handleCreate)} className="space-y-6">
                <InputField label="Category Title" id="title" type="text" register={register} errors={errors} required />
                <InputField label="Category Description" id="description" type="text" register={register} errors={errors} />
                <Button type="submit" className="bg-yellow-400 text-2xl hover:bg-yellow-500">Create</Button>
            </form>
        </Section>
    );
}
