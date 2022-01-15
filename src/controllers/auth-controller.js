const express = require("express");
const Success = require("../handlers/successHandler");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    res.json(new Success({ test: "Prueba de login" }));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
