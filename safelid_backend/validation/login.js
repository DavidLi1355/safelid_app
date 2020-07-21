const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.input = !isEmpty(data.input) ? data.input : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Input checks
    if (Validator.isEmpty(data.input)) {
        errors.input = "Email and username field is required";
    } 

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};