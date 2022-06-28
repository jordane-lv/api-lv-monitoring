import { AppError } from '../../../../errors/AppError';
import { ZabbixApi } from '../../../../services/zabbix-api';
import {
  ICreateMapAdapter,
  ICreateMapData,
  IHostResponse,
  IGroupResponse,
} from '../ICreateMapAdapter';

const api = new ZabbixApi();

export class ZabbixCreateMapAdapter implements ICreateMapAdapter {
  async create({ name, hosts, userGroup }: ICreateMapData): Promise<void> {
    try {
      const selements = hosts.map((host, index) => {
        return {
          selementid: index + 1,
          elements: [
            {
              hostid: host.id,
            },
          ],
          elementtype: 0,
          iconid_off: '2', // '4884', // ID do ícone em produção 4884
          use_iconmap: 1,
        };
      });

      const params = {
        name,
        width: 1500,
        height: 1500,
        label_type: 0,
        markelements: 1,
        expand_macros: 1,
        grid_align: 1,
        label_format: 1,
        label_type_host: 5,
        label_string_host: '{HOST.HOST}\n{HOST.IP}',
        iconmapid: 8,
        show_unack: 1,
        expandproblem: 0,
        severity_min: 4,
        selements,
        userGroups: [
          {
            usrgrpid: userGroup.id,
            permission: 2,
          },
        ],
      };

      const method = 'map.create';

      const response = await api.execute({ method, params });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async getUserGroupByName(groupName: string): Promise<IGroupResponse> {
    try {
      const params = {
        output: ['usrgrpid', 'name'],
        status: 0,
        filter: {
          name: [groupName],
        },
      };

      const method = 'usergroup.get';

      const response = await api.execute({ method, params });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }

      const { usrgrpid, name } = data.result[0];

      return {
        groupId: usrgrpid,
        groupName: name,
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async getHostGroupByName(groupName: string): Promise<IGroupResponse> {
    try {
      const params = {
        output: ['groupid', 'name'],
        status: 0,
        filter: {
          name: [groupName],
        },
      };

      const method = 'hostgroup.get';

      const response = await api.execute({ method, params });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }

      const { groupid, name } = data.result[0];

      return {
        groupId: groupid,
        groupName: name,
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async getAllHostsByHostGroupId(groupId: string): Promise<IHostResponse[]> {
    try {
      const params = {
        output: ['hostid', 'host', 'name'],
        groupids: [groupId],
        selectInterfaces: ['ip'],
      };

      const method = 'host.get';

      const response = await api.execute({ method, params });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }

      const hosts = data.result.map(host => {
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
