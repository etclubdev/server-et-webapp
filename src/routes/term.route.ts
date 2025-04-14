import express from 'express';

import termController from '../controllers/term.controller';

const router = express.Router();

router.get('/', termController.getAllTerms);

export default router;