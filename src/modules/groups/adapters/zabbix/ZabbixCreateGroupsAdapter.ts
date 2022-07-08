import { AppError } from '@shared/errors/AppError';
import { ZabbixApi } from '@shared/services/zabbix-api';

import {
  ICreateGroupResponse,
  ICreateGroupsAdapter,
  ICreateUserGroupData,
} from '../ICreateGroupsAdapter';

interface IZabbixHostGroupResponse {
  groupid: string;
  name: string;
}

interface IZabbixUserGroupResponse {
  name: string;
  usrgrpid: string;
}

export class ZabbixCreateGroupsAdapter implements ICreateGroupsAdapter {
  private api: ZabbixApi;

  constructor() {
    this.api = new ZabbixApi();
  }

  async createHostGroup(groupName: string): Promise<ICreateGroupResponse> {
    try {
      const params = {
        name: groupName,
      };

      const method = 'hostgroup.create';

      const response = await this.api.execute({ method, params });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }

      const [groupId] = data.result.groupids;

      return {
        groupId,
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async getHostGroup(groupName: string): Promise<ICreateGroupResponse | null> {
    try {
      const params = {
        output: ['groupid', 'name'],
        filter: {
          name: groupName,
        },
      };

      const method = 'hostgroup.get';

      const response = await this.api.execute({ method, params });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }

      const groups = data.result as IZabbixHostGroupResponse[];

      if (groups.length === 0) {
        return null;
      }

      const { name, groupid } = groups[0];

      return {
        groupName: name,
        groupId: groupid,
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async createUserGroup({
    groupName,
    hostGroupId,
  }: ICreateUserGroupData): Promise<ICreateGroupResponse> {
    try {
      const params = {
        name: groupName,
        rights: {
          permission: 2,
          id: hostGroupId,
        },
      };

      const method = 'usergroup.create';

      const response = await this.api.execute({ method, params });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }

      const [groupId] = data.result.usrgrpids;

      return {
        groupId,
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async getUserGroup(groupName: string): Promise<ICreateGroupResponse> {
    try {
      const params = {
        output: ['usrgrpid', 'name'],
        status: 0,
        filter: {
          name: [groupName],
        },
      };

      const method = 'usergroup.get';

      const response = await this.api.execute({ method, params });

      const { data } = response;

      if (data.error) {
        throw new AppError(data.error.data);
      }

      const groups = data.result as IZabbixUserGroupResponse[];

      if (groups.length === 0) {
        return null;
      }

      const { name, usrgrpid } = groups[0];

      return {
        groupName: name,
        groupId: usrgrpid,
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}
