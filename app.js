import express from 'express';
 import mongoose from 'mongoose'
import router from './routes/user-routes.js';
import blogRouter from './routes/Blog-routes.js';
import cors from 'cors';


const app = express();
app.use(cors());
 app.use(express.json());
 app.use("/api/user",router)
 app.use("/api/blog/",blogRouter);
 mongoose
 .connect(
    'mongodb+srv://tannishthanair4:WUN6tkGWD1vUbq7D@cluster0.z0gzrbh.mongodb.net/web?retryWrites=true&w=majority'
 )
 .then(() => app.listen(8000))

 .then(()=>
 console.log("Connected to database and listening to localhost 8000")
 )
 .catch((err)=>console.log(err));

 