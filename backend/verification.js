import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verificationToken = (req, res, next)=>{
  const vToken = req.cookies.access_token;
  if(!vToken){
    return(
      next(createError(401, "Authentication Failure"))
    );
  }

  jwt.verify(vToken, process.env.JWT, (err, user)=>{
    if(err){
      return next(createError(403, "Invalid Verification Token"));
    }
    req.user = user;
    next();
  });
};