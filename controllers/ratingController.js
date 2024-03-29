const { userModel } = require("../models/userModel");
const { ratingModel } = require("../models/ratingModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");

exports.getHotelRatings = catchAsync(async (req, res, next) => {
  const found = await ratingModel.find({ hotel: req.params.hotelId });

  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  // console.log(newSection._id);
  return res.status(200).json(new Response("success", found));
});

exports.addHotelRatings = catchAsync(async (req, res, next) => {
  let found = await ratingModel.find({
    hotel: req.body.hotel,
    user: req.user.id,
  });

  if (found.length > 0) {
    return next(new AppError("Already reviewed this hotel!", 403));
  }
  found = await ratingModel.create({
    rating: req.body.rating,
    hotel: req.body.hotel,
    review: req.body.review,
    user: req.user.id,
  });
  // console.log(newSection._id);
  return res.status(200).json(new Response("success", found));
});