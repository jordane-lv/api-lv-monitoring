import { ZabbixApi } from '../../../../services/zabbix-api';
import {
  IHostGroupResponse,
  ICreateHostAdapter,
  ICreateHostData,
  IHostResponse,
} from '../ICreateHostAdapter';

const api = new ZabbixApi();

interface IHostGroupZabbixResponse {
  name: string;
  groupid: string;
}

export class ZabbixCreateHostAdapter implements ICreateHostAdapter {
  async create({
    name,
    ipAddress,
    type,
    hostGroup,
  }: ICreateHostData): Promise<void> {
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

      const response = await api.execute({ method: 'host.create', params });

      const { data } = response;

      if (data.error) {
        throw new Error(data.error.data);
      }
    } catch (error) {
      throw new Error(error.message);
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

      const response = await api.execute({ method: 'hostgroup.get', params });

      const { data } = response;

      if (data.error) {
        throw new Error(data.error.data);
      }

      if (data.result.length === 0) {
        throw new Error('Grupo de Hosts não encontrado.');
      }

      const { name, groupid } = data.result[0] as IHostGroupZabbixResponse;

      return {
        groupName: name,
        groupId: groupid,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getHostsByGroupID(groupId: string): Promise<IHostResponse[]> {
    try {
      const params = {
        output: ['hostid', 'host', 'name'],
        groupids: [groupId],
        selectInterfaces: ['ip'],
      };

      const response = await api.execute({ method: 'host.get', params });

      const { data } = response;

      if (data.error) {
        throw new Error(data.error.data);
      }

      if (data.result.length === 0) {
        return null;
      }

      return data.result as IHostResponse[];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
