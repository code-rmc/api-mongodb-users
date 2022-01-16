const { findByEmail } = require("./userServices");
const AppError = require("../errors/appErrors");

const login = async (email, password) => {
  try {
    const user = findByEmail(email);
    if (!user) {
      throw new AppError(
        "Authenticaction failed Email / Password does not correct.",
        400
      );
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
};
