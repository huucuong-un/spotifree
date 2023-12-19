const express = require("express");
const userController = require("../controllers/userController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router.route("/signup").post(authenController.registerUser);
router.route("/logout").get(authenController.logout);
router.route("/checkExistEmail").post(authenController.checkExistEmail);
router.route("/").get(authenController.protect, userController.getAllUsers);
router.route("/:id").get(authenController.protect, userController.getUserById);
router.route("/forgotPassword").post(authenController.forgotPassword);
router
  .route("/resetPassword/:userId/:token")
  .patch(authenController.resetPassword);
router.route("/login").post(authenController.login);

module.exports = router;
