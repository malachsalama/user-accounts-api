const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
    status: {
      type: String,
      enum: ["active", "suspended", "archived"],
      default: "active",
    },
    birthDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      type: Date,
      default: Date.now,
      get: (val) => moment(val).format("YYYY-MM-DD"),
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
