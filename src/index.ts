import express from 'express';
import userRoute from './routes/user.route';
import healthRoute from './routes/health.route';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/health', healthRoute);
app.use('/activities', userRoute);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});