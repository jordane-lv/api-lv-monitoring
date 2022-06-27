import { container } from 'tsyringe';

import { ICreateHostAdapter } from '../../modules/hosts/adapters/ICreateHostAdapter';
import { ZabbixCreateHostAdapter } from '../../modules/hosts/adapters/zabbix/ZabbixCreateHostAdapter';

container.registerSingleton<ICreateHostAdapter>(
  'CreateHostAdapter',
  ZabbixCreateHostAdapter,
);
