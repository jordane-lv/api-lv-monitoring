import { AppError } from '../../../../errors/AppError';
import patterns from '../../../../utils/patterns';
import {
  createMapSpy,
  getAllHostsByHostGroupIdSpy,
  getAllMapsByUserGroupIdSpy,
  getHostGroupByNameSpy,
  getUserGroupByNameSpy,
} from '../../mocks/CreateMapAdapterMock';
import { ValidateRequestMapDataUseCase } from '../validateRequestMapData/ValidateRequestMapDataUseCase';
import { CreateMapUseCase } from './CreateMapUseCase';

describe('Create Map', () => {
  const createMapUseCase = new CreateMapUseCase(
    {
      create: createMapSpy,
      getAllHostsByHostGroupId: getAllHostsByHostGroupIdSpy,
      getHostGroupByName: getHostGroupByNameSpy,
      getUserGroupByName: getUserGroupByNameSpy,
      getAllMapsByUserGroupId: getAllMapsByUserGroupIdSpy,
    },
    new ValidateRequestMapDataUseCase(),
  );

  it('should be able to create a new map', async () => {
    await expect(
      createMapUseCase.execute({
        codigo: '12345',
        sigla: 'TST',
        mapName: 'SUCCESS TEST',
      }),
    ).resolves.not.toThrow();

    expect(createMapSpy).toBeCalled();
  });

  it('should not be able to create a new map with an invalid code', async () => {
    await expect(
      createMapUseCase.execute({
        codigo: '123',
        sigla: 'TST',
        mapName: 'INVALID CODE TEST',
      }),
    ).rejects.toEqual(new AppError('Formato de código inválido.'));

    expect(getHostGroupByNameSpy).not.toBeCalled();
    expect(getUserGroupByNameSpy).not.toBeCalled();
    expect(getAllHostsByHostGroupIdSpy).not.toBeCalled();
    expect(createMapSpy).not.toBeCalled();
  });

  it('should not be able to create a new map with an invalid initial', async () => {
    await expect(
      createMapUseCase.execute({
        codigo: '12345',
        sigla: 'INVALID',
        mapName: 'INVALID INITIAL',
      }),
    ).rejects.toEqual(new AppError('Formato da sigla inválido.'));

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
    ).rejects.toEqual(new AppError('O nome do mapa é obrigatório!'));

    expect(createMapSpy).not.toBeCalled();
  });

  it('should not be able to create an existing map', async () => {
    const existingMap = {
      codigo: '12345',
      sigla: 'TST',
      mapName: 'EXISTING MAP',
    };

    const mapNamePattern = patterns.getMapNameFormat({
      code: existingMap.codigo,
      groupName: existingMap.sigla,
      mapName: existingMap.mapName,
    });

    await createMapUseCase.execute(existingMap);

    await expect(createMapUseCase.execute(existingMap)).rejects.toEqual(
      new AppError(`O mapa com nome ${mapNamePattern} já existe.`),
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
    ).rejects.toEqual(
      new AppError('Não existem hosts cadastrados com o mesmo código do mapa.'),
    );

    expect(createMapSpy).not.toBeCalled();
  });
});
