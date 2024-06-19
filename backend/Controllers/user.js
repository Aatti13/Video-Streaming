export const test = (req, res, next)=>{
  try{
    res.status(201).json({"status": "Test Successful"})
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}