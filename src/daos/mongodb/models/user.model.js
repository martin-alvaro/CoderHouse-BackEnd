import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:Number,
        required:true,
        default: 0
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        default: 'usuario'
    },
    isGithub:{
        type: Boolean,
        required:true,
        default:false
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

export const UserModel = mongoose.model('users',userSchema)