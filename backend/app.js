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



/*app.post = ("/registration",async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(confirmpassword);

      if (!name) {
        res.status(400).json({ error: "userName is required" });
      }
      if (!email) {
        res.status(400).json({ error: "email is required" });
      }
  
      if (!password) {
        res.status(400).json({ error: "password is required" });
      }
  
      if (!confirmPassword) {
        res.status(400).json({ error: "confirmPassword is required" });
      }
      if (password !== confirmPassword) {
        res
          .status(400)
          .json({ error: "confirmPassword and password are not same" });
      }
  
      const findMail = await userSchema.findOne({ email: email });
  
      if (findMail) {
        res.status(400).json({ error: "user already exists" });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, async (err, hash) => {
            if (err) throw err;
            const createUser = await userSchema.create({
              username: userName,
              email: email,
              password: hash,
            });
            if (createUser) {
              const Token = createJWT(userName, email, createUser._id, "30d");
  
              const options = {
                userName: userName,
                email: email,
                userId: createUser._id,
              };
  
              res.status(200).send({
                data: options,
                token: Token,
                message: "your account has been created successfully",
              });
            }
          });
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Something went wrong" });
    }
  });*/

  app.post("/registration", async(req, res) => {
    
    const{name, email, Pass, confPass } = req.body;
    
        const data = {
            name: name,
            email: email,
            password: Pass
        }
    console.log("118");
        try{
            const item = await collection.findOne({email:email});
            if(item) {
                res.json("exist")
            } else {
                res.json("notexist")
                console.log("125");
                await collection.insertMany([data])
                console.log("127");
            }
        }
        catch (e){
            res.json("notexist")
        }
    

    })
   
/*app.post("/registration", async(req, res) => {

  const { name, email, Pass, confPass } = req.body;
  console.log(name);
  console.log(email);
  console.log(Pass);
  console.log(confPass);
    //const{name, email, password} = req.body;

    if (!name) {
        res.status(400).json({ error: "name is required" });
      }

      console.log("113");
      /*if (!email) {
        res.status(400).json({ error: "email is required" });
      }
  
      if (!Pass) {
        res.status(400).json({ error: "password is required" });
      }
  
      if (!confPass) {
        res.status(400).json({ error: "confirmPassword is required" });
      }
      if (Pass !== confPass) {
        res
          .status(400)
          .json({ error: "confirmPassword and password are not same" });
      }
      console.log("128");
    const data = {
        name: name,
        email: email,
        password: Pass,
    }
    console.log("134");
    try{
        const item = await collection.findOne({email:email});
        console.log("item");
        if(item) {
            console.log("7");
            //res.status(400).json({ error: "user already exists" });
            //res.json("exist")
            console.log("7");
        } else {
            console.log("146");
            //res.json("notexist")
            console.log("148");
            await collection.insertMany([data])
           
              }
            
            console.log("75");
        
        console.log("177");
    }
        
    catch (e){
        res.json("notexist")
    }
})*/

app.listen(8000, () => {
    console.log("port connected");
});