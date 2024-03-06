const cloudinary = require('cloudinary').v2;
const userModel = require('../models/userModel');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.uploadToCloudinary = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
            if (error) {
                return next(new AppError(500, "Internal server error"))
            }

            return resolve(uploadResult);
        }).end(req.file.buffer);
    });

    const user = await userModel.findById(req.user.id)
    const url = user.image
    user.image = uploadResult.secure_url
    await user.save()
    const segments = url.split('/');
    const filenameWithExtension = segments[segments.length - 1];
    const filename = filenameWithExtension.split('.')[0]; // remove file extension
    if (url === 'https://res.cloudinary.com/djmlypicw/image/upload/v1709749612/pkpnjfz55dywuaakptx6.jpg')
        return next()
    try {
        console.log(filename);
        const result = await cloudinary.uploader.destroy(filename);
        // console.log(result);
    } catch (error) {
        console.log(error);
    }

    next()
});


exports.postUploadToCloudinary = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
            if (error) {
                return next(new AppError("Internal server error", 500))
            }

            return resolve(uploadResult);
        }).end(req.body.image);
    });


    try {
        req.body.image = uploadResult.secure_url
        // console.log(result);
    } catch (error) {
        console.log(error);
        return next(new AppError("Internal server error", 500))
    }

    next()
});

