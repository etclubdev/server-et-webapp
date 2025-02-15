import express from 'express';

import deletePostbyID from '../controllers/etNews.controller';
import validatePostID from '../middlewares/etNewsValidator.mdw';
const router = express.Router();

router.delete('/:postid?', validatePostID, deletePostbyID);

export default router;