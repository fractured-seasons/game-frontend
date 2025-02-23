import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextareaInput from "../../components/TextareaInput.jsx";
import Button from "../../components/Button.jsx";
import api from "../../utils/apiUtils";
import toast from "react-hot-toast";
import CheckboxInput from "../../components/CheckboxInput.jsx";

export default function ReplyEdit({ reply, onSave, onCancel, topicId, isAdmin }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        setValue("content", reply.content);
        setValue("hidden", reply.hidden);
    }, [reply, setValue]);

    const handleUpdate = async (data) => {
        try {
            const hiddenReply = !!data.hidden
            const updatedReply = await api.put(`/forum/reply/${reply.id}`,
                { content: data.content, hidden: hiddenReply, topicId: topicId },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
            onSave(updatedReply.data);
            toast.success("Reply updated successfully!");
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to update reply");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
            <TextareaInput
                label="Edit Reply"
                id="content"
                register={register}
                errors={errors}
                required
            />
            { isAdmin && (
                <CheckboxInput
                    label="Hide Reply"
                    id="hidden"
                    name="hidden"
                    options={[{ value: "hidden", label: "Hidden" }]}
                    required={false}
                    register={register}
                    errors={errors}
                />
            )}
            <div className="flex justify-end space-x-4">
                <Button type="submit" className="bg-yellow-400 text-md sm:text-xl hover:bg-yellow-500">
                    Save
                </Button>
                <Button type="button" onClick={onCancel} className="bg-red-400 text-md sm:text-xl hover:bg-red-500">
                    Cancel
                </Button>
            </div>
        </form>
    );
};
