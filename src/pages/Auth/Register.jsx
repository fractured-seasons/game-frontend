import api from "../../utils/apiUtils.js";
import {useForm} from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {FaGithub, FaGoogle} from "react-icons/fa6";
import {
    passwordValidation,
    confirmPasswordValidation,
    emailValidation,
    usernameValidation
} from "../../utils/validationUtils.js";
import AuthWrapper from "../../components/AuthWrapper.jsx";


export default function Register() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors},
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
        <AuthWrapper title={"Register"}>
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
                    validate={usernameValidation}
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
                    className="bg-yellow-500 hover:bg-yellow-600"
                >
                    Sign up
                </Button>
                <div className="flex flex-col justify-center items-center w-full my-4">
                    <span className="font-pixelify text-md sm:text-lg mb-4">Or Continue With</span>
                    <div className="flex">
                        <Link to={`${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/google`}
                              className="py-2 px-8 sm:px-14 rounded-3xl bg-yellow-500 hover:bg-yellow-600 flex justify-center">
                            <FaGoogle/>
                        </Link>
                        <Link to={`${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/github`}
                              className="ml-4 py-2 px-8 sm:px-14 rounded-3xl bg-yellow-500 hover:bg-yellow-600 flex justify-center">
                            <FaGithub/>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <span className="font-pixelify text-md sm:text-lg">Already have an account?</span>
                    <Link to={"/login"}
                          className="font-pixelify text-md sm:text-lg text-yellow-500 hover:text-yellow-600">
                        Log in here
                    </Link>
                </div>
            </form>
        </AuthWrapper>
    );
}
