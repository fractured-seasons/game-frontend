import { useNavigate } from "react-router-dom";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import Section from "../../components/Section.jsx";

export function SectionCreate() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleCreate = async (data) => {
        try {
            await api.post("/forum/section/create", data);
            toast.success("Section created successfully");
            navigate("/forum");
        } catch {
            toast.error("Failed to create section");
        }
    };

    return (
        <Section title="Create Section">
            <form onSubmit={handleSubmit(handleCreate)} className="space-y-6">
                <InputField label="Section Name" id="name" type="text" register={register} errors={errors} required />
                <Button type="submit" className="bg-yellow-400 text-2xl hover:bg-yellow-500">Create</Button>
            </form>
        </Section>
    );
}
