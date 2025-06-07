import express from 'express';
import connectDB from './database/db.js';
import "dotenv/config";
import cors from "cors"
import { GlobalErrorHandler } from './utils/GlobalErrorHandler.js';
import userRoutes from './routes/User.route.js';
import productRoutes from './routes/Product.route.js';
import adminRoutes from './routes/Admin.route.js';
import addressRoutes from './routes/Address.route.js';
const app = express();

connectDB();
app.use(cors());
app.use(express.json())

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/address', addressRoutes);

app.use(GlobalErrorHandler)
app.listen(process.env.PORT, () => {
    console.log('Server is running',process.env.PORT);
})
