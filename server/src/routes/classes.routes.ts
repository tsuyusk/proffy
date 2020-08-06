import { Router } from 'express';
import ClassesController from '../controllers/classesController';

const classesRouter = Router();

const classesController = new ClassesController();

classesRouter.get('/classes', classesController.index);
classesRouter.post('/classes', classesController.create);

export default classesRouter;
