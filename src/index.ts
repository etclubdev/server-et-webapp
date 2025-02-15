import express from 'express';

import deleteETNewsRoute from './routes/etNews.route';
import healthRoute from './routes/health.route';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/health', healthRoute);
app.use('/et-news', deleteETNewsRoute);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});