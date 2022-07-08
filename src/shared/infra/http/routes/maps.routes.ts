import { Router } from 'express';

import { CreateMapController } from '@modules/maps/useCases/createMap/CreateMapController';
import { ListMapsController } from '@modules/maps/useCases/listMaps/ListMapsController';
import { ValidateRequestMapDataController } from '@modules/maps/useCases/validateRequestMapData/ValidateRequestMapDataController';

export const mapsRoutes = Router();

const createMapController = new CreateMapController();
const listMapsController = new ListMapsController();
const validateRequestMapDataController = new ValidateRequestMapDataController();

mapsRoutes.post('/', createMapController.handle);
mapsRoutes.post('/check', validateRequestMapDataController.handle);
mapsRoutes.get('/:sigla', listMapsController.handle);
