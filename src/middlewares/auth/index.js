const { check } = require("express-validator");
const { validationRes } = require("../commons");
const { validToken } = require("../../services/authServices");

const passwordRequired = check("password", "Password required").not().isEmpty();
const emailRequired = check("email", "Email required").not().isEmpty();
const emailValid = check("email", "Email is invalid").isEmail();

// Comprueba si el token es valido
const validJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = await validToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const postLoginRequesValidations = [
  passwordRequired,
  emailRequired,
  emailValid,
  validationRes,
];

module.exports = {
  postLoginRequesValidations,
  validJWT,
};
