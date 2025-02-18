import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import Section from "../../components/Section.jsx";
import InputField from "../../components/InputField.jsx";
import { useForm } from "react-hook-form";
import Button from "../../components/Button.jsx";

export function SectionEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: name,
        }
    });

    useEffect(() => {
        const fetchSection = async () => {
            try {
                const response = await api.get(`/forum/section/${id}`);
                setName(response.data.name);
                setValue("name", response.data.name);
            } catch {
                toast.error("Failed to fetch section");
                navigate("/forum");
            } finally {
                setLoading(false);
            }
        };
        fetchSection();
    }, [id, navigate, setValue]);

    const handleUpdate = async (data) => {
        try {
            await api.put(`/forum/section/${id}`, { "name": data.name });
            toast.success("Section updated successfully");
            window.location.reload();
        } catch {
            toast.error("Failed to update section");
        }
    };

    if (loading) return <Loading title="Loading Section..." />;

    return (
        <Section title={"Edit Section"} defaultFont>
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
                <InputField
                    label="Section Name"
                    id="name"
                    type="text"
                    register={register}
                    errors={errors}
                    required
                />
                <Button type="submit" className="bg-yellow-400 text-2xl hover:bg-yellow-500">Save</Button>
            </form>
        </Section>
    );
}
