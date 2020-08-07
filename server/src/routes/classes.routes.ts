import { Router } from 'express';
import ClassesController from '../controllers/classesController';

const classesRouter = Router();

const classesController = new ClassesController();

classesRouter.get('/', classesController.index);
classesRouter.post('/', classesController.create);

export default classesRouter;
