const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/", cors(), (req, res) => {

})

app.post("/", async(req, res) => {
    const{name, email, password} = req.body;

    try{
        const check = await collection.findOne({email:email});

        if(check) {
            res.json("exist")
        } else {
            res.json("notexist")
        }
    }
    catch (e){
        res.json("notexist")
    }
})


app.post("/registration", async(req, res) => {
    const{name, email, password} = req.body;

    const data = {
        name: name,
        email: email,
        password: password
    }

    try{
        const check = await collection.findOne({email:email});
        if(check) {
            res.json("exist")
        } else {
            res.json("notexist")
            await collection.insertMany([data])
        }
    }
    catch (e){
        res.json("notexist")
    }
})

app.listen(8000, () => {
    console.log("port connected");
});