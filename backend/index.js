// ---------------------------------
// IMPORTS

// Library Imports
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.listen(PORT, ()=>{
  connect();
  console.log(`PORT: ${PORT}`)
});