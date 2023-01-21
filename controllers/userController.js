const User = require("../models/user");

// create and save a new user
exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Cannot create new user without details" });
    return;
  }
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/");
    console.log(`user created!`);
    console.log(user);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "An error occured while performing the create operation!",
    });
  }
};

// read user(s)
exports.find = async (req, res) => {
  if (req.query.id) {
    try {
      const user = await User.findById(req.query.id);
      if (!user) {
        res.status(404).send({ message: "Could not find user with that id" });
      } else {
        res.send(user);
      }
    } catch (err) {
      res
        .status(500)
        .send({ message: "Error occurred while retriving user information" });
    }
  } else {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Error occurred while retriving user information",
      });
    }
  }
};

// update user by id
exports.update = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "User's data to be update cannot be empty!" });
  }

  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).send({
        message: `Cannot Update user with id:${id}. The user might not exist!`,
      });
    } else if (user.status !== "active") {
      res.status(400).send({
        message: `Sorry, only active users can be updated!`,
      });
    } else {
      user.name = req.body.name;
      user.email = req.body.email;
      await User.findOneAndUpdate(
        { _id: id, status: "active" },
        { $set: req.body },
        { new: true }
      );
      res.send({ message: "User's information updated successfully!" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Oops, an error occured while updating user information!",
    });
  }
};

// delete a user by id
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send({
        message: `Cannot Delete user with that id. Please check if you input the correct id`,
      });
    } else {
      res.send({ message: "User was deleted successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: `Could not delete User with id: ${id}` });
  }
};

// Suspend a user(Only active users can be suspended)
exports.suspend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({ message: "No user found with this ID" });
    }
    if (user.status !== "active") {
      return res.status(400).send({
        message:
          "Oops! Sorry, the user might be archived or already suspended!",
      });
    }
    user.status = "suspended";
    await user.save();
    return res.send({ message: "User account suspended successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Error suspending user account" });
  }
};

// Reactivate a suspended user(only suspended users can be reactivated!)
exports.reactivate = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(404)
        .send({ message: "No suspended user found with this ID" });
    }
    if (user.status === "suspended") {
      user.status = "active";
    } else {
      return res.send({
        message: "Oops! Sorry, the user might be archived or already active",
      });
    }
    await user.save();
    return res.send({ message: "User account reactivated successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Error reactivating user account" });
  }
};

// Remove user or set the activity status to 'archived'(only users that are not archived can be removed)
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      _id: id,
      status: { $in: ["active", "suspended"] },
    });
    if (!user) {
      return res.status(404).send({
        message:
          "No active or suspended user found with this ID. Perhaps the user might be archived already!",
      });
    }
    user.status = "archived";
    await user.save();
    return res.send({ message: "User account removed successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Error removing user account" });
  }
};

exports.active = async (req, res) => {
  try {
    const users = await User.find(
      { status: { $ne: "archived" } },
      "_id name birthDate email status"
    );
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ message: "Error retrieving active users" });
  }
};
