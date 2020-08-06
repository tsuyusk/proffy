import { Router } from 'express';
import ConnectionsController from '../controllers/connectionsController';

const connectionsRoutes = Router();

const connectionsController = new ConnectionsController();

connectionsRoutes.post('/', connectionsController.create);
connectionsRoutes.get('/', connectionsController.index);

export default connectionsRoutes;
