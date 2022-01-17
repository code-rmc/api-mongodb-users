const express = require("express");
const authServices = require("../services/authServices");
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
    const userToken = await authServices.login(email, password);
    res.json(new Success(userToken));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
