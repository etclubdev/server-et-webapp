import express from 'express';
import activityRoutes from "./routes/activity.routes"
import healthRoute from './routes/health.route';


const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use("/activities", activityRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});