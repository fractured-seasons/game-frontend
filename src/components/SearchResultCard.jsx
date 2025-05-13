import React from "react";
import { FaTag } from "react-icons/fa";

export default function SearchResultCard({ article, onClick, highlight }) {

    const regex = new RegExp(`(${highlight})`, "gi");
    const titleWithHighlight = highlight
        ? article.title.replace(regex, "<mark>$1</mark>")
        : article.title;

    return (
        <div
            onClick={onClick}
            className="cursor-pointer bg-yellow-500/10 p-4 rounded-2xl shadow hover:shadow-lg transition-shadow duration-150"
        >
            <h3
                className="text-lg font-semibold text-yellow-300 mb-2 leading-snug"
                dangerouslySetInnerHTML={{ __html: titleWithHighlight }}
            />
            {article.categoryTitle && (
                <div className="inline-flex items-center text-xs font-pixelify text-yellow-200 bg-yellow-500/20 px-2 py-1 rounded-full">
                    <FaTag className="mr-1" /> {article.categoryTitle}
                </div>
            )}
        </div>
    );
}
