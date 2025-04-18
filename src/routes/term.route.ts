import express from 'express';
import authGuard from '../middlewares/authGuard.mdw';
import termController from '../controllers/term.controller';

const router = express.Router();

router.get('/', authGuard.verifyRoles([
    'Administrator',
    'Trưởng ban Tech',
    'Trưởng ban PR',
    'Trưởng ban HR',
    'Trưởng ban EV',
    'Trưởng ban FER']), termController.getAllTerms);

export default router;