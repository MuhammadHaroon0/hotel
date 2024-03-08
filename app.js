////////////////////////////**Packages**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require('cookie-parser')
// const session = require('express-session')
///////////////////////////Files
const connectDB = require('./db')
connectDB()
const AppError = require("./utils/AppError");
// app.use(express.static(__dirname + "public"));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL, // Replace with your frontend's URL
  credentials: true, // This allows cookies to be sent in CORS requests
}));
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }))
app.use(cookieParser())
// Passport Middleware
// app.use(passport.initialize())
// app.use(passport.session())

app.use(helmet());
app.use(morgan("tiny"));

//RATE LIMITING
const limiter = rateLimit({
  windowMs: 45 * 60 * 1000, // 45 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 45 minutes)
  message: "Too many requests send. Please try again in a45 minutes",
});
app.use("/api", limiter);

//SANITIZATION OF REQUESTS FROM NOSQL  INJECTIONS
app.use(mongoSanitize());

//PREVENTING JS OR HTML IN REQUESTS
app.use(xssClean());

//PREVENTING PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: [
      //will not be affected by hpp
    ],
  })
);

// if(!process.env.JWT_KEY)
// {
//     console.log("FATAL ERROR: JWT KEY is not found!")
//     process.exit(1)
// }

//ROUTERS
const userRouter = require("./routes/userRoutes.js");
const ratingRouter = require('./routes/ratingRoutes.js')
const bookingRouter = require('./routes/bookingRoutes.js')
const hotelRouter = require('./routes/hotelRoutes.js')


//ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/ratings", ratingRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/hotels", hotelRouter);

//PREVENTING REACHING UNDEFINED ROUTES
app.all("*", (req, res, next) => {
  next(
    new AppError(`Couldn't find the ${req.originalUrl} on this server!`, 404)
  );
});

const globalErrorHandler = require("./controllers/errorController");
app.use(globalErrorHandler);
module.exports = app;
