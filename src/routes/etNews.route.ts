import { Router } from 'express';
import { getETNewsById } from '../controllers/etNews.controller';

const router = Router();

router.get('/v1/et-news/:id', getETNewsById)


export default router;