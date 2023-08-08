import mongoose from "mongoose";

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
        required:true
    },
    password:{
        type:Number,
        required:true
    },
    role:{
        type: String,
        default: 'usuario'
    }
})

export const UserModel = mongoose.model('users',userSchema)