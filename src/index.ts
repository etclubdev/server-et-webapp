import express from 'express';
import dotenv from 'dotenv';
import etNewsRoutes from './routes/etNews.route';
import { errorHandler } from './utils/errorHandler.util';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Routes
app.use(etNewsRoutes);

// Middleware xử lý lỗi
app.use(errorHandler);

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
