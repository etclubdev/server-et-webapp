import express from 'express';

import healthRoute from './routes/health.route';
import activityRoute from "./routes/activity.route";
import etNewsRoute from './routes/etNews.route';
import etBlogRoute from './routes/etBlog.route';
import partnerRoute from './routes/partner.route';

const app = express();

app.use(express.json());

app.use('/health', healthRoute);
app.use("/activities", activityRoute);
app.use('/et-news', etNewsRoute);
app.use('/et-blog', etBlogRoute);
app.use('/partners', partnerRoute);
app.use('/health', healthRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});