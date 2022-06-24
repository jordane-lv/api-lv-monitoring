import { ZabbixCreateHostAdapter } from '../../adapters/zabbix/ZabbixCreateHostAdapter';
import { CreateHostController } from './CreateHostController';
import { CreateHostUseCase } from './CreateHostUseCase';

const zabbixCreateHostAdapter = new ZabbixCreateHostAdapter();
const createHostUseCase = new CreateHostUseCase(zabbixCreateHostAdapter);
export const createHostController = new CreateHostController(createHostUseCase);
