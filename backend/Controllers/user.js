import { createError } from "../error.js";
import User from "../Models/User.js";

export const test = (req, res, next)=>{
  try{
    res.status(201).json({"status": "Test Successful"})
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}

export const getUser = (req, res, next)=>{
  
}

export const updateUser = async (req, res, next)=>{
  if(req.params.id === req.user.id){
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new:true})
    res.status(201).json(updatedUser);
  }else{
    return next(createError(401, "Auth. Failure"))
  }
}

export const deleteUser = (req, res, next)=>{

}

export const subscribeUser = (req, res, next)=>{
  
}

export const unsubscribeUser = (req, res, next)=>{

}

export const likeUser = (req, res, next)=>{

}

export const dislikeUser = (req, res, next)=>{

}