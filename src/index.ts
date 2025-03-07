import express from 'express';

import healthRoute from './routes/health.route';
import etBlogRoute from './routes/etBlog.route';
import etNewsRoute from './routes/etNews.route';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use('/health', healthRoute);
app.use('/et-blog', etBlogRoute);
app.use('/et-news', etNewsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});