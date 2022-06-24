import { Router } from 'express';

import { createHostController } from '../modules/hosts/useCases/createHost';

export const hostRoutes = Router();

hostRoutes.post('/', (request, response) => {
  return createHostController.handle(request, response);
});
