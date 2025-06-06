import {FaExclamationTriangle} from "react-icons/fa";

const SelectInput = ({
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
            <label htmlFor={id} className="font-pixelify text-lg sm:text-xl text-yellow-400">
                {label}
            </label>

            <select
                id={id}
                className={`font-pixelify px-3 py-2 border border-yellow-600 bg-yellow-900/20 text-yellow-200 rounded-md outline-none focus:border-1 w-full custom-select ${
                    errors[id] ? "border-orange-600" : ""
                }`}
                {...register(id, { required: { value: required, message } })}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

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

export default SelectInput;
