export const videoTest = (req, res, next)=>{
  try{
    res.status(201).json({"status": "video Successful"})
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}