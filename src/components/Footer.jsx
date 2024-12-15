import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaYoutube, FaDiscord } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mt-12 py-6 backdrop-blur bg-yellow-500/25 outline outline-1 outline-yellow-500 text-yellow-400 font-pixelify text-center">
            <div className="flex flex-col md:flex-row justify-around items-center gap-6">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl lg:text-5xl">Socials</h2>
                    <div className="flex gap-4 mt-2">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-100">
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-100">
                            <FaTwitter size={30} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-100">
                            <FaYoutube size={30} />
                        </a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-100">
                            <FaDiscord size={30} />
                        </a>
                    </div>
                </div>

                <div className="text-yellow-300">
                    <h1 className="text-2xl md:text-3xl lg:text-7xl">LOGO</h1>
                    <p className="text-lg md:text-xl lg:text-2xl mt-2">A farming adventure you'll love!</p>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl lg:text-5xl">Links</h2>
                    <div className="flex flex-col gap-2 mt-2">
                        <Link to="/about" className="text-xl md:text-2xl lg:text-2xl hover:text-yellow-100">
                            About
                        </Link>
                        <Link to="/faq" className="text-xl md:text-2xl lg:text-2xl hover:text-yellow-100">
                            FAQ
                        </Link>
                        <Link to="/contact" className="text-xl md:text-2xl lg:text-2xl hover:text-yellow-100">
                            Contact
                        </Link>
                        <Link to="/terms-of-use" className="text-xl md:text-2xl lg:text-2xl hover:text-yellow-100">
                            Terms of Use
                        </Link>
                        <Link to="/privacy-policy" className="text-xl md:text-2xl lg:text-2xl hover:text-yellow-100">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>

            <p className="mt-6 text-yellow-300 text-base md:text-lg lg:text-xl">
                © 2024 (Game Name). All rights reserved.
            </p>
        </footer>
    );
}
