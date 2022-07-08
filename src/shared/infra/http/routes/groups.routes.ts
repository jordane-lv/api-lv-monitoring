import { Router } from 'express';

import { CreateGroupsController } from '@modules/groups/useCases/createGroups/CreateGroupsController';

const createGroupsController = new CreateGroupsController();

export const groupsRoutes = Router();

groupsRoutes.post('/', createGroupsController.handle);
