import express from "express";
import healthRoute from './routes/health.route';
import activityRoute from "./routes/activity.routes";
import etBlogRoute from './routes/etBlog.route';

const app = express();

app.use(express.json());
app.use("/activities", activityRoute);
app.use('/health', healthRoute);
app.use('/et-blog', etBlogRoute);



const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});