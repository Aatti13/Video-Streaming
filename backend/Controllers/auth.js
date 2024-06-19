import mongoose from "mongoose";
import User from '../Models/User.js';

export const authTest = (req, res, next)=>{
  try{
    res.status(201).json({"status": "Auth Successful"})
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}

export const signup = async (req, res, next)=>{
  try{
    // const newUser = new User(req.body);
    res.status(201).json({
      "Auth": "Sign-up Successfull",
      "Request": req.body
    }
  )
  }catch(err){
    res.status(500).json({"Auth": "Unsuccessful"})
  }
}