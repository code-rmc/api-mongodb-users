const express = require("express");
const {
  findAll,
  findById,
  save,
  update,
  remove,
} = require("../services/userServices");
const Success = require("../handlers/successHandler");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await findAll(req.query.filter, req.query.options);
    res.json(new Success(users));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const createUser = async (req, res, next) => {
  try {
    let user = req.body;
    user = await save(user);
    res.status(201).json(new Success(user));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const userUpdate = await update(id, user);
    res.json(new Success(userUpdate));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findById(id);
    res.json(new Success(user));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRemove = await remove(id);
    res.json(new Success(userRemove));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  getById,
  deleteUser,
};
