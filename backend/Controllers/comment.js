export const commentTest = (req, res, next)=>{
  try{
    res.status(201).json({"status": "Comment Successful"})
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}