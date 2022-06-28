import { Router } from 'express';

import { CreateMapController } from '../modules/maps/useCases/createMap/CreateMapController';

export const mapsRoutes = Router();

const createMapController = new CreateMapController();

mapsRoutes.post('/', createMapController.handle);
