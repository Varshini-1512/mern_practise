import exp from 'express';
// import user model
import {UserModel} from '../models/UserModel.js';

// create mini express(seperate) app for user API
export const userApp=exp.Router();

// USER API ROUTES

// create user
userApp.post('/users',async(req,res)=>{
    // get new user data from req body
    let newUser=req.body;
    // create new user document
    let newUserDoc=UserModel(newUser);
    // save to db
    await newUserDoc.save();
    // send response
    res.json({message:"new user created",payload:newUser});
})


// read user
userApp.get('/users',async(req,res)=>{
    // read users from db
    let usersList=await UserModel.find()
    // send response
    res.json({message:"users data",payload:usersList})
})

// read user by id
userApp.get('/users/:id',async(req,res)=>{
    // get object id from url params
    let objId=req.params.id;
    // find user in db
    let userObj=await UserModel.findById(objId)
    // send response
    res.status(200).json({message:"user",payload:userObj})

})

// update user
userApp.put('/users/:id',async(req,res)=>{
    // get object id from url params
    let objId=req.params.id;
    // get modified data from req body
    let modifiedUser=req.body;
    // make update
    let updatedData=await UserModel.findByIdAndUpdate(objId,{$set:{...modifiedUser}},{new: true,runValidators:true});
    // send response
    res.status(200).json({message:"user updated",payload:updatedData})
})

// delete user
userApp.delete('/users/:id',async(req,res)=>{
    // get object id from url params
    let objId=req.params.id;
    // delete user from db
    let deletedUser=await UserModel.findByIdAndDelete(objId)
    // send response
    res.status(200).json({message:"user deleted",payload:deletedUser})
})