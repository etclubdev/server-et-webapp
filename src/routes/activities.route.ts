import express, { Request, Response, NextFunction} from 'express';
import createActivity  from '../controllers/activities.controller';
import validateActivityMiddleware from '../middlewares/validateActivity';
const router = express.Router();

router.post('/', validateActivityMiddleware, createActivity);

export default router;
