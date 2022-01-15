const { check } = require("express-validator");
const { validationRes } = require("../commons");

const passwordRequired = check("password", "Password required").not().isEmpty();
const emailRequired = check("email", "Email required").not().isEmpty();
const emailValid = check("email", "Email is invalid").isEmail();

const postLoginRequesValidations = [
  passwordRequired,
  emailRequired,
  emailValid,
  validationRes,
];

module.exports = {
  postLoginRequesValidations,
};
