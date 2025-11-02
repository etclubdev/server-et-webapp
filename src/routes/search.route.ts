import express from 'express';

import searchController from '../controllers/search.controller';

const router = express.Router();

router.get('/', searchController.searchAcrossTables);

export default router;

