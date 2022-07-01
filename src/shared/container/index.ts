import { container } from 'tsyringe';

import { ICreateGroupsAdapter } from '../../modules/groups/adapters/ICreateGroupsAdapter';
import { ZabbixCreateGroupsAdapter } from '../../modules/groups/adapters/zabbix/ZabbixCreateGroupsAdapter';
import { ICreateHostAdapter } from '../../modules/hosts/adapters/ICreateHostAdapter';
import { ZabbixCreateHostAdapter } from '../../modules/hosts/adapters/zabbix/ZabbixCreateHostAdapter';
import { ValidateRequestHostDataUseCase } from '../../modules/hosts/useCases/validateRequestHostData/ValidateRequestHostDataUseCase';
import { ICreateMapAdapter } from '../../modules/maps/adapters/ICreateMapAdapter';
import { ZabbixCreateMapAdapter } from '../../modules/maps/adapters/zabbix/ZabbixCreateMapAdapter';
import { ValidateRequestMapDataUseCase } from '../../modules/maps/useCases/validateRequestMapData/ValidateRequestMapDataUseCase';

container.registerSingleton<ICreateHostAdapter>(
  'CreateHostAdapter',
  ZabbixCreateHostAdapter,
);

container.registerSingleton<ICreateMapAdapter>(
  'CreateMapAdapter',
  ZabbixCreateMapAdapter,
);

container.register<ValidateRequestHostDataUseCase>(
  'ValidateRequestHostData',
  ValidateRequestHostDataUseCase,
);

container.register<ValidateRequestMapDataUseCase>(
  'ValidateRequestMapData',
  ValidateRequestMapDataUseCase,
);

container.register<ICreateGroupsAdapter>(
  'CreateGroupsAdapter',
  ZabbixCreateGroupsAdapter,
);
