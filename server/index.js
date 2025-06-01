import express from 'express';
import connectDB from './database/db.js';
import "dotenv/config";
import cors from "cors"
import { GlobalErrorHandler } from './utils/GlobalErrorHandler.js';
const app = express();
connectDB();
app.use(cors());
app.use(express.json())
app.use(GlobalErrorHandler)

app.listen(process.env.PORT, () => {
    console.log('Server is running',process.env.PORT);
})
