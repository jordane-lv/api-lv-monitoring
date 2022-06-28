import { Router } from 'express';

import { CreateHostController } from '../modules/hosts/useCases/createHost/CreateHostController';

export const hostsRoutes = Router();

const createHostController = new CreateHostController();

hostsRoutes.post('/', createHostController.handle);
