const express = require("express");
const dbConnect = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const authRouter = require("./controllers/auth");
const aptRouter = require("./controllers/appointments");

app.use("/", aptRouter);
app.use("/", authRouter);


app.get("/", cors(), (req, res) => {});



app.listen(8000, () => {
    console.log("port connected");
});
