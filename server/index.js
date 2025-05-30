import express from 'express';
import connectDB from './database/db.js';
import "dotenv/config";

const app = express();

connectDB();

app.listen(process.env.PORT, () => {
    console.log('Server is running',process.env.PORT);
})