import {useState} from "react";
import {useForm} from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import toast from "react-hot-toast";
import api from "../../utils/apiUtils.js";
import AuthWrapper from "../../components/AuthWrapper.jsx";

export default function ForgotPassword() {
    const [resetRequested, setResetRequested] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
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
        <AuthWrapper title={"Forgot password"}>
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
                        className="bg-yellow-500 hover:bg-yellow-600 mt-4"
                    >
                        Retry
                    </Button>
                </div>
            )}
        </AuthWrapper>
    );
}
