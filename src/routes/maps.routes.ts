import { Router } from 'express';

import { CreateMapController } from '../modules/maps/useCases/createMap/CreateMapController';
import { ValidateRequestMapDataController } from '../modules/maps/useCases/validateRequestMapData/ValidateRequestMapDataController';

export const mapsRoutes = Router();

const createMapController = new CreateMapController();
const validateRequestMapDataController = new ValidateRequestMapDataController();

mapsRoutes.post('/', createMapController.handle);
mapsRoutes.post('/check', validateRequestMapDataController.handle);
