export const passwordValidation = {
    containsUppercase: (value) =>
        /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
    containsNumber: (value) =>
        /\d/.test(value) || "Must contain at least one number",
    containsSpecial: (value) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
        "Must contain at least one special character",
};

export const confirmPasswordValidation = (value, watch) => {
    return value === watch("password") || "Passwords do not match";
}

export const emailValidation = (value) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Please enter a valid email address";
}