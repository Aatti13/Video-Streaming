// --------------------------------------------------------------
// IMPORTS

import { createError } from "../error.js";
import User from "../Models/User.js";
import Video from "../Models/Video.js";

// --------------------------------------------------------------
// ṬEST FUNCTION

export const test = (req, res, next)=>{
  try{
    res.status(201).json({"status": "Test Successful"})
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}

// ==============================================================
/* CRUD Operations
   
   The user-conrtollers have the following operations:-

   --------------------------------------------------------------
    CREATE -->
      1. Done in '/routes/auth.js

   --------------------------------------------------------------
    READ -->
      2. getUser()
   
   --------------------------------------------------------------
    UPDATE -->
      3. updateUser()
      4. subscribeUser()
      5. unsubscribeUser()
      6. likeUser()
      7. dislikeUser()
   
   --------------------------------------------------------------
    DELETE --> 
      8. deleteUser()

  ===============================================================
*/

// getUser --> To get data of a channel or user
export const getUser = async (req, res, next)=>{
  try{
    const user = await User.findById(req.params.id);

    const {password, email, updatedAt, __v, ...others} = user._doc;
    res.status(201).json(others);
  }catch(err){
    next(err)
  }
}

// updateUser --> To Update the user data such as name and password.
export const updateUser = async (req, res, next)=>{
  if(req.params.id === req.user.id){
    try{
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new:true})
      res.status(201).json(updatedUser);
    }catch(err){
      next(err)
    }
  }else{
    return next(createError(401, "Auth. Failure"))
  }
}

// subscribeUser() --> To Add to subscriber count and list
export const subscribeUser = async (req, res, next)=>{
  try{
    const channelToSubscribe = await User.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if(user.subscribedUsers.includes(channelToSubscribe._id)){
      return next(createError(403, "Already Subscribed"));
    }else{
      await User.findByIdAndUpdate(req.user.id,{
        $push: {subscribedUsers: req.params.id}
      });
  
      await User.findByIdAndUpdate(req.params.id, {
        $inc: {subscribers: 1}
      });
  
      res.status(201).json(`You have subscribed to ${req.params.id}`);
    }
  }catch(err){
    next(err)
  }
}

export const unsubscribeUser = async (req, res, next)=>{
  try{

    const channelToUnsub = await User.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if(!user.subscribedUsers.includes(channelToUnsub._id)){
      return next(createError(404, "Not Subscribed to channel!"))
    }else{
      await User.findByIdAndUpdate(req.user.id,{
        $pull: {subscribedUsers: req.params.id}
      });
  
      await User.findByIdAndUpdate(req.params.id, {
        $inc: {subscribers: -1}
      });

      res.status(201).json(`You have unsubscribed from ${req.params.id}`);
    }

  }catch(err){
    next(err)
  }
}

export const likeUser = async (req, res, next)=>{
  const id = req.user.id;
  const videoId = req.params.videoId;
  
  try{
    // todo
    await Video.findByIdAndUpdate(videoId,{
      $addToSet: {likes: id},
      $pull: {dislikes: id}
    })  

    res.status(201).json("Video has been liked");
  }catch(err){
    next(err);
  }
}

export const dislikeUser = async (req, res, next)=>{
  // todo
  const id = req.user.id;
  const videoId = req.params.videoId;

  try{
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {dislikes: id},
      $pull: {likes: id}
    })

    res.status(201).json("Video has been disliked");
  }catch(err){
    next(err);
  }
}

export const deleteUser = async (req, res, next)=>{
  if(req.params.id === req.user.id){
    try{
      await User.findByIdAndDelete(
        req.params.id
      );
      res.status(201).json({
        "User": req.params.id,
        "Status": "Deleted",
      });
    }catch(err){
      next(err)
    }
  }else{
    return next(createError(401, "Auth. Failure"))
  }
}
