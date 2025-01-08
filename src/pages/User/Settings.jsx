import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/apiUtils.js";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import Section from "../../components/Section.jsx";
import {
    passwordValidation,
    emailValidation,
    usernameValidation,
} from "../../utils/validationUtils.js";
import toast from "react-hot-toast";
import {useAuth} from "../../context/AuthContext.jsx";
import Loading from "../../components/Loading.jsx";

export default function Settings() {
    const [settings, setSettings] = useState(null);
    const [accountStatus, setAccountStatus] = useState(null);
    const { logout } = useAuth();
    const {
        register: registerAccount,
        handleSubmit: handleAccountSubmit,
        setValue: setAccountValue,
        formState: { errors: accountErrors },
    } = useForm({
        defaultValues: {
            email: "",
            username: "",
        },
    });

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        watch,
    } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get("/auth/user", {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setSettings(response.data);
                setAccountValue("email", response.data.email);
                setAccountValue("username", response.data.username);
                setAccountStatus(response.data.enabled)
            } catch (err) {
                toast.error("Failed to fetch user data")
            }
        };

        fetchSettings();
    }, [setAccountValue]);

    const updateEmailAndUsername = async (email, username) => {
        try {
            if (email) {
                await api.post(
                    `/auth/user/update`,
                    { email },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                setSettings((prev) => ({ ...prev, email }));
                toast.success("Email updated successfully!");

                await api.post(
                    `/auth/public/refresh-token/email`,
                    {},
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
            }

            if (username) {
                await api.post(
                    `/auth/user/update`,
                    { username },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                setSettings((prev) => ({ ...prev, username }));
                toast.success("Username updated successfully!");

                await api.post(
                    `/auth/public/refresh-token/username`,
                    {},
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
            }

            window.location.reload();
        } catch (err) {
            toast.error("Failed to update email or username.");
        }
    };



    const handleAccountFormSubmit = async (data) => {
        await updateEmailAndUsername(data.email, data.username);
    };

    const handlePasswordFormSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await api.post(
                "/auth/user/change-password",
                {
                    newPassword: data.password,
                    confirmNewPassword: data.confirmPassword,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            toast.success("Password updated successfully!");
        } catch (err) {
            toast.error("Failed to update password");
        }
    };

    const handleDeactivateAccount = async () => {
        try {
            await api.post("/auth/user/deactivate", {}, { withCredentials: true });
            toast.success("Account deactivated successfully!");
            window.location.reload();
        } catch (err) {
            toast.error("Failed to deactivate account.");
        }
    };

    const handleActivateAccount = async () => {
        try {
            await api.post("/auth/user/activate", {}, { withCredentials: true });
            toast.success("Account activated successfully!");
            window.location.reload();
        } catch (err) {
            toast.error("Failed to activate account.");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await api.post("/auth/user/delete", {}, { withCredentials: true });
            toast.success("Account deleted successfully!");
            logout();
        } catch (err) {
            toast.error("Failed to delete account.");
        }
    };


    if (!settings) {
        return <Loading title={"Loading..."}/>;
    }

    return (
        <div className="mx-6 mt-6">
            <Section title="Account Settings">
                <form onSubmit={handleAccountSubmit(handleAccountFormSubmit)}>
                    <div className="flex flex-col gap-8">
                        <InputField
                            label="Email"
                            id="email"
                            type="email"
                            required
                            register={registerAccount}
                            errors={accountErrors}
                            validate={emailValidation}
                            placeholder="Enter your email"
                        />
                        <InputField
                            label="Username"
                            id="username"
                            type="text"
                            required
                            register={registerAccount}
                            errors={accountErrors}
                            validate={usernameValidation}
                            placeholder="Enter your username"
                            className="mt-4"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700 mt-4"
                    >
                        Update Account
                    </Button>
                </form>
            </Section>

            <Section title="Change Password">
                <form onSubmit={handlePasswordSubmit(handlePasswordFormSubmit)}>
                    <div className="flex flex-col gap-8">
                        <InputField
                            label="New Password"
                            id="password"
                            type="password"
                            required
                            register={registerPassword}
                            errors={passwordErrors}
                            validate={passwordValidation}
                            placeholder="Enter new password"
                        />
                        <InputField
                            label="Confirm Password"
                            id="confirmPassword"
                            type="password"
                            required
                            register={registerPassword}
                            errors={passwordErrors}
                            validate={(value) =>
                                value === watch("password") || "Passwords do not match"
                            }
                            placeholder="Confirm new password"
                            className="mt-4"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700 mt-4"
                    >
                        Change Password
                    </Button>
                </form>
            </Section>

            <Section title="Danger Zone">
                <div className="flex flex-col items-center gap-4">
                    {
                        accountStatus ? <button
                            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
                            onClick={() => handleDeactivateAccount()}
                        >
                            Deactivate Account
                        </button>
                            : <button
                                className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                                onClick={() => handleActivateAccount()}
                            >
                                Activate Account
                            </button>
                    }

                    <button
                        className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
                        onClick={() => handleDeleteAccount()}
                    >
                        Delete Account
                    </button>
                </div>
            </Section>
        </div>
    );
}
