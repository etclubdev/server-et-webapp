import express from 'express';
import cors from 'cors';

import faqRoute from './routes/faq.route'
import healthRoute from './routes/health.route';
import activityRoute from "./routes/activity.route";
import etNewsRoute from './routes/etNews.route';
import etBlogRoute from './routes/etBlog.route';
import partnerRoute from './routes/partner.route';
import personnelRoute from './routes/personnel.route';
import systemRoleRoute from './routes/systemRole.route';
import bannerRoute from './routes/banner.route';
import accountRoute from './routes/account.route'

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.use(express.json());
app.use('/faqs', faqRoute);
app.use('/health', healthRoute);
app.use("/activities", activityRoute);
app.use('/et-news', etNewsRoute);
app.use('/et-blog', etBlogRoute);
app.use('/partners', partnerRoute);
app.use("/personnels", personnelRoute);
app.use('/system-role', systemRoleRoute);
app.use('/banners', bannerRoute);
app.use('/accounts', accountRoute)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});