import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import validateOrigin from './utils/cors.util';
import faqRoute from './routes/faq.route';
import healthRoute from './routes/health.route';
import activityRoute from "./routes/activity.route";
import etNewsRoute from './routes/etNews.route';
import etBlogRoute from './routes/etBlog.route';
import partnerRoute from './routes/partner.route';
import achievementRoute from './routes/achievement.route';
import personnelRoute from './routes/personnel.route';
import systemRoleRoute from './routes/systemRole.route';
import bannerRoute from './routes/banner.route';
import accountRoute from './routes/account.route'
import termRoute from './routes/term.route'
import searchRoute from './routes/search.route'
import authRoute from './routes/auth.route';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use('/faqs', faqRoute);
app.use('/health', healthRoute);
app.use("/activities", activityRoute);
app.use('/et-news', etNewsRoute);
app.use('/et-blog', etBlogRoute);
app.use('/partners', partnerRoute);
app.use('/achievements', achievementRoute)
app.use("/personnels", personnelRoute);
app.use('/system-role', systemRoleRoute);
app.use('/banners', bannerRoute);
app.use('/accounts', accountRoute);
app.use('/auth', authRoute)
app.use('/terms', termRoute)
app.use('/search', searchRoute)

const PORT = process.env.PORT || 8080;

const ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} | Environment: ${ENV}`);
});