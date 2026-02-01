import exp from 'express'
// import user model
import {ProductModel} from '../models/ProductModel.js'

// create mini express(seperate) app for user API
export const productApp=exp.Router();

// USER API ROUTES

// read user
productApp.get('/products',async(req,res)=>{
    // read users from db
    let productList=await ProductModel.find()
    // send response
    res.status(200).json({message:"products data",payload:productList})
})

// create use
productApp.post('/products',async(req,res)=>{
    // get new user data from req body
    let newProduct=req.body
    // create new user document
    let newProductDoc=ProductModel(newProduct)
    // save to db
    newProductDoc.save() 
    // send response
    res.status(200).json({message:"products created"})
})

productApp.get('/products/:id',async(req,res)=>{
    // get object id from url params
    let objId=req.params.id
    // find user in db
    let productObj=await ProductModel.findById(objId)
    // send response
    res.status(200).json({message:"product",payload:productObj})
})

productApp.put('/products/:id',async(req,res)=>{
    // get object id from url params
    let objId=req.params.id
    // get modified data from req body
    let modifiedUser=req.body
    // make update
    let productObj=await ProductModel.findByIdAndUpdate(objId,{$set:{...modifiedUser}})
    // send response
    res.status(200).json({message:"updated data",payload:productObj})
})