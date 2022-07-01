import { AppError } from '../../../../errors/AppError';
import { ZabbixApi } from '../../../../services/zabbix-api';
import {
  ICreateGroupsAdapter,
  ICreateGroupResponse,
  ICreateUserGroupData,
} from '../ICreateGroupsAdapter';

const api = new ZabbixApi();

export class ZabbixCreateGroupsAdapter implements ICreateGroupsAdapter {
  async createHostGroup(groupName: string): Promise<ICreateGroupResponse> {
    try {
      const params = {
        name: groupName,
      };

      const method = 'hostgroup.create';

      const response = await api.execute({ method, params });

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

      const response = await api.execute({ method, params });

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
