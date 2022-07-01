import { Router } from 'express';

import { groupsRoutes } from './groups.routes';
import { hostsRoutes } from './hosts.routes';
import { mapsRoutes } from './maps.routes';

export const routes = Router();

routes.use('/hosts', hostsRoutes);
routes.use('/maps', mapsRoutes);
routes.use('/groups', groupsRoutes);
