import { Router } from 'express';

import activitiesMdw from '../middlewares/activities.mdw';
import activitiesController from '../controllers/activities.controller';

const router = Router();

router.delete('/:id', activitiesMdw.validId, activitiesController.deleteActivity);

export default router;

