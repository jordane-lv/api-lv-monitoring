import { container } from 'tsyringe';

import { ICreateHostAdapter } from '../../modules/hosts/adapters/ICreateHostAdapter';
import { ZabbixCreateHostAdapter } from '../../modules/hosts/adapters/zabbix/ZabbixCreateHostAdapter';
import { ICreateMapAdapter } from '../../modules/maps/adapters/ICreateMapAdapter';
import { ZabbixCreateMapAdapter } from '../../modules/maps/adapters/zabbix/ZabbixCreateMapAdapter';

container.registerSingleton<ICreateHostAdapter>(
  'CreateHostAdapter',
  ZabbixCreateHostAdapter,
);

container.registerSingleton<ICreateMapAdapter>(
  'CreateMapAdapter',
  ZabbixCreateMapAdapter,
);
