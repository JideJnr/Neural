import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
const PORT = process.env.PORT || 3000;
dotenv.config();
connectDB();
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
