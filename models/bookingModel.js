const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    Hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
    },
    roomType: {
        type: String,
        enum: ["Standard Room", "Deluxe Room", "Family Room", "Executive Room"],
        required: [true, "Room type is required"],
    },
    fromArrivalDate: {
        type: Date,
        required: [true, "fromArrivalDate is required"],
    },
    toArrivalDate: {
        type: Date,
        required: [true, "toArrivalDate is required"],
    }
    // course: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Course",
    // },
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

exports.bookingModel = mongoose.model("booking", bookingSchema);
