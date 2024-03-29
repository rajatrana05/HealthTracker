const express = require("express");
const morgan = require("morgan");
const dbConnect = require("./mongo");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

//configure
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));


const userRouter = require("./Routes/userRoute");
const adminRouter = require("./Routes/adminRoutes")
const aptRouter = require("./controllers/appointments");
const feedbackRouter = require("./controllers/feedbacks");
const doctorRouter = require("./Routes/doctorRoutes")

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/", feedbackRouter);


app.get("/", cors(), (req, res) => {});



app.listen(4000, () => {
    console.log("port connected");
});
