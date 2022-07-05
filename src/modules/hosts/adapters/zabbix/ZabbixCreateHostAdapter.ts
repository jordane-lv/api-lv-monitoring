import { AppError } from '../../../../shared/errors/AppError';
import { ZabbixApi } from '../../../../shared/services/zabbix-api';
import {
  IHostGroupResponse,
  ICreateHostAdapter,
  ICreateHostData,
  ICreateHostResponse,
  IHostResponse,
} from '../ICreateHostAdapter';

interface IHostGroupZabbixResponse {
  name: string;
  groupid: string;
}

export class ZabbixCreateHostAdapter implements ICreateHostAdapter {
  private api: ZabbixApi;

  constructor() {
    this.api = new ZabbixApi();
  }

  async create({
    name,
    ipAddress,
    type,
    hostGroup,
  }: ICreateHostData): Promise<ICreateHostResponse> {
    try {
      const { groupId } = hostGroup;

      const params = {
        name: name.replace('-', '|'),
        host: name,
        status: 1,
        interfaces: [
          {
            type: 1,
            main: 1,
            useip: 1,
            ip: ipAddress,
            dns: '',
            port: '10050',
          },
        ],
        groups: [
          {
            groupid: groupId,
          },
        ],
        templates: [
          {
            templateid: '10186',
          },
        ],
        inventory_mode: 0,
        inventory: {
          alias: type,
        },
      };

      const response = await this.api.execute({
        method: 'host.create',
        params,
      });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }

      const { hostids } = data.result;

      return {
        name,
        hostId: hostids[0],
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async getHostGroupByName(groupName: string): Promise<IHostGroupResponse> {
    try {
      const params = {
        output: ['groupid', 'name'],
        filter: {
          name: groupName,
        },
      };

      const response = await this.api.execute({
        method: 'hostgroup.get',
        params,
      });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }

      if (data.result.length === 0) {
        throw new AppError('Grupo de Hosts não encontrado.');
      }

      const { name, groupid } = data.result[0] as IHostGroupZabbixResponse;

      return {
        groupName: name,
        groupId: groupid,
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async getHostsByGroupID(hostGroupId: string): Promise<IHostResponse[]> {
    try {
      const params = {
        output: ['hostid', 'host', 'name'],
        groupids: hostGroupId,
        selectInterfaces: ['ip'],
      };

      const response = await this.api.execute({ method: 'host.get', params });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }

      if (data.result.length === 0) {
        return null;
      }

      const hosts: IHostResponse[] = data.result.map((host): IHostResponse => {
        return {
          hostId: host.hostid,
          name: host.host,
          interfaces: host.interfaces,
        };
      });

      return hosts;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}
