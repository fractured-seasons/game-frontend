import {useState} from 'react';
import {FaEye, FaEyeSlash, FaExclamationTriangle} from 'react-icons/fa';

const InputField = ({
                        label,
                        id,
                        type,
                        errors,
                        register,
                        required,
                        message,
                        watch,
                        className,
                        min,
                        validate,
                        value,
                        autoFocus,
                        placeholder,
                        readOnly,
                    }) => {

    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={id} className="font-pixelify text-lg sm:text-xl text-slate-800">
                {label}
            </label>

            <div className="relative">
                <input
                    type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
                    id={id}
                    placeholder={placeholder}
                    className={`font-pixelify px-3 py-2 border bg-white text-slate-700 rounded-md ${
                        autoFocus ? 'border-2' : ''
                    } outline-none ${
                        errors[id]?.message ? 'border-orange-600 placeholder-orange-600' : ''
                    } focus:border-1 transition-colors w-full pr-10`}
                    {...register(id, {
                        required: {value: required, message},
                        minLength: min
                            ? {value: min, message: `Minimum ${min} characters required`}
                            : null,
                        validate: validate,
                    })}
                    readOnly={readOnly}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600"
                    >
                        {isPasswordVisible ? (
                            <FaEyeSlash className="w-5 h-5"/>
                        ) : (
                            <FaEye className="w-5 h-5"/>
                        )}
                    </button>
                )}
            </div>

            {errors[id]?.message && (
                <div className="flex items-center mt-1">
                    <FaExclamationTriangle className="text-orange-600 mr-2"/>
                    <span className="font-pixelify text-orange-600 text-sm">{errors[id].message}</span>
                </div>
            )}
        </div>
    );
};

export default InputField;
