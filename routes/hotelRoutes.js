const express = require("express");
const router = express.Router();
const {
    getAll,
    getOne,
    updateOne,
    deleteOne,
    createOne,
} = require("../controllers/handlerFactory");

const { hotelModel } = require("../models/hotelModel");

const { protect, restriction } = require("../controllers/authController");

router
    .route("/")
    .get(getAll(hotelModel))
    .post(protect, restriction("user"), createOne(hotelModel));

router
    .route("/:id")
    .get(getOne(hotelModel))
    .put(protect, restriction("user"), updateOne(hotelModel))
    .delete(protect, deleteOne(hotelModel));

module.exports = router;
