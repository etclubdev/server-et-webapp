import express, { Router } from 'express';

import etNewsController from '../controllers/etNewsController';

const router: Router = express.Router();

router.post('/', etNewsController.createEtNews);

export default router;