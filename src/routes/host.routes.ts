import { Router } from 'express';

import { CreateHostController } from '../modules/hosts/useCases/createHost/CreateHostController';

export const hostRoutes = Router();

const createHostController = new CreateHostController();

hostRoutes.post('/', createHostController.handle);
