import { Router } from 'express';
import { updateETNewsById } from '../controllers/etNews.controller';
import { validateUpdateETNews } from '../middlewares/etNewsValidator';

const router = Router();


router.put('/:id', validateUpdateETNews, updateETNewsById);

export default router;
