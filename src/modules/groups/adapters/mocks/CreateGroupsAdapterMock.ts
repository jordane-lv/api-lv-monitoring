import {
  ICreateGroupResponse,
  ICreateUserGroupData,
} from '../ICreateGroupsAdapter';

const hostGroupsInMemory = [] as ICreateGroupResponse[];
const userGroupsInMemory = [] as ICreateGroupResponse[];

const createHostGroupMock = jest.fn(
  async (groupName: string): Promise<ICreateGroupResponse> => {
    const hostGroup = {
      groupName,
      groupId: 'Teste ID grupo de Host',
    };

    hostGroupsInMemory.push(hostGroup);

    return {
      groupId: hostGroup.groupId,
    };
  },
);

const getHostGroupMock = jest.fn(
  async (groupName: string): Promise<ICreateGroupResponse | null> => {
    const hostGroup = hostGroupsInMemory.find(
      group => group.groupName === groupName,
    );

    return hostGroup;
  },
);

const createUserGroupMock = jest.fn(
  async ({
    groupName,
  }: ICreateUserGroupData): Promise<ICreateGroupResponse> => {
    const userGroup = {
      groupName,
      groupId: 'Teste ID grupo de Usuários',
    };

    userGroupsInMemory.push(userGroup);

    return {
      groupId: userGroup.groupId,
    };
  },
);

const getUserGroupMock = jest.fn(
  async (groupName: string): Promise<ICreateGroupResponse | null> => {
    const userGroup = userGroupsInMemory.find(
      group => group.groupName === groupName,
    );

    return userGroup;
  },
);

const clearMocks = () => {
  hostGroupsInMemory.splice(0);
  userGroupsInMemory.splice(0);
};

export {
  createHostGroupMock,
  createUserGroupMock,
  getHostGroupMock,
  getUserGroupMock,
  clearMocks,
};
