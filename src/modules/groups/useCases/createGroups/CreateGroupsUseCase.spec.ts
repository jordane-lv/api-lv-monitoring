import { AppError } from '../../../../shared/errors/AppError';
import {
  createHostGroupMock,
  createUserGroupMock,
} from '../../mocks/CreateGroupsAdapterMock';
import { CreateGroupsUseCase } from './CreateGroupsUseCase';

describe('Create Groups', () => {
  const createGroupsUseCase = new CreateGroupsUseCase({
    createHostGroup: createHostGroupMock,
    createUserGroup: createUserGroupMock,
  });

  it('should be able to create new user and host groups', async () => {
    const groupName = 'TST';

    await expect(
      createGroupsUseCase.execute(groupName),
    ).resolves.not.toBeInstanceOf(AppError);

    expect(createHostGroupMock).toBeCalled();
    expect(createUserGroupMock).toBeCalled();
  });

  it('should not be able to create a new user group without host group id', async () => {
    const groupName = 'SID';

    await expect(createGroupsUseCase.execute(groupName)).rejects.toBeInstanceOf(
      AppError,
    );

    expect(createUserGroupMock).not.toBeCalled();
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
