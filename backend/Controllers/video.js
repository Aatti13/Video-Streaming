// -------------------------------------------------------------------
// IMPORTS
import Video from "../Models/Video.js";
import { createError } from "../error.js";
import User from "../Models/User.js";

// -------------------------------------------------------------------
// Test function

export const videoTest = (req, res, next)=>{
  try{
    res.status(201).json({"status": "video Successful"})
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}

// ===================================================================
/* CRUD API for The Video Part of the Web-App:-

    CREATE -->
      1. uploadVideo() --> To upload video to your channel
    
    READ -->
      1. getVideo() --> To get a video or videos from a channel

      2. subscribedVideoSection() --> Videos from subscribed channels.

      3. getByTag() --> To Search by tag given to videos

      4. searchByQuery() --> To search using regex

      5. trendingVideosSection() --> To display all the trending videos.

      6. randomVideosSection() --> To display random videos from all corners of the platform.

    UPDATE -->
      1. addViews() --> To increase the number of views after clicking.

      2. updateVideo() --> To update Video meta-data or video itself.

    DELETE -->
      1. deleteVideo() --> to delete an uploaded video.

*/

// -------------------------------------------------------------------
// CREATE 

// Upload Video
export const uploadVideo = async (req, res, next)=>{
  const newVideo = new Video({userId: req.user.id, ...req.body});

  try{
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  }catch(err){
    next(err);
  }
}

// -------------------------------------------------------------------
// READ

// getVideo --> To get videos for a particular channel
export const getVideo = async (req, res, next)=>{
  try{
    const videoToGet = await Video.findById(req.params.id);
    res.status(201).json(videoToGet);

  }catch(err){
    next(err);
  }
}

// subscribedVideoSection --> Videos from subscribed channels.
export const subscribedVideoSection = async (req, res, next)=>{
  try{
    const user = await User.findById(req.user.id);
    const subscribedChannels = await user.subscribedUsers;

    const sublist = await Promise.all(
      subscribedChannels.map((channelId)=>{
        return Video.find({userId: channelId});
      })
    )

    res.status(201).json(sublist.flat().sort((a,b)=>{
      b.createdAt-a.createdAt
    }));
  }catch(err){
    next(err);
  }
}

// getByTag --> To Search by tag given to videos.
export const getByTag = async (req, res, next)=>{
  const tags = req.query.tags.split(',');
  try{
    const videosByTag = await Video.find({tags:{$in:tags}}).limit(20);
    res.status(201).json(videosByTag);
  }catch(err){
    next(err);
  }
}

// getByQuery --> To search using regex
export const getByQuery = async (req, res, next)=>{
  const query = req.query.q;
  try{
    const videobyQuery = await Video.find({title: {$regex: query, $options: "i"}}).limit(40);
    res.status(201).json(videobyQuery);
  }catch(err){
    next(err);
  }
}

// trendingVideosSection --> To display all the trending videos.
export const trendingVideosSection = async (req, res, next)=>{
  try{
    const trendingVideos = await Video.find().sort({views:-1});
    res.status(201).json(trendingVideos)
  }catch(err){
    next(err);
  }
}

// randomVideosSection --> To display random videos from all corners of the platform.
export const randomVideosSection = async (req, res, next)=>{
  try{
    const randomVideos = await Video.aggregate([{$sample:{size:40}}]);
    res.status(201).json(randomVideos);
  }catch(err){
    next(err)
  }
}

// ---------------------------------------------------------------------
// UPDATE

// addViews --> To increase the number of views after clicking.
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

// updateViews --> To update Video meta-data or video itself
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

// ---------------------------------------------------------------------
// DELETE

// deleteVideo --> to delete an uploaded video.
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