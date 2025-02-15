import { Router } from 'express';
import { getETNewsById } from '../controllers/etNews.controller';

const router = Router();

router.get('/et-news/:id', getETNewsById)


export default router;