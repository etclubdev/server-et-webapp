import express from 'express';
import dotenv from 'dotenv';

import healthRoute from './routes/health.route';
import activitiesRoute from './routes/activities.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/health', healthRoute);
app.use('/activities', activitiesRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});