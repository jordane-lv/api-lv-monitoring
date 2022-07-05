import { AppError } from '../../../../errors/AppError';
import {
  createMapSpy,
  getAllHostsByHostGroupIdSpy,
  getAllMapsByUserGroupIdSpy,
  getHostGroupByNameSpy,
  getUserGroupByNameSpy,
} from '../../mocks/CreateMapAdapterMock';
import { ListMapsUseCase } from './ListMapsUseCase';

let listMapsUseCase: ListMapsUseCase;

describe('List Maps', () => {
  beforeAll(() => {
    listMapsUseCase = new ListMapsUseCase({
      create: createMapSpy,
      getAllHostsByHostGroupId: getAllHostsByHostGroupIdSpy,
      getAllMapsByUserGroupId: getAllMapsByUserGroupIdSpy,
      getHostGroupByName: getHostGroupByNameSpy,
      getUserGroupByName: getUserGroupByNameSpy,
    });
  });

  it('should be able to list maps', async () => {
    await expect(listMapsUseCase.execute('TST')).resolves.not.toBeInstanceOf(
      AppError,
    );

    expect(getUserGroupByNameSpy).toBeCalled();
    expect(getAllMapsByUserGroupIdSpy).toBeCalled();
  });

  it('should not be able to list maps without group name', async () => {
    const withoutGroupName = null;

    await expect(
      listMapsUseCase.execute(withoutGroupName),
    ).rejects.toBeInstanceOf(AppError);

    expect(getUserGroupByNameSpy).not.toBeCalled();
    expect(getAllMapsByUserGroupIdSpy).not.toBeCalled();
  });

  it('should not be able to list maps without group id', async () => {
    const invalidGroupName = 'INVALID ID';

    await expect(
      listMapsUseCase.execute(invalidGroupName),
    ).rejects.toBeInstanceOf(AppError);

    expect(getUserGroupByNameSpy).toBeCalled();

    expect(getAllMapsByUserGroupIdSpy).not.toBeCalled();
  });
});
