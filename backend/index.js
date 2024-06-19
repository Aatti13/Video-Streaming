// ---------------------------------
// IMPORTS

// Library Imports
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Route Imports
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auths.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8800;
const connect = ()=>{
  mongoose
  .connect(process.env.CONNECT)
  .then(()=>{
    console.log('connected to DB');
  })
  .catch((err)=>{
    throw err;
  });
}

// Pre-defined middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// User-defined middlewares
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

// Error Handling of controllers
app.use((err, req, res, next)=>{
  const status = err.status || 500;
  const message = err.message || "Status: Error";

  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

app.listen(PORT, ()=>{
  connect();
  console.log(`PORT: ${PORT}`)
});