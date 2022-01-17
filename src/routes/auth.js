const { Router } = require("express");
const { login } = require("../controllers/auth-controller");
const { postLoginRequesValidations } = require("../middlewares/auth");

const routes = Router();

routes.post("/login", postLoginRequesValidations, login);

module.exports = routes;
