const mongoose = require("mongoose");
var validator = require("validator");

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: [true, "Hotel Name is required"],
    },
    propertyType: {
        type: String,
        enum: ["Hotel", "Resort", "Guesthouse", "Lodge"],
        required: [true, "propertyType is required"],
    },
    rooms: {
        type: Number,
        required: [true, "rooms is required"],
    },
    floors: {
        type: Number,
        required: [true, "floors is required"],
    },
    emailId: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        minLength: 7,
        maxLength: 50,
        validate: [validator.isEmail, "Email should be valid"],
    },
    hotelContact: {
        type: String,
        required: [true, "hotelContact is required"],
    },
    ownerContact: {
        type: String,
        required: [true, "ownerContact is required"],
    },
    address: {
        type: String,
        required: [true, "address is required"],
    },
    country: {
        type: String,
        enum: ["United States", "Canada", "United Kingdom", "France", "Germany", "Japan", "China", "India", "Brazil", "Australia"],
    },
    state: {
        type: String,
    },
    city: {
        type: String,
        required: [true, "city is required"],
    },
    postalCode: {
        type: String,
        required: [true, "postalCode is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },

    cancellationPolicy:
    {
        type: String,
    },

    otherPolicies:
    {
        type: String,
    },
    active: {
        type: Boolean
    },
    petAllowed: {
        type: Boolean
    },

});

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// userSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// userSchema.pre(/^find/,function(next){
//     //query middleware
//     next()
// })

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// tourSchema.post('save', function (doc, next) {
//   next();
// });

//? Aggeregation Middleware, works before or after aggregation function
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });

exports.hotelModel = mongoose.model("hotel", hotelSchema);
