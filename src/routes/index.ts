import { Router } from 'express';

import { hostRoutes } from './host.routes';
import { mapsRoutes } from './maps.routes';

export const routes = Router();

routes.use('/hosts', hostRoutes);
routes.use('/maps', mapsRoutes);
