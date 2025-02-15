import { FaExclamationTriangle } from 'react-icons/fa';

const TextareaInput = ({
                           label,
                           id,
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
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={id} className="font-pixelify text-lg sm:text-xl text-yellow-400">
                {label}
            </label>

            <div className="relative">
                <textarea
                    id={id}
                    placeholder={placeholder}
                    className={`font-pixelify px-3 py-2 border border-yellow-600 bg-yellow-900/20 text-yellow-200 placeholder-yellow-300 rounded-md ${
                        autoFocus ? 'border-2 border-yellow-600' : ''
                    } outline-none ${
                        errors[id]?.message ? 'border-orange-600 placeholder-orange-600' : ''
                    } focus:border-1 transition-colors w-full resize-none`}
                    {...register(id, {
                        required: { value: required, message },
                        minLength: min
                            ? { value: min, message: `Minimum ${min} characters required` }
                            : null,
                        validate: validate,
                    })}
                    readOnly={readOnly}
                />
            </div>

            {errors[id]?.message && (
                <div className="flex items-center mt-1">
                    <FaExclamationTriangle className="text-orange-600 mr-2" />
                    <span className="font-pixelify text-orange-600 text-sm">{errors[id].message}</span>
                </div>
            )}
        </div>
    );
};

export default TextareaInput;
