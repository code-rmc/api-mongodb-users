const bcrypt = require("bcrypt");
const User = require("../models/users");

class UserRepository {
  constructor() {}

  /**
   *
   * @returns {[User]}
   */
  async findAll() {
    return await User.find();
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findAllWithPagination(filter, options) {
    return await User.paginate(filter, options);
  }

  /**
   *
   * @param {number} id
   * @returns {User}
   */
  async findById(id) {
    return await User.findById(id);
  }

  /**
   *
   * @param {User} user
   * @returns {User}
   */
  async save(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  }

  /**
   *
   * @param {number} id
   * @param {User} user
   * @returns {User}
   */
  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  /**
   *
   * @param {number} id
   * @returns {User}
   */
  async remove(id) {
    return await User.findByIdAndRemove(id);
  }
}

module.exports = UserRepository;
