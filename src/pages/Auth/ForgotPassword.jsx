import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import toast from "react-hot-toast";
import api from "../../utils/apiUtils.js";

export default function ForgotPassword() {
    const [resetRequested, setResetRequested] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    });

    const handleResetPassword = async (data) => {
        try {
            await api.post("/auth/public/forgot-password", data);
            toast.success("Reset link sent to your email.");
            setResetRequested(true);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const handleRetry = () => {
        reset();
        setResetRequested(false);
    };

    return (
        <>
            <div className="min-w-screen min-h-screen flex justify-center items-center p-4">
                <div className="relative w-full max-w-md md:w-2/5 lg:w-1/4 h-fit p-8 sm:p-12 rounded-3xl shadow">
                    <div className="backdrop-blur absolute inset-0 bg-white/25 rounded-3xl" />
                    <div className="relative z-10">
                        <h1 className="font-pixelify font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 text-center">
                            Forgot Password
                        </h1>
                        {!resetRequested ? (
                            <form onSubmit={handleSubmit(handleResetPassword)}>
                                <InputField
                                    label="Email"
                                    required
                                    id="email"
                                    type="email"
                                    message="Email is required"
                                    placeholder="Enter your email"
                                    register={register}
                                    errors={errors}
                                />
                                <Button
                                    type="submit"
                                    className="bg-orange-600 hover:bg-orange-700 mt-4"
                                >
                                    Reset Password
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center mt-6">
                                <p className="font-pixelify text-lg text-white">
                                    You will receive an email with the instructions for resetting your password.
                                </p>
                                <Button
                                    onClick={handleRetry}
                                    className="bg-orange-600 hover:bg-orange-700 mt-4"
                                >
                                    Retry
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
