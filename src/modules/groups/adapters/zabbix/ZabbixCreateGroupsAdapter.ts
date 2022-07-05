import { AppError } from '../../../../shared/errors/AppError';
import { ZabbixApi } from '../../../../shared/services/zabbix-api';
import {
  ICreateGroupsAdapter,
  ICreateGroupResponse,
  ICreateUserGroupData,
} from '../ICreateGroupsAdapter';

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
}
