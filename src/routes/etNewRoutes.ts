import express, { Router } from 'express';

import { createEtNews } from '../controllers/etNewsController';

const router: Router = express.Router();

router.post('/api/v1/et-news', createEtNews);

export default router;
