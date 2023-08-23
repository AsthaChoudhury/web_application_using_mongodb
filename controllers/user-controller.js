import User from "../model/user.js";
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';


export const getAllUsers = async(req,res,next)=>{
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "NO users found"});
    }
    return res.status(200).json({users});
};
export const signup=async(req,res,next)=>
{
    const {name,email,password}=req.body;

    let existingUser;
    try{
        existingUser=await User.findOne({email});

    }catch(err)
    {
        return console.log(err);
    }
    if (existingUser)
    {
        return res.status(400).json({message:"User already exists!login instead"})
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user=new User({
        name,
        email,
        password:hashedPassword,
        blogs: []
    });
    try{
       await user.save();

    }catch(err)
    {
        return console.log(err);
    }
    return res.status(201).json({user})
}

export const login = async (req,res,next)=>{
    const {email,password}=req.body;

    let existingUser;
    try{
        existingUser=await User.findOne({email});

    }catch(err)
    {
        return console.log(err);
    }
    if (!existingUser)
    {
        return res.status(404).json({message:"User not found"});
    }
    const isPassword = bcrypt.compareSync(password,existingUser.password);
    if(!isPassword){
        return res.status(400).json({message:"Incorrect password"})

    }
    return res.status(200).json({message:"Login Successful"})
}