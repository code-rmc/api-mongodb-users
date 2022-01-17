const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findById, findByEmail } = require("./userServices");
const AppError = require("../errors/appErrors");
const config = require("../config");

// Genera un token
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
        401
      );
    }

    // Validacion de usuario habilitado
    if (!user.enable) {
      throw new AppError("Authenticaction failed user disabled.", 401);
    }

    // Validacion de password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new AppError(
        "Authenticaction failed Email / Password does not correct. Password",
        401
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

const validToken = async (token) => {
  try {
    // Validar que el token venga como parametro
    if (!token) {
      throw new AppError("Authentication failed! Token required", 401);
    }

    // Validar que el token sea integro
    let id;
    try {
      const obj = jwt.verify(token, config.auth.secret);
      id = obj.id;
    } catch (errValid) {
      throw new AppError("Authentication failed! Invalid token", 401);
    }

    // Validar el usuario en la base de datos
    const user = await findById(id);
    if (!user) {
      throw new AppError(
        "Authentication failed! Invalid token - User not found",
        401
      );
    }

    // Validar el campo estado del usuario
    if (!user.enable) {
      throw new AppError("Authentication failed! User disabled", 401);
    }

    return user;
  } catch (error) {
    throw error;
  }
};

// Validacion por rol
const validRol = (user, ...roles) => {
  if (!roles.includes(user.rol)) {
    throw new AppError("Authorization failed! User without privileges", 403);
  }
  return true;
};

module.exports = {
  login,
  validToken,
  validRol,
};
