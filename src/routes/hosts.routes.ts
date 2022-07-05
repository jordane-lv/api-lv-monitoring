import { Router } from 'express';

import { CreateHostController } from '../modules/hosts/useCases/createHost/CreateHostController';
import { ListHostsController } from '../modules/hosts/useCases/listHosts/ListHostsController';
import { ValidateRequestHostDataController } from '../modules/hosts/useCases/validateRequestHostData/ValidateRequestHostDataController';

export const hostsRoutes = Router();

const createHostController = new CreateHostController();
const listHostsController = new ListHostsController();
const validateRequestHostDataController =
  new ValidateRequestHostDataController();

hostsRoutes.post('/', createHostController.handle);
hostsRoutes.post('/check', validateRequestHostDataController.handle);
hostsRoutes.get('/:sigla', listHostsController.handle);
