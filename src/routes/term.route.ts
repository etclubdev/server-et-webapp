import express from 'express';

import authGuard from '../middlewares/authGuard.mdw';
import termController from '../controllers/term.controller';
import { managePersonnelRole } from '../global/roles';

const router = express.Router();

router.get('/', authGuard.verifyRoles(managePersonnelRole), termController.getAllTerms);
router.post('/', authGuard.verifyRoles(managePersonnelRole), termController.createTerm);

export default router;