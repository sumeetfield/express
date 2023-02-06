const mangoose = require("mongoose");

userSchema = mangoose.Schema({
  username:String,
  password:String,
  phone:Number,
  email:String,
  userType:Number,
});


module.exports = mangoose.model('user',userSchema)
