import { Router } from 'express';

import classesRoutes from './classes.routes';
import connectionsRoutes from './connections.routes';

const routes = Router();

routes.use('/classes', classesRoutes);
routes.use('/connections', connectionsRoutes);

export default routes;
