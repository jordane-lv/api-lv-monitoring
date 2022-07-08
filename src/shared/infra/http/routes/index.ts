import { Router } from 'express';

import { MassCreateController } from '@modules/mass/useCases/massCreate/MassCreateController';

import { groupsRoutes } from './groups.routes';
import { hostsRoutes } from './hosts.routes';
import { mapsRoutes } from './maps.routes';

export const routes = Router();

const massCreateController = new MassCreateController();

routes.use('/hosts', hostsRoutes);
routes.use('/maps', mapsRoutes);
routes.use('/groups', groupsRoutes);
routes.use('/mass', massCreateController.handle);
