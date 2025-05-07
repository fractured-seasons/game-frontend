import React from "react";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading.jsx";
import Carousel from "../components/Carousel.jsx";
import Section from "../components/Section.jsx";
import logo from "../assets/images/logo.png";
import img1 from "../assets/images/game1.png";
import img2 from "../assets/images/game2.png";
import img3 from "../assets/images/game3.png";
import img4 from "../assets/images/game4.png";
import background3 from "../assets/images/background3.gif";

export default function Home() {
    const { loading } = useAuth();

    if (loading) return <Loading title="Loading..." />;

    const screenshots = [img1, img2, img3, img4];

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/path/to/downloadable/file.pdf";
        link.download = "FracturedSeasons.pdf";
        link.click();
    };

    return (
        <>
            <section
                className="bg-cover bg-center flex flex-col items-center text-center gap-6 text-yellow-200 py-10 lg:mt-6 sm:mt-4 mx-6 rounded-3xl"
                style={{backgroundImage: `url(${background3})`}}
            >
                <img src={logo} alt="Fractured Seasons Logo" className="w-2/3 sm:w-1/2 lg:w-1/3"/>
            </section>

            <main className="w-full px-6 sm:px-12 lg:px-24 py-10 flex flex-col gap-20 text-yellow-200">
                <h1 className="font-pixelify text-4xl sm:text-5xl lg:text-6xl text-yellow-400 text-center">A New Kind of Farm Life</h1>
                <p className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-center">
                    Welcome to <strong>Fractured Seasons</strong>, a cozy pixel farming sim where the seasons shape your
                    story.
                    Grow crops, forge friendships, and uncover a world full of charm and mystery.
                </p>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {[
                        {
                            title: "🌱 Grow & Harvest",
                            desc: "Plant a variety of crops, raise animals, and build your dream farm."
                        },
                        {
                            title: "🎭 Connect & Celebrate",
                            desc: "Meet quirky villagers, build relationships, and attend seasonal festivals."
                        },
                        {
                            title: "🧭 Discover Secrets",
                            desc: "Explore the world, unlock hidden stories, and witness the changing seasons."
                        }
                    ].map((feature, idx) => (
                        <div key={idx}
                             className="rounded-3xl backdrop-blur bg-yellow-500/25 outline outline-1 outline-yellow-500 p-6 hover:bg-yellow-500/20 transition-all">
                                <h2 className="font-pixelify text-2xl text-yellow-400 mb-2">{feature.title}</h2>
                                <p className="text-lg">{feature.desc}</p>
                            </div>
                        ))}
                    </section>

                    <Section title="A Glimpse Into the World">
                        <Carousel images={screenshots} />
                        <p className="text-center text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mt-6">
                            From cozy winter nights to blooming spring mornings, every season in Fractured Seasons
                            brings new challenges, beauty, and memories to create.
                        </p>
                    </Section>

                <Section title="Find Your Playstyle">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {[
                            {
                                seed: "explorer",
                                name: "Explorer",
                                desc: "Chase secrets and story quests."
                            },
                            {
                                seed: "farmer",
                                name: "Farmer",
                                desc: "Optimize your homestead to perfection."
                            },
                            {
                                seed: "trader",
                                name: "Trader",
                                desc: "Master the market with seasonal pricing."
                            }
                        ].map(({ seed, name, desc }) => (
                            <div
                                key={seed}
                                className="p-6 bg-yellow-500/25 rounded-3xl backdrop-blur text-center"
                            >
                                <img
                                    src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`}
                                    alt={name}
                                    className="w-32 h-32 mx-auto mb-4"
                                />
                                <h3 className="font-pixelify text-2xl mb-1">{name}</h3>
                                <p>{desc}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                <section className="flex flex-col items-center text-center gap-4">
                        <h2 className="font-pixelify text-3xl sm:text-4xl text-yellow-400">Download & Play</h2>
                        <p className="text-lg sm:text-xl max-w-xl">
                            Ready to begin your journey? Download now and step into a world where every season tells a story.
                        </p>
                        <button
                            onClick={handleDownload}
                            className="mt-4 py-3 px-8 rounded-3xl bg-yellow-500/25 hover:bg-yellow-500/40 backdrop-blur text-yellow-400 font-pixelify outline outline-1 outline-yellow-500 transition-all"
                        >
                            Download Now
                        </button>
                    </section>
            </main>
        </>
    );
}
