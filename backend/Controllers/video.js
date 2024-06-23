import Video from "../Models/Video.js";
import { createError } from "../error.js";

export const videoTest = (req, res, next)=>{
  try{
    res.status(201).json({"status": "video Successful"})
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}

// --------------------------------------------------------------
// Upoad Video

export const uploadVideo = async (req, res, next)=>{
  const newVideo = new Video({userId: req.user.id, ...req.body});

  try{
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  }catch(err){
    next(err)
  }
}

export const getVideo = async (req, res, next)=>{
  try{
    const videoToGet = await Video.findById(req.params.id);
    res.status(201).json(videoToGet);

  }catch(err){
    next(err);
  }
}

export const addViews = async (req, res, next)=>{
  try{
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: {views: 1}
    });
    res.status(201).json("Views increased...");
  }catch(err){
    next(err);
  }
}


export const trendingVideos = async (req, res, next)=>{
  try{
    
  }catch(err){
    next(err);
  }
}

export const updateVideo = async (req, res, next)=>{
  try{
    const videoToUpdate = await Video.findById(req.params.id);
    if(!videoToUpdate){
      return(next(createError(404, "Video Not Found")));
    }
    if(req.user.id === videoToUpdate.userId){
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id,
        {
          $set: req.body,
        },
        {
          new:true,
        }
      )
      res.status(201).json(updatedVideo);
    }else{
      return(next(createError(401, "Authentication Failure")));
    }
  }catch(err){
    next(err);
  }
}

export const deleteVideo = async (req, res, next)=>{
  try{
    // todo
    const videoToDelete = await Video.findById(req.params.id);
    if(!videoToDelete){
      return next(createError(404, "Video Not Found"));
    }

    if(req.params.id === videoToDelete.userId){
      await Video.findByIdAndDelete(
        req.params.id,
      );
      res.status(201).json({"Status": "Video Deleted Successfully"})
    }else{
      return next(createError(403, "Bad Authentication"))
    }
  }catch(err){
    next(err);
  }
}