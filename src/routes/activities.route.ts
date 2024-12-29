import { Router } from 'express';
import activitiesMdw from '../middlewares/activities.mdw';
import activitiesController from '../controllers/activities.controller';

const router = Router();

router.patch('/:id', activitiesMdw.validInput, activitiesController.updateActivity);

export default router;