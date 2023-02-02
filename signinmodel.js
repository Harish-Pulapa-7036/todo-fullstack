const mongoose=require('mongoose');
const signinschema=new mongoose.Schema({
    username:{type:String},
    password:{type:String}
})
const signmodel=mongoose.model("userdata",signinschema)
module.exports=signmodel