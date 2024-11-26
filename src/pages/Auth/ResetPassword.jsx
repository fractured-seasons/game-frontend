import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import toast from "react-hot-toast";
import api from "../../utils/apiUtils.js";
import { useLocation, useNavigate } from "react-router-dom";
import { passwordValidation, confirmPasswordValidation } from "../../utils/validationUtils.js";
import background from "../../assets/background.gif";

export default function ResetPassword() {
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [token, setToken] = useState(null);
    const { search } = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(search);
        const tokenFromUrl = queryParams.get("token");
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setIsTokenValid(false);
        }
    }, [search]);

    const handleResetPassword = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await api.post("/auth/public/reset-password", {
                token,
                newPassword: data.password,
                confirmNewPassword: data.confirmPassword
            });

            toast.success("Password reset successfully.");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error resetting password");
        }
    };

    return (
        <div className="min-w-screen min-h-screen bg-green-500 flex justify-center items-center p-4"
             style={{
                 backgroundImage: `url(${background})`,
             }}
        >
            <div className="relative w-full max-w-md md:w-2/5 lg:w-1/4 h-fit p-8 sm:p-12 rounded-3xl shadow">
                <div className="backdrop-blur absolute inset-0 bg-white/25 rounded-3xl" />
                <div className="relative z-10">
                    <h1 className="font-pixelify font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 text-center">
                        Reset Your Password
                    </h1>
                    {isTokenValid ? (
                        <form onSubmit={handleSubmit(handleResetPassword)}>
                            <InputField
                                label="New Password"
                                required
                                id="password"
                                type="password"
                                message="Password is required"
                                placeholder="Enter your new password"
                                register={register}
                                errors={errors}
                                validate={passwordValidation}
                            />
                            <InputField
                                label="Confirm Password"
                                required
                                id="confirmPassword"
                                type="password"
                                message="Please confirm your password"
                                placeholder="Confirm your new password"
                                register={register}
                                errors={errors}
                                watch={watch}
                                validate={(value) => confirmPasswordValidation(value, watch)}
                                className={"mt-4"}
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
                                Invalid or expired token. Please try again.
                            </p>
                            <Button
                                onClick={() => navigate("/forgot-password")}
                                className="bg-orange-600 hover:bg-orange-700 mt-4"
                            >
                                Go to Forgot Password
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
