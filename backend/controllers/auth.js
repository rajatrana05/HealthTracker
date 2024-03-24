const express = require("express");
const user = require("../models/user");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const authRouter = express.Router();

console.log("Login working successfully.");

authRouter.post("/login", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const item = await user.findOne({
            email: email,
            password: password,
        });
        console.log(20);
        if (item) {
            console.log(item._id);
            res.json({ status: "success", userId: item._id });
        } else {
            res.json({status: "notexist"});
        }
    } catch (e) {
        res.json("notexist");
    }
});

authRouter.post("/registration", async (req, res) => {
    const { name, email, Pass, confPass, isAdmin, isDoc } = req.body;
    const data = {
        name: name,
        email: email,
        password: Pass,
        isAdmin: false,
        isDoc: false
    };
    try {
        const item = await user.findOne({ email: email });
        if (item) {
            res.json("exist");
        } else {
            res.json("notexist");
            console.log(data);
            await user.insertMany([data]);
        }
    } catch (e) {
        res.json("notexist");
    }
});


module.exports = authRouter;


