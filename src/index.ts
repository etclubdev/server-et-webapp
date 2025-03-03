import express from 'express';

import healthRoute from './routes/health.route';
import etBlogRoute from './routes/etBlog.route';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/health', healthRoute);
app.use('/et-blog', etBlogRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});