import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/apiUtils.js";
import Section from "../../components/Section.jsx";
import InputField from "../../components/InputField.jsx";
import SelectInput from "../../components/SelectInput.jsx";
import RadioInput from "../../components/RadioInput.jsx";
import Button from "../../components/Button.jsx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
    emailValidation,
    usernameValidation,
} from "../../utils/validationUtils.js";
import Loading from "../../components/Loading.jsx";

export default function EditUser() {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        role: [],
        enabled: true,
    });
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            role: "",
            enabled: true,
        },
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get(`/admin/user/${id}`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setUserDetails(response.data);
                setLoading(false);
                setValue("username", response.data.userName);
                setValue("email", response.data.email);
                setValue("role", response.data.role.roleName);
                setValue("enabled", response.data.enabled);
            } catch (err) {
                toast.error(err.response?.data?.message || "Error fetching user details");
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id, setValue]);

    const handleFormSubmit = async (data) => {
        console.log(data)
        try {
            await api.put(`/admin/edit-user/${id}`, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            toast.success("User updated successfully!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error updating user");
        }
    };

    if (loading) {
        return <Loading title={"Loading..."}/>;
    }

    const roleOptions = [
        { label: "Admin", value: "ROLE_ADMIN" },
        { label: "Moderator", value: "ROLE_MODERATOR" },
        { label: "Support", value: "ROLE_SUPPORT" },
        { label: "Wiki Contributor", value: "ROLE_WIKI_CONTRIBUTOR" },
        { label: "User", value: "ROLE_USER" }
    ];

    const enabledOptions = [
        { label: "Enabled", value: true },
        { label: "Disabled", value: false },
    ];

    return (
        <div className="mx-4 mt-6 md:mx-6">
            <Section title="Edit User">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="flex flex-col gap-4">
                        <InputField
                            label="Username"
                            id="username"
                            type="text"
                            required
                            register={register}
                            errors={errors}
                            name="username"
                            placeholder="Enter the username"
                            validate={usernameValidation}
                        />

                        <InputField
                            label="Email"
                            id="email"
                            type="email"
                            required
                            register={register}
                            errors={errors}
                            name="email"
                            placeholder="Enter the email"
                            validate={emailValidation}
                        />

                        <SelectInput
                            label="Role"
                            id="role"
                            options={roleOptions}
                            required
                            register={register}
                            errors={errors}
                            name="role"
                        />

                        <RadioInput
                            label="Account Enabled"
                            id="enabled"
                            options={enabledOptions}
                            required
                            register={register}
                            errors={errors}
                            name="enabled"
                        />

                        <div className="text-center">
                            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </form>
            </Section>
        </div>
    );
}
