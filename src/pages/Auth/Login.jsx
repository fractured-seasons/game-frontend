import api from "../../utils/apiUtils.js";
import {useForm} from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import {FaGoogle, FaGithub} from "react-icons/fa6";
import toast from "react-hot-toast";
import {useAuth} from "../../context/AuthContext.jsx";
import AuthWrapper from "../../components/AuthWrapper.jsx";

export default function Login() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onChange",
    });

    const {setCurrentUser, setIsAdmin} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        try {
            const response = await api.post("/auth/public/signin", data);

            setCurrentUser(response.data);
            setIsAdmin(response.data.roles?.includes("ROLE_ADMIN") || false);

            toast.success("Login Successful");
            reset();
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }

    };

    return (
        <AuthWrapper title="Login">
            <form onSubmit={handleSubmit(handleLogin)}>
                <InputField
                    label="Username"
                    required
                    id="username"
                    type="text"
                    message="Username cannot be empty"
                    placeholder="Insert your username"
                    register={register}
                    errors={errors}
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
                />
                <div className="flex justify-end w-full mt-4">
                    <Link to={"/forgot-password"}
                          className="font-pixelify text-lg sm:text-xl text-yellow-400 hover:text-yellow-500">
                        Forgot Password?
                    </Link>
                </div>
                <Button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600"
                >
                    Sign in
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
                    <span className="font-pixelify text-md sm:text-lg">Don't have an account yet?</span>
                    <Link to={"/register"}
                          className="font-pixelify text-md sm:text-lg text-yellow-400 hover:text-yellow-500">
                        Register for free
                    </Link>
                </div>
            </form>
        </AuthWrapper>
    );
}