import {Schema,model} from 'mongoose'

// create User schema (username,password,age)
const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        minlength:[4,"minimum length should be 4"],
        maxlength:[8,"maximum length exceeded 8"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[4,"minimum length should be 4"],
        maxlength:[8,"maximum length exceeded 8"]
    },
    age:{
        type:Number,
        required:[true,"age is required"],
        min:[18,"age should be above 18"],
        max:[25,"age should be below 25"]
    }
},
{
    strict:"throw",
    timestamps:true
})

// call model method 
export const UserModel=model("user",userSchema)
// user -->it create collection as user (it will plurarise)
