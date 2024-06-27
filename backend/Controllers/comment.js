import Video from "../Models/Video.js";
import Comment from "../Models/Comment.js";
import { createError } from "../error.js";

export const commentTest = (req, res, next)=>{
  try{
    res.status(201).json({"status": "Comment Successful"})
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}

export const addComment = async (req, res, next)=>{
  const newComment = new Comment({...req.body, userId: req.user.id});
  try{
    // todo
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  }catch(err){
    next(err);
  }
}

export const getComments = async (req, res, next)=>{
  try{
    // todo
    const commentsToGet = await Comment.find({videoId: req.params.videoId});
    res.status(201).json(commentsToGet);
  }catch(err){
    next(err);
  }
}

export const deleteComment = async (req, res, next)=>{
  try{
    // todo
    const commentToDelete = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);

    if(req.user.id === commentToDelete.userId || req.user.id === video.userId){
      await Comment.findByIdAndDelete(req.params.id)
      res.status(201).json("Comment has been deeted");
    }else{
      return next(createError(404, "Bad Authentication"))
    }
  }catch(err){
    next(err);
  }
}