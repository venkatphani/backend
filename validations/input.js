const validator = require("validator").default;
const isEmpty = require("./is-Empty");

const validateInput = (data, fieldNames) => {
  const errors = {};
  for (let index = 0; index < fieldNames.length; index += 1) {
    const fieldName = fieldNames[index];
    data[fieldName] = !isEmpty(data[fieldName]) ? data[fieldName] : "";
    if (fieldName === "version") {
      if (!validator.isSemVer(data.version)) {
        errors.version = "Version is invalid";
      }
    }
    if (fieldName === "url") {
      if (!validator.isURL(data.url)) {
        errors.url = "Url is invalid";
      }
    }
    if (validator.isEmpty(data[fieldName])) {
      errors[fieldName] = `${fieldName} field is required`;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateInput;
