const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/", cors(), (req, res) => {

})

app.post("/login", async(req, res) => {
    const{name, email, password} = req.body;

    try{
        const item= await collection.findOne({ email: email, password: password });
        if(item) {
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
    
    const{name, email, Pass, confPass } = req.body;
        const data = {
            name: name,
            email: email,
            password: Pass
        }
        try{
            const item = await collection.findOne({email:email});
            if(item) {
                res.json("exist")
            } else {
                res.json("notexist")
                console.log(data);
                await collection.create([data])
            }
        }
        catch (e){
            res.json("notexist")
        }
    

    })

app.listen(8000, () => {
    console.log("port connected");
});