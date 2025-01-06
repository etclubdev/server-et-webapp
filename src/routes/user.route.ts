import express, { Request, Response, NextFunction} from 'express';
import  createActivity  from '../controllers/createActivity.controller';

const router = express.Router();

router.post('/', createActivity);

export default router;
