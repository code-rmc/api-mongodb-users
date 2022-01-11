const mongoose = require("mongoose");
const confg = require("../../config");

module.exports = async () => {
  await mongoose.connect(confg.databaseURL);
};
