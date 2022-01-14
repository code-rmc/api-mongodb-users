const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");
const ROLES = require("../constants");

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
    },
    last: {
      type: String,
      required: [true, "Last required"],
    },
    email: {
      type: String,
      index: true,
      required: [true, "Email required"],
      unique: true,
    },
    birthdate: Date,
    password: {
      type: String,
      required: [true, "Password required"],
    },
    rol: {
      type: String,
      required: true,
      default: "USER_ROLE",
      enum: `${ROLES}`,
    },
    enable: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.plugin(uniqueValidator, {
  message: `Error, already exist in the database.`,
});

usersSchema.plugin(mongoosePaginate);

module.exports = model("users", usersSchema);
