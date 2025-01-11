import express from 'express';
import connectDB from './db/connectDB.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import candidateRoute from './routes/candidateRoutes.js';
import { jwtAuthMiddleware } from './jwt/jsonWebToken.js';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(bodyParser.json());//req.body


app.use(cors({ origin: 'http://localhost:5173' }));

//use routes 
app.use('/user', userRoutes)
app.use('/candidate', candidateRoute)


connectDB()
  .then(() => {
    app.listen(9999, () => {
      console.log("Server is running on Port 9999");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });