const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");

const { ratingModel } = require("../models/ratingModel");

const {
  getHotelRatings,
  addHotelRatings,
} = require("../controllers/ratingController"); //get a single course ratings

const { protect, restriction } = require("../controllers/authController");

router
  .route("/")
  .get(getAll(ratingModel))
  .post(protect, restriction("user"), addHotelRatings);

router.route("/getUserRatings/:userId").get(getHotelRatings);

router
  .route("/:id")
  .get(getOne(ratingModel))
  .put(protect, restriction("user"), updateOne(ratingModel))
  .delete(protect, deleteOne(ratingModel));

module.exports = router;
