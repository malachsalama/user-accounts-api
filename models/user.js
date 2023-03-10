const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "archived"],
      default: "active",
    },
    birthDate: {
      type: Date,
      required: true,
      get: (val) => moment(val).format("YYYY-MM-DD"),
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      type: Date,
      default: Date.now,
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
