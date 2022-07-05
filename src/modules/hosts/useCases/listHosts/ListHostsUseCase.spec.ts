import { AppError } from '../../../../errors/AppError';
import {
  createHostSpy,
  getHostGroupByNameSpy,
  getHostsByGroupIDSpy,
} from '../../mocks/CreateHostAdapterMock';
import { ListHostsUseCase } from './ListHostsUseCase';

let listHostsUseCase: ListHostsUseCase;

describe('List Hosts', () => {
  beforeAll(() => {
    listHostsUseCase = new ListHostsUseCase({
      create: createHostSpy,
      getHostGroupByName: getHostGroupByNameSpy,
      getHostsByGroupID: getHostsByGroupIDSpy,
    });
  });

  it('should be able to list hosts', async () => {
    await expect(listHostsUseCase.execute('TST')).resolves.not.toBeInstanceOf(
      AppError,
    );

    expect(getHostGroupByNameSpy).toBeCalled();
    expect(getHostsByGroupIDSpy).toBeCalled();
  });

  it('should not be able to list hosts without host group name', async () => {
    const withoutHostGroup = null;

    await expect(
      listHostsUseCase.execute(withoutHostGroup),
    ).rejects.toBeInstanceOf(AppError);

    expect(getHostGroupByNameSpy).not.toBeCalled();
    expect(getHostsByGroupIDSpy).not.toBeCalled();
  });

  it('should not be able to list hosts without host group id', async () => {
    const invalidHostGroup = 'INVALID ID';

    await expect(
      listHostsUseCase.execute(invalidHostGroup),
    ).rejects.toBeInstanceOf(AppError);

    expect(getHostGroupByNameSpy).toBeCalled();

    expect(getHostsByGroupIDSpy).not.toBeCalled();
  });
});
