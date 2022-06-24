import { Router } from 'express';

import { hostRoutes } from './host.routes';

export const routes = Router();

routes.use('/host', hostRoutes);
