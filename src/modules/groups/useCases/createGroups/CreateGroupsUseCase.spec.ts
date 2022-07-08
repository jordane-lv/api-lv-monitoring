import {
  clearMocks,
  createHostGroupMock,
  createUserGroupMock,
  getHostGroupMock,
  getUserGroupMock,
} from '@modules/groups/adapters/mocks/CreateGroupsAdapterMock';
import { AppError } from '@shared/errors/AppError';

import { CreateGroupsUseCase } from './CreateGroupsUseCase';

let createGroupsUseCase: CreateGroupsUseCase;

describe('Create Groups', () => {
  beforeEach(() => {
    createGroupsUseCase = new CreateGroupsUseCase({
      createHostGroup: createHostGroupMock,
      createUserGroup: createUserGroupMock,
      getHostGroup: getHostGroupMock,
      getUserGroup: getUserGroupMock,
    });

    clearMocks();
  });

  it('should be able to create new user and host groups', async () => {
    const groupName = 'TST';

    await expect(
      createGroupsUseCase.execute(groupName),
    ).resolves.not.toBeInstanceOf(AppError);

    expect(createHostGroupMock).toBeCalled();
    expect(createUserGroupMock).toBeCalled();
  });

  it('should not be able to create a new user and host groups with invalid group name', async () => {
    const groupName = 'INVALID';

    await expect(createGroupsUseCase.execute(groupName)).rejects.toBeInstanceOf(
      AppError,
    );

    expect(createHostGroupMock).not.toBeCalled();
    expect(createUserGroupMock).not.toBeCalled();
  });
});
