import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required:true
    },
    username:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    location:{
        type:String,
        required:true
    }
})
userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) {
        return next();
      }
    
      // Hash the password
      this.password = await bcrypt.hash(this.password, 10);
      next();
})
userSchema.methods.isPasswordCorrect=async function(pwd){
return await bcrypt.compare(pwd, this.password)
}
const User=mongoose.model('User',userSchema)
export default User