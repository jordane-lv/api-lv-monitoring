import {
  createMapSpy,
  getAllHostsByHostGroupIdSpy,
  getAllMapsByUserGroupIdSpy,
  getHostGroupByNameSpy,
  getUserGroupByNameSpy,
} from '@modules/maps/adapters/mocks/CreateMapAdapterMock';
import { AppError } from '@shared/errors/AppError';

import { ValidateRequestMapDataUseCase } from '../validateRequestMapData/ValidateRequestMapDataUseCase';
import { CreateMapUseCase } from './CreateMapUseCase';

let createMapUseCase: CreateMapUseCase;

describe('Create Map', () => {
  beforeEach(() => {
    createMapUseCase = new CreateMapUseCase(
      {
        create: createMapSpy,
        getAllHostsByHostGroupId: getAllHostsByHostGroupIdSpy,
        getHostGroupByName: getHostGroupByNameSpy,
        getUserGroupByName: getUserGroupByNameSpy,
        getAllMapsByUserGroupId: getAllMapsByUserGroupIdSpy,
      },
      new ValidateRequestMapDataUseCase(),
    );
  });

  it('should be able to create a new map', async () => {
    await expect(
      createMapUseCase.execute({
        codigo: '12345',
        sigla: 'TST',
        mapName: 'SUCCESS TEST',
      }),
    ).resolves.not.toBeInstanceOf(AppError);

    expect(createMapSpy).toBeCalled();
  });

  it('should not be able to create a new map with an invalid code', async () => {
    const mapInvalidCode = {
      codigo: '123',
      sigla: 'TST',
      mapName: 'INVALID CODE TEST',
    };

    await expect(
      createMapUseCase.execute(mapInvalidCode),
    ).rejects.toBeInstanceOf(AppError);

    expect(getHostGroupByNameSpy).not.toBeCalled();
    expect(getUserGroupByNameSpy).not.toBeCalled();
    expect(getAllHostsByHostGroupIdSpy).not.toBeCalled();
    expect(createMapSpy).not.toBeCalled();
  });

  it('should not be able to create a new map with an invalid initial', async () => {
    const mapInvalidInitial = {
      codigo: '12345',
      sigla: 'INVALID',
      mapName: 'INVALID INITIAL',
    };

    await expect(
      createMapUseCase.execute(mapInvalidInitial),
    ).rejects.toBeInstanceOf(AppError);

    expect(getHostGroupByNameSpy).not.toBeCalled();
    expect(getUserGroupByNameSpy).not.toBeCalled();
    expect(getAllHostsByHostGroupIdSpy).not.toBeCalled();
    expect(createMapSpy).not.toBeCalled();
  });

  it('should not be able to create a new map with empty map name.', async () => {
    await expect(
      createMapUseCase.execute({
        codigo: '12345',
        sigla: 'TST',
        mapName: '',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(createMapSpy).not.toBeCalled();
  });

  it('should not be able to create an existing map', async () => {
    const existingMap = {
      codigo: '12345',
      sigla: 'TST',
      mapName: 'EXISTING MAP',
    };

    await createMapUseCase.execute(existingMap);

    await expect(createMapUseCase.execute(existingMap)).rejects.toBeInstanceOf(
      AppError,
    );

    expect(getAllHostsByHostGroupIdSpy).not.toBeCalledTimes(2);
    expect(createMapSpy).not.toBeCalledTimes(2);
  });

  it('should not be able to create a new map without registered hosts', async () => {
    await expect(
      createMapUseCase.execute({
        codigo: '54321',
        sigla: 'TST',
        mapName: 'WITHOUT HOSTS',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(createMapSpy).not.toBeCalled();
  });
});
