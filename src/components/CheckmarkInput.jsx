import {FaExclamationTriangle} from "react-icons/fa";

const CheckmarkInput = ({
                            label,
                            id,
                            options,
                            required,
                            register,
                            errors,
                            name,
                        }) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="font-pixelify text-lg sm:text-xl text-slate-800">
                {label}
            </label>
            <div className="flex gap-4">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <input
                            type="checkbox"
                            id={id}
                            value={option.value}
                            {...register(name, { required })}
                            className="w-5 h-5"
                        />
                        <span className="ml-2">{option.label}</span>
                    </div>
                ))}
            </div>
            {errors[name] && (
                <div className="flex items-center mt-1">
                    <FaExclamationTriangle className="text-orange-600 mr-2" />
                    <span className="font-pixelify text-orange-600 text-sm">
            {errors[name]?.message || "This field is required."}
          </span>
                </div>
            )}
        </div>
    );
};
export default CheckmarkInput;
