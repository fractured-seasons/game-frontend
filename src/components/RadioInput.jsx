import {FaExclamationTriangle} from "react-icons/fa";

const RadioInput = ({
                        label,
                        id,
                        options,
                        register,
                        errors,
                        required,
                        message,
                        className,
                    }) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className="font-pixelify text-lg sm:text-xl text-yellow-400">{label}</label>

            <div className="flex gap-4">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center">
                        <input
                            type="radio"
                            id={id}
                            value={option.value}
                            {...register(id, { required: { value: required, message } })}
                            className="mr-2"
                        />
                        {option.label}
                    </label>
                ))}
            </div>

            {errors[id]?.message && (
                <div className="flex items-center mt-1">
                    <FaExclamationTriangle className="text-orange-600 mr-2" />
                    <span className="font-pixelify text-orange-600 text-sm">
                        {errors[id].message}
                    </span>
                </div>
            )}
        </div>
    );
};

export default RadioInput;
