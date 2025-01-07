import { Router } from 'express';
import { createETNews } from '../controllers/etNews.controller';
import { validateETNews } from '../middlewares/etNewsValidator';

const router = Router();


router.post('/v1/et-news', validateETNews, createETNews);

export default router;
