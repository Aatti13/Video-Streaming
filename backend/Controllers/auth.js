// ------------------------------------------------------
// Imports
import mongoose from "mongoose";
import User from '../Models/User.js'; //User-Schema
import bcrypt from 'bcryptjs';
import { createError } from "../error.js"; // Custom-Error
import jwt from 'jsonwebtoken'; // JWT Auth

// ------------------------------------------------------
// Auth Test Function
/* Function to test Path for request and response      
    1. Success -- Status(201)
    2. Fail/Error -- Status(500)
*/

export const authTest = (req, res, next)=>{
  try{
    res.status(201).json({"status": "Auth Successful",
      "jwt": process.env.JWT
    })
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}

// ------------------------------------------------------
// Auth Sin-Up Function
/* Function to POST new sign-up:-
    
    Based on User Schema -->
      Sl No.   Field      Type      Required
        1.      Name     String       True
        2.    Password   String       True
        3.     Others  (Optional)     False
*/

export const signup = async (req, res, next)=>{
  try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({...req.body, password: hash});

    await newUser.save();
    res.status(201).json({
      "Auth": "Sign-up Successfull"
    }
  )
  }catch(err){
    next(err);
  }
}

export const signin = async (req, res, next)=>{
  try{
    const user = await User.findOne({
      name: req.body.name,
    })
    if(!user){
      return next(createError(404, "Not Found"));
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isCorrect){
      return next(createError(401, "Wrong Credentials"))
    }

    const token = jwt.sign({id:user._id}, process.env.JWT);

    const {password, ...others} = user._doc;

    res.cookie("access_token", token,{
      httpOnly:true
    }).status(201).json(others);
  }catch(err){
    next(err)
  }
}