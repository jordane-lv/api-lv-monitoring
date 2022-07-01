import {
  ICreateGroupResponse,
  ICreateUserGroupData,
} from '../adapters/ICreateGroupsAdapter';

const createHostGroupMock = jest.fn(
  async (groupName: string): Promise<ICreateGroupResponse> => {
    if (groupName === 'SID') {
      return null;
    }

    return {
      groupId: 'Teste ID grupo de Host',
    };
  },
);
const createUserGroupMock = jest.fn(
  async (data: ICreateUserGroupData): Promise<ICreateGroupResponse> => {
    return (
      data && {
        groupId: 'Teste ID grupo de usuários',
      }
    );
  },
);

export { createHostGroupMock, createUserGroupMock };
