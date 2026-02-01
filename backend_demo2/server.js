import exp from 'express'
import { userApp } from './APIs/userAPI.js';
import { productApp } from './APIs/productAPI.js';
import {connect} from 'mongoose'
const app=exp();

//connect to db server
async function connectDb(){
    try{
    await connect('mongodb://localhost:27017/anuragdb2')
    console.log("connected to db server")
    // app.listen(PORT,()=>console.log(`HTTP server listening on port ${PORT}`))
    }catch(err){
        console.log("error in connecting to db server",err)
    }
}
// it returns a promise

connectDb();

// assign port number
const PORT=4000;
app.listen(PORT,()=>console.log(`HTTP server listening on port ${PORT}`))
// if path starts with /user-api 
// body parser middleware
app.use(exp.json())
app.use('/user-api',userApp)
app.use('/product-api',productApp)