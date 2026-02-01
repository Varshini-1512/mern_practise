import {Schema,model} from "mongoose"

// create Product schema (pid,productName,price)
const productSchema=new Schema({
    pid:{
        type:Number,
        required:[true,"product id is required"]
    },
    productName:{
        type:String,
        required:[true,"product name is required"]
    },
    price:{
        type:Number,
        required:[true,"product price is required"]
    }
},
{
    strict:"throw",
    timestamps:true
})

// call model method
export const ProductModel=model("product",productSchema)