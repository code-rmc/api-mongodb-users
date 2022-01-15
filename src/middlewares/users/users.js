const { check } = require("express-validator");
const AppError = require("../../errors/appErrors");
const userService = require("../../services/userServices");
const { ROLES } = require("../../constants");
const { validationRes } = require("../commons");

const nameRequired = check("name", "Name required").not().isEmpty();
const lastNameRequired = check("last", "Last Name required").not().isEmpty();
const passwordRequired = check("password", "Password required").not().isEmpty();
const emailRequired = check("email", "Email required").not().isEmpty();
const emailValid = check("email", "Email is invalid").isEmail();
const emailExist = check("email").custom(async (email = "") => {
  const userFound = await userService.findByEmail(email);
  if (userFound) {
    throw new AppError("Email already exist in DB", 400);
  }
});
/* Verificacion del campo email en caso de modificaion del usuario */
const optionalEmailValid = check("email", "Email is invalid")
  .optional()
  .isEmail();
const optionalEmailExist = check("email")
  .optional()
  .custom(async (email = "") => {
    const userFound = await userService.findByEmail(email);
    if (userFound) {
      throw new AppError("Email already exist in DB", 400);
    }
  });
const rolValid = check("rol")
  .optional()
  .custom(async (rol = "") => {
    if (!ROLES.includes(rol)) {
      throw new AppError("Invalid Role", 400);
    }
  });
const dateValid = check("birthdate").optional().isDate("MM-DD-YYYY");
const idIsRequired = check("id").not().isEmpty();
const idIsMongoDB = check("id").isMongoId();
const idExist = check("id").custom(async (id = "") => {
  const userFound = await userService.findById(id);
  if (!userFound) throw new AppError("The Id does not not exist in DB", 400);
});

const postRequestValidations = [
  nameRequired,
  lastNameRequired,
  passwordRequired,
  emailRequired,
  emailValid,
  emailExist,
  rolValid,
  dateValid,
  validationRes,
];

const putRequestValidations = [
  idExist,
  idIsRequired,
  idIsMongoDB,
  optionalEmailValid,
  optionalEmailExist,
  rolValid,
  dateValid,
  validationRes,
];

const getByIdRequestValidations = [
  idExist,
  idIsRequired,
  idIsMongoDB,
  validationRes,
];

const deleteRequestValidations = [
  idExist,
  idIsRequired,
  idIsMongoDB,
  validationRes,
];

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getByIdRequestValidations,
  deleteRequestValidations,
};
