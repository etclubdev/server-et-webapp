import express from 'express';

import healthRoute from './routes/health.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/health', healthRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});