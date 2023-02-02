const mongoose=require('mongoose');
const cors=require('cors')
const siginroute=require('./siginroute')
const activityroute=require('./activityroute')
const jwt=require('jsonwebtoken')
const express=require('express')
const app=express()
app.use(cors())


app.use('/activities',async(req,res,next)=>{
   try{
    const token= req.headers.token
   if(token){
    const data=jwt.verify(token,'secret')
    
    req.user=data.id
    next()
   }
   else{
    res.json({
        status:"failed",
        message:"token is missing"
    })
   }
   }catch(e){
    res.json({
        status:"failed",
        message:e.message
    })
   }
    
})
app.use('/',siginroute)
app.use('/',activityroute)
mongoose.connect('mongodb+srv://Harish:harishinsta@cluster0.8aidbzv.mongodb.net/?retryWrites=true&w=majority',()=>{
    console.log("connected DB");
})
app.listen(8000,()=>{
    console.log("listening to 8000");
})