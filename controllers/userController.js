const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const userModel = require("../models/userModel");
const Response = require("../utils/serverResponse");
const { imageMulter } = require("./../utils/multerConfig");
const Email = require("../utils/email");
const sharp = require("sharp");

const APIFeatures = require("./../utils/apiFeatures");


exports.getAllUsers = catchAsync(async (req, res, next) => {
  let doc = new APIFeatures(
    userModel.find({ isActive: { $ne: false } }),
    req.query
  )
    .filter()
    .sort()
    .paginate()
    .limitFields();
  doc = await doc.query;

  return res.status(200).json(new Response("success", doc));
});

exports.deleteUser = catchAsync(async (req, res, next) => {

  const doc = await userModel.findByIdAndDelete(req.user.id)

  if (doc.deletedCount < 1) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  return res.status(204).json(new Response("success", doc));
})

exports.searchUser = catchAsync(async (req, res, next) => {
  console.log(
    "as"
  );
  const users = await userModel.find({
    _id: { $ne: req.user.id }, // Exclude user's own ID
    name: { $regex: `^${req.params.letter}`, $options: 'i' }
  })
    .limit(10)

  return res.status(200).json(new Response("success", users));
})


exports.deleteMe = catchAsync(async (req, res, next) => {
  const doc = await userModel.findByIdAndUpdate(
    req.user.id,
    { active: false },
    { new: true }
  );
  return res.status(204).json({
    status: "success",
    data: {
      doc,
    },
  });
});

