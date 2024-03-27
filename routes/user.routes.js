const express = require('express');
const {UserModel} = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userRouter = express.Router();
 

// userRouter.get('/',(req,res)=>{
//     res.send("hii");
// })


userRouter.post('/register',async(req,res)=>{
    const {email,password,name} = req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.json({msg:err});
            }else{
                const user = new UserModel({email,password:hash,name});
                user.save();
                res.status(200).json({msg:"user has been register", user});
            }
        })
        
    }catch(err){
        res.json({msg:err});
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id},"Anjali");
                    res.status(200).json({msg:"login successful", token})
                }else{
                    res.status(400).json({msg:"Wrong credential"});
                }
            })
        }
    }
    catch(err){
        res.status(400).json({msg:err})
    }
})



module.exports={
    userRouter,
}