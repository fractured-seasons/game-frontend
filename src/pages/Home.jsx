import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import Carousel from "../components/Carousel.jsx";
import Section from "../components/Section.jsx";
import logo from "../assets/images/logo2.png";
import img1 from "../assets/images/background.jpeg";
import img2 from "../assets/images/logo.png";
import img3 from "../assets/images/logo2.png";

export default function Home() {
    const { currentUser, loading, logout } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <Loading title={"Loading..."} />;
    }

    const imagesPath = [img1, img2, img3];

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/path/to/downloadable/file.pdf";
        link.download = "filename.pdf";
        link.click();
    };

    return (
        <div className="mx-4 sm:mx-12 lg:mx-24 mt-8 sm:mt-10 lg:mt-12 flex flex-col gap-8">
            <Section title="Welcome to Fractured Seasons">
                <div className="flex flex-col items-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 h-auto"
                    />
                    <p className="text-yellow-200 text-lg sm:text-xl lg:text-2xl mt-4 text-center">
                        Experience a delightful 2D farming adventure,
                        complete with vibrant characters, charming villages, and ever-changing seasons.
                    </p>
                </div>
            </Section>

            <Section title="Explore the World">
                <Carousel images={imagesPath} />
                <p className="text-yellow-200 text-lg sm:text-xl lg:text-2xl mt-4 text-center">
                    Plant crops, tend to animals, and uncover hidden secrets in every corner of this lush world.
                    Each season brings new challenges and festivals to discover.
                </p>
            </Section>

            <Section title="Download & Play">
                <div className="flex flex-col items-center">
                    <p className="text-yellow-200 text-lg sm:text-xl lg:text-2xl mt-2 text-center">
                        Ready to start your journey? Click the button below to download the game!
                    </p>
                    <button
                        onClick={handleDownload}
                        className="py-2 px-6 mt-6 rounded-3xl backdrop-blur bg-yellow-500/25 outline outline-1 outline-yellow-500 text-yellow-400 font-pixelify hover:bg-yellow-500/40 transition-colors"
                    >
                        Download Now
                    </button>
                </div>
            </Section>
        </div>
    );
}
