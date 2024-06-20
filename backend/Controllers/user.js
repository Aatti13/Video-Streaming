export const test = (req, res, next)=>{
  try{
    res.status(201).json({"status": "Test Successful"})
  }catch(err){
    res.status(500).json({"Error": err.message})
  }
}

export const getUser = (req, res, next)=>{
  
}
export const updateUser = (req, res, next)=>{
  
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