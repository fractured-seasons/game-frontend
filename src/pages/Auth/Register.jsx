import api from "../../utils/apiUtils.js";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {FaGithub, FaGoogle} from "react-icons/fa6";
import { passwordValidation, confirmPasswordValidation, emailValidation } from "../../utils/validationUtils.js";
import background from "../../assets/background.gif";

export default function Register() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const navigate = useNavigate();

    const handleRegister = async (data) => {
        try {
            await api.post("/auth/public/signup", data);
            toast.success("Registration Successful");
            reset();
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div className="min-w-screen min-h-screen bg-green-500 flex justify-center items-center p-4"
                 style={{
                     backgroundImage: `url(${background})`,
                 }}
            >
                <div className="relative w-full max-w-md md:w-2/5 lg:w-1/4 h-fit p-8 sm:p-12 rounded-3xl shadow">
                    <div className="backdrop-blur absolute inset-0 bg-white/25 rounded-3xl" />
                    <div className="relative z-10">
                        <h1 className="font-pixelify font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 text-center">
                            Register
                        </h1>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <InputField
                                label="Username"
                                required
                                id="username"
                                type="text"
                                message="Username cannot be empty"
                                placeholder="Insert your username"
                                register={register}
                                errors={errors}
                                min={8}
                            />
                            <InputField
                                label="Email"
                                required
                                id="email"
                                type="email"
                                message="Email cannot be empty"
                                placeholder="Insert your email"
                                register={register}
                                errors={errors}
                                className="mt-4"
                                validate={emailValidation}
                            />
                            <InputField
                                label="Password"
                                required
                                id="password"
                                type="password"
                                message="Password cannot be empty"
                                placeholder="Type your password"
                                register={register}
                                errors={errors}
                                className="mt-4"
                                min={8}
                                validate={passwordValidation}
                            />
                            <InputField
                                label="Confirm Password"
                                required
                                id="confirmPassword"
                                type="password"
                                message="Password confirmation cannot be empty"
                                placeholder="Confirm your password"
                                watch={watch}
                                register={register}
                                errors={errors}
                                className="mt-4"
                                validate={(value) => confirmPasswordValidation(value, watch)}
                            />
                            <Button
                                type="submit"
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                Sign up
                            </Button>
                            <div className="flex flex-col justify-center items-center w-full my-4">
                                <span className="font-pixelify text-md sm:text-lg mb-4">Or Continue With</span>
                                <div className="flex">
                                    <Link to={"/google"} className="py-2 px-8 sm:px-14 rounded-3xl bg-white hover:bg-gray-300 flex justify-center">
                                        <FaGoogle/>
                                    </Link>
                                    <Link to={"/github"} className="ml-4 py-2 px-8 sm:px-14 rounded-3xl bg-white hover:bg-gray-300 flex justify-center">
                                        <FaGithub/>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col items-center mt-4">
                                <span className="font-pixelify text-md sm:text-lg">Already have an account?</span>
                                <Link to={"/login"} className="font-pixelify text-md sm:text-lg text-orange-600 hover:text-orange-700">
                                    Log in here
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
