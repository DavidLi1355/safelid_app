const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : "";

    // Name checks 
    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // Email checks
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Username checks
    if (validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    } else if (validator.isEmail(data.username)) {
        errors.username = "Username can not be an email";
    }  

    // Password checks
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = "Confirm password field is required";
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!validator.equals(data.password, data.confirm_password)) {
        errors.confirm_password = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};