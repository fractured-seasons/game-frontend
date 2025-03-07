import React, {useEffect, useState} from "react";
import Section from "../../components/Section.jsx";
import logo from "../../assets/images/logo.png";
import api from "../../utils/apiUtils.js";
import toast from "react-hot-toast";

export default function Main({ categories, handleArticleClick }) {
    const [wikiContributors, setWikiContributors] = useState([]);

    useEffect(() => {
        const fetchWikiContributors = async () => {
            try {
                const response = await api.get("/wiki/contributors", {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setWikiContributors(response.data);
            } catch (err) {
                toast.error(err.response?.data?.message || "Error fetching wiki contributors");
            }
        };

        fetchWikiContributors();
    }, []);

    return (
        <Section title={"Welcome to the official Fractured Seasons Wiki"} className="!mx-4" marginTop={false}>
            <div className="flex justify-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 h-auto"
                />
            </div>
            <>
                <h2 className="text-2xl font-bold mt-6 text-yellow-400">Overview</h2>
                <p className="text-lg mb-4">
                    <strong>Fractured Seasons</strong> is a 2D adventure game set in a world where each region is locked in a perpetual season. Developed by a passionate team, the game explores the consequences of environmental imbalance, requiring players to restore the natural cycle of seasons.
                </p>

                <h2 className="text-2xl font-bold mt-6 text-yellow-400">Gameplay</h2>
                <p className="text-lg mb-4">
                    Players assume the role of a resident in a village affected by seasonal stasis. Each region remains in a single, unchanging season, impacting its environment, economy, and inhabitants. The objective is to navigate these regions, interact with NPCs, and gather seasonal resources to restore balance.
                </p>
                <p className="text-lg mb-4">
                    The game incorporates puzzle-solving mechanics where players must transport materials between regions to aid communities. For example, crops may struggle to grow in an eternal winter, requiring supplies from a summer zone. As players progress, they gain abilities that allow limited manipulation of seasonal elements.
                </p>

                <h2 className="text-2xl font-bold mt-6 text-yellow-400">Features</h2>
                <ul className="list-disc list-inside text-lg mb-4">
                    <li>Exploration of distinct seasonal biomes</li>
                    <li>Resource management and trading across regions</li>
                    <li>Dynamic NPC interactions and quest-based progression</li>
                    <li>Seasonal mechanics influencing gameplay and puzzles</li>
                    <li>Environmental storytelling and lore-driven worldbuilding</li>
                </ul>

                <h2 className="text-2xl font-bold mt-6 text-yellow-400">Development</h2>
                <p className="text-lg mb-4">
                    The game is designed to offer a blend of adventure, strategy, and environmental storytelling. Inspired by classic RPGs and modern indie titles, it features hand-crafted pixel art, immersive animations, and a rich soundtrack. The developers aim to create an evolving world where the player's actions directly influence the environment.
                </p>
            </>

            <h2 className="text-2xl my-4 font-bold text-yellow-400">Wiki Contents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                    <div key={category.id} className="border border-yellow-500 p-4 rounded-lg">
                        <h2 className="text-xl font-bold">{category.title}</h2>
                        <p className="mb-2">{category.description}</p>
                        <table className="w-full text-left text-yellow-400 font-pixelify border border-yellow-500">
                            <thead>
                            <tr className="border-b border-yellow-500">
                                <th className="p-2">{category.title}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {category.articles.map(article => (
                                <tr key={article.slug} className="border-b border-yellow-500 hover:text-yellow-500">
                                    <td className="p-2 flex items-center space-x-4">
                                        <img
                                            src={`https://api.dicebear.com/5.x/icons/svg?seed=${article.slug}`}
                                            alt="Article Icon"
                                            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-yellow-500"
                                        />
                                        <button className="text-lg" onClick={() => handleArticleClick(article.slug)}>{article.title}</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            {wikiContributors.length > 0 && (
                <>
                    <h2 className="text-2xl my-4 font-bold text-yellow-400">Wiki Contributors</h2>
                    <div className="flex flex-wrap gap-4">
                        {wikiContributors.map((contributor) => (
                            <div key={contributor.id} className="relative group">
                                <img
                                    src={`https://api.dicebear.com/5.x/bottts/svg?seed=${contributor.username}`}
                                    alt={contributor.username}
                                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-yellow-500"
                                />
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded px-2 py-1">
                                    {contributor.username}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Section>
    );
}