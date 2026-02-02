import exp from 'express';
// import user model
import {UserModel} from '../models/UserModel.js';
import {hash,compare} from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middlewares/verifyToken.js';

// create mini express(seperate) app for user API
export const userApp=exp.Router();

// USER API ROUTES

// user authentication(login) route
userApp.post('/auth',async(req,res)=>{
    // get user credentials from req body
    let userCred=req.body;
    // check username in db
    let userOfDB=await UserModel.findOne({username:userCred.username});
    // if user not found
    if(userOfDB===null){
        return res.status(404).json({message:"invalid username"});
    }
    // compare password
    let status=await compare(userCred.password,userOfDB.password)
    // if password not matched
    if(status===false){
        return res.status(401).json({message:"invalid password"});
    }
    // create signed token
    let signedToken=jwt.sign({username:userCred.username},'abcdef',{expiresIn:10}) 
    // 10 seconds expiry for testing purpose only if we write in quotes "10" it represend milliseconds

    // save token as http only cookie
    res.cookie('token',signedToken,{
        httpOnly:true, // it is http only cookie
        secure:false, // set to true if using https
        sameSite:'lax' // lax--> allow cookie to be sent with cross-site requests
    });

    // send token as response
    res.status(200).json({message:"login success"});
})

// create user
userApp.post('/users',async(req,res)=>{
    // get new user data from req body
    let newUser=req.body;
    // hash the password before saving to db
    let hashedPassword=await hash(newUser.password,12); // 12 salting rounds(cost factor)
    // replace plain password with hashed password
    newUser.password=hashedPassword;
    // create new user document
    let newUserDoc=new UserModel(newUser);
    // save to db
    await newUserDoc.save();
    // send response
    res.json({message:"new user created",payload:newUserDoc});
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

// test route(protected route)
userApp.get('/test',verifyToken,(req,res)=>{
    res.status(200).json({message:"user api is working fine - protected route"});
})
