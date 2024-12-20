import express, { Router } from 'express';

import { createEtNews } from '../controllers/etNewsController';

const router: Router = express.Router();

router.post('/', createEtNews);

export default router;
