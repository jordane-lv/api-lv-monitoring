import { container } from 'tsyringe';

import { ICreateGroupsAdapter } from '@modules/groups/adapters/ICreateGroupsAdapter';
import { ZabbixCreateGroupsAdapter } from '@modules/groups/adapters/zabbix/ZabbixCreateGroupsAdapter';
import { CreateGroupsUseCase } from '@modules/groups/useCases/createGroups/CreateGroupsUseCase';
import { ICreateHostAdapter } from '@modules/hosts/adapters/ICreateHostAdapter';
import { ZabbixCreateHostAdapter } from '@modules/hosts/adapters/zabbix/ZabbixCreateHostAdapter';
import { CreateHostUseCase } from '@modules/hosts/useCases/createHost/CreateHostUseCase';
import { ValidateRequestHostDataUseCase } from '@modules/hosts/useCases/validateRequestHostData/ValidateRequestHostDataUseCase';
import { ICreateMapAdapter } from '@modules/maps/adapters/ICreateMapAdapter';
import { ZabbixCreateMapAdapter } from '@modules/maps/adapters/zabbix/ZabbixCreateMapAdapter';
import { CreateMapUseCase } from '@modules/maps/useCases/createMap/CreateMapUseCase';
import { ValidateRequestMapDataUseCase } from '@modules/maps/useCases/validateRequestMapData/ValidateRequestMapDataUseCase';

/* Hosts */
container.registerSingleton<ICreateHostAdapter>(
  'CreateHostAdapter',
  ZabbixCreateHostAdapter,
);

container.register<ValidateRequestHostDataUseCase>(
  'ValidateRequestHostData',
  ValidateRequestHostDataUseCase,
);

container.register<CreateHostUseCase>('CreateHostUseCase', CreateHostUseCase);

/* Maps */
container.registerSingleton<ICreateMapAdapter>(
  'CreateMapAdapter',
  ZabbixCreateMapAdapter,
);

container.register<ValidateRequestMapDataUseCase>(
  'ValidateRequestMapData',
  ValidateRequestMapDataUseCase,
);

container.register<CreateMapUseCase>('CreateMapUseCase', CreateMapUseCase);

/* Groups */
container.register<ICreateGroupsAdapter>(
  'CreateGroupsAdapter',
  ZabbixCreateGroupsAdapter,
);

container.register<CreateGroupsUseCase>(
  'CreateGroupsUseCase',
  CreateGroupsUseCase,
);
