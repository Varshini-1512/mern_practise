import exp from 'express'

// create mini express(seperate) app for user API
export const userApp=exp.Router() 
let users=[];

// user API routes

// read all users
userApp.get('/users',(req,res)=>{
    // send response
    res.status(200).json({message:"all users data",payload:users})
})

// create new user 
userApp.post('/user',(req,res)=>{
    // get new user from req body
    let newUser=req.body
    console.log("newUser",newUser)
    // add new user to users array
    users.push(newUser)
    // send response
    res.status(201).json({message:"new user created"})
})

// update user
userApp.put('/users',(req,res)=>{
    // get modified user from req body
    let modifiedUser=req.body
    console.log("modifiedUser",modifiedUser)
    // find user index in users array
    let userIndex=users.find((userObj)=>userObj.id===modifiedUser.id)
    // if user found, update user details
    if(userIndex){
        let deletedUser=users.splice(userIndex,1,modifiedUser)
        res.status(200).json({message:"user modified"})
    }
    // if user not found, send 404 response
    else{
        res.status(404).json({message:"user not found"})
    }
})

// delete user
userApp.delete('/users/:id',(req,res)=>{
    console.log(req.params)
    // get user id from req params
    let userId=Number(req.params.id) 
    // find user index in users array
    let userIndex=users.find((userObj)=>userObj.id===userId)
    // if user found, delete user
    if(userIndex){
        let deletedUser=users.splice(userIndex,1)
        res.status(200).json({message:"user deleted"})
    }
    // if user not found, send 404 response
    else{
        res.status(404).json({message:"user not found"})
    }
    
})

// get user by id
userApp.get('/users/:id',(req,res)=>{
    // get user id from req params
    console.log(req.params)
    let userId=Number(req.params.id)
    // find user in users array
    let user=users.find((userObj)=>userObj.id===userId)
    // if user not found, send 404 response
    if(!user)
        return res.status(404).json({message:"user not found"})
    // send response
    res.status(200).json({message:"user data",payload:user})
})