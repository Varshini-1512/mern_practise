// import express module
import exp from 'express'
import { userApp } from './APIs/UserAPI.js'
import { productApp } from './APIs/ProductAPI.js'

// create server
const app=exp()

// assign port no.
app.listen(3000,()=>console.log('HTTP server listening on port 3000'))

// body parser middleware
app.use(exp.json())    //exp.json() is the inbuilt middleware 

app.use('/user-api',userApp)
app.use('/product-api',productApp)
// app is the express application




