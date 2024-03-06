const express = require("express");
const router = express.Router();
const {
  getOne,
  createOne,
} = require("../controllers/handlerFactory");

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restriction,
  verify,
} = require("../controllers/authController");

const {
  getAllUsers,
  deleteMe,
  updateMe,
  uploadUserImage,
  resizeUserImage,
  deleteUser,
  searchUser,

} = require("../controllers/userController");

const userModel = require("../models/userModel");
const { uploadToCloudinary } = require("../utils/cloudinary");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:resetToken", resetPassword);
router.patch("/updatePassword", protect, updatePassword);

router
  .route("/")
  .get(protect, restriction("admin"), getAllUsers)
  .post(protect, createOne(userModel))
  .delete(protect, deleteMe)
  .patch(protect, uploadUserImage, resizeUserImage, uploadToCloudinary, updateMe);

router
  .route("/deleteUser")
  .delete(protect, restriction("admin"), deleteUser);

router.
  route("/search/:letter").
  post(protect, searchUser)

router.
  route("/verify/:token").
  get(verify)

router
  .route("/:id")
  .get(getOne(userModel))

module.exports = router;
