const router = require("express").Router();
const signmodel = require("./signinmodel");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

router.use(bodyparser.json());

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userdata = await signmodel.findOne({ username: username });
    if (userdata) {
      res.json({
        message: "user already existed",
      });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.json({ message: err.message });
        } else {
          const data = await signmodel.create({
            username: username,
            password: hash,
          });
          res.json({
            message: "signup successfully",
            data,
          });
        }
      });
    }
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});

router.post("/signin",async(req,res)=>{
    try{

    
    const { username, password } = req.body;

    let userornot= await signmodel.findOne({username:username})
   if(userornot){
      const comparepass=  await bcrypt.compare(password,userornot.password)
      if(comparepass){
          const token=  jwt.sign({id:userornot.id},'secret');
          res.json({
            message:"success",
            token,
            username
          })
      }
      else{
        res.json({
            message:"invalid password"
        })
      }
   }
   else{
    res.json({
        message:"user is not existed"
    })
   }
}
catch(e){
    res.json({
        message:e.message
    })
}
})

module.exports = router;
