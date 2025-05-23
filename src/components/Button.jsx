import React from "react";

const Button = ({ disabled, children, className, onClick, type, name }) => {
    return (
        <button
            disabled={disabled}
            type={type}
            name={name}
            className={`w-full mt-4 py-2 px-4 text-white font-pixelify rounded-md shadow-lg transition-colors ${className} `}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
