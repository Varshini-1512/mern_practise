import exp from 'express'
// create mini express(seperate) app for product API
export const productApp=exp.Router()

let products=[];

// product API routes

// read all products
productApp.get('/products',(req,res)=>{
    // send response
    res.status(200).json({message:"all products data",payload:products})
})

// create new product
productApp.post('/product',(req,res)=>{
    // get new product from req body
    let newProduct=req.body
    console.log("newProduct",newProduct)
    // add new product to products array
    products.push(newProduct)
    // send response
    res.status(201).json({message:"new product created"})
})

// update product
productApp.put('/products',(req,res)=>{
    // get modified product from req body
    let modifiedProducts=req.body
    console.log("modifiedProducts",modifiedProducts)
    // find product index in products array
    let productsIndex=products.find((productsObj)=>productsObj.id===modifiedProducts.id)
    // if product found, update product details
    if(productsIndex){
        let deletedProduct=products.splice(productsIndex,1,modifiedProducts)
        res.status(200).json({message:"product modified"})
    }
    // if product not found, send 404 response
    else{
        res.status(404).json({message:"product not found"})
    }
})

// delete product
productApp.delete('/products/:id',(req,res)=>{
    // get product id from req params
    console.log(req.params)
    // get product id from req params
    let productId=Number(req.params.id)
    // find product index in products array 
    let ProductIndex=products.find((productObj)=>productObj.id===productId)
    // if product found, delete product
    if(ProductIndex){
        let deletedUser=products.splice(ProductIndex,1)
        res.status(200).json({message:"product deleted"})
    }
    // if product not found, send 404 response
    else{
        res.status(404).json({message:"product not found"})
    }
    
})

// get product by id
productApp.get('/products-id/:id',(req,res)=>{
    console.log(req.params)
    // get product id from req params
    let productId=Number(req.params.id)
    // find product in products array 
    let product=products.find((productObj)=>productObj.id===productId)
    // if product not found, send 404 response
    if(!product)
        return res.status(404).json({message:"product not found"})
    // send response
    res.status(200).json({message:"product data",payload:product})
})

// get product by brand
productApp.get('/products-brand/:brand',(req,res)=>{
    console.log(req.params)
    let productBrand=req.params.brand
    // find product in products array
    let product=products.find((productObj)=>productObj.brand===productBrand)
    // if product not found, send 404 response
    if(!product)
        return res.status(404).json({message:"product not found"})
    // send response
    res.status(200).json({message:"product data",payload:product})
})