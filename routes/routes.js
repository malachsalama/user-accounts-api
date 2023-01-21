const express = require("express");
const router = express.Router();
const services = require("../services/render");
const userController = require("../controllers/userController");

/**
 *  @description root route
 *  @method GET /
 */
router.get("/", services.home);

/**
 *  @description create users
 *  @method GET /create-user
 */
router.get("/create-user", services.create_user);

/**
 *  @description update user
 *  @method GET /update-user
 */
router.get("/update-user", services.update_user);

/**
 *  @description user details
 *  @method GET /user
 */
router.get("/user", services.user);

/**
 *  @description about page
 *  @method GET /about
 */
router.get("/about", services.about);

// API
router.post("/api/users", userController.create);
router.get("/api/users", userController.find);
router.patch("/api/users/:id", userController.update);
router.delete("/api/users/:id", userController.delete);
router.put("/api/suspend-user/:id", userController.suspend);
router.put("/api/reactivate-user/:id", userController.reactivate);
router.put("/api/remove-user/:id", userController.remove);
router.get("/api/users/active-users", userController.active);

router.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

module.exports = router;
