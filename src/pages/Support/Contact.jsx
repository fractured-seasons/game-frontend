import { useForm } from "react-hook-form";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import toast from "react-hot-toast";
import Section from "../../components/Section.jsx";
import api from "../../utils/apiUtils.js";
import {emailValidation} from "../../utils/validationUtils.js";

export default function Contact() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const handleContactSubmit = async (data) => {
        try {
            const response = await api.post("/contact", data);

            toast.success("Message sent successfully!");
            reset();
        } catch (error) {
            toast.error("Failed to send the message.");
            console.error(error);
        }
    };

    return (
        <Section title={"Contact"}>
            <div className="flex flex-col md:flex-row gap-8 md:justify-center md:items-center">
                <div className="flex-1 flex justify-center items-center">
                    <p className="text-2xl text-center">
                        We are always eager to hear from our players and fans! If you have any questions, suggestions, or simply want to share your experience with our game, don't hesitate to reach out. Our team is dedicated to improving the game and making your experience the best it can be.
                    </p>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <form onSubmit={handleSubmit(handleContactSubmit)} className="w-full max-w-md">
                        <InputField label="Name" id="name" required register={register} errors={errors} />
                        <InputField label="Email" id="email" type="email" required register={register} errors={errors} validate={emailValidation} className="mt-4" />
                        <InputField label="Message" id="message" type="textarea" required register={register} errors={errors} className="mt-4" />
                        <Button type="submit" className="bg-orange-600 hover:bg-orange-700 mt-4">Send</Button>
                    </form>
                </div>
            </div>
        </Section>
    );
}
