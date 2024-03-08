const express = require("express");
const router = express.Router();
const {
    getAll,
    getOne,
    updateOne,
    deleteOne,
    createOne,
} = require("../controllers/handlerFactory");


const { bookingModel } = require("../models/bookingModel");
const { protect, restriction } = require("../controllers/authController");

router
    .route("/")
    .get(getAll(bookingModel))
    .post(protect, restriction("user"), createOne(bookingModel));

router
    .route("/:id")
    .get(getOne(bookingModel))
    .put(protect, restriction("user"), updateOne(bookingModel))
    .delete(protect, deleteOne(bookingModel));

module.exports = router;
