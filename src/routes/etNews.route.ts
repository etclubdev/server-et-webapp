import { Router } from 'express';
import { getETNewsDetails } from '../controllers/etNews.controller';

const router = Router();

router.get('/v1/et-news/:id', getETNewsDetails)


export default router;