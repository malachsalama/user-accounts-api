const axios = require("axios");

exports.home = async (req, res) => {
  try {
    // Make a get request to /api/users
    const response = await axios.get("http://localhost:5000/api/users");
    res.render("index", { title: "Home", users: response.data });
  } catch (error) {
    res.send(error);
  }
};

exports.create_user = (req, res) => {
  res.render("create_user", { title: "Create new user" });
};

exports.user = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/api/users", {
      params: { id: req.query.id },
    });
    res.render("user", { title: "Update user", user: response.data });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update_user = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/api/users", {
      params: { id: req.query.id },
    });
    res.render("update_user", { title: "Update user", user: response.data });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.about = (req, res) => {
  res.render("about", { title: "About" });
};
