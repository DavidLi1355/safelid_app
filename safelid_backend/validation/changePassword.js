const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";

    // Password checks
    if (validator.isEmpty(data.oldPassword)) {
        errors.password = "Password field is required";
    }

    if (validator.isEmpty(data.newPassword)) {
        errors.confirm_password = "Confirm password field is required";
    }

    if (!validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};