const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findByEmail } = require("./userServices");
const AppError = require("../errors/appErrors");
const config = require("../config");

const encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
};

const login = async (email, password) => {
  try {
    const user = await findByEmail(email);

    // Validacion de email
    if (!user) {
      throw new AppError(
        "Authenticaction failed Email / Password does not correct.",
        400
      );
    }

    // Validacion de usuario habilitado
    if (!user.enable) {
      throw new AppError("Authenticaction failed user disabled.", 400);
    }

    // Validacion de password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new AppError(
        "Authenticaction failed Email / Password does not correct. Password",
        400
      );
    }

    // JWT
    const token = encrypt(user._id);

    return {
      token,
      user: user.name,
      rol: user.rol,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
};
