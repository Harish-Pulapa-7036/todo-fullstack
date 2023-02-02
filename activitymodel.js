const mongoose=require('mongoose');
const activityschema=new mongoose.Schema({
    Activity:{type:String},
    status:{type:String,default:"pending"},
    userid:{type:String,ref:"userdata"}
})
const activitymodel=mongoose.model("activities",activityschema)
module.exports=activitymodel