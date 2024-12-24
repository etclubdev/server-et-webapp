import express from 'express';
import cors from 'cors';

import healthRoute from './routes/health.route';
import etNewsRoute from './routes/etNewRoutes';
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use('/health', healthRoute);
app.use('/etnews-managed/et-news',etNewsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});