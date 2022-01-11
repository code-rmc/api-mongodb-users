const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  getById,
  deleteUser,
} = require("../controllers/users-controller");

const routes = Router();

routes.get("/", getAllUsers);
routes.post("/", createUser);
routes.put("/:id", updateUser);
routes.get("/:id", getById);
routes.delete("/:id", deleteUser);

module.exports = routes;
