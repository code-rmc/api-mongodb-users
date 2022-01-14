const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  getById,
  deleteUser,
} = require("../controllers/users-controller");
const {
  postRequestValidations,
  putRequestValidations,
  getByIdRequestValidations,
  deleteRequestValidations,
} = require("../middlewares/users/users");

const routes = Router();

routes.get("/", getAllUsers);
routes.post("/", postRequestValidations, createUser);
routes.put("/:id", putRequestValidations, updateUser);
routes.get("/:id", getByIdRequestValidations, getById);
routes.delete("/:id", deleteRequestValidations, deleteUser);

module.exports = routes;
