const express = require("express")
const cors=require('cors')
require('./db/config')
const User =require('./db/Users')
const Product =require('./db/Product')
const app =express()

app.use(express.json())
app.use(cors());

app.post('/register',async(req,res)=>{
    const user= new User(req.body)
    let result = await user.save();
    result= result.toObject() //convert mongoDb document to plain js OBJECT
    delete result.password ;  
    res.send(result)
})

app.post('/login',async(req,res)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){    
        let user =await User.findOne(req.body).select('-password')   //only one result 
        if(user)
        {
            res.send(user)
        }else{
            res.send({result:"no user found"})
        }
    }else{
        res.send({result:"no user found"})
    }
})

app.post('/add-product',async(req,res)=>{
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)
    console.log(result)
})
app.listen(3000,()=>console.log("server"))