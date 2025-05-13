import React, { useState } from "react";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full max-w-4xl h-96 mx-auto my-8 font-pixelify text-yellow-400">
            <div className="relative w-full h-full overflow-hidden rounded-3xl outline outline-1 outline-yellow-500 bg-yellow-500/25">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            className="w-full h-full object-contain rounded-3xl"
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="z-20 absolute top-1/2 left-4 transform -translate-y-1/2 bg-yellow-700/25
                   text-yellow-400 hover:text-yellow-100
                   outline outline-1 outline-yellow-500
                   px-4 py-2 rounded-full"
            >
                Prev
            </button>
            <button
                onClick={nextSlide}
                className="z-20 absolute top-1/2 right-4 transform -translate-y-1/2 bg-yellow-700/25
                   text-yellow-400 hover:text-yellow-100
                   outline outline-1 outline-yellow-500
                   px-4 py-2 rounded-full"
            >
                Next
            </button>

            <div className="flex justify-center mt-4 gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-4 h-4 rounded-full ${
                            index === currentIndex
                                ? "bg-yellow-400"
                                : "bg-yellow-500/25 outline outline-1 outline-yellow-500"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
